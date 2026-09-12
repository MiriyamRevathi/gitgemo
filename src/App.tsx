import React, { useState, useEffect } from 'react';
import { RepositoryDataset, HistoricalSnapshot, GenomeNode } from './types';
import { NEBULA_DATASET } from './data/nebulaDemo';
import { analyzeRepository, AnalysisResult } from './features/analysis/repositoryAnalyzer';
import { LandingPage } from './features/landing/LandingPage';
import { AnalysisModal } from './features/analysis/AnalysisModal';
import { GenomeGraph } from './features/genome/GenomeGraph';
import { NodeInspector } from './features/genome/NodeInspector';
import { TimeMachine } from './features/timeline/TimeMachine';
import { RepositoryReplay } from './features/replay/RepositoryReplay';
import { TimelinePage } from './features/timeline/TimelinePage';
import { ArchitecturePage } from './features/architecture/ArchitecturePage';
import { DependencyPage } from './features/dependencies/DependencyPage';
import { ContributorPage } from './features/contributors/ContributorPage';
import { EventsPage } from './features/events/EventsPage';
import { MetricsPage } from './features/metrics/MetricsPage';
import { ComparisonMode } from './features/comparison/ComparisonMode';
import { CommandPalette } from './components/CommandPalette';
import { exportDatasetAsJson, exportTimelineAsCsv } from './utils/exporter';
import { GitGenomeLogo } from './components/GitGenomeLogo';

import {
  Layers,
  Clock,
  Boxes,
  Package,
  Users,
  Sparkles,
  Activity,
  GitCompare,
  Search,
  Download,
  FolderGit2,
  Share2,
  ChevronDown,
  BookMarked,
  Star,
  GitFork,
  Bell,
  Code2,
  GitCommit,
  Tag,
  Check,
  History,
  CircleDot,
  LineChart,
  Play,
  Sun,
  Moon
} from 'lucide-react';

type TabType = 'genome' | 'timeline' | 'architecture' | 'dependencies' | 'contributors' | 'events' | 'metrics';

