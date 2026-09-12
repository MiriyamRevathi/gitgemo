import React, { useState } from 'react';
import { HistoricalSnapshot, ArchitectureLayer, ArchitectureModule } from '../../types';
import {
  Layers,
  ArrowRight,
  Boxes,
  Cpu,
  Server,
  Database,
  Globe,
  GitCompare,
  Code2,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface ArchitecturePageProps {
  snapshots: HistoricalSnapshot[];
  currentIndex: number;
  onSelectSnapshot: (index: number) => void;
}

export const ArchitecturePage: React.FC<ArchitecturePageProps> = ({
  snapshots,
  currentIndex,
  onSelectSnapshot
}) => {
  const currentSnap = snapshots[currentIndex] || snapshots[0];
  const [compareIndex, setCompareIndex] = useState<number>(0);
  const [showComparison, setShowComparison] = useState(false);

  const compareSnap = snapshots[compareIndex] || snapshots[0];

  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'frontend':
        return <Globe className="w-4 h-4 text-pink-400" />;
      case 'api':
        return <Server className="w-4 h-4 text-blue-400" />;
      case 'query':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'consensus':
        return <Boxes className="w-4 h-4 text-purple-400" />;
      case 'storage':
        return <Database className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-[#0F172A] font-sans">
      <div className="w-full space-y-6">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-[#0F172A]">System Architecture Topography</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                {currentSnap.architecture.pattern}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Active structural topology at <span className="text-[#0F172A] font-semibold">{currentSnap.date}</span> (commit <code className="font-mono text-[#2563EB]">#{currentSnap.commitHash}</code>).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                showComparison
                  ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]'
                  : 'bg-white border-[#E2E8F0] text-[#334155] hover:bg-[#F1F5F9] hover:text-[#0F172A] shadow-2xs'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>{showComparison ? 'Hide Comparison' : 'Compare Before vs After'}</span>
            </button>
          </div>
        </div>

        {/* Architectural Evolution Timeline Sequence */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-2xs">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mb-3">
            Architectural Paradigm Evolution
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 text-xs">
            {snapshots.filter(s => s.isMajorMilestone).map((s) => {
              const isSelected = s.index === currentIndex;
              return (
                <div
                  key={s.id}
                  onClick={() => onSelectSnapshot(s.index)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB] shadow-xs'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1] hover:text-[#0F172A]'
                  }`}
                >
                  <div className="text-[10px] text-[#64748B] font-mono">{s.date}</div>
                  <div className="font-semibold text-[#0F172A] truncate mt-0.5">{s.architecture.pattern}</div>
                  <div className="text-[10px] text-[#2563EB] mt-1 font-mono">#{s.commitHash}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Before vs After Comparison Mode */}
        {showComparison && (
          <div className="bg-white border-2 border-[#BFDBFE] rounded-xl p-4 sm:p-5 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider flex items-center gap-2">
                <GitCompare className="w-4 h-4" />
                <span>Architectural Transformation Comparison</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#64748B]">Compare Base:</span>
                <select
                  value={compareIndex}
                  onChange={(e) => setCompareIndex(Number(e.target.value))}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#2563EB]"
                >
                  {snapshots.map((s) => (
                    <option key={s.id} value={s.index}>
                      {s.date} — {s.architecture.pattern} (#{s.commitHash})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Point A: Before */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#64748B]">BEFORE (Era #{compareSnap.index + 1})</span>
                  <span className="text-xs text-[#64748B] font-mono">{compareSnap.date}</span>
                </div>
                <div className="text-sm font-bold text-[#0F172A]">{compareSnap.architecture.pattern}</div>
                <p className="text-xs text-[#64748B]">{compareSnap.architecture.description}</p>
                <div className="pt-2 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B] space-y-0.5">
                  <div>Layers: {compareSnap.architecture.layers.length}</div>
                  <div>Files: {compareSnap.stats.filesCount}</div>
                  <div>Lines: {compareSnap.stats.linesOfCode.toLocaleString()} LOC</div>
                </div>
              </div>

              {/* Point B: After */}
              <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#16A34A]">AFTER (Era #{currentSnap.index + 1})</span>
                  <span className="text-xs text-[#64748B] font-mono">{currentSnap.date}</span>
                </div>
                <div className="text-sm font-bold text-[#0F172A]">{currentSnap.architecture.pattern}</div>
                <p className="text-xs text-[#334155]">{currentSnap.architecture.description}</p>
                <div className="pt-2 border-t border-[#BBF7D0] text-xs font-mono text-[#64748B] space-y-0.5">
                  <div>Layers: {currentSnap.architecture.layers.length}</div>
                  <div>Files: {currentSnap.stats.filesCount}</div>
                  <div>Lines: {currentSnap.stats.linesOfCode.toLocaleString()} LOC</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Architecture Layers Map */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
            Active Subsystem Layers & Responsibilities ({currentSnap.architecture.layers.length} Subsystems)
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentSnap.architecture.layers.map((layer, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 transition shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      {getLayerIcon(layer.type)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A]">{layer.name}</h3>
                      <p className="text-xs text-[#64748B] mt-0.5">{layer.description}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] font-semibold">
                    {layer.type}
                  </span>
                </div>

                {/* Modules under this layer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-4">
                  {layer.modules.map((mod, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl space-y-1.5 hover:border-[#CBD5E1] transition"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#2563EB] truncate">{mod.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-semibold font-mono ${
                            mod.status === 'added'
                              ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]'
                              : mod.status === 'refactored'
                              ? 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]'
                              : 'bg-[#F1F5F9] text-[#64748B]'
                          }`}
                        >
                          {mod.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-[#64748B] truncate" title={mod.path}>
                        {mod.path}
                      </div>
                      <div className="text-xs text-[#334155] leading-snug">{mod.responsibility}</div>
                      <div className="text-[10px] font-mono text-[#64748B] pt-1">
                        {mod.filesCount} files • {mod.lines.toLocaleString()} LOC
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
