import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  Search,
  Filter,
  Info,
  CheckCircle2,
  ExternalLink,
  Code2,
  Share2,
} from 'lucide-react';
import { ProjectItem } from './Projects';

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI & Automation' | 'Database' | 'Programming' | 'Tools' | string;
  level: number;
  experience: string;
  icon: string;
  description: string;
}

interface SkillsForceGraphProps {
  skills: SkillItem[];
  projects?: ProjectItem[];
  onSelectSkill?: (skillName: string) => void;
  className?: string;
}

// Type definitions for D3 Force Simulation
interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: 'tech' | 'project';
  category: string;
  intensity: number; // Project occurrence count
  proficiency?: number;
  experience?: string;
  description?: string;
  projects?: string[];
  technologies?: string[];
  radius: number;
  color: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  weight: number;
  sharedProjects?: string[];
}

// Distinct cohesive color palette by category (supports dark & light modes)
const CATEGORY_COLORS: Record<string, { light: string; dark: string; border: string }> = {
  Frontend: { light: '#4f46e5', dark: '#818cf8', border: '#4338ca' }, // Indigo
  Backend: { light: '#0891b2', dark: '#22d3ee', border: '#0e7490' }, // Cyan
  'AI & Automation': { light: '#9333ea', dark: '#c084fc', border: '#7e22ce' }, // Purple
  Database: { light: '#d97706', dark: '#fbbf24', border: '#b45309' }, // Amber
  Programming: { light: '#e11d48', dark: '#fb7185', border: '#be123c' }, // Rose
  Tools: { light: '#059669', dark: '#34d399', border: '#047857' }, // Emerald
  'Full Stack': { light: '#2563eb', dark: '#60a5fa', border: '#1d4ed8' }, // Blue
  Web: { light: '#0284c7', dark: '#38bdf8', border: '#0369a1' },
  Software: { light: '#7c3aed', dark: '#a78bfa', border: '#6d28d9' },
  Default: { light: '#64748b', dark: '#94a3b8', border: '#475569' },
};

function getCategoryColor(category: string, isDark: boolean): string {
  const cfg = CATEGORY_COLORS[category] || CATEGORY_COLORS.Default;
  return isDark ? cfg.dark : cfg.light;
}

