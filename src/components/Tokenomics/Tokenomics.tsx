"use client";

import React, { useState } from "react";
import {
    X,
    Coins,
    ShieldCheck,
    Flame,
    Vote,
    Layers,
    Copy,
    Check,
    ExternalLink,
} from "lucide-react";

interface TokenomicsProps {
    onClose: () => void;
}

const ALLOCATIONS = [
    { label: "Player Incentives & Rewards", percent: 40, duration: "48-month linear emission", color: "bg-cyan-400" },
    { label: "Infrastructure & Node Operators", percent: 25, duration: "36-month validation schedule", color: "bg-indigo-400" },
    { label: "Studio Treasury & Grants", percent: 20, duration: "12-month cliff, 36-month vest", color: "bg-emerald-400" },
    { label: "Core Contributors & Advisors", percent: 15, duration: "24-month milestone unlock", color: "bg-rose-400" },
];

const UTILITIES = [
    {
        icon: Layers,
        title: "Rollup Gas Token",
        description: "Settles gas fees across all published Layer-3 game chains within the Nexus publishing network.",
    },
    {
        icon: ShieldCheck,
        title: "Validator Node Staking",
        description: "Operators stake $NEXUS to host physical multi-region server nodes and validate anti-cheat telemetry.",
    },
    {
        icon: Vote,
        title: "Quadratic DAO Governance",
        description: "Grants incubation capital to indie development teams seeking publishing funding through token voting.",
    },
    {
        icon: Flame,
        title: "Marketplace Fee Burn",
        description: "25% of all primary and secondary marketplace protocol fees are systematically bought back and burned.",
    },
];

export default function Tokenomics({ onClose }: TokenomicsProps) {
    const [copied, setCopied] = useState(false);
    const contractAddress = "0x4E92a3782E7C698D02194bCe3D8e7A2219FB318";

    const handleCopyContract = () => {
        navigator.clipboard.writeText(contractAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#0A0B0E]/95 backdrop-blur-2xl overflow-y-auto p-4 sm:p-8 lg:p-14 flex flex-col justify-between">
            {/* Top Header */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto mb-8 sm:mb-12">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        <Coins className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg sm:text-xl font-bold font-mono text-white uppercase tracking-wider">
                                $NEXUS Tokenomics Matrix
                            </h2>
                            <span className="text-[9px] font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded uppercase">
                                Deflationary Gas
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Protocol fuel powering validator consensus, player economies, and game publisher grants
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    aria-label="Close Tokenomics Overview"
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 text-white/70 hover:text-cyan-400 transition-all"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="w-full max-w-7xl mx-auto space-y-8 flex-1 my-auto">
                {/* Metric Overview Counters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10">
                        <span className="text-[11px] font-mono uppercase text-zinc-400">Total Fixed Supply</span>
                        <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">1,000,000,000</div>
                        <span className="text-[10px] text-zinc-500 mt-1 block">No unbacked mint authority</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10">
                        <span className="text-[11px] font-mono uppercase text-zinc-400">Network Staking Ratio</span>
                        <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 mt-1">64.2%</div>
                        <span className="text-[10px] text-zinc-500 mt-1 block">Active validator nodes</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10">
                        <span className="text-[11px] font-mono uppercase text-zinc-400">Quarterly Burn Rate</span>
                        <div className="text-xl sm:text-2xl font-bold font-mono text-rose-400 mt-1">1.42%</div>
                        <span className="text-[10px] text-zinc-500 mt-1 block">From marketplace buybacks</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10">
                        <span className="text-[11px] font-mono uppercase text-zinc-400">Circulating Supply</span>
                        <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">324.5M</div>
                        <span className="text-[10px] text-zinc-500 mt-1 block">Subject to vesting cliffs</span>
                    </div>
                </div>

                {/* Visual Allocation Segmented Progress Bar */}
                <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-300 font-bold uppercase tracking-wider">Token Distribution Model</span>
                        <span className="text-cyan-400">100% Fully Allocated</span>
                    </div>

                    <div className="w-full h-3 rounded-full overflow-hidden flex bg-zinc-800 gap-0.5">
                        {ALLOCATIONS.map((alloc) => (
                            <div
                                key={alloc.label}
                                style={{ width: `${alloc.percent}%` }}
                                className={`${alloc.color} h-full transition-all duration-500`}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                        {ALLOCATIONS.map((alloc) => (
                            <div key={alloc.label} className="text-xs">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`w-2 h-2 rounded-full ${alloc.color}`} />
                                    <span className="font-bold text-white font-mono">{alloc.percent}%</span>
                                </div>
                                <div className="text-zinc-300 font-medium">{alloc.label}</div>
                                <div className="text-[10px] text-zinc-500">{alloc.duration}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4 Utility Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {UTILITIES.map((utility) => {
                        const Icon = utility.icon;
                        return (
                            <div
                                key={utility.title}
                                className="p-5 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit mb-3">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-1.5">
                                        {utility.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {utility.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Contract Information */}
            <div className="w-full max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-500">OFFICIAL CONTRACT:</span>
                    <code className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">
                        {contractAddress}
                    </code>
                    <button
                        onClick={handleCopyContract}
                        className="p-1 hover:text-white text-zinc-400 transition-colors"
                        title="Copy Contract"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>

                <div className="flex items-center gap-4 text-zinc-400">
                    <a
                        href="https://etherscan.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                    >
                        <span>Arbiscan Explorer</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                    <span>STANDARD: ERC-20 COMPLIANT</span>
                </div>
            </div>
        </div>
    );
}