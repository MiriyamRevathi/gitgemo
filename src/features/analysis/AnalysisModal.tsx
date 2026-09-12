import React from 'react';
import { AnalysisProgressStep, SEQUENCER_STEPS, AnalysisResult } from './repositoryAnalyzer';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ArrowRight,
  Database,
  Terminal,
  Copy,
  ExternalLink
} from 'lucide-react';

interface AnalysisModalProps {
  currentStepIndex: number;
  logMessage: string;
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  onUseDemo: () => void;
  onUploadFileClick: () => void;
  onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({
  currentStepIndex,
  logMessage,
  isAnalyzing,
  result,
  onUseDemo,
  onUploadFileClick,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyExportCommand = () => {
    navigator.clipboard.writeText(`git log --stat --date=iso > gitgenome_log.txt`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200 text-[#0F172A]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${result && !result.success ? 'bg-[#FEE2E2] border-[#FECACA] text-[#DC2626]' : 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]'}`}>
              {result && !result.success ? <AlertTriangle className="w-5 h-5" /> : <Sparkles className="w-5 h-5 animate-pulse" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] tracking-tight">
                {isAnalyzing ? 'Analyzing Repository Evolution' : (result?.success ? 'Genome Generation Complete' : 'Analysis Diagnostic')}
              </h2>
              <p className="text-xs text-[#64748B] font-mono">
                {isAnalyzing ? logMessage : (result?.success ? 'Dataset ready for exploration' : 'Direct API fetch constraint')}
              </p>
            </div>
          </div>
        </div>

        {/* In-Progress Stepper View */}
        {isAnalyzing && (
          <div className="space-y-3">
            <div className="space-y-2">
              {SEQUENCER_STEPS.map((step, idx) => {
                const isDone = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all ${
                      isDone
                        ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                        : isCurrent
                        ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB] font-semibold'
                        : 'bg-[#F8FAFC]/50 border-[#E2E8F0] text-[#94A3B8]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      ) : isCurrent ? (
                        <div className="w-4 h-4 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#CBD5E1] shrink-0" />
                      )}
                      <span className="truncate">{step.name}</span>
                    </div>

                    <span className="text-[10px] text-[#94A3B8] shrink-0">
                      Step {idx + 1}/9
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Diagnostic Failure / Fallback View (Truth in Data) */}
        {!isAnalyzing && result && !result.success && (
          <div className="space-y-4">
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 space-y-2">
              <div className="text-xs font-mono text-[#DC2626] font-bold uppercase tracking-wider">
                {result.error || 'Verification Notice'}
              </div>
              <p className="text-xs text-[#7F1D1D] leading-relaxed">
                {result.diagnosticMessage}
              </p>
            </div>

            {/* Local Git Export Snippet */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#2563EB]" /> Export from local terminal:
                </span>
                <button
                  onClick={copyExportCommand}
                  className="flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] text-[11px] font-semibold"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied!' : 'Copy Command'}</span>
                </button>
              </div>
              <code className="block p-2 rounded-lg bg-white text-[#2563EB] font-mono text-xs overflow-x-auto border border-[#CBD5E1] shadow-2xs">
                git log --stat --date=iso &gt; gitgenome_log.txt
              </code>
            </div>

            {/* Graceful Fallback Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={onUseDemo}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs"
              >
                <Database className="w-4 h-4" />
                <span>Explore Demo (NebulaDB 5-Yr)</span>
              </button>

              <button
                onClick={onUploadFileClick}
                className="flex-1 py-2.5 px-4 rounded-lg bg-white hover:bg-[#F1F5F9] text-[#334155] text-xs font-mono font-medium flex items-center justify-center gap-2 transition border border-[#CBD5E1] shadow-2xs"
              >
                <FileCode className="w-4 h-4 text-[#7C3AED]" />
                <span>Upload Exported Git Log</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
