"use client";

import React from "react";
import { ShieldCheck, Cpu, Layers } from "lucide-react";

const PILLARS = [
    {
        icon: ShieldCheck,
        title: "Sovereign Asset Ownership",
        description:
            "All skins, loadouts, and achievements are minted on ERC-721C and ERC-6551 standards. Players retain absolute custody—transferable across network titles without studio permission.",
    },
    {
        icon: Cpu,
        title: "Unreal Engine & Unity Native",
        description:
            "Direct C++ and C# SDK integration. No webview hacks or slow browser wrappers. Native multithreaded networking optimized for high-fidelity PC and console deployments.",
    },
    {
        icon: Layers,
        title: "Gasless Session Abstraction",
        description:
            "Zero wallet popups during active gameplay. Ephemeral session keys allow seamless combat transactions, inventory upgrades, and matchmaking with zero cryptographic interruptions.",
    },
];

export default function StudioStory() {
    return (
        <section className="relative z-10 w-full py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
                        Publishing Infrastructure
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-mono mt-4">
                        Engineered For AAA Scale
                    </h2>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-light leading-relaxed">
                    Nexus Studios bridges high-budget game production with decentralized rollups—eliminating bot fraud, desyncs, and speculative friction.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PILLARS.map((pillar, idx) => {
                    const Icon = pillar.icon;
                    return (
                        <div
                            key={idx}
                            className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between group"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold font-mono text-white mb-3 tracking-wide uppercase">
                                    {pillar.title}
                                </h3>
                                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                                    {pillar.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
                                <span>PROTOCOL COMPLIANT</span>
                                <span className="text-cyan-400">READY</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}