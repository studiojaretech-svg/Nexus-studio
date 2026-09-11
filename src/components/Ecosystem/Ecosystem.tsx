"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Network,
  ShieldCheck,
  Boxes,
  Users2,
  Sparkles,
  ArrowRight,
  X,
  Layers,
  Newspaper,
  Swords,
  Vote,
  Gift,
  ExternalLink,
  MessageSquare,
  Flame,
  CheckCircle2
} from "lucide-react";

// --- Node Matrix Data ---
interface NodeData {
  id: string;
  label: string;
  category: "Core" | "Game" | "Asset" | "Social";
  icon: any;
  color: string;
  x: number;
  y: number;
}

const NODES: NodeData[] = [
  { id: "nexus-core", label: "Nexus Core L2", category: "Core", icon: Network, color: "#22D3EE", x: 50, y: 50 },
  { id: "neo-kyoto", label: "Neo-Kyoto", category: "Game", icon: Layers, color: "#06B6D4", x: 24, y: 28 },
  { id: "valkyrie", label: "Valkyrie", category: "Game", icon: ShieldCheck, color: "#EAB308", x: 76, y: 28 },
  { id: "vault", label: "Vault", category: "Asset", icon: Boxes, color: "#A855F7", x: 22, y: 72 },
  { id: "guilds", label: "Guild DAO", category: "Social", icon: Users2, color: "#10B981", x: 78, y: 72 },
];

const CONNECTIONS = [
  { from: "nexus-core", to: "neo-kyoto" },
  { from: "nexus-core", to: "valkyrie" },
  { from: "nexus-core", to: "vault" },
  { from: "nexus-core", to: "guilds" },
];

// --- Community Features Data ---
interface CommunityTab {
  id: string;
  title: string;
  categoryTag: string;
  icon: any;
  code: string;
  headline: string;
  badge: string;
  description: string;
  imageUrl: string;
  hotspots: { x: string; y: string; label: string; highlight?: string }[];
  meta: { label: string; value: string }[];
}

const COMMUNITY_TABS: CommunityTab[] = [
  {
    id: "news",
    title: "Community News",
    categoryTag: "Live Dispatches",
    icon: Newspaper,
    code: "PATCH_v2.4",
    headline: "NEO-KYOTO SECTOR 4 LAUNCH & ZERO-G TOURNAMENT",
    badge: "Official Announcement",
    description: "The synthetic revolution arrives in Sector 4. Over 15,000 players have deployed on-chain nodes to claim territory. Read our full protocol postmortem and prize distributions.",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop",
    hotspots: [
      { x: "28%", y: "42%", label: "Sector 4 Zone", highlight: "Contested" },
      { x: "65%", y: "60%", label: "$150K Prize Pool", highlight: "USDC" },
    ],
    meta: [
      { label: "Author", value: "Nexus Dev Rel" },
      { label: "Date", value: "Today, 04:30 UTC" },
      { label: "Comments", value: "342 Discussions" },
    ],
  },
  {
    id: "guilds",
    title: "Guild Raids & Fleets",
    categoryTag: "Competitive Hub",
    icon: Swords,
    code: "SYNDICATE_DAO",
    headline: "ECLIPSE FLEET WARS: SEASON 2 QUALIFIERS",
    badge: "Active War",
    description: "Clan leaders can deploy their unified dreadnought armadas into contested deep space. Shared guild vaults automatically disburse smart-contract plunder upon victory.",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
    hotspots: [
      { x: "35%", y: "30%", label: "Dreadnought Flagship", highlight: "Lv.5" },
      { x: "70%", y: "70%", label: "Warp Gate Bravo", highlight: "Locked" },
    ],
    meta: [
      { label: "Registered Clans", value: "1,240 Teams" },
      { label: "Fleet Readiness", value: "98.4%" },
      { label: "Weekly Pool", value: "450K $NEXUS" },
    ],
  },
  {
    id: "governance",
    title: "Governance & Proposals",
    categoryTag: "On-Chain Voting",
    icon: Vote,
    code: "NIP-042",
    headline: "PROPOSAL: WEAPON CRAFTING FEE REVENUE DISTRIBUTION",
    badge: "Voting Closes in 18h",
    description: "Community vote on redirecting 40% of marketplace crafting gas fees into the player ecosystem reward pool and community tourney escrow accounts.",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop",
    hotspots: [
      { x: "40%", y: "50%", label: "Quorum", highlight: "82% YES" },
    ],
    meta: [
      { label: "Total Votes Cast", value: "4.8M Votes" },
      { label: "Threshold", value: "Passed" },
      { label: "Executor", value: "Timelock Contract" },
    ],
  },
  {
    id: "bounties",
    title: "Creator Bounties",
    categoryTag: "Modding & Rewards",
    icon: Gift,
    code: "BOUNTY_ACTIVE",
    headline: "COMMUNITY SKIN DESIGN & UE5 MAP CREATION CONTEST",
    badge: "$25,000 Pool",
    description: "Submit custom cyberpunk vehicle skins, weapon wraps, or custom PvP arenas via the Nexus Dev SDK. Community-approved mods earn permanent on-chain royalties.",
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1400&auto=format&fit=crop",
    hotspots: [
      { x: "50%", y: "45%", label: "SDK Access", highlight: "v3.1" },
      { x: "75%", y: "65%", label: "Royalty Split", highlight: "5% Direct" },
    ],
    meta: [
      { label: "Submissions", value: "184 Entries" },
      { label: "Deadline", value: "14 Days Left" },
      { label: "Format", value: ".fbx / UE5 Project" },
    ],
  },
];

