"use client";

import React from "react";
import { X, Trash2, Heart, ArrowRight, Sparkles } from "lucide-react";
import { Project } from "../../data/projects";

interface WishlistDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    wishlistedProjects: Project[];
    onRemoveItem: (id: number) => void;
    onViewAllWishlist?: () => void;
    onSelectGame?: (id: number) => void;
}

const CARD_THEMES = [
    {
        bgClass: "bg-[#a3e635]",
        textClass: "text-zinc-950",
        subTextClass: "text-zinc-800",
        insignia: "⚡",
    },
    {
        bgClass: "bg-[#2563eb]",
        textClass: "text-white",
        subTextClass: "text-blue-100",
        insignia: "🛡️",
    },
    {
        bgClass: "bg-[#8b5cf6]",
        textClass: "text-white",
        subTextClass: "text-purple-100",
        insignia: "🌀",
    },
    {
        bgClass: "bg-[#181920]",
        textClass: "text-white",
        subTextClass: "text-zinc-400",
        insignia: "🎮",
    },
];

export default function WishlistDrawer({
    isOpen,
    onClose,
    wishlistedProjects,
    onRemoveItem,
    onViewAllWishlist,
    onSelectGame,
}: WishlistDrawerProps) {
    if (!isOpen) return null;

    // Maximum of 4 items previewed in the slide-out menu
    const displayedProjects = wishlistedProjects.slice(0, 4);
    const remainingCount = Math.max(0, wishlistedProjects.length - 4);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-sm sm:max-w-md h-full bg-[#0E0F14] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300">
                {/* Top Header */}
                <div>
                    <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-xl font-black tracking-wider text-white uppercase font-mono">
                                WISHLIST
                            </h2>
                            <span className="text-xs text-zinc-400 font-mono">
                                {wishlistedProjects.length} saved {wishlistedProjects.length === 1 ? "game" : "games"}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 text-zinc-400 hover:text-white transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Wavy Stacked Cards (Max 4 items) */}
                    <div className="relative flex flex-col -space-y-7">
                        {displayedProjects.map((game, index) => {
                            const theme = CARD_THEMES[index % CARD_THEMES.length];

                            return (
                                <div
                                    key={game.id}
                                    onClick={() => {
                                        onSelectGame?.(game.id);
                                        onClose();
                                    }}
                                    className={`relative rounded-[28px] p-5 shadow-2xl transition-transform hover:-translate-y-1 cursor-pointer ${theme.bgClass}`}
                                    style={{ minHeight: "155px" }}
                                >
                                    <div className="w-10 h-1 bg-white/40 rounded-full mx-auto mb-3" />

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className={`font-black text-sm uppercase tracking-wide ${theme.textClass}`}>
                                                {game.title}
                                            </h3>
                                            <p className={`text-[11px] font-bold tracking-widest uppercase mt-0.5 ${theme.textClass}`}>
                                                {game.category}
                                            </p>

                                            <div className={`text-[10px] mt-4 space-y-0.5 ${theme.subTextClass}`}>
                                                <p>Status: {game.releaseStatus}</p>
                                                <p>Engine: {game.engine || "UE5"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-lg opacity-80">{theme.insignia}</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRemoveItem(game.id);
                                                }}
                                                className="w-7 h-7 rounded-full bg-rose-500/90 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                                                title="Remove from Wishlist"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {wishlistedProjects.length === 0 && (
                            <div className="py-20 text-center text-zinc-500 text-xs font-mono space-y-2">
                                <Heart className="w-8 h-8 mx-auto text-zinc-600 stroke-[1.5]" />
                                <p>Your wishlist is currently empty.</p>
                                <p className="text-[10px] text-zinc-600">Save games from Vault or Details.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Wishlist Bar */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                    {remainingCount > 0 && (
                        <p className="text-center text-xs font-mono text-zinc-400">
                            +{remainingCount} additional {remainingCount === 1 ? "game" : "games"} in your collection
                        </p>
                    )}

                    <div className="bg-[#15161E] rounded-2xl p-3 px-5 flex items-center justify-between border border-white/5">
                        <div className="flex items-baseline gap-2 font-mono">
                            <span className="text-xs text-zinc-400">Total Saved:</span>
                            <span className="text-base font-bold text-white">{wishlistedProjects.length}</span>
                        </div>

                        <button
                            onClick={() => {
                                onClose();
                                onViewAllWishlist?.();
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#a3e635] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#bef264] transition-all"
                        >
                            <span>View Full Wishlist</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}