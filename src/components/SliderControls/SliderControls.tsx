"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderControlsProps {
  currentIndex: number;
  progress: number;
  isMorphing: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function SliderControls({
  currentIndex,
  progress,
  isMorphing,
  onPrev,
  onNext,
}: SliderControlsProps) {
  return (
    <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 px-16 lg:px-32 pb-14">
      <div className="hidden lg:block lg:col-span-5" />
      <div className="lg:col-span-7 flex items-center gap-6">
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onPrev}
            disabled={isMorphing}
            aria-label="Previous Slide"
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:border-cyan-400 hover:bg-white/10 transition-all backdrop-blur-md disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            disabled={isMorphing}
            aria-label="Next Slide"
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:border-cyan-400 hover:bg-white/10 transition-all backdrop-blur-md disabled:opacity-40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-12 h-10 overflow-hidden flex-shrink-0 pl-2">
          <div
            key={`counter-${currentIndex}`}
            className="roll-number font-display text-4xl font-bold tracking-tight text-white/95"
          >
            {String(currentIndex + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}