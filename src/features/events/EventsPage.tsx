import React, { useState, useMemo } from 'react';
import { HistoricalSnapshot, DetectedEvent } from '../../types';
import { detectRepositoryEvents } from './eventsEngine';
import {
  Sparkles,
  Filter,
  Calendar,
  GitCommit,
  ArrowRight,
  Layers,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Info
} from 'lucide-react';

interface EventsPageProps {
  snapshots: HistoricalSnapshot[];
  onSelectSnapshot: (index: number) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ snapshots, onSelectSnapshot }) => {
  const [selectedImpact, setSelectedImpact] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const events = useMemo(() => detectRepositoryEvents(snapshots), [snapshots]);

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      if (selectedImpact !== 'all' && evt.impactScore !== selectedImpact) return false;
      if (selectedType !== 'all' && evt.type !== selectedType) return false;
      return true;
    });
  }, [events, selectedImpact, selectedType]);

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]">
            CRITICAL IMPACT
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
            HIGH IMPACT
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
            MODERATE
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]">
            LOW IMPACT
          </span>
        );
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-[#0F172A] font-sans">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-[#0F172A]">Heuristic Repository Events</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                {events.length} Detected Events
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Deterministic milestones discovered by running structural pattern heuristics across historical commits.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-xl text-[#64748B] shadow-2xs">
            <Info className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>100% Client-Side Evaluation • Transparent Heuristics</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E2E8F0] p-3 rounded-xl text-xs shadow-2xs">
          {/* Impact Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#64748B] mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Impact:
            </span>
            {(['all', 'critical', 'high', 'medium', 'low'] as const).map(imp => (
              <button
                key={imp}
                onClick={() => setSelectedImpact(imp)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  selectedImpact === imp
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#475569] hover:bg-[#F1F5F9] bg-[#F8FAFC] border border-[#CBD5E1]'
                }`}
              >
                {imp.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[#64748B]">Category:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-2.5 py-1 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
            >
              <option value="all">ALL CATEGORIES</option>
              <option value="architecture_change">ARCHITECTURE CHANGES</option>
              <option value="refactor_structural">REFACTORS</option>
              <option value="large_addition">LARGE ADDITIONS</option>
              <option value="large_deletion">LARGE DELETIONS</option>
              <option value="dependency_change">DEPENDENCY SHIFTS</option>
              <option value="release_tag">RELEASES</option>
              <option value="contributor_milestone">CONTRIBUTOR EXPANSION</option>
            </select>
          </div>
        </div>

        {/* Events Cards List */}
        <div className="space-y-3">
          {filteredEvents.map(evt => (
            <div
              key={evt.id}
              onClick={() => onSelectSnapshot(evt.snapshotIndex)}
              className="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 space-y-2.5 cursor-pointer transition shadow-2xs hover:shadow-xs group"
            >
              {/* Top row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {getImpactBadge(evt.impactScore)}
                  <span className="text-xs text-[#64748B] flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                    {evt.date}
                  </span>
                  <span className="text-xs font-mono text-[#2563EB] font-semibold">#{evt.commitHash}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  {evt.additions > 0 && <span className="text-[#16A34A] font-semibold">+{evt.additions}</span>}
                  {evt.deletions > 0 && <span className="text-[#DC2626] font-semibold">-{evt.deletions}</span>}
                  <span className="text-[#64748B]">by <span className="text-[#0F172A] font-medium">{evt.author}</span></span>
                </div>
              </div>

              {/* Event Title & Description */}
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition">
                  {evt.title}
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {/* Heuristic Rationale Disclosure (Truth in Engineering) */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2.5 text-[11px] font-mono text-[#64748B] space-y-0.5">
                <div className="text-[10px] text-[#64748B] uppercase font-semibold">Detection Heuristic:</div>
                <div className="text-[#334155]">{evt.heuristicRationale}</div>
              </div>

              {/* Affected Modules & Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E2E8F0] text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#64748B] text-[11px]">Affected Subsystems:</span>
                  {evt.affectedModules.map((m, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-2 py-0.5 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] text-[10px] font-mono text-[#2563EB]"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <button className="flex items-center gap-1 text-[#2563EB] group-hover:underline font-semibold text-xs">
                  <span>View in Genome Graph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="p-12 text-center text-[#64748B] bg-white border border-[#E2E8F0] rounded-xl text-xs shadow-2xs">
              No events matched the selected filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
