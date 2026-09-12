import React, { useState } from 'react';
import { HistoricalSnapshot } from '../../types';
import {
  Activity,
  Calendar,
  FileCode,
  Folder,
  Layers,
  Users,
  TrendingUp,
  Plus,
  Minus
} from 'lucide-react';

interface MetricsPageProps {
  snapshots: HistoricalSnapshot[];
}

export const MetricsPage: React.FC<MetricsPageProps> = ({ snapshots }) => {
  const [timeRange, setTimeRange] = useState<'all' | 'recent'>('all');

  const displayedSnapshots = timeRange === 'recent'
    ? snapshots.slice(Math.max(0, snapshots.length - 4))
    : snapshots;

  const latest = snapshots[snapshots.length - 1];
  const genesis = snapshots[0];

  const totalLinesGrowth = latest.stats.linesOfCode - genesis.stats.linesOfCode;
  const filesGrowth = latest.stats.filesCount - genesis.stats.filesCount;

  // Max lines for scale
  const maxLines = Math.max(...snapshots.map(s => s.stats.linesOfCode)) || 1;
  const maxChurn = Math.max(...snapshots.map(s => s.stats.additions + s.stats.deletions)) || 1;

  return (
    <div className="w-full h-full overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-[#0F172A] font-sans">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-[#0F172A]">Repository Insights & Pulse</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                +{totalLinesGrowth.toLocaleString()} Net LOC
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Codebase velocity, volume growth, maintainer metrics, and historical commit churn.
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center bg-white border border-[#E2E8F0] p-1 rounded-xl text-xs shadow-2xs">
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                timeRange === 'all' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              All Time ({snapshots.length} eras)
            </button>
            <button
              onClick={() => setTimeRange('recent')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                timeRange === 'recent' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              Recent Milestones
            </button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1 shadow-2xs">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-[#2563EB]" />
              Lines of Code
            </div>
            <div className="text-xl font-mono font-bold text-[#0F172A]">
              {latest.stats.linesOfCode.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#16A34A] flex items-center gap-1 font-mono font-medium">
              <TrendingUp className="w-3 h-3" /> +{totalLinesGrowth.toLocaleString()} since genesis
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1 shadow-2xs">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-[#D97706]" />
              Active Files
            </div>
            <div className="text-xl font-mono font-bold text-[#0F172A]">
              {latest.stats.filesCount}
            </div>
            <div className="text-[11px] text-[#2563EB] font-mono font-medium">
              +{filesGrowth} files introduced
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1 shadow-2xs">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#7C3AED]" />
              Contributors
            </div>
            <div className="text-xl font-mono font-bold text-[#0F172A]">
              {latest.stats.contributorsCount}
            </div>
            <div className="text-[11px] text-[#64748B]">
              Active core maintainers
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1 shadow-2xs">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#16A34A]" />
              Subsystems
            </div>
            <div className="text-xl font-mono font-bold text-[#0F172A]">
              {latest.stats.modulesCount}
            </div>
            <div className="text-[11px] text-[#D97706] font-mono truncate font-medium">
              {latest.architecture.pattern}
            </div>
          </div>
        </div>

        {/* Lines of Code Trajectory Chart */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Lines of Code Trajectory</h3>
              <p className="text-xs text-[#64748B]">Net codebase volume evolution across repository eras</p>
            </div>
            <span className="text-xs font-mono text-[#64748B]">Peak: {maxLines.toLocaleString()} LOC</span>
          </div>

          {/* Bar Chart */}
          <div className="h-52 w-full flex items-end gap-1.5 pt-4 pb-2 border-b border-[#E2E8F0]">
            {displayedSnapshots.map((snap) => {
              const heightPercent = (snap.stats.linesOfCode / maxLines) * 100;
              return (
                <div
                  key={snap.id}
                  className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer"
                >
                  {/* Tooltip on Hover */}
                  <div className="absolute -top-12 z-20 hidden group-hover:block bg-[#0F172A] border border-[#1E293B] text-xs px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap font-mono pointer-events-none text-left text-white">
                    <div className="text-[#38BDF8] font-bold">{snap.stats.linesOfCode.toLocaleString()} LOC</div>
                    <div className="text-[10px] text-slate-300">{snap.date} (#{snap.commitHash})</div>
                  </div>

                  {/* Visual Bar */}
                  <div
                    className="w-full bg-[#BFDBFE] hover:bg-[#2563EB] rounded-t-md transition-all duration-200"
                    style={{ height: `${Math.max(8, heightPercent)}%` }}
                  />
                  <div className="text-[10px] font-mono text-[#64748B] truncate w-full text-center mt-1.5">
                    {snap.date.split('-')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Code Churn: Additions vs Deletions */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Code Churn: Additions vs Deletions</h3>
              <p className="text-xs text-[#64748B]">Magnitude of code introduced and refactored/pruned per era</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#16A34A] font-semibold">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#16A34A]" /> Additions
              </span>
              <span className="flex items-center gap-1.5 text-[#DC2626] font-semibold">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" /> Deletions
              </span>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {displayedSnapshots.map((snap) => {
              const addPct = (snap.stats.additions / maxChurn) * 100;
              const delPct = (snap.stats.deletions / maxChurn) * 100;

              return (
                <div key={snap.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#0F172A] font-semibold font-mono text-xs">{snap.date}</span>
                      <span className="text-[#2563EB] font-mono text-xs font-semibold">#{snap.commitHash}</span>
                      <span className="text-[#64748B] truncate max-w-xs">{snap.milestoneTitle || snap.commitMessage}</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-mono text-xs">
                      <span className="text-[#16A34A] font-semibold">+{snap.stats.additions}</span>
                      <span className="text-[#DC2626] font-semibold">-{snap.stats.deletions}</span>
                    </div>
                  </div>

                  <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full flex overflow-hidden border border-[#CBD5E1]">
                    <div
                      className="bg-[#16A34A] h-full"
                      style={{ width: `${Math.min(100, addPct)}%` }}
                    />
                    <div
                      className="bg-[#DC2626] h-full"
                      style={{ width: `${Math.min(100, delPct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
