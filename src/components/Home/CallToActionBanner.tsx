"use client";

import React from "react";
import { ArrowRight, Shield, Zap, Sparkles } from "lucide-react";

interface CallToActionBannerProps {
    onEnterVault?: () => void;
    onDeployNode?: () => void;
}

export default function CallToActionBanner({
    onEnterVault,
    onDeployNode,
}: CallToActionBannerProps) {
    return (
        <section className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="relative max-w-7xl mx-auto rounded-[36px] bg-gradient-to-r from-cyan-950/60 via-zinc-900/90 to-blue-950/60 border border-cyan-500/30 p-8 sm:p-14 lg:p-16 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Glow Accents */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-2xl text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Zero Signatures. True Sovereignty.</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-mono text-white tracking-tight leading-tight">
                        Ready to Enter the Sovereign Gaming Matrix?
                    </h2>

                    <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                        Claim your Sovereign Gamer Passport, play testnet titles gas-free, or deploy your node onto the Nexus 128Hz decentralized network.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
                    <button
                        onClick={onEnterVault}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105"
                    >
                        <span>Launch Game Vault</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                        onClick={onDeployNode}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400 text-white font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md"
                    >
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span>Deploy Node</span>
                    </button>
                </div>
            </div>
        </section>
    );
}