export default function SkillsForceGraph({
  skills,
  projects = [],
  onSelectSkill,
  className = '',
}: SkillsForceGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [viewMode, setViewMode] = useState<'co-occurrence' | 'bipartite'>('co-occurrence');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Zoom reference to programmatically trigger zoom actions
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Check if dark mode is active
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Compute technology occurrence count and relationships from projects
  const { techStats, techCoOccurrences, projectList } = useMemo(() => {
    const stats: Record<string, { count: number; projects: string[] }> = {};
    const coOccur: Record<string, { weight: number; sharedProjects: string[] }> = {};

    projects.forEach((proj) => {
      const pTechs = proj.technologies || [];
      pTechs.forEach((t) => {
        if (!stats[t]) {
          stats[t] = { count: 0, projects: [] };
        }
        stats[t].count += 1;
        stats[t].projects.push(proj.title);
      });

      // Generate pairwise combinations for co-occurrences
      for (let i = 0; i < pTechs.length; i++) {
        for (let j = i + 1; j < pTechs.length; j++) {
          const t1 = pTechs[i];
          const t2 = pTechs[j];
          const key = [t1, t2].sort().join('___');
          if (!coOccur[key]) {
            coOccur[key] = { weight: 0, sharedProjects: [] };
          }
          coOccur[key].weight += 1;
          coOccur[key].sharedProjects.push(proj.title);
        }
      }
    });

    return {
      techStats: stats,
      techCoOccurrences: coOccur,
      projectList: projects,
    };
  }, [projects]);

  // Build Graph Nodes and Links according to the chosen viewMode
  const { nodes, links } = useMemo(() => {
    const skillMap = new Map<string, SkillItem>();
    skills.forEach((s) => skillMap.set(s.name.toLowerCase(), s));

    // Helper to find category for any tech
    const getTechCategory = (techName: string): string => {
      const match = skillMap.get(techName.toLowerCase());
      if (match) return match.category;
      if (['React', 'Tailwind CSS', 'Vite', 'HTML5 & Semantic Web', 'CSS3 & Responsive Design'].includes(techName))
        return 'Frontend';
      if (['Laravel', 'Node.js', 'PHP', 'REST API'].includes(techName)) return 'Backend';
      if (['Gemini AI', 'Gemini API', 'AI Agents & Automation', 'RAG & Vector Search'].includes(techName))
        return 'AI & Automation';
      if (['MySQL', 'PostgreSQL', 'SQLite', 'Firebase'].includes(techName)) return 'Database';
      if (['Docker', 'Git & GitHub'].includes(techName)) return 'Tools';
      if (['Python', 'C#', 'TypeScript', 'JavaScript (ES6+)'].includes(techName)) return 'Programming';
      return 'Frontend';
    };

    if (viewMode === 'co-occurrence') {
      // 1. Tech-to-Tech Co-occurrence Network
      const graphNodes: GraphNode[] = [];
      const nodeIds = new Set<string>();

      // Technologies used in projects
      (Object.entries(techStats) as [string, { count: number; projects: string[] }][]).forEach(([techName, data]) => {
        const skill = skillMap.get(techName.toLowerCase());
        const cat = getTechCategory(techName);
        const intensity = data.count; // Number of projects using this tech
        // Calculate radius based on intensity and level
        const baseRadius = 14;
        const radius = Math.min(36, baseRadius + intensity * 4.5);

        nodeIds.add(techName);
        graphNodes.push({
          id: techName,
          label: techName,
          type: 'tech',
          category: cat,
          intensity,
          proficiency: skill?.level || 85,
          experience: skill?.experience || 'Production',
          description: skill?.description || `Integrated across ${intensity} production applications.`,
          projects: data.projects,
          radius,
          color: getCategoryColor(cat, isDarkMode),
        });
      });

      // Also add remaining high-proficiency core skills from skills list if not in projects
      skills.forEach((s) => {
        if (!nodeIds.has(s.name) && s.level >= 90) {
          nodeIds.add(s.name);
          graphNodes.push({
            id: s.name,
            label: s.name,
            type: 'tech',
            category: s.category,
            intensity: 0,
            proficiency: s.level,
            experience: s.experience,
            description: s.description,
            projects: [],
            radius: 12,
            color: getCategoryColor(s.category, isDarkMode),
          });
        }
      });

      // Build Links
      const graphLinks: GraphLink[] = [];
      (Object.entries(techCoOccurrences) as [string, { weight: number; sharedProjects: string[] }][]).forEach(([pairKey, data]) => {
        const [t1, t2] = pairKey.split('___');
        if (nodeIds.has(t1) && nodeIds.has(t2)) {
          graphLinks.push({
            source: t1,
            target: t2,
            weight: data.weight,
            sharedProjects: data.sharedProjects,
          });
        }
      });

      return { nodes: graphNodes, links: graphLinks };
    } else {
      // 2. Bipartite Project-to-Tech Ecosystem Network
      const graphNodes: GraphNode[] = [];
      const graphLinks: GraphLink[] = [];
      const techSet = new Set<string>();

      // Add Project Hub Nodes
      projectList.forEach((p) => {
        graphNodes.push({
          id: `proj-${p.id}`,
          label: p.title,
          type: 'project',
          category: p.category,
          intensity: p.technologies?.length || 0,
          description: p.description,
          technologies: p.technologies,
          radius: 26,
          color: isDarkMode ? '#60a5fa' : '#2563eb',
        });

        // Add tech links
        p.technologies?.forEach((t) => {
          techSet.add(t);
          graphLinks.push({
            source: `proj-${p.id}`,
            target: `tech-${t}`,
            weight: 1,
            sharedProjects: [p.title],
          });
        });
      });

      // Add Tech Satellite Nodes
      techSet.forEach((t) => {
        const skill = skillMap.get(t.toLowerCase());
        const cat = getTechCategory(t);
        const count = techStats[t]?.count || 1;

        graphNodes.push({
          id: `tech-${t}`,
          label: t,
          type: 'tech',
          category: cat,
          intensity: count,
          proficiency: skill?.level || 85,
          experience: skill?.experience || 'Production',
          description: skill?.description || `Integrated across ${count} projects.`,
          projects: techStats[t]?.projects || [],
          radius: Math.min(24, 12 + count * 3),
          color: getCategoryColor(cat, isDarkMode),
        });
      });

      return { nodes: graphNodes, links: graphLinks };
    }
  }, [viewMode, techStats, techCoOccurrences, projectList, skills, isDarkMode]);

  // Categories list for filtering
  const categories = useMemo(() => {
    const list = Array.from(new Set(nodes.map((n) => n.category)));
    return ['All', ...list.sort()];
  }, [nodes]);

  // D3 Force Simulation Setup & Rendering
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = isFullscreen ? window.innerHeight - 140 : 540;

    svg.attr('width', width).attr('height', height).attr('viewBox', [0, 0, width, height]);

    // Clear previous elements
    svg.selectAll('*').remove();

    // Definitions (glow filters, gradients, markers)
    const defs = svg.append('defs');

    // Glow filter for interactive highlight
    const filter = defs.append('filter').attr('id', 'node-glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Zoomable parent group
    const g = svg.append('g').attr('class', 'graph-root');

    // Setup Zoom & Pan behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.35, 3.5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Deep clone data for D3 mutation
    const simNodes: GraphNode[] = nodes.map((d) => ({ ...d }));
    const simLinks: GraphLink[] = links.map((d) => ({ ...d }));

    // Force Simulation configuration
    const simulation = d3
      .forceSimulation<GraphNode>(simNodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(simLinks)
          .id((d) => d.id)
          .distance((d) => (viewMode === 'co-occurrence' ? 120 - Math.min(d.weight * 16, 60) : 95))
          .strength((d) => (viewMode === 'co-occurrence' ? 0.35 + d.weight * 0.15 : 0.45))
      )
      .force('charge', d3.forceManyBody().strength(viewMode === 'co-occurrence' ? -280 : -220))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.08))
      .force(
        'collide',
        d3
          .forceCollide<GraphNode>()
          .radius((d) => d.radius + (viewMode === 'co-occurrence' ? 18 : 12))
          .iterations(3)
      )
      .alphaDecay(0.028);

    // Render Edges (Links)
    const linkGroup = g.append('g').attr('class', 'links');
    const linkElements = linkGroup
      .selectAll('line')
      .data(simLinks)
      .enter()
      .append('line')
      .attr('stroke', isDarkMode ? '#334155' : '#cbd5e1')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.max(1.5, Math.min(6, d.weight * 1.5)))
      .attr('stroke-linecap', 'round');

    // Render Nodes Group
    const nodeGroup = g.append('g').attr('class', 'nodes');
    const nodeElements = nodeGroup
      .selectAll<SVGGElement, GraphNode>('g')
      .data(simNodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('cursor', 'pointer')
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Node Circle or Polygon
    nodeElements.each(function (d) {
      const el = d3.select(this);

      if (d.type === 'project') {
        // Hexagonal / Rounded rect hub for projects
        const size = d.radius * 1.8;
        el.append('rect')
          .attr('x', -size / 2)
          .attr('y', -size / 2)
          .attr('width', size)
          .attr('height', size)
          .attr('rx', 10)
          .attr('fill', isDarkMode ? '#1e293b' : '#ffffff')
          .attr('stroke', d.color)
          .attr('stroke-width', 2.8)
          .attr('class', 'project-node-shape transition-all duration-200 shadow-md');

        // Central Star or Badge Icon inside Project Node
        el.append('circle')
          .attr('r', 4)
          .attr('fill', d.color);
      } else {
        // Outer halo ring for high-intensity technologies
        if (d.intensity >= 3) {
          el.append('circle')
            .attr('r', d.radius + 4)
            .attr('fill', 'none')
            .attr('stroke', d.color)
            .attr('stroke-opacity', 0.25)
            .attr('stroke-width', 1.5)
            .attr('stroke-dasharray', '3,3');
        }

        // Main Technology Circle
        el.append('circle')
          .attr('r', d.radius)
          .attr('fill', isDarkMode ? '#0f172a' : '#ffffff')
          .attr('stroke', d.color)
          .attr('stroke-width', (d.intensity >= 2 ? 3 : 2))
          .attr('class', 'tech-node-shape transition-all duration-200');

        // Inner solid core indicating intensity/proficiency
        el.append('circle')
          .attr('r', Math.max(3, d.radius * 0.42))
          .attr('fill', d.color)
          .attr('fill-opacity', d.intensity > 0 ? 0.85 : 0.35);
      }
    });

    // Node Text Labels
    const labelElements = nodeElements
      .append('text')
      .text((d) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => d.radius + 14)
      .attr('font-size', (d) => (d.intensity >= 3 || d.type === 'project' ? '12px' : '11px'))
      .attr('font-weight', (d) => (d.intensity >= 2 || d.type === 'project' ? '700' : '500'))
      .attr('font-family', 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif')
      .attr('fill', isDarkMode ? '#f1f5f9' : '#0f172a')
      .attr('pointer-events', 'none')
      .attr('class', 'select-none')
      .style('opacity', showLabels ? 1 : 0)
      .style('text-shadow', isDarkMode ? '0 1px 3px rgba(0,0,0,0.9)' : '0 1px 3px rgba(255,255,255,0.95)');

    // Hover & Click Interactions
    nodeElements
      .on('mouseenter', (event, d) => {
        setHoveredNode(d);
        const rect = container.getBoundingClientRect();
        setHoverPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });

        // Highlight connected links and neighboring nodes
        const connectedNodeIds = new Set<string>([d.id]);
        linkElements.each(function (l) {
          const sourceId = typeof l.source === 'object' ? (l.source as GraphNode).id : l.source;
          const targetId = typeof l.target === 'object' ? (l.target as GraphNode).id : l.target;

          if (sourceId === d.id) connectedNodeIds.add(targetId as string);
          if (targetId === d.id) connectedNodeIds.add(sourceId as string);
        });

        // Dim non-connected elements
        nodeElements.style('opacity', (n) => (connectedNodeIds.has(n.id) ? 1 : 0.15));
        nodeElements.filter((n) => n.id === d.id).select('circle, rect').attr('filter', 'url(#node-glow)').attr('stroke-width', 4);

        linkElements
          .style('stroke-opacity', (l) => {
            const sId = typeof l.source === 'object' ? (l.source as GraphNode).id : l.source;
            const tId = typeof l.target === 'object' ? (l.target as GraphNode).id : l.target;
            return sId === d.id || tId === d.id ? 0.95 : 0.08;
          })
          .style('stroke', (l) => {
            const sId = typeof l.source === 'object' ? (l.source as GraphNode).id : l.source;
            const tId = typeof l.target === 'object' ? (l.target as GraphNode).id : l.target;
            return sId === d.id || tId === d.id ? (isDarkMode ? '#38bdf8' : '#6366f1') : (isDarkMode ? '#334155' : '#cbd5e1');
          })
          .style('stroke-width', (l) => {
            const sId = typeof l.source === 'object' ? (l.source as GraphNode).id : l.source;
            const tId = typeof l.target === 'object' ? (l.target as GraphNode).id : l.target;
            return sId === d.id || tId === d.id ? Math.max(3, l.weight * 2) : 1;
          });
      })
      .on('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        setHoverPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
        setHoverPosition(null);

        // Reset opacity & styles
        nodeElements.style('opacity', 1).select('circle, rect').attr('filter', null).attr('stroke-width', (d) => (d.intensity >= 2 ? 3 : 2));

        linkElements
          .style('stroke-opacity', 0.6)
          .style('stroke', isDarkMode ? '#334155' : '#cbd5e1')
          .style('stroke-width', (d) => Math.max(1.5, Math.min(6, d.weight * 1.5)));
      })
      .on('click', (event, d) => {
        setSelectedNode(d);
        if (d.type === 'tech' && onSelectSkill) {
          onSelectSkill(d.label);
        }
      });

    // Tick update loop
    simulation.on('tick', () => {
      linkElements
        .attr('x1', (d) => (d.source as GraphNode).x || 0)
        .attr('y1', (d) => (d.source as GraphNode).y || 0)
        .attr('x2', (d) => (d.target as GraphNode).x || 0)
        .attr('y2', (d) => (d.target as GraphNode).y || 0);

      nodeElements.attr('transform', (d) => `translate(${d.x || 0}, ${d.y || 0})`);
    });

    // Cleanup on unmount or re-render
    return () => {
      simulation.stop();
    };
  }, [nodes, links, viewMode, isDarkMode, isFullscreen, showLabels, onSelectSkill]);

  // Filtering by search or category dynamically
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const nodeElements = svg.selectAll<SVGGElement, GraphNode>('.node');
    const linkElements = svg.selectAll<SVGLineElement, GraphLink>('line');

    const query = searchQuery.trim().toLowerCase();

    nodeElements.each(function (d) {
      const matchCategory = selectedCategory === 'All' || d.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery = !query || d.label.toLowerCase().includes(query) || (d.projects && d.projects.some((p) => p.toLowerCase().includes(query)));

      const isMatch = matchCategory && matchQuery;
      d3.select(this)
        .transition()
        .duration(250)
        .style('opacity', isMatch ? 1 : 0.15)
        .style('pointer-events', isMatch ? 'all' : 'none');
    });

    linkElements.each(function (l) {
      const source = l.source as GraphNode;
      const target = l.target as GraphNode;
      const sourceMatch =
        (selectedCategory === 'All' || source.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        (!query || source.label.toLowerCase().includes(query));
      const targetMatch =
        (selectedCategory === 'All' || target.category.toLowerCase() === selectedCategory.toLowerCase()) &&
        (!query || target.label.toLowerCase().includes(query));

      d3.select(this)
        .transition()
        .duration(250)
        .style('opacity', sourceMatch && targetMatch ? 0.6 : 0.05);
    });
  }, [selectedCategory, searchQuery]);

  // Zoom control helpers
  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.3);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 0.75);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(400).call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl bg-white dark:bg-slate-950 shadow-2xl' : ''
      } ${className}`}
    >
      {/* Top Header & Interactive Graph Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-950/50 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Interactive Tech Graph</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                D3.js Force Simulation
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
            Explore technology co-occurrence networks and architectural intensity mapped across production deliverables.
          </p>
        </div>

        {/* View Mode Switcher & Graph Toolbar */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('co-occurrence')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'co-occurrence'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="View relationships between technologies linked by shared projects"
            >
              Co-Occurrence
            </button>
            <button
              type="button"
              onClick={() => setViewMode('bipartite')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'bipartite'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="View project hubs and their constituent technology satellites"
            >
              Project Hubs
            </button>
          </div>

          {/* Quick Zoom Controls */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in on graph"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out of graph"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Reset View"
              aria-label="Reset graph zoom and position"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowLabels((prev) => !prev)}
              className={`px-2 py-1 text-[11px] font-mono rounded-lg transition-colors cursor-pointer ${
                showLabels
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="Toggle Labels"
            >
              Labels
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              aria-label="Toggle fullscreen mode"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Ribbon: Search + Category Pills */}
      <div className="px-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 hidden sm:inline">
            Category:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Real-time search inside graph */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Highlight skill or tech..."
            className="w-full pl-8 pr-3 py-1 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Graph Canvas & Legend */}
      <div className="relative w-full h-[520px]">
        <svg
          ref={svgRef}
          className="w-full h-full cursor-grab active:cursor-grabbing block"
          style={{ minHeight: '520px' }}
        />

        {/* Bottom Legend */}
        <div className="absolute bottom-3 left-4 pointer-events-none z-10 flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Frontend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
            <span>Backend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>AI & Automation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Database</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Tools / DevOps</span>
          </div>
          <span className="hidden sm:inline text-slate-400">• Drag nodes to rearrange • Scroll to zoom</span>
        </div>

        {/* Interactive Floating Hover Tooltip */}
        {hoveredNode && hoverPosition && (
          <div
            className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-full mb-3 w-64 p-3.5 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white backdrop-blur-md border border-slate-700/80 shadow-xl text-xs select-none transition-all duration-75"
            style={{
              left: Math.min(Math.max(hoverPosition.x, 140), (containerRef.current?.clientWidth || 600) - 140),
              top: Math.max(hoverPosition.y - 12, 10),
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-700">
              <div>
                <span className="font-bold text-sm text-white block">{hoveredNode.label}</span>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">
                  {hoveredNode.category} &bull; {hoveredNode.type === 'project' ? 'Project Hub' : 'Technology'}
                </span>
              </div>
              {hoveredNode.proficiency && (
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">Proficiency</span>
                  <span className="text-xs font-bold text-emerald-400">{hoveredNode.proficiency}%</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">
              {hoveredNode.description}
            </p>

            {hoveredNode.projects && hoveredNode.projects.length > 0 && (
              <div className="mt-2 pt-1.5 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  Used in {hoveredNode.projects.length} {hoveredNode.projects.length === 1 ? 'project' : 'projects'}:
                </span>
                <div className="flex flex-wrap gap-1">
                  {hoveredNode.projects.map((proj) => (
                    <span
                      key={proj}
                      className="px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 text-[10px] border border-indigo-800/60"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hoveredNode.technologies && (
              <div className="mt-2 pt-1.5 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  Core Technologies ({hoveredNode.technologies.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {hoveredNode.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px] border border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Node Bottom Drawer info (shows when a node is clicked) */}
      {selectedNode && (
        <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 border-t border-indigo-100 dark:border-indigo-900/50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full shrink-0 shadow-xs"
              style={{ backgroundColor: selectedNode.color }}
            />
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {selectedNode.label}
              </span>
              <span className="text-slate-500 dark:text-slate-400 ml-2">
                ({selectedNode.category} &bull; {selectedNode.type === 'project' ? 'Project' : 'Skill'})
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-xs mt-0.5">
                {selectedNode.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedNode.projects && selectedNode.projects.length > 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800">
                {selectedNode.projects.length} Linked Deliverables
              </span>
            )}
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="px-3 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
