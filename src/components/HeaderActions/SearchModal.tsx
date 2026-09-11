"use client";

import React, { useState } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import { PROJECTS, Project } from "../../data/projects";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectProject: (id: number) => void;
}

export default function SearchModal({
    isOpen,
    onClose,
    onSelectProject,
}: SearchModalProps) {
    const [query, setQuery] = useState("");

    if (!isOpen) return null;

    const filtered = PROJECTS.filter(
        (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.genre.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            (p.engine && p.engine.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-xl bg-[#0E1015]/95 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 flex flex-col max-h-[75vh]">
                {/* Search Input Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3 w-full pr-4">
                        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search titles, engines, categories..."
                            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close Search"
                        className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Results List: Completely hidden native scrollbar */}
                <div className="overflow-y-auto mt-4 space-y-2.5 flex-1 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {filtered.map((game) => (
                        <div
                            key={game.id}
                            onClick={() => {
                                onSelectProject(game.id);
                                onClose();
                            }}
                            className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-cyan-950/20 border border-white/5 hover:border-cyan-400/40 transition-all cursor-pointer"
                        >
                            {/* Thumbnail + Details */}
                            <div className="flex items-center gap-3.5 min-w-0">
                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 relative">
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h4 className="text-xs sm:text-sm font-bold text-white uppercase font-mono truncate group-hover:text-cyan-300 transition-colors">
                                            {game.title}
                                        </h4>
                                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                                            {game.category}
                                        </span>
                                    </div>

                                    <p className="text-[11px] text-zinc-400 truncate font-mono">
                                        {game.genre} · {game.engine || "UE5"}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow Pill */}
                            <div className="flex items-center gap-2 pl-3 shrink-0">
                                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-cyan-400 transition-colors hidden sm:inline">
                                    View Detail
                                </span>
                                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-cyan-400 group-hover:text-black flex items-center justify-center transition-all text-zinc-400">
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="text-center py-12 font-mono text-xs text-zinc-500">
                            No matching titles found for "{query}"
                        </div>
                    )}
                </div>

                {/* Footer Meta */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2 shrink-0">
                    <span>{filtered.length} TITLES INDEXED</span>
                    <span>CLICK TO VIEW DETAILS</span>
                </div>
            </div>
        </div>
    );
}