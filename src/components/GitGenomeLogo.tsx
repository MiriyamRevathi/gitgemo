import React from 'react';

interface GitGenomeLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
}

export const GitGenomeLogo: React.FC<GitGenomeLogoProps> = ({
  size = 32,
  className = '',
  showText = false,
  showTagline = false,
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Molecular Interconnected Genome Icon matching Living Code design system */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Soft background glow / halo */}
        <circle cx="20" cy="20" r="18" fill="#EFF6FF" />
        
        {/* Connecting links */}
        <line x1="20" y1="10" x2="10" y2="24" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
        <line x1="20" y1="10" x2="30" y2="24" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
        <line x1="10" y1="24" x2="30" y2="24" stroke="#06B6D4" strokeWidth="1.75" strokeLinecap="round" />
        <line x1="10" y1="24" x2="20" y2="32" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
        <line x1="30" y1="24" x2="20" y2="32" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />

        {/* Nodes */}
        {/* Top Primary Node */}
        <circle cx="20" cy="10" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Left Cyan Accent Node */}
        <circle cx="10" cy="24" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Right Cyan Accent Node */}
        <circle cx="30" cy="24" r="4.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Bottom Primary Light Node */}
        <circle cx="20" cy="32" r="4.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Center tiny nucleus spark */}
        <circle cx="20" cy="21" r="2" fill="#22D3EE" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-[#0F172A] leading-tight">
            Git<span className="text-[#2563EB]">Genome</span>
          </span>
          {showTagline && (
            <span className="text-[11px] text-[#64748B] font-normal tracking-normal -mt-0.5">
              See how software evolves.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
