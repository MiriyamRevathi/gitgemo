import React, { useEffect, useState } from 'react';
import { HistoricalSnapshot, GenomeNode, GenomeLink } from '../../types';
import { GenomeGraph } from '../genome/GenomeGraph';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  Sparkles,
  GitCommit,
  Layers,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Users
} from 'lucide-react';

interface RepositoryReplayProps {
  snapshots: HistoricalSnapshot[];
  allNodes: Record<string, GenomeNode>;
  links: GenomeLink[];
  onClose: () => void;
  onJumpToSnapshot: (index: number) => void;
}

export const RepositoryReplay: React.FC<RepositoryReplayProps> = ({
  snapshots,
  allNodes,
  links,
  onClose,
  onJumpToSnapshot
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  const currentSnap = snapshots[currentIndex] || snapshots[0];

  // Auto-play progression
  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = Math.max(1200, 3200 / speed);
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= snapshots.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, speed, snapshots.length]);

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex flex-col overflow-hidden text-[#0F172A] font-sans">
      {/* Top Replay Header */}
      <div className="h-14 px-6 border-b border-[#E2E8F0] bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] font-mono text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            REPLAY MODE: CHRONOLOGICAL RUN
          </div>
          <span className="hidden md:inline text-xs text-[#64748B] font-mono">
            Era {currentIndex + 1} of {snapshots.length}
          </span>
        </div>

        {/* Milestone Steps Bar */}
        <div className="hidden lg:flex items-center gap-2 max-w-xl overflow-x-auto px-4">
          {snapshots.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-7 bg-[#2563EB]'
                  : idx < currentIndex
                  ? 'w-2.5 bg-[#16A34A]'
                  : 'w-2 bg-[#CBD5E1]'
              }`}
              title={`${s.date}: ${s.milestoneTitle || s.commitMessage}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onJumpToSnapshot(currentIndex);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F1F5F9] text-xs font-semibold text-[#334155] border border-[#CBD5E1] transition shadow-2xs"
          >
            <span>Exit to Explorer</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Body: Graph Canvas + Overlaid Narrative Card */}
      <div className="flex-1 relative overflow-hidden">
        <GenomeGraph
          allNodes={allNodes}
          links={links}
          currentSnapshot={currentSnap}
          selectedNode={null}
          onSelectNode={() => {}}
        />

        {/* Overlaid Narrative Card (Bottom Left) */}
        <div className="absolute bottom-20 left-4 right-4 md:right-auto md:max-w-lg z-30 pointer-events-auto">
          <div className="bg-white/95 border border-[#E2E8F0] rounded-xl p-4 shadow-xl backdrop-blur space-y-3">
            {/* Tag / Category */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] font-mono">
                  {currentSnap.tag || `Era #${currentIndex + 1}`}
                </span>
                <span className="text-xs text-[#64748B] flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                  {currentSnap.date}
                </span>
              </div>

              <div className="text-xs font-mono text-[#64748B] flex items-center gap-1.5">
                <GitCommit className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="text-[#2563EB] font-semibold">#{currentSnap.commitHash}</span>
              </div>
            </div>

            {/* Headline Title */}
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                {currentSnap.milestoneTitle || currentSnap.commitMessage}
              </h2>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                {currentSnap.milestoneDescription || currentSnap.commitMessage}
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#E2E8F0] text-xs font-mono">
              <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block uppercase">Total Size</span>
                <span className="font-bold text-[#0F172A]">{currentSnap.stats.linesOfCode.toLocaleString()} LOC</span>
              </div>
              <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block uppercase">Active Files</span>
                <span className="font-bold text-[#2563EB]">{currentSnap.stats.filesCount} files</span>
              </div>
              <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                <span className="text-[10px] text-[#64748B] block uppercase">Architecture</span>
                <span className="font-bold text-[#D97706] truncate block">{currentSnap.architecture.pattern}</span>
              </div>
            </div>

            {/* Author Footer */}
            <div className="text-[11px] text-[#64748B] flex items-center justify-between pt-0.5">
              <span className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-[#7C3AED]" />
                Authored by <strong className="text-[#0F172A]">{currentSnap.author}</strong>
              </span>
              <span className="text-[#16A34A] font-mono font-semibold">+{currentSnap.stats.additions} LOC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Transport Controls */}
      <div className="h-14 px-6 border-t border-[#E2E8F0] bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
            }}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-lg bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] disabled:opacity-30 disabled:pointer-events-none text-[#334155] transition shadow-2xs"
            title="Previous Era"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (currentIndex < snapshots.length - 1) setCurrentIndex(currentIndex + 1);
            }}
            disabled={currentIndex === snapshots.length - 1}
            className="p-1.5 rounded-lg bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] disabled:opacity-30 disabled:pointer-events-none text-[#334155] transition shadow-2xs"
            title="Next Era"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#64748B] hidden sm:inline">Speed:</span>
          {[0.5, 1, 2, 5].map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold transition ${
                speed === s
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#475569] hover:bg-[#F1F5F9] bg-[#F8FAFC] border border-[#CBD5E1]'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
