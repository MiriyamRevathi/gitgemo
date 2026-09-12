import React from 'react';
import { GenomeNode, FileEvolutionRecord } from '../../types';
import { X, FileCode, Folder, Box, GitCommit, Users, Clock, ArrowUpRight, ShieldCheck, Activity, Copy, FileText, History } from 'lucide-react';

interface NodeInspectorProps {
  node: GenomeNode;
  fileEvolution?: FileEvolutionRecord;
  onClose: () => void;
  onSelectDependency?: (depId: string) => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
  node,
  fileEvolution,
  onClose,
  onSelectDependency
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyPath = () => {
    navigator.clipboard.writeText(node.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const getChangeFrequencyBadge = (freq: string) => {
    switch (freq) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">Critical Churn</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">High Activity</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">Active</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">Stable</span>;
    }
  };

  return (
    <div className="w-80 md:w-96 h-full bg-white border-l border-[#E2E8F0] flex flex-col shadow-xl z-30 overflow-hidden font-sans">
      {/* File Header */}
      <div className="p-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 overflow-hidden">
          <div className="p-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#2563EB] shrink-0 mt-0.5 shadow-2xs">
            {node.type === 'file' ? <FileCode className="w-4 h-4" /> : node.type === 'module' ? <Box className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] font-semibold">{node.type}</span>
              {getChangeFrequencyBadge(node.changeFrequency)}
            </div>
            <h3 className="font-mono text-sm font-semibold text-[#0F172A] truncate mt-0.5" title={node.name}>
              {node.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="font-mono text-[11px] text-[#64748B] truncate" title={node.path}>
                {node.path}
              </p>
              <button
                onClick={copyPath}
                className="text-[#94A3B8] hover:text-[#0F172A] p-0.5 transition"
                title="Copy file path"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition"
          title="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* File Action Strip */}
      <div className="px-3 py-2 bg-white border-b border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#334155]">{node.lines ? `${node.lines.toLocaleString()} lines` : 'Directory'}</span>
          <span>•</span>
          <span>{node.module}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 text-[11px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[#334155]">
            {copied ? 'Copied path' : 'Raw'}
          </span>
          <span className="px-2 py-0.5 text-[11px] font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[#334155] flex items-center gap-1">
            <History className="w-3 h-3 text-[#64748B]" /> History
          </span>
        </div>
      </div>

      {/* Content Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 divide-y divide-[#E2E8F0]">
        {/* Core Statistics */}
        <div className="space-y-2.5">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
            File Coordinates
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl">
              <div className="text-[10px] text-[#64748B] font-semibold uppercase">Lines of Code</div>
              <div className="text-base font-mono font-bold text-[#0F172A] mt-0.5">
                {node.lines ? node.lines.toLocaleString() : '—'}
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl">
              <div className="text-[10px] text-[#64748B] font-semibold uppercase">Commits Logged</div>
              <div className="text-base font-mono font-bold text-[#2563EB] mt-0.5">
                {node.commitsCount}
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl">
              <div className="text-[10px] text-[#64748B] font-semibold uppercase">First Commit</div>
              <div className="text-xs font-mono text-[#334155] mt-1 truncate" title={node.firstSeenDate}>
                {node.firstSeenDate}
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl">
              <div className="text-[10px] text-[#64748B] font-semibold uppercase">Last Modified</div>
              <div className="text-xs font-mono text-[#334155] mt-1 truncate" title={node.lastChangedDate}>
                {node.lastChangedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Contributors */}
        <div className="pt-4 space-y-2.5">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#7C3AED]" />
            Contributors ({node.contributors.length})
          </div>

          <div className="flex flex-wrap gap-1.5">
            {node.contributors.length > 0 ? (
              node.contributors.map((contrib, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#334155]"
                >
                  <div className="w-4 h-4 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[9px] font-mono text-[#2563EB]">
                    {contrib.charAt(0).toUpperCase()}
                  </div>
                  <span>{contrib}</span>
                </div>
              ))
            ) : (
              <span className="text-xs text-[#64748B]">No author records available</span>
            )}
          </div>
        </div>

        {/* Dependencies */}
        {node.dependencies && node.dependencies.length > 0 && (
          <div className="pt-4 space-y-2.5">
            <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#16A34A]" />
              Direct Dependencies ({node.dependencies.length})
            </div>

            <div className="space-y-1">
              {node.dependencies.map((dep, i) => (
                <div
                  key={i}
                  onClick={() => onSelectDependency?.(dep)}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#EFF6FF] text-xs font-mono text-[#334155] cursor-pointer transition"
                >
                  <span className="truncate">{dep}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#64748B]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Evolution Timeline */}
        <div className="pt-4 space-y-3">
          <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
            Commit History for this file
          </div>

          {fileEvolution && fileEvolution.events && fileEvolution.events.length > 0 ? (
            <div className="relative pl-5 border-l border-[#E2E8F0] space-y-3.5 my-2">
              {fileEvolution.events.map((evt, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs ${
                      evt.type === 'created'
                        ? 'bg-[#16A34A] ring-2 ring-[#DCFCE7]'
                        : evt.type === 'deleted'
                        ? 'bg-[#DC2626]'
                        : evt.type === 'refactored'
                        ? 'bg-[#7C3AED]'
                        : 'bg-[#F59E0B]'
                    }`}
                  />
                  <div className="text-[11px] font-mono text-[#64748B] flex items-center justify-between">
                    <span>{evt.date}</span>
                    <span className="text-[10px] text-[#2563EB] hover:underline font-mono">#{evt.commitHash}</span>
                  </div>
                  <div className="text-xs font-medium text-[#0F172A] mt-0.5">{evt.message}</div>
                  <div className="text-[10px] text-[#64748B] mt-1 flex items-center gap-2 font-mono">
                    <span>by {evt.author}</span>
                    {evt.additions > 0 && <span className="text-[#16A34A] font-semibold">+{evt.additions}</span>}
                    {evt.deletions > 0 && <span className="text-[#DC2626] font-semibold">-{evt.deletions}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-[#64748B] bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              {node.type === 'file' ? (
                <>
                  <div className="font-mono text-[#334155] font-medium">First Seen: {node.firstSeenDate}</div>
                  <div className="mt-1 font-mono text-[#2563EB]">Commit: #{node.firstSeenCommit}</div>
                  <div className="mt-2 text-[#64748B]">
                    File evolution was established in snapshot {node.firstSeenCommit}. Subsequent historical commits maintained this file.
                  </div>
                </>
              ) : (
                <span>Aggregated subsystem container encompassing {node.path}.</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
