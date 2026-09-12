import React, { useEffect, useRef, useState } from 'react';
import { HistoricalSnapshot } from '../../types';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Sparkles,
  GitCommit,
  Clock,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

interface TimeMachineProps {
  snapshots: HistoricalSnapshot[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  onOpenReplayMode?: () => void;
}

const SPEEDS = [0.5, 1, 2, 5, 10];

export const TimeMachine: React.FC<TimeMachineProps> = ({
  snapshots,
  currentIndex,
  onSelectIndex,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onChangeSpeed,
  onOpenReplayMode
}) => {
  const currentSnap = snapshots[currentIndex] || snapshots[0];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [hoveredSnapshot, setHoveredSnapshot] = useState<HistoricalSnapshot | null>(null);

  // Jump to previous milestone
  const handlePrevEvent = () => {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (snapshots[i].isMajorMilestone) {
        onSelectIndex(i);
        return;
      }
    }
    if (currentIndex > 0) onSelectIndex(currentIndex - 1);
  };

  // Jump to next milestone
  const handleNextEvent = () => {
    for (let i = currentIndex + 1; i < snapshots.length; i++) {
      if (snapshots[i].isMajorMilestone) {
        onSelectIndex(i);
        return;
      }
    }
    if (currentIndex < snapshots.length - 1) onSelectIndex(currentIndex + 1);
  };

  // Click on track to seek
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || snapshots.length <= 1) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.round(ratio * (snapshots.length - 1));
    onSelectIndex(targetIdx);
  };

  // Drag on track
  const handleTrackMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return; // only when primary button held down
    handleTrackClick(e);
  };

  const progressPercent = snapshots.length > 1 ? (currentIndex / (snapshots.length - 1)) * 100 : 0;

  return (
    <div className="w-full bg-white border-t border-[#E2E8F0] px-4 sm:px-6 lg:px-8 py-3 select-none z-20 font-sans shadow-xs">
      {/* Top Scrubber Meta Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs mb-2.5">
        {/* Left: Active Snapshot Details */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] font-mono text-[#475569]">
            <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="font-semibold text-[#0F172A]">{currentSnap?.date}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] font-mono text-[#2563EB]">
            <GitCommit className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="text-[#2563EB] font-semibold hover:underline cursor-pointer">#{currentSnap?.commitHash}</span>
          </div>

          {currentSnap?.tag && (
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
              {currentSnap.tag}
            </span>
          )}

          {currentSnap?.milestoneTitle && (
            <div className="hidden lg:flex items-center gap-1.5 text-[#64748B] truncate max-w-md">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span className="font-medium text-[#0F172A]">{currentSnap.milestoneTitle}</span>
            </div>
          )}
        </div>

        {/* Right: Codebase Status & Replay Launcher */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-[#64748B]">
            <span>{currentSnap?.stats?.filesCount} files</span>
            <span>•</span>
            <span className="text-[#0F172A] font-semibold">{currentSnap?.stats?.linesOfCode?.toLocaleString()} LOC</span>
            <span>•</span>
            <span>{currentSnap?.stats?.contributorsCount} contributors</span>
          </div>

          {onOpenReplayMode && (
            <button
              onClick={onOpenReplayMode}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] transition text-xs font-semibold shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Replay Repository</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Timeline Scrubber Track */}
      <div className="w-full relative mb-3 py-1">
        {/* Timeline background track */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          onMouseMove={handleTrackMouseMove}
          className="relative h-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full cursor-pointer overflow-visible group"
        >
          {/* Active progress fill */}
          <div
            className="absolute top-0 left-0 h-full bg-[#2563EB] rounded-full transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Major Milestone Pins on the track */}
          {snapshots.map((snap, idx) => {
            const pinLeft = (idx / Math.max(1, snapshots.length - 1)) * 100;
            const isMilestone = snap.isMajorMilestone;
            const isPassed = idx <= currentIndex;

            return (
              <div
                key={snap.id}
                onMouseEnter={() => setHoveredSnapshot(snap)}
                onMouseLeave={() => setHoveredSnapshot(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectIndex(idx);
                }}
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 transition-transform ${
                  isMilestone ? 'w-3 h-3 cursor-pointer hover:scale-150' : 'w-1.5 h-1.5'
                }`}
                style={{ left: `${pinLeft}%` }}
              >
                <div
                  className={`w-full h-full rounded-full border ${
                    isMilestone
                      ? (isPassed ? 'bg-[#2563EB] border-white shadow-xs' : 'bg-white border-[#CBD5E1]')
                      : (isPassed ? 'bg-[#60A5FA] border-[#2563EB]' : 'bg-[#E2E8F0] border-[#CBD5E1]')
                  }`}
                />
              </div>
            );
          })}

          {/* Current Cursor Knob */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#2563EB] shadow-md z-20 pointer-events-none transition-transform"
            style={{ left: `${progressPercent}%` }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Hover Milestone Card Tooltip */}
        {hoveredSnapshot && (
          <div
            className="absolute -top-16 -translate-x-1/2 z-30 px-3 py-1.5 bg-[#0F172A] border border-[#1E293B] rounded-lg shadow-2xl text-xs pointer-events-none text-white"
            style={{
              left: `${(hoveredSnapshot.index / Math.max(1, snapshots.length - 1)) * 100}%`
            }}
          >
            <div className="font-mono text-[#38BDF8] font-semibold">{hoveredSnapshot.date} • #{hoveredSnapshot.commitHash}</div>
            <div className="text-[11px] text-slate-200 font-medium truncate max-w-xs">{hoveredSnapshot.milestoneTitle || hoveredSnapshot.commitMessage}</div>
          </div>
        )}

        {/* Year Axis Labels underneath track */}
        <div className="flex justify-between items-center text-[10px] font-mono text-[#64748B] mt-1.5 px-1">
          {snapshots.map((snap, idx) => {
            const showLabel = idx === 0 || idx === snapshots.length - 1 || idx === Math.floor(snapshots.length / 2);
            if (!showLabel) return null;
            return (
              <span key={idx} className={idx === currentIndex ? 'text-[#2563EB] font-bold' : ''}>
                {snap.date}
              </span>
            );
          })}
        </div>
      </div>

      {/* Playback Controls & Speed Selectors */}
      <div className="w-full flex items-center justify-between pt-1">
        {/* Playback Transport Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevEvent}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:pointer-events-none transition shadow-2xs"
            title="Previous Milestone Event"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onTogglePlay}
            className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition active:scale-95 flex items-center gap-1.5 shadow-xs"
            title={isPlaying ? 'Pause Playback' : 'Play Timeline Evolution'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleNextEvent}
            disabled={currentIndex === snapshots.length - 1}
            className="p-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] disabled:opacity-30 disabled:pointer-events-none transition shadow-2xs"
            title="Next Milestone Event"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono text-[#64748B] ml-2">
            Snapshot <strong className="text-[#0F172A] font-semibold">{currentIndex + 1}</strong> of {snapshots.length}
          </span>
        </div>

        {/* Speed Toggles */}
        <div className="flex items-center gap-0.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-0.5 text-[11px] font-mono">
          {SPEEDS.map(speed => (
            <button
              key={speed}
              onClick={() => onChangeSpeed(speed)}
              className={`px-2 py-0.5 rounded-md transition ${
                playbackSpeed === speed
                  ? 'bg-white text-[#2563EB] border border-[#BFDBFE] font-semibold shadow-2xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {speed}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
