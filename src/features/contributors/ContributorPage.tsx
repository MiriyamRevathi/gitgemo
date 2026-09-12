import React from 'react';
import { ContributorProfile } from '../../types';
import {
  Users,
  GitCommit,
  FileCode,
  Award,
  Calendar,
  Layers,
  Activity,
  Flame,
  ShieldCheck
} from 'lucide-react';

interface ContributorPageProps {
  contributors: ContributorProfile[];
}

export const ContributorPage: React.FC<ContributorPageProps> = ({ contributors }) => {
  const totalCommitsAll = contributors.reduce((acc, c) => acc + c.totalCommits, 0) || 1;

  return (
    <div className="w-full h-full overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-[#0F172A] font-sans">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl font-bold text-[#0F172A]">Software Contributors & Maintainers</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              {contributors.length} Contributors
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Authorship distribution, module ownership, and commit footprints across the codebase history.
          </p>
        </div>

        {/* Authorship Contribution Volume Bar */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold uppercase tracking-wider text-[#0F172A]">Contribution Breakdown</span>
            <span className="font-mono text-[#64748B] font-medium">{totalCommitsAll.toLocaleString()} Total Recorded Commits</span>
          </div>

          {/* Segmented Progress Bar (GitHub Language Bar style) */}
          <div className="h-3 w-full bg-[#F1F5F9] rounded-full flex overflow-hidden border border-[#CBD5E1]">
            {contributors.map((c, i) => {
              const colors = [
                'bg-[#2563EB]',
                'bg-[#7C3AED]',
                'bg-[#16A34A]',
                'bg-[#D97706]',
                'bg-[#EA580C]',
                'bg-[#0284C7]',
                'bg-[#64748B]'
              ];
              const color = colors[i % colors.length];
              return (
                <div
                  key={c.name}
                  className={`${color} h-full transition-all duration-300 hover:opacity-85 cursor-pointer`}
                  style={{ width: `${c.percentage}%` }}
                  title={`${c.name}: ${c.percentage}% (${c.totalCommits} commits)`}
                />
              );
            })}
          </div>

          {/* Percentage Legend */}
          <div className="flex flex-wrap gap-4 pt-1 text-xs">
            {contributors.map((c, i) => {
              const dotColors = [
                'bg-[#2563EB]',
                'bg-[#7C3AED]',
                'bg-[#16A34A]',
                'bg-[#D97706]',
                'bg-[#EA580C]',
                'bg-[#0284C7]',
                'bg-[#64748B]'
              ];
              return (
                <div key={c.name} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${dotColors[i % dotColors.length]}`} />
                  <span className="text-[#0F172A] font-medium">{c.name}</span>
                  <span className="text-[#64748B] font-mono font-semibold">{c.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Contributor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {contributors.map((c) => {
            return (
              <div
                key={c.name}
                className="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 space-y-3 transition flex flex-col justify-between shadow-2xs hover:shadow-xs"
              >
                {/* Contributor Identity */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A] hover:text-[#2563EB] cursor-pointer">
                          {c.name}
                        </h3>
                        <p className="text-xs text-[#2563EB] font-mono mt-0.5">{c.role}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold font-mono text-[#0F172A]">{c.percentage}%</span>
                      <div className="text-[10px] text-[#64748B] uppercase font-mono">Share</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 pt-1">
                    <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="font-mono">Active: {c.firstCommit} → {c.lastCommit}</span>
                  </div>
                </div>

                {/* Quantitative Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-[#E2E8F0]">
                  <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#64748B] uppercase block">Commits</span>
                    <span className="text-xs font-bold text-[#0F172A]">{c.totalCommits}</span>
                  </div>

                  <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#64748B] uppercase block">Files Touched</span>
                    <span className="text-xs font-bold text-[#0F172A]">{c.filesTouched}</span>
                  </div>

                  <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#64748B] uppercase block">Lines Added</span>
                    <span className="text-xs font-bold text-[#16A34A]">+{c.linesAdded.toLocaleString()}</span>
                  </div>

                  <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#64748B] uppercase block">Lines Deleted</span>
                    <span className="text-xs font-bold text-[#DC2626]">-{c.linesDeleted.toLocaleString()}</span>
                  </div>
                </div>

                {/* Primary Module Ownership */}
                <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
                  <div className="text-[10px] uppercase font-semibold text-[#64748B] flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#64748B]" />
                    <span>Subsystem Ownership:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {c.primaryModules.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#334155]"
                      >
                        {m}
                      </span>
                    ))}
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
