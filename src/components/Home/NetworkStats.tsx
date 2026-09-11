"use client";

import React from "react";
import { Activity, Zap, Users, Globe2 } from "lucide-react";

const STATS = [
    {
        icon: Activity,
        value: "128 Hz",
        label: "Continuous State Tick",
        sub: "Deterministic rollback engine",
    },
    {
        icon: Zap,
        value: "<12 ms",
        label: "Global Mesh Latency",
        sub: "Edge validator deployment",
    },
    {
        icon: Users,
        value: "142,000+",
        label: "Verified Gamer Passports",
        sub: "Cross-title sovereign identity",
    },
    {
        icon: Globe2,
        value: "$18.4M",
        label: "Total Value Bridged",
        sub: "Cross-rollup asset mesh",
    },
];

export default function NetworkStats() {
    return (
        <section className="relative z-10 w-full py-12 border-y border-white/10 bg-zinc-950/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {STATS.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx} className="flex flex-col space-y-2">
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <Icon className="w-4 h-4" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                                        Live Telemetry
                                    </span>
                                </div>
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-white">
                                    {stat.value}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-zinc-300 font-mono">{stat.label}</h4>
                                    <p className="text-[11px] text-zinc-500 font-light">{stat.sub}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}