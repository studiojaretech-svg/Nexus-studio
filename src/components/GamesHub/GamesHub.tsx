"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "../../data/projects";
import {
  Search,
  Sparkles,
  Gamepad2,
  ExternalLink,
  Heart,
  Cpu,
  Calendar,
  X
} from "lucide-react";

interface GamesHubProps {
  onClose?: () => void;
  onSelectGame?: (projectId: number) => void;
  wishlistIds?: number[];
  onToggleWishlist?: (id: number) => void;
}
const GENRES = ["All", "Action RPG", "Dark Fantasy", "Sci-Fi", "FPS", "Survival", "Stealth"];


export default function GamesHub({
  onClose,
  onSelectGame,
  wishlistIds = [],
  onToggleWishlist,
}: GamesHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const handleToggle = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist?.(id);
  };

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.engine.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" ||
      project.category.toLowerCase().includes(selectedGenre.toLowerCase()) ||
      project.genre.toLowerCase().includes(selectedGenre.toLowerCase());

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0B0E]/95 backdrop-blur-2xl overflow-y-auto px-4 sm:px-8 md:px-16 lg:px-28 py-6 sm:py-10 text-white select-none">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
            <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              Nexus Studio Vault
            </h2>
            <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50">
              {PROJECTS.length} Registered Titles · Active Ecosystem
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Hub"
            className="p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all text-white/70"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 2. Ecosystem Telemetry Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
            Total Deployed Titles
          </span>
          <span className="font-display text-2xl sm:text-3xl font-extrabold text-cyan-400">
            06
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
            Engine Stack
          </span>
          <span className="font-display text-xl sm:text-2xl font-bold text-white/90">
            UE5 · Unity 6
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
            Decentralized Nodes
          </span>
          <span className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400">
            18,420
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
            Network Status
          </span>
          <span className="font-display text-xl sm:text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            ONLINE
          </span>
        </div>
      </div>

      {/* 3. Search & Genre Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, engine, or categories..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/80 transition-colors backdrop-blur-md"
          />
        </div>

        {/* Filter chips (scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${selectedGenre === genre
                ? "bg-cyan-400 text-black shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30"
                }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Responsive Game Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pb-16">
        {filteredProjects.map((project) => {
          const isWishlisted = wishlistIds.includes(project.id);

          return (
            <div
              key={project.id}
              onClick={() => onSelectGame?.(project.id)}
              className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer shadow-xl"
            >
              {/* Image banner */}
              <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-black/30" />

                {/* Release pill */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-cyan-300">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{project.releaseYear}</span>
                </div>

                {/* Wishlist toggle */}
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={(e) => handleToggle(project.id, e)}
                  className={`absolute top-3.5 right-3.5 p-2 rounded-full border backdrop-blur-md transition-all ${isWishlisted
                    ? "bg-rose-500/20 border-rose-400 text-rose-400"
                    : "bg-black/50 border-white/15 text-white/70 hover:text-rose-400"
                    }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${isWishlisted ? "fill-rose-400" : ""}`}
                  />
                </button>
              </div>

              {/* Body info */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-[#0E1015]/80">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-2.5 h-[1.5px] bg-cyan-400" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-2 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 mb-4 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-white/50 text-[11px] font-mono">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{project.engine}</span>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>View Title</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}