import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Database,
  Upload,
  Layers,
  Users,
  Clock,
  Package,
  Activity,
  GitBranch,
  ShieldCheck,
  Search,
  BookMarked,
  Star,
  GitFork,
  FileCode,
  CheckCircle2,
  Code2,
  Link2
} from 'lucide-react';
import { GitGenomeLogo } from '../../components/GitGenomeLogo';

interface LandingPageProps {
  onAnalyzeUrl: (url: string) => void;
  onExploreDemo: () => void;
  onUploadFile: (file: File) => void;
}

const SAMPLE_REPOS = [
  {
    name: 'nebuladb / nebuladb-engine',
    owner: 'nebuladb',
    repo: 'nebuladb-engine',
    type: 'demo',
    desc: 'Distributed multi-model SQL & Vector storage engine with Raft consensus and columnar execution.',
    language: 'Rust',
    langColor: '#dea584',
    stars: '14.2k',
    forks: '1,840'
  },
  {
    name: 'facebook / react',
    owner: 'facebook',
    repo: 'react',
    type: 'url',
    url: 'https://github.com/facebook/react',
    desc: 'The library for web and native user interfaces with component virtual DOM reconciliation.',
    language: 'JavaScript',
    langColor: '#f1e05a',
    stars: '228k',
    forks: '45.1k'
  },
  {
    name: 'torvalds / linux',
    owner: 'torvalds',
    repo: 'linux',
    type: 'url',
    url: 'https://github.com/torvalds/linux',
    desc: 'Linux kernel source tree and modular subsystem evolution over decades.',
    language: 'C',
    langColor: '#555555',
    stars: '185k',
    forks: '53.2k'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onAnalyzeUrl,
  onExploreDemo,
  onUploadFile
}) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      onExploreDemo();
      return;
    }
    onAnalyzeUrl(repoUrl.trim());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between font-sans">
      {/* Living Code (Light) Top Navbar */}
      <header className="w-full bg-white border-b border-[#E2E8F0] px-4 sm:px-8 lg:px-12 py-3.5 sticky top-0 z-30 shadow-xs">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GitGenomeLogo size={36} showText={true} showTagline={true} />
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              Living Code
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreDemo}
              className="px-4 py-2 rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE] text-xs font-semibold transition flex items-center gap-2"
            >
              <Database className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Explore Demo Genome</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('analyze-input');
                el?.focus();
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition"
            >
              <span>Analyze Repository</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Input Container */}
      <main className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-10 flex flex-col items-center">
        {/* Hero Title & Subtitle */}
        <div className="text-center space-y-3.5 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-medium text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span className="text-[#0F172A] font-semibold">GitGenome v1.0</span>
            <span>•</span>
            <span>Interactive Codebase Evolution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            See how software evolves.
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl mx-auto">
            Sequence any Git repository into an interactive visual genome. Trace architectural drift, contributor DNA, dependency lineages, and code velocity across time.
          </p>
        </div>

        {/* Input Card with Living Code Design System Styling */}
        <div className="w-full max-w-4xl bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-[#F8FAFC] px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
              <BookMarked className="w-4 h-4 text-[#2563EB]" />
              <span>Sequence a Repository</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
              <ShieldCheck className="w-3 h-3" />
              100% Client-Side
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <label htmlFor="analyze-input" className="block text-xs font-semibold text-[#0F172A]">
                Paste GitHub repository URL or path
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <input
                    id="analyze-input"
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/facebook/react or owner/repo"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#E2E8F0] focus:border-[#2563EB] rounded-lg text-xs font-mono text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition shadow-sm flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Analyze Repository</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Local File Upload Box */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition text-xs flex items-center justify-center gap-3 ${
                isDraggingFile
                  ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#2563EB]">
                <Upload className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#0F172A]">Drop git log or export file here</p>
                <p className="text-[11px] text-[#94A3B8]">
                  Run <code className="font-mono text-[#2563EB] bg-white px-1 rounded border border-[#E2E8F0]">git log --stat &gt; log.txt</code> or attach an exported JSON
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.txt,.log"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    onUploadFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Pinned Repositories & Demos matching Cards/Surfaces */}
        <div className="w-full space-y-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0F172A] tracking-tight">Pinned Repositories & Benchmark Genomes</span>
            <span className="text-[#64748B]">Click any card to sequence immediately</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_REPOS.map((repo, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (repo.type === 'demo') onExploreDemo();
                  else if (repo.url) onAnalyzeUrl(repo.url);
                }}
                className="p-5 bg-white border border-[#E2E8F0] hover:border-[#2563EB] rounded-xl cursor-pointer transition flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] group-hover:underline truncate">
                      <BookMarked className="w-4 h-4 text-[#64748B] shrink-0" />
                      <span className="truncate">{repo.repo}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] shrink-0">
                      {repo.type === 'demo' ? '5-Yr Demo' : 'Public'}
                    </span>
                  </div>

                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#64748B] pt-3.5 mt-3.5 border-t border-[#E2E8F0]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                    <span className="text-[#0F172A]">{repo.language}</span>
                  </span>

                  <span className="flex items-center gap-1 text-[#64748B]">
                    <Star className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>{repo.stars}</span>
                  </span>

                  <span className="flex items-center gap-1 text-[#64748B]">
                    <GitFork className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>{repo.forks}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights Cards matching Elevated / Default Card styles */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-2 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-[#0F172A]">Architecture Topography</div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Observe subsystem emergence from prototype to distributed service topologies.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-2 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] text-[#7C3AED] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-[#0F172A]">Contributor DNA</div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Discover module ownership, core maintainers, and bus-factor distribution.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-2 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-[#0F172A]">Time Machine Scrubber</div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Scrub smoothly across 5 years of commits with additions, refactors, and removals.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-2 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-[#0F172A]">Dependency Lineage</div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Track external dependencies, version migrations, and subsystem couplings.
            </p>
          </div>
        </div>
      </main>

      {/* Living Code Clean Footer */}
      <footer className="w-full border-t border-[#E2E8F0] bg-white py-6 px-4 sm:px-8 lg:px-12 mt-12 text-xs text-[#64748B]">
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GitGenomeLogo size={22} />
            <span className="font-semibold text-[#0F172A]">GitGenome</span>
            <span>•</span>
            <span>Living Code Design System v1.0</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-[#16A34A] font-medium">
              <ShieldCheck className="w-4 h-4" />
              100% Client-Side Engine
            </span>
            <span className="hover:text-[#2563EB] cursor-pointer">Architecture</span>
            <span className="hover:text-[#2563EB] cursor-pointer">Security</span>
            <span className="hover:text-[#2563EB] cursor-pointer">Docs</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

