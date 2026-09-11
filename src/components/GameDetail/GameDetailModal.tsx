"use client";

import React from "react";
import { Project } from "../../data/projects";
import {
    X,
    Heart,
    Calendar,
    Cpu,
    ShieldCheck,
    Zap,
    Activity,
    Layers,
    ArrowRight,
} from "lucide-react";

interface GameDetailModalProps {
    game: Project | null;
    isOpen: boolean;
    isWishlisted: boolean;
    onClose: () => void;
    onToggleWishlist: (id: number) => void;
}

export default function GameDetailModal({
    game,
    isOpen,
    isWishlisted,
    onClose,
    onToggleWishlist,
}: GameDetailModalProps) {
    if (!isOpen || !game) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10">
            <div
                className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity animate-in fade-in"
                onClick={onClose}
            />

            <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0A0B0E] border border-white/10 rounded-3xl shadow-2xl z-10 custom-scrollbar animate-in zoom-in-95 duration-200">
                {/* Hero Visual Header */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
                    <img
                        src={game.heroImage || game.image}
                        alt={game.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/40 to-transparent" />

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 border border-white/10 hover:border-cyan-400 text-white/70 hover:text-cyan-400 transition-all backdrop-blur-md"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Title & Category Header Info */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                                    {game.category}
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                                    {game.releaseStatus}
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-mono">
                                {game.title}
                            </h1>
                            <p className="text-xs sm:text-sm text-cyan-300 font-mono mt-1">
                                {game.subtitle} · {game.genre}
                            </p>
                        </div>

                        {/* Wishlist CTA Button */}
                        <button
                            type="button"
                            onClick={() => onToggleWishlist(game.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg backdrop-blur-md ${isWishlisted
                                ? "bg-rose-500/20 border border-rose-400 text-rose-300 hover:bg-rose-500/30"
                                : "bg-white/10 border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400"
                                }`}
                        >
                            <Heart
                                className={`w-4 h-4 ${isWishlisted ? "fill-rose-400 text-rose-400" : ""}`}
                            />
                            <span>{isWishlisted ? "In Wishlist" : "Add to Wishlist"}</span>
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 space-y-8">
                    {/* Description */}
                    <div>
                        <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                            Overview
                        </h3>
                        <p className="text-sm text-zinc-300 leading-relaxed font-light">
                            {game.description}
                        </p>
                    </div>

                    {/* Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Peak TPS</span>
                            <span className="text-base sm:text-lg font-bold font-mono text-cyan-400">
                                {game.metrics?.tpsPeak || "4,820 TPS"}
                            </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Active Nodes</span>
                            <span className="text-base sm:text-lg font-bold font-mono text-white">
                                {game.metrics?.activeNodes || "1,240"}
                            </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase block">24h Settlement</span>
                            <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                                {game.metrics?.volume24h || "$1.4M"}
                            </span>
                        </div>
                    </div>

                    {/* Engine Specs */}
                    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-cyan-400" />
                            <span>Technical Specifications</span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                            <div>
                                <span className="text-zinc-500 block text-[10px]">Engine</span>
                                <span className="text-zinc-300">{game.specs?.engine || game.engine}</span>
                            </div>
                            <div>
                                <span className="text-zinc-500 block text-[10px]">Architecture</span>
                                <span className="text-zinc-300">{game.specs?.architecture || "L3 Rollup"}</span>
                            </div>
                            <div>
                                <span className="text-zinc-500 block text-[10px]">Tick Rate</span>
                                <span className="text-zinc-300">{game.specs?.tickRate || "128 Hz"}</span>
                            </div>
                            <div>
                                <span className="text-zinc-500 block text-[10px]">Contract</span>
                                <span className="text-zinc-300">{game.contractStandard || "ERC-721C"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}