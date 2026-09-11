"use client";

import React from "react";
import { Check } from "lucide-react";

interface PricingMatrixProps {
    onSelectTier?: (tier: string) => void;
}

const TIERS = [
    {
        name: "Explorer Node",
        tagline: "Free access for indie players & testers",
        price: "$0",
        period: "Forever free",
        badge: null,
        popular: false,
        features: [
            "Access to all Free-to-Play titles",
            "Sovereign Gamer Passport ID",
            "Community DAO voting rights",
            "Standard P2P matchmaking relay",
            "Web-based item inventory",
        ],
    },
    {
        name: "Studio Operator",
        tagline: "For competitive guilds & indie dev teams",
        price: "$99",
        period: "per node / month",
        badge: "MOST POPULAR",
        popular: true,
        features: [
            "Dedicated 128Hz server mesh allocation",
            "Unreal Engine 5.4 & Unity SDK access",
            "Gasless ERC-4337 session key relayer",
            "Zero-knowledge anti-cheat telemetry",
            "Priority seasonal weapon drops",
            "Direct developer Discord access",
        ],
    },
    {
        name: "Enterprise Guild",
        tagline: "For publishers & multi-game franchises",
        price: "$499",
        period: "custom settlement",
        badge: "AAA ENTERPRISE",
        popular: false,
        features: [
            "Custom sovereign Layer-3 rollup chain",
            "Whitelabel marketplace & asset bridge",
            "Sub-second settlement sequencer nodes",
            "24/7 dedicated protocol engineering team",
            "Custom tokenomics liquidity deployment",
            "SLA guaranteed 99.99% uptime",
        ],
    },
];

export default function PricingMatrix({ onSelectTier }: PricingMatrixProps) {
    return (
        <section className="relative z-10 w-full py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
                    Network Licensing & Tiers
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-mono mt-4">
                    Node & Developer Access
                </h2>
                <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-light">
                    Choose your protocol participation level. Scalable from independent players up to enterprise gaming studios.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {TIERS.map((tier) => (
                    <div
                        key={tier.name}
                        className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all ${tier.popular
                            ? "bg-zinc-900/90 border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.2)] md:-translate-y-2"
                            : "bg-zinc-900/40 border border-white/10 hover:border-white/20"
                            }`}
                    >
                        {tier.badge && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-400 text-black font-mono text-[9px] font-black uppercase tracking-wider shadow-md">
                                {tier.badge}
                            </div>
                        )}

                        <div>
                            <div className="mb-6">
                                <h3 className="text-lg font-bold font-mono uppercase text-white tracking-wide">
                                    {tier.name}
                                </h3>
                                <p className="text-xs text-zinc-400 mt-1 font-light">{tier.tagline}</p>
                            </div>

                            <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/10 font-mono">
                                <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                                <span className="text-xs text-zinc-500">{tier.period}</span>
                            </div>

                            <ul className="space-y-3.5 text-xs text-zinc-300 mb-8">
                                {tier.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => onSelectTier?.(tier.name)}
                            className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all ${tier.popular
                                ? "bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                                }`}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}