interface EcosystemProps {
  onClose?: () => void;
}

interface BurstDot {
  id: string;
  color: string;
  originX: number;
  originY: number;
  waypoints: { x: number; y: number }[];
  duration: number;
  size: number;
}

const BURST_PALETTE = ["#22D3EE", "#A855F7", "#F472B6", "#FACC15", "#34D399", "#818CF8"];

export default function Ecosystem({ onClose }: EcosystemProps) {
  const [activeTab, setActiveTab] = useState<CommunityTab>(COMMUNITY_TABS[0]);
  const [selectedNode, setSelectedNode] = useState<string>("nexus-core");
  const [burstDots, setBurstDots] = useState<BurstDot[]>([]);
  const burstTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Static constellation of faint background dots — generated once, never re-randomized on re-render
  const scatterDots = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => {
      const isAccent = Math.random() < 0.22;
      return {
        id: i,
        x: Math.random() * 96 + 2,
        y: Math.random() * 94 + 3,
        size: isAccent ? Math.random() * 2.5 + 2.5 : Math.random() * 2 + 1.5,
        isAccent,
        delay: Math.random() * 3.5,
        duration: Math.random() * 2.5 + 2.5,
      };
    });
  }, []);

  const spawnBurst = (node: NodeData) => {
    const dots: BurstDot[] = Array.from({ length: 9 }).map((_, i) => {
      const waypoints = Array.from({ length: 3 }).map(() => ({
        x: Math.min(96, Math.max(4, node.x + (Math.random() - 0.5) * 84)),
        y: Math.min(94, Math.max(6, node.y + (Math.random() - 0.5) * 78)),
      }));
      return {
        id: `${node.id}-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
        color: Math.random() < 0.55 ? node.color : BURST_PALETTE[Math.floor(Math.random() * BURST_PALETTE.length)],
        originX: node.x,
        originY: node.y,
        waypoints,
        duration: Math.random() * 1.2 + 2.4,
        size: Math.random() * 2 + 2.5,
      };
    });

    setBurstDots((prev) => [...prev, ...dots]);

    const cleanupId = `cleanup-${node.id}-${Date.now()}`;
    burstTimers.current[cleanupId] = setTimeout(() => {
      setBurstDots((prev) => prev.filter((d) => !dots.some((nd) => nd.id === d.id)));
      delete burstTimers.current[cleanupId];
    }, 3600);
  };

  const handleNodeClick = (node: NodeData) => {
    setSelectedNode(node.id);
    spawnBurst(node);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0B0E]/98 backdrop-blur-3xl overflow-y-auto px-4 sm:px-8 md:px-16 lg:px-28 py-6 sm:py-10 text-white select-none">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
            <Network className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight">
              Nexus Ecosystem & Community Hub
            </h2>
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50">
              Synapse Node Network · Universal Player Protocol
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Ecosystem"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all text-white/70"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 2. Top Row: Node Network Graph (Left) + Gamer ID Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">
        {/* Left: Interactive Node Canvas */}
        <div className="lg:col-span-8 relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-3xl bg-[#0A0B10] border border-white/10 overflow-hidden">
          {/* Faint constellation of background dots */}
          <div className="absolute inset-0 pointer-events-none">
            {scatterDots.map((dot) => (
              <motion.span
                key={dot.id}
                className="absolute rounded-full"
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  width: dot.size,
                  height: dot.size,
                  backgroundColor: dot.isAccent ? "#A855F7" : "#94A3B8",
                }}
                animate={{ opacity: [0.15, dot.isAccent ? 0.9 : 0.55, 0.15] }}
                transition={{
                  duration: dot.duration,
                  delay: dot.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {CONNECTIONS.map((line, idx) => {
              const fromNode = NODES.find((n) => n.id === line.from);
              const toNode = NODES.find((n) => n.id === line.to);
              if (!fromNode || !toNode) return null;
              const isHighlight = selectedNode === line.from || selectedNode === line.to;

              return (
                <line
                  key={idx}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke={isHighlight ? fromNode.color : "rgba(255,255,255,0.18)"}
                  strokeWidth={isHighlight ? 1.4 : 1}
                  strokeDasharray="4 4"
                  style={isHighlight ? { filter: `drop-shadow(0 0 3px ${fromNode.color}80)` } : undefined}
                />
              );
            })}
          </svg>

          {/* Randomly drifting colour dots spawned on node click */}
          <AnimatePresence>
            {burstDots.map((dot) => (
              <motion.span
                key={dot.id}
                className="absolute rounded-full pointer-events-none z-30"
                style={{
                  width: dot.size,
                  height: dot.size,
                  backgroundColor: dot.color,
                  boxShadow: `0 0 6px ${dot.color}, 0 0 2px ${dot.color}`,
                  marginLeft: -dot.size / 2,
                  marginTop: -dot.size / 2,
                }}
                initial={{ left: `${dot.originX}%`, top: `${dot.originY}%`, opacity: 0, scale: 0 }}
                animate={{
                  left: [`${dot.originX}%`, ...dot.waypoints.map((w) => `${w.x}%`)],
                  top: [`${dot.originY}%`, ...dot.waypoints.map((w) => `${w.y}%`)],
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0, 1, 1, 1, 0.4],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: dot.duration, ease: "easeInOut", times: [0, 0.28, 0.55, 0.8, 1] }}
              />
            ))}
          </AnimatePresence>

          {/* Node Anchors */}
          {NODES.map((node) => {
            const isSelected = selectedNode === node.id;
            const Icon = node.icon;
            return (
              <button
                type="button"
                key={node.id}
                onClick={() => handleNodeClick(node)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute z-20 cursor-pointer focus:outline-none"
              >
                <motion.div
                  animate={{ scale: isSelected ? 1.06 : 1 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-2.5 sm:pr-3.5 py-1 rounded-full backdrop-blur-xl border whitespace-nowrap"
                  style={{
                    backgroundColor: isSelected ? `${node.color}33` : "rgba(255,255,255,0.06)",
                    borderColor: isSelected ? `${node.color}99` : "rgba(255,255,255,0.14)",
                    boxShadow: isSelected ? `0 0 16px ${node.color}55` : "none",
                  }}
                >
                  <span
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: node.color }}
                  >
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black/80" />
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white/90">
                    {node.label}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Right: Nexus Gamer ID Card */}
        <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 p-6 flex flex-col justify-between backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Nexus Universal ID
              </span>
              <span className="text-[10px] font-mono text-white/40">ID: 0x8F94...3A19</span>
            </div>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-display font-extrabold text-lg">
                NX
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                  CYBER_PILOT_01
                </h3>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Node Operator
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[9px] font-mono uppercase text-white/40 block">Global Rank</span>
                <span className="text-sm font-bold font-mono text-white">#142 Apex</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[9px] font-mono uppercase text-white/40 block">Synced Relics</span>
                <span className="text-sm font-bold font-mono text-cyan-400">28 Items</span>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider hover:bg-cyan-400 hover:text-black transition-all">
            <span>Manage Passport Vault</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Middle Section: Feature Rows (Left) & Focus Detail Card (Right) */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-4 h-[2px] bg-cyan-400 inline-block" />
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Community Matrix & Dispatches
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Tab Buttons with Shared Layout Highlight */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {COMMUNITY_TABS.map((tab, idx) => {
              const isActive = activeTab.id === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className="relative w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-transparent transition-colors duration-300 text-left focus:outline-none overflow-hidden group"
                >
                  {/* Gliding Shared Layout Highlight */}
                  {isActive ? (
                    <motion.div
                      layoutId="activeCommunityHighlight"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-400/60 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.25)] z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/25 z-0 transition-colors" />
                  )}

                  {/* Row Content */}
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isActive ? "bg-cyan-400 text-black" : "bg-white/10 text-white/70"
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span
                        className={`text-xs sm:text-sm font-bold uppercase tracking-wider block transition-colors ${isActive ? "text-white" : "text-white/80"
                          }`}
                      >
                        {tab.title}
                      </span>
                      <span className="text-[10px] font-mono text-white/40 block">
                        {tab.categoryTag}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`relative z-10 text-[10px] font-mono font-bold tracking-wider ${isActive ? "text-cyan-300" : "text-white/40"
                      }`}
                  >
                    {tab.code}
                  </span>
                </button>
              );
            })}

            {/* Quick Community Discord / Telegram Action Bar */}
            <div className="mt-2 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-black/40 to-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-300 block mb-0.5">
                  Synchronous Comms
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
                  Join 42,000+ Discord Pilots
                </span>
              </div>
              <button className="px-4 py-2 rounded-full bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                Launch
              </button>
            </div>
          </div>

          {/* Right Column: Cinematic Focus Content Card */}
          <div className="lg:col-span-7 rounded-3xl bg-white/5 border border-white/10 p-5 sm:p-7 backdrop-blur-xl relative overflow-hidden min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-between h-full"
              >
                {/* Header of Focus Card */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono uppercase tracking-widest font-bold">
                    {activeTab.badge}
                  </span>
                  <span className="text-[11px] font-mono text-white/40">
                    STATUS: REAL-TIME FEED
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight text-white mb-4 leading-tight">
                  {activeTab.headline}
                </h3>

                {/* Hero Media Container with Hotspots */}
                <div className="relative w-full h-44 sm:h-60 rounded-2xl overflow-hidden mb-5 border border-white/10 group">
                  <img
                    src={activeTab.imageUrl}
                    alt={activeTab.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Hotspots */}
                  {activeTab.hotspots.map((spot, idx) => (
                    <div
                      key={idx}
                      style={{ left: spot.x, top: spot.y }}
                      className="absolute z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/40 text-[10px] font-mono text-white shadow-lg animate-pulse"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{spot.label}</span>
                      {spot.highlight && (
                        <span className="text-cyan-300 border-l border-white/20 pl-1.5 font-bold">
                          {spot.highlight}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
                  {activeTab.description}
                </p>

                {/* Metrics & Action */}
                <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-white/10 mb-5">
                  {activeTab.meta.map((item, idx) => (
                    <div key={idx} className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-[8px] sm:text-[9px] font-mono uppercase text-white/40 block">
                        {item.label}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold font-mono text-white truncate block">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 rounded-full bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2">
                  <span>Open Full Dispatch & Join Thread</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 4. Bottom Ecosystem Quick Utilities */}
      <div className="border-t border-white/10 pt-8 pb-12">
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-mono uppercase tracking-widest text-white/50">
            Ecosystem Integrations & Community Pillars
          </span>
          <span className="text-[10px] font-mono text-cyan-400">4 ACTIVE CHANNELS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between">
            <MessageSquare className="w-5 h-5 text-cyan-400 mb-2" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase text-white">Community Chat</h4>
              <p className="text-[10px] text-white/50 font-mono">Discord & Matrix</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between">
            <Flame className="w-5 h-5 text-amber-400 mb-2" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase text-white">Tourney Arenas</h4>
              <p className="text-[10px] text-white/50 font-mono">Weekly Scrims</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between">
            <Boxes className="w-5 h-5 text-purple-400 mb-2" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase text-white">Asset Bridge</h4>
              <p className="text-[10px] text-white/50 font-mono">Cross-Game NFTs</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold uppercase text-white">Bug Bounties</h4>
              <p className="text-[10px] text-white/50 font-mono">Earn $NEXUS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

