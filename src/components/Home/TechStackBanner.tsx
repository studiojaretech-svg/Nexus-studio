"use client";

import React from "react";
import { Layers, Cpu, Shield, Globe, Zap, Box } from "lucide-react";

const PARTNERS = [
    { name: "Unreal Engine 5.4", category: "Graphics Core", icon: Box },
    { name: "Unity 6", category: "Cross-Platform", icon: Cpu },
    { name: "Arbitrum Orbit", category: "L3 Rollup Mesh", icon: Layers },
    { name: "Celestia DA", category: "Data Availability", icon: Globe },
    { name: "AWS GameLift", category: "Spatial Fleet", icon: Zap },
    { name: "ERC-4337 Relayer", category: "Account Abstraction", icon: Shield },
];

export default function TechStackBanner() {
    return (
        <section className="relative z-10 w-full py-10 border-b border-white/10 bg-[#07080A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-zinc-500 mb-8">
                    Powered by Industry-Standard Gaming & Rollup Infrastructure
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {PARTNERS.map((partner) => {
                        const Icon = partner.icon;
                        return (
                            <div
                                key={partner.name}
                                className="group p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/40 hover:bg-cyan-950/10 transition-all flex flex-col items-center text-center justify-center space-y-2"
                            >
                                <Icon className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                                <div>
                                    <h4 className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                                        {partner.name}
                                    </h4>
                                    <span className="text-[9px] font-mono text-zinc-500">
                                        {partner.category}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}