"use client";

import React, { useState } from "react";
import { ShieldCheck, Gamepad2, Coins, Flame, Cpu, Terminal, ArrowRight, UserCheck } from "lucide-react";

export default function PlayerStudioBenefits() {
    const [activeAudience, setActiveAudience] = useState<"players" | "studios">("players");

    const PLAYER_BENEFITS = [
        {
            icon: Gamepad2,
            title: "Gasless Session Play",
            desc: "Fight, loot, and trade without interruptive wallet signatures. Ephemeral session keys handle real-time combat actions in the background.",
        },
        {
            icon: ShieldCheck,
            title: "Sovereign Asset Vault",
            desc: "In-game weapon skins, character loadouts, and achievements belong to your Gamer Passport—not locked inside walled studio databases.",
        },
        {
            icon: Coins,
            title: "Cross-Title Interoperability",
            desc: "Earn reputation and assets in one title that unlock cosmetic or tactical utilities across other verified Nexus publishing titles.",
        },
        {
            icon: Flame,
            title: "Zero-Bot Competitive Play",
            desc: "Deterministic 128Hz server rollbacks combined with client ZK proofs ensure match outcomes and leaderboards are verifiable and cheat-free.",
        },
    ];

    const STUDIO_BENEFITS = [
        {
            icon: Cpu,
            title: "C++ & C# Native SDKs",
            desc: "Drop-in plugins for Unreal Engine 5.4 and Unity 6. Integrate high-speed state synchronization directly into your existing game loop.",
        },
        {
            icon: Terminal,
            title: "Dedicated Rollup Chains",
            desc: "Spin up autonomous Layer-3 chains with customized gas tokens and sub-second transaction finality tailored for your game's transaction load.",
        },
        {
            icon: Coins,
            title: "Automated Royalty Splits",
            desc: "Programmable ERC-721C marketplace logic distributes secondary trade fees straight to developer treasuries and community creators.",
        },
        {
            icon: UserCheck,
            title: "140K+ Onboarded Players",
            desc: "Launch directly to an established ecosystem of verified gamer passports, reducing initial player acquisition costs.",
        },
    ];

    const items = activeAudience === "players" ? PLAYER_BENEFITS : STUDIO_BENEFITS;

    return (
        <section className="relative z-10 w-full py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
                        Network Utility Matrix
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-mono mt-4">
                        Value Built For The New Gaming Order
                    </h2>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center p-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 font-mono text-xs">
                    <button
                        onClick={() => setActiveAudience("players")}
                        className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all ${activeAudience === "players"
                            ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        For Players
                    </button>
                    <button
                        onClick={() => setActiveAudience("studios")}
                        className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all ${activeAudience === "studios"
                            ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        For Studios & Devs
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((benefit, idx) => {
                    const Icon = benefit.icon;
                    return (
                        <div
                            key={idx}
                            className="p-6 rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between group"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-mono text-sm font-bold uppercase text-white tracking-wide mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                                    {benefit.desc}
                                </p>
                            </div>

                            <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                                <span>PROTOCOL BENEFIT</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}