"use client";

import React from "react";
import { Project } from "../../data/projects";

interface CardDeckProps {
  upcomingProjects: Project[];
  isMorphing: boolean;
  onSelect: (item: Project) => void;
}

export default function CardDeck({
  upcomingProjects,
  isMorphing,
  onSelect,
}: CardDeckProps) {
  return (
    <div className="flex items-start justify-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto overflow-y-visible w-full max-w-4xl mx-auto no-scrollbar px-2 py-1">
      {upcomingProjects.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          className={`group flex flex-col items-center gap-2.5 flex-shrink-0 ${
            isMorphing ? "pointer-events-none" : "cursor-pointer"
          }`}
        >
          {/* Circular thumbnail — no longer needs a ref: the transition is
              now a fullscreen glitch reveal, not a position-based morph */}
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-cyan-400/70 transition-all duration-300 group-hover:-translate-y-1.5 shadow-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Accent badge, echoing the ring indicator in the reference */}
            <span className="absolute -top-1 -left-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-cyan-400 border-2 border-[#0A0B0E] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-black" />
            </span>
          </div>

          {/* Label */}
          <div className="text-center max-w-[110px]">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <span className="w-2.5 h-[1.5px] bg-cyan-400 inline-block" />
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-white/60 truncate">
                {item.category}
              </span>
            </div>
            <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-tight text-white leading-tight truncate">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
