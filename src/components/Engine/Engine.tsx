"use client";

import React, { useState } from "react";
import {
    X,
    Cpu,
    Terminal,
    Activity,
    Zap,
    Code2,
    Copy,
    Check,
    ShieldAlert,
    Server,
    Download,
    ExternalLink,
} from "lucide-react";

interface EngineProps {
    onClose: () => void;
}

const TELEMETRY_NODES = [
    { region: "Tokyo (AP-East)", ping: "11.4 ms", status: "Nominal", load: "42%" },
    { region: "Frankfurt (EU-Central)", ping: "18.2 ms", status: "Nominal", load: "61%" },
    { region: "Virginia (US-East)", ping: "22.1 ms", status: "Nominal", load: "54%" },
    { region: "São Paulo (SA-East)", ping: "38.6 ms", status: "Optimal", load: "29%" },
];

const CODE_SNIPPET = `import { NexusMesh, RollupClient } from "@nexus-labs/engine-sdk";

// Initialize low-latency session client
const client = new RollupClient({
  network: "nexus-mainnet",
  subSecondFinality: true,
});

// Bind 128Hz state synchronization loop
const session = await NexusMesh.attachPlayerSession({
  playerId: "0x7F2a...B49e",
  gameId: "neo-kyoto-2088",
  tickRate: 128,
  zkValidation: true,
});

session.onStateDiff((patch) => {
  playerMesh.interpolateState(patch);
});`;

export default function Engine({ onClose }: EngineProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(CODE_SNIPPET);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#0A0B0E]/95 backdrop-blur-2xl overflow-y-auto p-4 sm:p-8 lg:p-14 flex flex-col justify-between">
            {/* Top Header */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto mb-8 sm:mb-12">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg sm:text-xl font-bold font-mono text-white uppercase tracking-wider">
                                Nexus HyperMesh Architecture
                            </h2>
                            <span className="text-[9px] font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded uppercase">
                                v2.4 Core
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Deterministic 128Hz networking, low-latency rollbacks, and zero-knowledge verification
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    aria-label="Close Engine Overview"
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 text-white/70 hover:text-cyan-400 transition-all"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="w-full max-w-7xl mx-auto space-y-8 flex-1 my-auto">
                {/* Live Telemetry Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {TELEMETRY_NODES.map((node) => (
                        <div
                            key={node.region}
                            className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                                <span>{node.region}</span>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                            <div className="flex items-baseline justify-between mt-2">
                                <span className="text-lg sm:text-xl font-bold font-mono text-white">
                                    {node.ping}
                                </span>
                                <span className="text-[10px] font-mono text-zinc-500">Load: {node.load}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Middle Section: Architecture Pillars & Terminal SDK */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: 3 Pillars */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-cyan-400/40 transition-all">
                            <div className="flex items-center gap-3 mb-2">
                                <Activity className="w-4 h-4 text-cyan-400" />
                                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                                    Deterministic Tick Engine
                                </h3>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Native C++ server meshes engineered for Unreal Engine 5.4 and Unity. Eliminates desync
                                across high-frequency inputs with deterministic state rollback.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-cyan-400/40 transition-all">
                            <div className="flex items-center gap-3 mb-2">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                                    Session Keys & Gasless Play
                                </h3>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                ERC-4337 smart contract account abstraction enables continuous micro-transactions
                                and inventory modifications without disruptive wallet popups during active combat.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-cyan-400/40 transition-all">
                            <div className="flex items-center gap-3 mb-2">
                                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                                    Zero-Knowledge Proof Verification
                                </h3>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Speedruns, match scoreboards, and anti-cheat constraints produce verifiable cryptographic
                                proofs on client machines before final settlement on Layer-3.
                            </p>
                        </div>
                    </div>

                    {/* Right: Embedded SDK Code Block */}
                    <div className="lg:col-span-6 rounded-2xl bg-black/60 border border-white/10 p-5 flex flex-col justify-between font-mono">
                        <div>
                            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Terminal className="w-4 h-4 text-cyan-400" />
                                    <span>quickstart-session.ts</span>
                                </div>
                                <button
                                    onClick={handleCopyCode}
                                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                            <span className="text-emerald-400">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy SDK</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <pre className="text-xs text-zinc-300 overflow-x-auto leading-relaxed scrollbar-thin">
                                <code>{CODE_SNIPPET}</code>
                            </pre>
                        </div>

                        <div className="pt-4 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-[11px] text-zinc-500">Node SDK v2.4.1 • UE5 Bridge Ready</span>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400 text-xs text-zinc-300 hover:text-cyan-400 transition-colors">
                                    <Download className="w-3.5 h-3.5" />
                                    <span>UE5 Plugin</span>
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-black text-xs font-bold font-mono tracking-tight hover:bg-cyan-300 transition-colors">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>Docs</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Meta */}
            <div className="w-full max-w-7xl mx-auto pt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>CONSENSUS TICK: 128 HZ CONTINUOUS</span>
                <span>PEER TOPOLOGY: DISTRIBUTED KADEMLIA</span>
            </div>
        </div>
    );
}