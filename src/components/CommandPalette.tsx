import React, { useState, useEffect, useMemo } from 'react';
import { GenomeNode, HistoricalSnapshot, ContributorProfile, DependencyItem } from '../types';
import {
  Search,
  FileCode,
  Folder,
  Box,
  Users,
  GitCommit,
  Sparkles,
  Package,
  X,
  ArrowRight
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  allNodes: Record<string, GenomeNode>;
  snapshots: HistoricalSnapshot[];
  contributors: ContributorProfile[];
  onSelectNode: (node: GenomeNode) => void;
  onSelectSnapshot: (index: number) => void;
  onNavigateTab: (tabId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  allNodes,
  snapshots,
  contributors,
  onSelectNode,
  onSelectSnapshot,
  onNavigateTab
}) => {
  const [query, setQuery] = useState('');

  // Keyboard listener for Escape and Cmd+K toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter entities
  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      // Return top curated suggestions
      return [
        { type: 'action', title: 'Open Genome Graph Explorer', subtitle: 'Main interactive node view', action: () => { onNavigateTab('genome'); onClose(); } },
        { type: 'action', title: 'Start Repository Replay', subtitle: 'Chronological timeline animation', action: () => { onNavigateTab('replay'); onClose(); } },
        { type: 'action', title: 'Compare Codebase Points (A vs B)', subtitle: 'Diff snapshots and metrics', action: () => { onNavigateTab('comparison'); onClose(); } },
        { type: 'action', title: 'System Architecture Topology', subtitle: 'Layered subsystem view', action: () => { onNavigateTab('architecture'); onClose(); } },
        { type: 'action', title: 'Maintainers & Authors', subtitle: 'Authorship distribution', action: () => { onNavigateTab('contributors'); onClose(); } }
      ];
    }

    const items: Array<{
      type: 'file' | 'module' | 'contributor' | 'commit' | 'action';
      title: string;
      subtitle: string;
      action: () => void;
    }> = [];

    // Search files and nodes
    (Object.values(allNodes) as GenomeNode[]).forEach(node => {
      if (node.name.toLowerCase().includes(trimmed) || node.path.toLowerCase().includes(trimmed)) {
        items.push({
          type: node.type === 'file' ? 'file' : 'module',
          title: node.name,
          subtitle: `${node.path} (${node.lines} LOC)`,
          action: () => {
            onSelectNode(node);
            onNavigateTab('genome');
            onClose();
          }
        });
      }
    });

    // Search contributors
    contributors.forEach(c => {
      if (c.name.toLowerCase().includes(trimmed) || c.role.toLowerCase().includes(trimmed)) {
        items.push({
          type: 'contributor',
          title: c.name,
          subtitle: `${c.role} • ${c.totalCommits} commits • ${c.percentage}% share`,
          action: () => {
            onNavigateTab('contributors');
            onClose();
          }
        });
      }
    });

    // Search commits / snapshots
    snapshots.forEach(s => {
      if (
        s.commitHash.toLowerCase().includes(trimmed) ||
        (s.milestoneTitle && s.milestoneTitle.toLowerCase().includes(trimmed)) ||
        s.commitMessage.toLowerCase().includes(trimmed)
      ) {
        items.push({
          type: 'commit',
          title: s.milestoneTitle || s.commitMessage,
          subtitle: `${s.date} • #${s.commitHash} by ${s.author}`,
          action: () => {
            onSelectSnapshot(s.index);
            onNavigateTab('timeline');
            onClose();
          }
        });
      }
    });

    return items.slice(0, 12);
  }, [query, allNodes, contributors, snapshots, onSelectNode, onSelectSnapshot, onNavigateTab, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center p-4 pt-16 font-sans">
      <div className="w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search input header */}
        <div className="p-3.5 border-b border-[#E2E8F0] flex items-center gap-3 bg-white">
          <Search className="w-4 h-4 text-[#64748B] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files, subsystems, maintainers, commits, or actions... (ESC to exit)"
            className="flex-1 bg-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#64748B] hover:text-[#0F172A]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-1.5 space-y-0.5">
          {results.map((item, idx) => (
            <div
              key={idx}
              onClick={item.action}
              className="p-2.5 rounded-lg hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0] cursor-pointer flex items-center justify-between transition group text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] group-hover:text-[#2563EB] group-hover:border-[#BFDBFE] group-hover:bg-[#EFF6FF] shrink-0 transition-colors">
                  {item.type === 'file' ? (
                    <FileCode className="w-3.5 h-3.5" />
                  ) : item.type === 'contributor' ? (
                    <Users className="w-3.5 h-3.5" />
                  ) : item.type === 'commit' ? (
                    <GitCommit className="w-3.5 h-3.5" />
                  ) : item.type === 'module' ? (
                    <Box className="w-3.5 h-3.5" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="truncate">
                  <div className="text-[#0F172A] font-semibold truncate group-hover:text-[#2563EB]">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#64748B] truncate mt-0.5 font-mono">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-[#CBD5E1] group-hover:text-[#2563EB] transition shrink-0 ml-2" />
            </div>
          ))}

          {results.length === 0 && (
            <div className="p-8 text-center text-[#64748B] text-xs">
              No matching files, commits, or maintainers found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
          <span>Navigation: Use arrow keys or click</span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#334155] font-mono shadow-2xs">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};
