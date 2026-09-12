import React, { useRef, useEffect, useState, useMemo } from 'react';
import { GenomeNode, GenomeLink, HistoricalSnapshot } from '../../types';
import { ZoomIn, ZoomOut, RotateCcw, Eye, Search, Layers, Compass } from 'lucide-react';

interface GenomeGraphProps {
  allNodes: Record<string, GenomeNode>;
  links: GenomeLink[];
  currentSnapshot: HistoricalSnapshot;
  selectedNode: GenomeNode | null;
  onSelectNode: (node: GenomeNode | null) => void;
  searchQuery?: string;
  layoutMode?: 'organic' | 'radial' | 'cluster';
}

interface SimulatedNode extends GenomeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isActive: boolean;
  isChanged: boolean;
  isAdded: boolean;
  isRemoved: boolean;
}

const MODULE_COLORS: Record<string, string> = {
  'core': '#2563EB',      // Primary Blue
  'storage': '#F59E0B',   // Architecture Amber
  'consensus': '#7C3AED', // Purple
  'query': '#16A34A',     // Green
  'api': '#06B6D4',       // Cyan Accent
  'frontend': '#0EA5E9',  // Sky
  'vector': '#8B5CF6',    // Indigo
  'common': '#64748B',    // Slate
  'tests': '#94A3B8',     // Light Slate
  'config': '#D97706'     // Warm Amber
};

