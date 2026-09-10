"use client";

import React from "react";
import { Project } from "../../data/projects";

interface HeroHeadlineProps {
  currentProject: Project;
  currentIndex: number;
}

export default function HeroHeadline({ currentProject, currentIndex }: HeroHeadlineProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <div key={`eyebrow-${currentIndex}`} className="glitch-active flex flex-col items-center gap-2 mb-5">
        <span className="w-6 h-[2px] bg-cyan-400 inline-block" />
        <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/80">
          {currentProject.genre}
        </span>
      </div>

      <h1
        key={`title-${currentIndex}`}
        data-text={currentProject.title}
        className="glitch-active glitch-layer font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight uppercase leading-[0.9] mb-6 drop-shadow-2xl"
      >
        {currentProject.title}
      </h1>

      <p
        key={`desc-${currentIndex}`}
        className="glitch-active text-xs sm:text-sm text-white/90 leading-relaxed max-w-md mb-8 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
      >
        {currentProject.description}
      </p>

      <div key={`cta-${currentIndex}`} className="glitch-active flex items-center justify-center gap-4">
        <button className="px-8 py-3.5 bg-cyan-400 text-black text-xs font-bold tracking-[0.18em] uppercase rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.5)]">
          Play Trailer
        </button>
        <button className="px-8 py-3.5 bg-transparent border border-white/30 text-xs font-bold tracking-[0.18em] uppercase rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm">
          Discover Title
        </button>
      </div>
    </div>
  );
}