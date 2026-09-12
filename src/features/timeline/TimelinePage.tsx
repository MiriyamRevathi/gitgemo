import React, { useState } from 'react';
import { HistoricalSnapshot } from '../../types';
import {
  Calendar,
  GitCommit,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  FileCode,
  Users,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface TimelinePageProps {
  snapshots: HistoricalSnapshot[];
  currentIndex: number;
  onSelectSnapshot: (index: number) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({
  snapshots,
  currentIndex,
  onSelectSnapshot
}) => {
  const [filterMilestonesOnly, setFilterMilestonesOnly] = useState(false);

  const displayedSnapshots = filterMilestonesOnly
    ? snapshots.filter(s => s.isMajorMilestone)
    : snapshots;

  return (
    <div className="w-full h-full overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-[#0F172A] font-sans">
      <div className="w-full space-y-6">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-[#0F172A]">Repository History & Commit Log</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] font-mono">
                {snapshots.length} Historical Commits
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Chronological log of structural transitions, release tags, and architectural milestones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterMilestonesOnly(!filterMilestonesOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                filterMilestonesOnly
                  ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                  : 'bg-white border-[#E2E8F0] text-[#334155] hover:bg-[#F1F5F9] shadow-2xs'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Milestones Only ({snapshots.filter(s => s.isMajorMilestone).length})</span>
            </button>
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="relative pl-6 md:pl-8 border-l border-[#E2E8F0] space-y-4 my-3">
          {displayedSnapshots.map((snap) => {
            const isCurrent = snap.index === currentIndex;

            return (
              <div
                key={snap.id}
                onClick={() => onSelectSnapshot(snap.index)}
                className="relative group cursor-pointer"
              >
                {/* Timeline Node Pin */}
                <div
                  className={`absolute -left-[31px] md:-left-[39px] top-3.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    isCurrent
                      ? 'bg-[#2563EB] border-white ring-4 ring-[#BFDBFE] scale-110 shadow-xs'
                      : snap.isMajorMilestone
                      ? 'bg-white border-[#2563EB] group-hover:border-[#1D4ED8]'
                      : 'bg-[#F1F5F9] border-[#CBD5E1] group-hover:border-[#94A3B8]'
                  }`}
                />

                {/* Timeline Card */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-white border-[#2563EB] ring-1 ring-[#2563EB] shadow-sm'
                      : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs hover:shadow-xs'
                  }`}
                >
                  {/* Top Bar: Date, Commit Hash, Category */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#64748B] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                        {snap.date}
                      </span>
                      <span className="text-[#CBD5E1]">•</span>
                      <span className="text-[#2563EB] font-semibold">#{snap.commitHash}</span>

                      {snap.tag && (
                        <span className="px-2 py-0.5 rounded-full font-semibold text-[10px] bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                          {snap.tag}
                        </span>
                      )}

                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full font-semibold text-[10px] bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> ACTIVE HEAD
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#16A34A] font-mono font-semibold">
                        +{snap.stats.additions}
                      </span>
                      {snap.stats.deletions > 0 && (
                        <span className="text-[#DC2626] font-mono font-semibold">
                          -{snap.stats.deletions}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Message */}
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition">
                      {snap.milestoneTitle || snap.commitMessage}
                    </h3>
                    <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                      {snap.milestoneDescription || snap.commitMessage}
                    </p>
                  </div>

                  {/* Architecture & Stats Footer */}
                  <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 font-mono text-[11px] text-[#64748B]">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#7C3AED]" />
                        <span className="text-[#0F172A] font-medium">{snap.author}</span>
                      </span>
                      <span className="text-[#CBD5E1]">•</span>
                      <span className="text-[#64748B]">
                        {snap.stats.filesCount} files ({snap.stats.linesOfCode.toLocaleString()} LOC)
                      </span>
                      <span className="text-[#CBD5E1]">•</span>
                      <span className="text-[#D97706] font-medium">{snap.architecture.pattern}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSnapshot(snap.index);
                      }}
                      className="flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] font-semibold text-xs transition"
                    >
                      <span>Jump Genome Here</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
