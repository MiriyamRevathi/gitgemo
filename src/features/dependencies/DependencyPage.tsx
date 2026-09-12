import React, { useState } from 'react';
import { HistoricalSnapshot, DependencyItem } from '../../types';
import {
  Package,
  Layers,
  Filter,
  ArrowUpRight,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  Box,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface DependencyPageProps {
  currentSnapshot: HistoricalSnapshot;
}

export const DependencyPage: React.FC<DependencyPageProps> = ({ currentSnapshot }) => {
  const [filterType, setFilterType] = useState<'all' | 'direct' | 'indirect'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'production' | 'development'>('all');

  const deps = currentSnapshot.dependencies || [];

  const filteredDeps = deps.filter(d => {
    if (filterType !== 'all' && d.type !== filterType) return false;
    if (filterCategory !== 'all' && d.category !== filterCategory) return false;
    return true;
  });

  const addedCount = deps.filter(d => d.status === 'added').length;
  const updatedCount = deps.filter(d => d.status === 'updated').length;
  const removedCount = deps.filter(d => d.status === 'removed').length;

  return (
    <div className="w-full h-full overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-[#0F172A] font-sans">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-[#0F172A]">Dependency Graph & Ecosystem</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                {deps.length} Tracked Packages
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Active package manifest state in snapshot <span className="text-[#0F172A] font-semibold">{currentSnapshot.date}</span> (<code className="font-mono text-[#2563EB]">#{currentSnapshot.commitHash}</code>).
            </p>
          </div>

          {/* Status Metrics */}
          <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
            {addedCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] flex items-center gap-1.5 font-semibold">
                <PlusCircle className="w-3.5 h-3.5" /> +{addedCount} Added
              </span>
            )}
            {updatedCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706] flex items-center gap-1.5 font-semibold">
                <RefreshCw className="w-3.5 h-3.5" /> {updatedCount} Bumps
              </span>
            )}
            {removedCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] flex items-center gap-1.5 font-semibold">
                <MinusCircle className="w-3.5 h-3.5" /> -{removedCount} Deprecated
              </span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E2E8F0] p-3 rounded-xl text-xs shadow-2xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#64748B] mr-1.5 flex items-center gap-1 font-medium">
              <Filter className="w-3.5 h-3.5 text-[#64748B]" /> Filter Type:
            </span>
            {(['all', 'direct', 'indirect'] as const).map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  filterType === t
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0]'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#64748B] mr-1.5 font-medium">Scope:</span>
            {(['all', 'production', 'development'] as const).map(c => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  filterCategory === c
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0]'
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Dependencies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {filteredDeps.map((dep, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 space-y-3 transition shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB]">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">{dep.name}</h3>
                    <span className="text-[11px] font-mono text-[#2563EB] font-medium">v{dep.version}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                    dep.status === 'added'
                      ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]'
                      : dep.status === 'updated'
                      ? 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]'
                      : dep.status === 'removed'
                      ? 'bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]'
                      : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}
                >
                  {dep.status.toUpperCase()}
                </span>
              </div>

              <div className="text-xs text-[#64748B] flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                <span className="capitalize">{dep.type} Dependency</span>
                <span className="capitalize font-mono text-[11px] text-[#0F172A] font-medium">{dep.category}</span>
              </div>

              {dep.usedByModules.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] text-[#64748B] uppercase font-semibold">Consumed By Modules:</div>
                  <div className="flex flex-wrap gap-1">
                    {dep.usedByModules.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-mono text-[#334155]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-[10px] font-mono text-[#64748B] pt-1">
                Introduced in commit <code className="text-[#2563EB] font-semibold">#{dep.addedInCommit}</code>
              </div>
            </div>
          ))}
        </div>

        {filteredDeps.length === 0 && (
          <div className="p-12 text-center text-[#64748B] bg-white border border-[#E2E8F0] rounded-xl text-xs shadow-2xs">
            No dependencies found matching the active filter.
          </div>
        )}
      </div>
    </div>
  );
};