export default function App() {
  // Main Dataset State
  const [dataset, setDataset] = useState<RepositoryDataset | null>(null);
  const [snapshotIndex, setSnapshotIndex] = useState<number>(0);

  // Time Machine Playback State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Inspector & Selection State
  const [selectedNode, setSelectedNode] = useState<GenomeNode | null>(null);
  const [genomeSearchQuery, setGenomeSearchQuery] = useState<string>('');

  // Active View Tab
  const [activeTab, setActiveTab] = useState<TabType>('genome');

  // Modals & Overlay Modes
  const [isReplayMode, setIsReplayMode] = useState<boolean>(false);
  const [isComparisonMode, setIsComparisonMode] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Analysis Sequencer State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisLog, setAnalysisLog] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState<boolean>(false);

  // Keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Playback timer loop for Time Machine
  useEffect(() => {
    if (!isPlaying || !dataset) return;
    const intervalMs = Math.max(800, 2400 / playbackSpeed);

    const timer = setInterval(() => {
      setSnapshotIndex(prev => {
        if (prev >= dataset.snapshots.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, dataset]);

  // Handler: Load Demo Dataset
  const handleLoadDemo = () => {
    setShowAnalysisModal(true);
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisLog('Bootstrapping 5-Year NebulaDB Genome...');

    analyzeRepository({ type: 'demo' }, (stepIdx, log) => {
      setAnalysisStep(stepIdx);
      setAnalysisLog(log);
    }).then(res => {
      setIsAnalyzing(false);
      setAnalysisResult(res);
      if (res.success && res.dataset) {
        setDataset(res.dataset);
        setSnapshotIndex(res.dataset.snapshots.length - 1); // latest by default
        setShowAnalysisModal(false);
      }
    });
  };

  // Handler: Analyze GitHub URL
  const handleAnalyzeUrl = (url: string) => {
    setShowAnalysisModal(true);
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisLog(`Connecting to repository endpoint...`);

    analyzeRepository({ type: 'github_url', url }, (stepIdx, log) => {
      setAnalysisStep(stepIdx);
      setAnalysisLog(log);
    }).then(res => {
      setIsAnalyzing(false);
      setAnalysisResult(res);
      if (res.success && res.dataset) {
        setDataset(res.dataset);
        setSnapshotIndex(res.dataset.snapshots.length - 1);
        setShowAnalysisModal(false);
      }
    });
  };

  // Handler: Upload local file (JSON or Git Log)
  const handleUploadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      setShowAnalysisModal(true);
      setIsAnalyzing(true);
      setAnalysisStep(0);
      setAnalysisLog(`Parsing local file '${file.name}'...`);

      analyzeRepository({ type: 'uploaded_text', content, filename: file.name }, (stepIdx, log) => {
        setAnalysisStep(stepIdx);
        setAnalysisLog(log);
      }).then(res => {
        setIsAnalyzing(false);
        setAnalysisResult(res);
        if (res.success && res.dataset) {
          setDataset(res.dataset);
          setSnapshotIndex(res.dataset.snapshots.length - 1);
          setShowAnalysisModal(false);
        }
      });
    };
    reader.readAsText(file);
  };

  // If no dataset loaded, show cinematic Landing Page
  if (!dataset) {
    return (
      <>
        <LandingPage
          onExploreDemo={handleLoadDemo}
          onAnalyzeUrl={handleAnalyzeUrl}
          onUploadFile={handleUploadFile}
        />

        {showAnalysisModal && (
          <AnalysisModal
            currentStepIndex={analysisStep}
            logMessage={analysisLog}
            isAnalyzing={isAnalyzing}
            result={analysisResult}
            onUseDemo={handleLoadDemo}
            onUploadFileClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.json,.txt,.log';
              input.onchange = (e: any) => {
                if (e.target.files?.[0]) handleUploadFile(e.target.files[0]);
              };
              input.click();
            }}
            onClose={() => setShowAnalysisModal(false)}
          />
        )}
      </>
    );
  }

  const currentSnapshot = dataset.snapshots[snapshotIndex] || dataset.snapshots[0];
  const selectedFileEvolution = selectedNode ? dataset.fileEvolutions[selectedNode.path] : undefined;

  return (
    <div className="h-screen w-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col overflow-hidden select-none font-sans">
      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        allNodes={dataset.allNodes}
        snapshots={dataset.snapshots}
        contributors={dataset.contributors}
        onSelectNode={(n) => setSelectedNode(n)}
        onSelectSnapshot={(idx) => setSnapshotIndex(idx)}
        onNavigateTab={(tab) => {
          if (tab === 'replay') setIsReplayMode(true);
          else if (tab === 'comparison') setIsComparisonMode(true);
          else setActiveTab(tab as TabType);
        }}
      />

      {/* Replay Theater Mode Overlay */}
      {isReplayMode && (
        <RepositoryReplay
          snapshots={dataset.snapshots}
          allNodes={dataset.allNodes}
          links={dataset.links}
          onClose={() => setIsReplayMode(false)}
          onJumpToSnapshot={(idx) => {
            setSnapshotIndex(idx);
            setIsReplayMode(false);
          }}
        />
      )}

      {/* Comparison Mode Overlay */}
      {isComparisonMode && (
        <ComparisonMode
          snapshots={dataset.snapshots}
          allNodes={dataset.allNodes}
          onClose={() => setIsComparisonMode(false)}
          onSelectSnapshot={(idx) => setSnapshotIndex(idx)}
        />
      )}

      {/* Global Top Navbar */}
      <header className="h-13 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E2E8F0] flex items-center justify-between shrink-0 z-20 shadow-2xs">
        {/* Left: Brand Logo & Global Search */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            onClick={() => setDataset(null)}
            className="cursor-pointer transition flex items-center gap-2 hover:opacity-85"
            title="Switch repository or return home"
          >
            <GitGenomeLogo size={28} showText={true} />
          </div>

          {/* Search Bar */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center justify-between w-44 sm:w-60 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB] text-xs text-[#64748B] hover:text-[#0F172A] transition shadow-2xs"
            title="Type ⌘K to search"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="truncate">Search genome...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0] text-[10px] text-[#64748B] font-mono font-medium shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Global Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 ml-2 text-xs font-semibold text-[#64748B]">
            <span onClick={() => setActiveTab('genome')} className={`cursor-pointer transition ${activeTab === 'genome' ? 'text-[#2563EB]' : 'hover:text-[#0F172A]'}`}>Code Genome</span>
            <span onClick={() => setActiveTab('timeline')} className={`cursor-pointer transition ${activeTab === 'timeline' ? 'text-[#2563EB]' : 'hover:text-[#0F172A]'}`}>Commits</span>
            <span onClick={() => setActiveTab('architecture')} className={`cursor-pointer transition ${activeTab === 'architecture' ? 'text-[#2563EB]' : 'hover:text-[#0F172A]'}`}>Architecture</span>
            <span onClick={() => setActiveTab('metrics')} className={`cursor-pointer transition ${activeTab === 'metrics' ? 'text-[#2563EB]' : 'hover:text-[#0F172A]'}`}>Insights</span>
          </nav>
        </div>

        {/* Right: Quick Actions, Replay, Compare, Profile */}
        <div className="flex items-center gap-2">
          {/* Compare Button */}
          <button
            onClick={() => setIsComparisonMode(true)}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition flex items-center gap-1.5 shadow-2xs"
            title="Compare Temporal Snapshots"
          >
            <GitCompare className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          {/* Replay Button */}
          <button
            onClick={() => setIsReplayMode(true)}
            className="px-3 py-1.5 rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] text-xs font-semibold text-[#2563EB] transition flex items-center gap-1.5 shadow-2xs"
            title="Chronological Replay"
          >
            <Play className="w-3.5 h-3.5 fill-[#2563EB] text-[#2563EB]" />
            <span className="hidden sm:inline">Replay</span>
            <span className="hidden md:inline px-1.5 py-0.2 rounded-full bg-[#2563EB]/10 text-[9px] font-bold text-[#2563EB]">5-Yr</span>
          </button>

          {/* Switch Repository */}
          <button
            onClick={() => setDataset(null)}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition flex items-center gap-1.5 shadow-2xs"
            title="Change Repository"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="hidden md:inline">Switch</span>
          </button>

          {/* Theme Indicator Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs" title="Living Code Theme Active">
            <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-[11px] font-medium text-[#64748B]">Light</span>
          </div>

          {/* User Avatar */}
          <div className="w-7 h-7 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[11px] font-bold text-[#2563EB]">
            GG
          </div>
        </div>
      </header>

      {/* Repository Header */}
      <div className="bg-white border-b border-[#E2E8F0] pt-3 px-4 sm:px-6 lg:px-8 shrink-0 z-10">
        {/* Repo Title Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <BookMarked className="w-4 h-4 text-[#64748B]" />
            <div className="text-sm font-semibold flex items-center gap-1">
              <span className="text-[#64748B] hover:text-[#0F172A] cursor-pointer">
                nebuladb
              </span>
              <span className="text-[#CBD5E1]">/</span>
              <span className="text-[#0F172A] hover:text-[#2563EB] cursor-pointer font-bold">
                {dataset.metadata.name}
              </span>
            </div>

            <span className="px-2 py-0.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-medium text-[#64748B]">
              Public
            </span>

            {dataset.metadata.isDemo && (
              <span className="px-2.5 py-0.5 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] text-[11px] font-semibold text-[#2563EB]">
                5-Yr Genome
              </span>
            )}
          </div>

          {/* GitHub Action Buttons: Star, Fork, Code Export */}
          <div className="flex items-center gap-2">
            {/* Fork Button */}
            <div className="inline-flex rounded-lg shadow-2xs">
              <button className="px-2.5 py-1 rounded-l-lg bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 transition">
                <GitFork className="w-3.5 h-3.5 text-[#64748B]" />
                <span>Fork</span>
              </button>
              <span className="px-2.5 py-1 rounded-r-lg bg-[#F8FAFC] border-y border-r border-[#E2E8F0] text-xs font-semibold text-[#64748B]">
                812
              </span>
            </div>

            {/* Star Button */}
            <div className="inline-flex rounded-lg shadow-2xs">
              <button
                onClick={() => {}}
                className="px-2.5 py-1 rounded-l-lg bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 transition"
              >
                <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                <span>Star</span>
              </button>
              <span className="px-2.5 py-1 rounded-r-lg bg-[#F8FAFC] border-y border-r border-[#E2E8F0] text-xs font-semibold text-[#64748B]">
                14.2k
              </span>
            </div>

            {/* Export Code Dropdown */}
            <div className="relative group">
              <button
                className="px-3 py-1 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Export</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-30 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-1.5 text-xs w-56">
                <div className="px-2.5 py-1.5 text-[11px] font-semibold text-[#64748B] border-b border-[#E2E8F0]">
                  Export Repository Genome
                </div>
                <button
                  onClick={() => exportDatasetAsJson(dataset)}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#2563EB] flex items-center gap-2 mt-1 transition"
                >
                  <Download className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Download Genome JSON</span>
                </button>
                <button
                  onClick={() => exportTimelineAsCsv(dataset)}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#F0FDF4] text-[#0F172A] hover:text-[#16A34A] flex items-center gap-2 transition"
                >
                  <Download className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>Download Timeline CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Underlined with vibrant blue active tab) */}
        <nav className="flex items-center gap-1 sm:gap-4 overflow-x-auto text-xs font-medium -mb-px">
          <button
            onClick={() => setActiveTab('genome')}
            className={`flex items-center gap-2 px-3 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'genome'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Code Genome</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-3 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Commits</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#F1F5F9] text-[10px] text-[#64748B]">
              {dataset.snapshots.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-3 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('dependencies')}
            className={`flex items-center gap-2 px-3 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'dependencies'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Dependencies</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#F1F5F9] text-[10px] text-[#64748B]">
              {currentSnapshot.dependenciesCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('contributors')}
            className={`flex items-center gap-2 px-3 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'contributors'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Contributors</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#F1F5F9] text-[10px] text-[#64748B]">
              {dataset.contributors.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-3 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <CircleDot className="w-4 h-4" />
            <span>Events & Evolution</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 px-3 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1]'
            }`}
          >
            <LineChart className="w-4 h-4" />
            <span>Insights</span>
          </button>
        </nav>
      </div>

      {/* Commit Status Bar (Visible on Genome tab) */}
      {activeTab === 'genome' && (
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Branch indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E2E8F0] font-semibold text-[#0F172A] shadow-2xs">
              <GitCommit className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="font-mono">main</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </div>

            {/* Author Avatar & Commit Message */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-[10px] font-bold flex items-center justify-center shrink-0">
                {currentSnapshot.author.charAt(0)}
              </div>
              <span className="font-semibold text-[#0F172A] hover:text-[#2563EB] cursor-pointer">
                {currentSnapshot.author}
              </span>
              <span className="text-[#64748B] truncate max-w-xs sm:max-w-md">
                {currentSnapshot.milestoneTitle || currentSnapshot.commitMessage}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-[#64748B]">
            {currentSnapshot.tag && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] font-semibold">
                <Tag className="w-3 h-3" />
                <span>{currentSnapshot.tag}</span>
              </span>
            )}

            <span className="text-[#2563EB] font-semibold hover:underline cursor-pointer">
              #{currentSnapshot.commitHash}
            </span>

            <span>{currentSnapshot.date}</span>

            <span className="text-[#16A34A] font-semibold">+{currentSnapshot.filesAdded}</span>
            <span className="text-[#DC2626] font-semibold">-{currentSnapshot.filesRemoved}</span>
          </div>
        </div>
      )}

      {/* Main Workspace Area */}
      <main className="flex-1 relative overflow-hidden flex">
        {/* Tab 1: Genome Graph Explorer */}
        {activeTab === 'genome' && (
          <div className="flex-1 h-full relative flex overflow-hidden">
            <GenomeGraph
              allNodes={dataset.allNodes}
              links={dataset.links}
              currentSnapshot={currentSnapshot}
              selectedNode={selectedNode}
              onSelectNode={(node) => setSelectedNode(node)}
              searchQuery={genomeSearchQuery}
            />

            {/* Contextual Node Inspector Panel */}
            {selectedNode && (
              <NodeInspector
                node={selectedNode}
                fileEvolution={selectedFileEvolution}
                onClose={() => setSelectedNode(null)}
                onSelectDependency={(depId) => {
                  if (dataset.allNodes[depId]) {
                    setSelectedNode(dataset.allNodes[depId]);
                  }
                }}
              />
            )}
          </div>
        )}

        {/* Tab 2: Chronological Timeline Page */}
        {activeTab === 'timeline' && (
          <TimelinePage
            snapshots={dataset.snapshots}
            currentIndex={snapshotIndex}
            onSelectSnapshot={(idx) => {
              setSnapshotIndex(idx);
              setActiveTab('genome'); // quick switch back to graph
            }}
          />
        )}

        {/* Tab 3: System Architecture Page */}
        {activeTab === 'architecture' && (
          <ArchitecturePage
            snapshots={dataset.snapshots}
            currentIndex={snapshotIndex}
            onSelectSnapshot={(idx) => setSnapshotIndex(idx)}
          />
        )}

        {/* Tab 4: Dependency Ecosystem Page */}
        {activeTab === 'dependencies' && (
          <DependencyPage currentSnapshot={currentSnapshot} />
        )}

        {/* Tab 5: Contributors & Maintainers Page */}
        {activeTab === 'contributors' && (
          <ContributorPage contributors={dataset.contributors} />
        )}

        {/* Tab 6: Client-Side Heuristic Events Log */}
        {activeTab === 'events' && (
          <EventsPage
            snapshots={dataset.snapshots}
            onSelectSnapshot={(idx) => {
              setSnapshotIndex(idx);
              setActiveTab('genome');
            }}
          />
        )}

        {/* Tab 7: Codebase Metrics & Vital Signs */}
        {activeTab === 'metrics' && (
          <MetricsPage snapshots={dataset.snapshots} />
        )}
      </main>

      {/* Bottom Time Machine Scrubber Dock */}
      <footer className="shrink-0 z-20">
        <TimeMachine
          snapshots={dataset.snapshots}
          currentIndex={snapshotIndex}
          onSelectIndex={(idx) => setSnapshotIndex(idx)}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          playbackSpeed={playbackSpeed}
          onChangeSpeed={(spd) => setPlaybackSpeed(spd)}
          onOpenReplayMode={() => setIsReplayMode(true)}
        />
      </footer>
    </div>
  );
}
