import React, { useState, useMemo } from 'react';
import { HistoricalSnapshot, GenomeNode } from '../../types';
import {
  GitCompare,
  ArrowRight,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  Layers,
  FileCode,
  Users,
  Package,
  X
} from 'lucide-react';

interface ComparisonModeProps {
  snapshots: HistoricalSnapshot[];
  allNodes: Record<string, GenomeNode>;
  onClose: () => void;
  onSelectSnapshot?: (index: number) => void;
}

export const ComparisonMode: React.FC<ComparisonModeProps> = ({
  snapshots,
  allNodes,
  onClose,
  onSelectSnapshot
}) => {
  const [indexA, setIndexA] = useState<number>(0);
  const [indexB, setIndexB] = useState<number>(Math.max(0, snapshots.length - 1));

  const snapA = snapshots[indexA] || snapshots[0];
  const snapB = snapshots[indexB] || snapshots[snapshots.length - 1];

  // Calculate set differences between Point A and Point B
  const diffs = useMemo(() => {
    const setA = new Set<string>(snapA.activeFileIds);
    const setB = new Set<string>(snapB.activeFileIds);

    const addedFiles: string[] = [];
    const removedFiles: string[] = [];
    const retainedFiles: string[] = [];

    setB.forEach((id: string) => {
      if (!setA.has(id)) addedFiles.push(id);
      else retainedFiles.push(id);
    });

    setA.forEach((id: string) => {
      if (!setB.has(id)) removedFiles.push(id);
    });

    // Dependencies difference
    const depsA = new Map<string, any>(snapA.dependencies.map(d => [d.name, d]));
    const depsB = new Map<string, any>(snapB.dependencies.map(d => [d.name, d]));

    const addedDeps = snapB.dependencies.filter(d => !depsA.has(d.name));
    const removedDeps = snapA.dependencies.filter(d => !depsB.has(d.name));
    const updatedDeps = snapB.dependencies.filter(d => {
      const existing = depsA.get(d.name);
      return existing && existing.version !== d.version;
    });

    // Delta Stats
    const deltaLOC = snapB.stats.linesOfCode - snapA.stats.linesOfCode;
    const deltaFiles = snapB.stats.filesCount - snapA.stats.filesCount;
    const deltaContributors = snapB.stats.contributorsCount - snapA.stats.contributorsCount;

    return {
      addedFiles,
      removedFiles,
      retainedFiles,
      addedDeps,
      removedDeps,
      updatedDeps,
      deltaLOC,
      deltaFiles,
      deltaContributors
    };
  }, [snapA, snapB]);

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC]/95 backdrop-blur-md flex flex-col overflow-hidden text-[#0F172A] font-sans">
      {/* Top Header */}
      <div className="h-14 px-6 border-b border-[#E2E8F0] bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB]">
            <GitCompare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">Temporal Repository Diff & Comparison</h2>
            <p className="text-xs text-[#64748B]">Comparing structural delta and architectural evolution between two commits.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Point A vs Point B Selectors Bar */}
      <div className="px-6 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
        {/* Point A */}
        <div className="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <span className="text-xs font-semibold text-[#64748B] shrink-0">BASE (POINT A):</span>
          <select
            value={indexA}
            onChange={(e) => setIndexA(Number(e.target.value))}
            className="flex-1 bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0F172A] rounded-lg px-2.5 py-1 truncate focus:outline-none focus:border-[#2563EB]"
          >
            {snapshots.map(s => (
              <option key={s.id} value={s.index}>
                {s.date} — #{s.commitHash} ({s.milestoneTitle || s.commitMessage})
              </option>
            ))}
          </select>
        </div>

        {/* Point B */}
        <div className="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-[#2563EB] shadow-2xs">
          <span className="text-xs font-semibold text-[#2563EB] shrink-0">HEAD (POINT B):</span>
          <select
            value={indexB}
            onChange={(e) => setIndexB(Number(e.target.value))}
            className="flex-1 bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#2563EB] font-medium rounded-lg px-2.5 py-1 truncate focus:outline-none focus:border-[#2563EB]"
          >
            {snapshots.map(s => (
              <option key={s.id} value={s.index}>
                {s.date} — #{s.commitHash} ({s.milestoneTitle || s.commitMessage})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Diff Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="w-full space-y-6">
          {/* High-level Differential Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] uppercase font-semibold text-[#64748B]">Lines of Code Delta</span>
              <div className="text-lg font-mono font-bold text-[#0F172A]">
                {diffs.deltaLOC >= 0 ? `+${diffs.deltaLOC.toLocaleString()}` : diffs.deltaLOC.toLocaleString()}
              </div>
              <div className="text-[10px] font-mono text-[#64748B]">
                {snapA.stats.linesOfCode.toLocaleString()} → {snapB.stats.linesOfCode.toLocaleString()} LOC
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] uppercase font-semibold text-[#64748B]">Files Count Delta</span>
              <div className="text-lg font-mono font-bold text-[#2563EB]">
                {diffs.deltaFiles >= 0 ? `+${diffs.deltaFiles}` : diffs.deltaFiles} files
              </div>
              <div className="text-[10px] font-mono text-[#64748B]">
                +{diffs.addedFiles.length} added, -{diffs.removedFiles.length} pruned
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] uppercase font-semibold text-[#64748B]">Architecture Paradigm</span>
              <div className="text-sm font-semibold text-[#D97706] truncate">
                {snapA.architecture.pattern === snapB.architecture.pattern ? 'Preserved' : 'Evolved'}
              </div>
              <div className="text-[10px] text-[#64748B] truncate font-mono">
                {snapA.architecture.pattern} → {snapB.architecture.pattern}
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] uppercase font-semibold text-[#64748B]">Dependency Delta</span>
              <div className="text-lg font-mono font-bold text-[#7C3AED]">
                +{diffs.addedDeps.length} / -{diffs.removedDeps.length}
              </div>
              <div className="text-[10px] font-mono text-[#64748B]">
                {diffs.updatedDeps.length} bumped versions
              </div>
            </div>
          </div>

          {/* Files Added & Removed Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Added Files */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-[#16A34A] font-semibold border-b border-[#E2E8F0] pb-2">
                <span className="flex items-center gap-1.5">
                  <PlusCircle className="w-3.5 h-3.5" /> Added Files ({diffs.addedFiles.length})
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1 text-xs font-mono">
                {diffs.addedFiles.length > 0 ? (
                  diffs.addedFiles.map(f => (
                    <div key={f} className="p-2 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] font-medium truncate">
                      +{f}
                    </div>
                  ))
                ) : (
                  <div className="text-[#64748B] py-4 text-center">No new files introduced between points.</div>
                )}
              </div>
            </div>

            {/* Removed Files */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-[#DC2626] font-semibold border-b border-[#E2E8F0] pb-2">
                <span className="flex items-center gap-1.5">
                  <MinusCircle className="w-3.5 h-3.5" /> Deleted / Pruned Files ({diffs.removedFiles.length})
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1 text-xs font-mono">
                {diffs.removedFiles.length > 0 ? (
                  diffs.removedFiles.map(f => (
                    <div key={f} className="p-2 rounded-lg bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] font-medium line-through truncate">
                      -{f}
                    </div>
                  ))
                ) : (
                  <div className="text-[#64748B] py-4 text-center">No files deleted between points.</div>
                )}
              </div>
            </div>
          </div>

          {/* Dependency Delta Details */}
          {(diffs.addedDeps.length > 0 || diffs.removedDeps.length > 0 || diffs.updatedDeps.length > 0) && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 space-y-2.5 shadow-2xs">
              <div className="text-xs font-semibold text-[#7C3AED] uppercase tracking-wider flex items-center gap-2">
                <Package className="w-3.5 h-3.5" />
                <span>Dependency Manifest Alterations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                {diffs.addedDeps.map(d => (
                  <div key={d.name} className="p-2.5 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A]">
                    <span className="font-bold">+{d.name}</span>@{d.version}
                  </div>
                ))}
                {diffs.removedDeps.map(d => (
                  <div key={d.name} className="p-2.5 rounded-lg bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] line-through">
                    <span>-{d.name}</span>@{d.version}
                  </div>
                ))}
                {diffs.updatedDeps.map(d => (
                  <div key={d.name} className="p-2.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706]">
                    <span>~{d.name}</span> bumped to {d.version}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