export const GenomeGraph: React.FC<GenomeGraphProps> = ({
  allNodes,
  links,
  currentSnapshot,
  selectedNode,
  onSelectNode,
  searchQuery = '',
  layoutMode = 'organic'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Transform / Camera
  const [transform, setTransform] = useState<{ x: number; y: number; k: number }>({ x: 0, y: 0, k: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<SimulatedNode | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'files' | 'modules'>('all');

  // Node simulation coordinates
  const simulatedNodesRef = useRef<Map<string, SimulatedNode>>(new Map());

  // Active nodes in the current snapshot
  const activeFileSet = useMemo(() => new Set(currentSnapshot.activeFileIds), [currentSnapshot]);
  const changedFileSet = useMemo(() => new Set(currentSnapshot.changedFileIds), [currentSnapshot]);
  const addedFileSet = useMemo(() => new Set(currentSnapshot.addedFileIds), [currentSnapshot]);
  const removedFileSet = useMemo(() => new Set(currentSnapshot.removedFileIds), [currentSnapshot]);

  // Initialize or update node positions
  useEffect(() => {
    const map = simulatedNodesRef.current;
    const nodeIds = Object.keys(allNodes);

    // Filter nodes by current visibility
    nodeIds.forEach(id => {
      const raw = allNodes[id];
      const isActive = activeFileSet.has(id) || raw.type === 'repository' || raw.type === 'module' || raw.type === 'directory';
      const isChanged = changedFileSet.has(id);
      const isAdded = addedFileSet.has(id);
      const isRemoved = removedFileSet.has(id);

      // Determine size
      let radius = 6;
      if (raw.type === 'repository') radius = 24;
      else if (raw.type === 'module' || raw.type === 'directory') radius = 16;
      else radius = Math.max(5, Math.min(14, Math.sqrt(raw.lines || 100) * 0.22));

      // Determine color
      let color = MODULE_COLORS[raw.module] || '#64748B';
      if (isAdded) color = '#16A34A'; // Green for new
      else if (isChanged) color = '#F59E0B'; // Amber for modified
      else if (isRemoved) color = '#DC2626'; // Red for deleted

      if (!map.has(id)) {
        // Initial placement in radial distribution
        const angle = Math.random() * Math.PI * 2;
        const dist = raw.type === 'repository' ? 0 : (raw.type === 'module' ? 120 + Math.random() * 80 : 200 + Math.random() * 180);
        map.set(id, {
          ...raw,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          vx: 0,
          vy: 0,
          radius,
          color,
          isActive,
          isChanged,
          isAdded,
          isRemoved
        });
      } else {
        const existing = map.get(id)!;
        existing.radius = radius;
        existing.color = color;
        existing.isActive = isActive;
        existing.isChanged = isChanged;
        existing.isAdded = isAdded;
        existing.isRemoved = isRemoved;
      }
    });
  }, [allNodes, currentSnapshot, activeFileSet, changedFileSet, addedFileSet, removedFileSet]);

  // Center canvas on container resize or initial load
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTransform(prev => ({ ...prev, x: rect.width / 2, y: rect.height / 2 }));
  }, []);

  // Animation Loop (Render + Gentle Force Simulation)
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;

    const render = () => {
      tick++;
      const container = containerRef.current;
      if (container) {
        const dpr = window.devicePixelRatio || 1;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
          canvas.width = w * dpr;
          canvas.height = h * dpr;
        }
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      // Clear Living Code Light canvas
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      // Grid dots for spatial precision feel (Living Code subtle slate-300 dots)
      const dotSpacing = 40;
      const startX = Math.floor((-transform.x / transform.k) / dotSpacing) * dotSpacing - dotSpacing;
      const endX = startX + (w / transform.k) + (dotSpacing * 2);
      const startY = Math.floor((-transform.y / transform.k) / dotSpacing) * dotSpacing - dotSpacing;
      const endY = startY + (h / transform.k) + (dotSpacing * 2);

      ctx.fillStyle = 'rgba(203, 213, 225, 0.65)';
      for (let x = startX; x < endX; x += dotSpacing) {
        for (let y = startY; y < endY; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Physics Relaxation Step (subtle organic breathing)
      const nodesMap = simulatedNodesRef.current;
      const nodesArray = (Array.from(nodesMap.values()) as SimulatedNode[]).filter(n => n.isActive);

      // Link spring attractions
      links.forEach(link => {
        const source = nodesMap.get(link.source);
        const target = nodesMap.get(link.target);
        if (!source || !target || !source.isActive || !target.isActive) return;

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dy + dy * dy) || 1;
        const targetDist = link.type === 'hierarchy' ? 70 : 130;
        const force = (dist - targetDist) * 0.003 * (link.strength || 0.8);

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        source.vx += fx;
        source.vy += fy;
        target.vx -= fx;
        target.vy -= fy;
      });

      // Node repulsion & center gravity
      for (let i = 0; i < nodesArray.length; i++) {
        const n1 = nodesArray[i];

        // Center gravity
        n1.vx -= n1.x * 0.0005;
        n1.vy -= n1.y * 0.0005;

        // Pairwise node repulsion
        for (let j = i + 1; j < nodesArray.length; j++) {
          const n2 = nodesArray[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = n1.radius + n2.radius + 20;

          if (dist < minDist * 2) {
            const rep = ((minDist * 2 - dist) / (dist * 2)) * 0.35;
            const rx = (dx / dist) * rep;
            const ry = (dy / dist) * rep;
            n1.vx -= rx;
            n1.vy -= ry;
            n2.vx += rx;
            n2.vy += ry;
          }
        }

        // Apply velocity with damping
        n1.x += n1.vx;
        n1.y += n1.vy;
        n1.vx *= 0.85;
        n1.vy *= 0.85;
      }

      // Draw Links
      links.forEach(link => {
        const source = nodesMap.get(link.source);
        const target = nodesMap.get(link.target);
        if (!source || !target || !source.isActive || !target.isActive) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);

        if (link.type === 'data-flow') {
          // Curved link for architectural flow
          const midX = (source.x + target.x) / 2 - (source.y - target.y) * 0.15;
          const midY = (source.y + target.y) / 2 + (source.x - target.x) * 0.15;
          ctx.quadraticCurveTo(midX, midY, target.x, target.y);
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.65)'; // Cyan flow
          ctx.lineWidth = 1.4;
          ctx.setLineDash([4, 4]);
        } else if (link.type === 'hierarchy') {
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = 'rgba(203, 213, 225, 0.9)'; // Clean Slate
          ctx.lineWidth = 1.2;
          ctx.setLineDash([]);
        } else {
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)'; // Purple dependency
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Nodes
      nodesArray.forEach(node => {
        if (filterType === 'files' && node.type !== 'file') return;
        if (filterType === 'modules' && (node.type === 'file')) return;

        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;
        const matchesSearch = searchQuery.trim().length > 0 &&
          (node.name.toLowerCase().includes(searchQuery.toLowerCase()) || node.path.toLowerCase().includes(searchQuery.toLowerCase()));

        // Outer pulse ring if changed/added or selected
        if (node.isAdded || node.isChanged || isSelected || matchesSearch) {
          const pulseScale = 1 + Math.sin(tick * 0.08) * 0.15;
          ctx.beginPath();
          ctx.arc(node.x, node.y, (node.radius + 6) * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = isSelected
            ? 'rgba(37, 99, 235, 0.22)'
            : (node.isAdded ? 'rgba(22, 163, 74, 0.22)' : 'rgba(245, 158, 11, 0.22)');
          ctx.fill();
        }

        // Node Circle Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // High-contrast border
        ctx.lineWidth = isSelected ? 3 : 1.8;
        ctx.strokeStyle = isSelected ? '#2563EB' : (isHovered ? '#06B6D4' : '#FFFFFF');
        ctx.stroke();

        // Node Label for modules, directories, or searched/selected items
        const shouldShowLabel =
          node.type === 'repository' ||
          node.type === 'module' ||
          node.type === 'directory' ||
          isSelected ||
          isHovered ||
          matchesSearch ||
          (transform.k > 1.4 && node.radius > 7);

        if (shouldShowLabel) {
          ctx.font = node.type === 'repository'
            ? '600 13px "JetBrains Mono", monospace'
            : (node.type === 'module' ? '500 11px "JetBrains Mono", monospace' : '400 9.5px "JetBrains Mono", monospace');
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';

          // Text halo outline for razor-sharp readability over light canvas
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 3.5;
          ctx.lineJoin = 'round';
          ctx.strokeText(node.name, node.x, node.y + node.radius + 5);

          ctx.fillStyle = isSelected ? '#2563EB' : (isHovered ? '#0F172A' : '#475569');
          ctx.fillText(node.name, node.x, node.y + node.radius + 5);
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [transform, links, selectedNode, hoveredNode, searchQuery, filterType]);

  // Pointer interactions (Pan, Zoom, Select)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
      return;
    }

    // Hit test for hovered node
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - transform.x) / transform.k;
    const mouseY = (e.clientY - rect.top - transform.y) / transform.k;

    let found: SimulatedNode | null = null;
    const nodes = (Array.from(simulatedNodesRef.current.values()) as SimulatedNode[]).filter(n => n.isActive);
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const dx = mouseX - n.x;
      const dy = mouseY - n.y;
      if (dx * dx + dy * dy <= (n.radius + 4) * (n.radius + 4)) {
        found = n;
        break;
      }
    }
    setHoveredNode(found);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    // If mouse didn't move much, treat as click
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - transform.x) / transform.k;
    const mouseY = (e.clientY - rect.top - transform.y) / transform.k;

    const nodes = (Array.from(simulatedNodesRef.current.values()) as SimulatedNode[]).filter(n => n.isActive);
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const dx = mouseX - n.x;
      const dy = mouseY - n.y;
      if (dx * dx + dy * dy <= (n.radius + 5) * (n.radius + 5)) {
        onSelectNode(n);
        return;
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const newK = Math.max(0.25, Math.min(3.5, transform.k * factor));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setTransform(prev => ({
      k: newK,
      x: mouseX - (mouseX - prev.x) * (newK / prev.k),
      y: mouseY - (mouseY - prev.y) * (newK / prev.k)
    }));
  };

  const handleReset = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTransform({ x: rect.width / 2, y: rect.height / 2, k: 1 });
  };

  const handleZoom = (delta: number) => {
    setTransform(prev => {
      const newK = Math.max(0.25, Math.min(3.5, prev.k + delta));
      return { ...prev, k: newK };
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#F8FAFC] select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Floating Canvas Controls */}
      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
        <div className="flex items-center bg-white/95 border border-[#E2E8F0] shadow-xs rounded-xl p-1 text-xs font-medium">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg transition ${filterType === 'all' ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] font-semibold' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            All Nodes
          </button>
          <button
            onClick={() => setFilterType('modules')}
            className={`px-3 py-1 rounded-lg transition ${filterType === 'modules' ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] font-semibold' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            Modules Only
          </button>
          <button
            onClick={() => setFilterType('files')}
            className={`px-3 py-1 rounded-lg transition ${filterType === 'files' ? 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] font-semibold' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            Files Only
          </button>
        </div>

        {/* Legend */}
        <div className="hidden md:flex items-center gap-3 bg-white/95 border border-[#E2E8F0] px-3 py-1.5 rounded-xl text-[11px] text-[#64748B] shadow-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" /> Added
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Modified
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" /> Core
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" /> Consensus
          </span>
        </div>
      </div>

      {/* Floating Zoom & Orientation Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
        <button
          onClick={() => handleZoom(0.2)}
          className="p-2 bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] rounded-xl transition shadow-xs"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.2)}
          className="p-2 bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] rounded-xl transition shadow-xs"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] rounded-xl transition shadow-xs"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Hover Micro-Tooltip (Dark surface matching image.png tooltip design) */}
      {hoveredNode && (
        <div
          className="absolute pointer-events-none z-20 px-3 py-2 rounded-lg bg-[#0F172A] border border-[#1E293B] shadow-xl text-xs text-white"
          style={{
            left: `${hoveredNode.x * transform.k + transform.x + 16}px`,
            top: `${hoveredNode.y * transform.k + transform.y - 12}px`
          }}
        >
          <div className="font-mono text-[#38BDF8] font-semibold">{hoveredNode.name}</div>
          <div className="text-[10px] text-[#94A3B8] flex items-center gap-2 mt-0.5 font-mono">
            <span>{hoveredNode.type.toUpperCase()}</span>
            <span>•</span>
            <span>{hoveredNode.lines.toLocaleString()} LOC</span>
            <span>•</span>
            <span>{hoveredNode.module}</span>
          </div>
        </div>
      )}
    </div>
  );
};
