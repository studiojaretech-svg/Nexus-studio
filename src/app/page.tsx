"use client";

import React, { useState, useEffect } from "react";
import { PROJECTS, Project } from "../data/projects";
import {
  Header,
  HeroHeadline,
  CardDeck,
  MorphOverlay,
  GamesHub,
  Ecosystem,
  type MorphState,
} from "../components";

// Duration of the CSS keyframe glitch reveal in MorphOverlay's .glitch-reveal
// animation. Keep this in sync with the animation's duration below.
const GLITCH_DURATION_MS = 480;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Titles");

  const [morph, setMorph] = useState<MorphState | null>(null);

  const isMorphing = !!morph;
  const currentProject = PROJECTS[currentIndex];

  const triggerMorph = (targetIdx: number, image: string) => {
    setMorph({ image, stage: "glitch" });
    setCurrentIndex(targetIdx);
  };

  const handleCardSelect = (item: Project) => {
    if (isMorphing) return;
    const targetIdx = PROJECTS.findIndex((p) => p.id === item.id);
    if (targetIdx === currentIndex) return;

    triggerMorph(targetIdx, item.image);
  };

  const handleMorphTransitionEnd = () => {
    // Fires when the "out" opacity transition completes.
    setMorph((m) => (m && m.stage === "out" ? null : m));
  };

  // "glitch" is a CSS *animation* (fixed-duration keyframes), so it doesn't
  // fire a transitionend — advance it to "out" on a timer instead.
  useEffect(() => {
    if (morph && morph.stage === "glitch") {
      const t = setTimeout(() => {
        setMorph((m) => (m && m.stage === "glitch" ? { ...m, stage: "out" } : m));
      }, GLITCH_DURATION_MS);
      return () => clearTimeout(t);
    }
  }, [morph]);

  // Safety fallback in case onTransitionEnd doesn't fire.
  useEffect(() => {
    if (morph && morph.stage === "out") {
      const t = setTimeout(() => setMorph(null), 250);
      return () => clearTimeout(t);
    }
  }, [morph]);

  const upcomingProjects = Array.from({ length: PROJECTS.length - 1 }, (_, i) => {
    const nextIdx = (currentIndex + 1 + i) % PROJECTS.length;
    return PROJECTS[nextIdx];
  });

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0A0B0E] text-white select-none flex flex-col justify-between font-sans">
      <div className="absolute top-0 left-0 w-2/3 h-[3px] bg-gradient-to-r from-cyan-400 via-cyan-400/50 to-transparent z-30" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          key={currentIndex}
          src={currentProject.image}
          alt={currentProject.title}
          className="bg-fade w-full h-full object-cover"
        />
      </div>

      <Header />

      <div className="relative z-10 flex flex-col items-center flex-1 px-4 sm:px-8 md:px-16 lg:px-28 pb-8 lg:pb-12">
        <div className="flex-1 flex items-center justify-center w-full">
          <HeroHeadline currentProject={currentProject} currentIndex={currentIndex} />
        </div>

        <div className="w-full flex items-center justify-center overflow-visible mb-2">
          <CardDeck
            upcomingProjects={upcomingProjects}
            isMorphing={isMorphing}
            onSelect={handleCardSelect}
          />
        </div>
      </div>

      <MorphOverlay morph={morph} onTransitionEnd={handleMorphTransitionEnd} />

      {activeTab === "Games Hub" && (
        <GamesHub
          onClose={() => setActiveTab("Titles")}
          onSelectGame={(id: number) => {
            const targetIdx = PROJECTS.findIndex((p) => p.id === id);
            if (targetIdx !== -1) setCurrentIndex(targetIdx);
            setActiveTab("Titles");
          }}
        />
      )}

      {activeTab === "Ecosystem" && (
        <Ecosystem onClose={() => setActiveTab("Titles")} />
      )}

      <style jsx global>{`
        @keyframes glitchSkew {
          0% {
            transform: skew(0deg);
            opacity: 0;
          }
          10% {
            transform: skew(-4deg);
            opacity: 0.8;
          }
          20% {
            transform: skew(4deg);
            opacity: 0.4;
          }
          30% {
            transform: skew(-2deg);
            opacity: 1;
          }
          40% {
            transform: skew(1deg);
          }
          100% {
            transform: skew(0deg);
            opacity: 1;
          }
        }

        @keyframes glitchClipTop {
          0% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(-3px, -2px);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
            transform: translate(2px, 2px);
          }
          40% {
            clip-path: inset(10% 0 85% 0);
            transform: translate(-2px, 2px);
          }
          60% {
            clip-path: inset(80% 0 5% 0);
            transform: translate(3px, -1px);
          }
          80% {
            clip-path: inset(25% 0 58% 0);
            transform: translate(-1px, -2px);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0, 0);
          }
        }

        @keyframes glitchClipBottom {
          0% {
            clip-path: inset(25% 0 58% 0);
            transform: translate(3px, 2px);
          }
          25% {
            clip-path: inset(75% 0 10% 0);
            transform: translate(-2px, -2px);
          }
          50% {
            clip-path: inset(12% 0 80% 0);
            transform: translate(2px, -1px);
          }
          75% {
            clip-path: inset(85% 0 2% 0);
            transform: translate(-3px, 2px);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0, 0);
          }
        }

        .glitch-active {
          animation: glitchSkew 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .glitch-layer {
          position: relative;
        }

        .glitch-layer::before,
        .glitch-layer::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .glitch-layer::before {
          left: 2px;
          text-shadow: -2px 0 #06b6d4;
          animation: glitchClipTop 0.4s steps(2, start) both;
        }

        .glitch-layer::after {
          left: -2px;
          text-shadow: -2px 0 #f43f5e;
          animation: glitchClipBottom 0.4s steps(2, start) both;
        }

        @keyframes bgGlitchIn {
          0% {
            opacity: 0;
            filter: contrast(180%) brightness(150%) hue-rotate(90deg);
            transform: scale(1.04) translate(-4px, 2px);
          }
          20% {
            opacity: 0.6;
            filter: contrast(140%) brightness(80%) hue-rotate(-45deg);
            transform: scale(1.02) translate(4px, -2px);
          }
          40% {
            opacity: 0.8;
            filter: contrast(120%) brightness(110%);
            transform: scale(1.01) translate(-2px, 0);
          }
          100% {
            opacity: 1;
            filter: contrast(100%) brightness(100%) hue-rotate(0deg);
            transform: scale(1) translate(0, 0);
          }
        }

        .bg-fade {
          animation: bgGlitchIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* --- Fullscreen transition glitch (MorphOverlay) --- */

        @keyframes glitchReveal {
          0% {
            clip-path: inset(0 0 100% 0);
            opacity: 0;
            transform: translate(0, 0) scale(1.02);
          }
          8% {
            clip-path: inset(60% 0 10% 0);
            opacity: 1;
            transform: translate(-6px, 0) scale(1.02);
          }
          16% {
            clip-path: inset(10% 0 70% 0);
            transform: translate(5px, -2px) scale(1.015);
          }
          24% {
            clip-path: inset(75% 0 5% 0);
            transform: translate(-4px, 2px) scale(1.01);
          }
          32% {
            clip-path: inset(20% 0 55% 0);
            transform: translate(3px, 0) scale(1.01);
          }
          40% {
            clip-path: inset(85% 0 2% 0);
            transform: translate(-2px, -1px) scale(1.005);
          }
          50% {
            clip-path: inset(5% 0 40% 0);
            transform: translate(2px, 1px);
          }
          62% {
            clip-path: inset(50% 0 15% 0);
            transform: translate(-1px, 0);
          }
          75% {
            clip-path: inset(15% 0 60% 0);
            transform: translate(1px, 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }

        .glitch-reveal {
          animation: glitchReveal 0.48s steps(1, end) both;
        }

        @keyframes glitchSplitR {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            transform: translate(8px, -3px);
            opacity: 0.7;
          }
          30% {
            transform: translate(-6px, 2px);
            opacity: 0.55;
          }
          50% {
            transform: translate(4px, -1px);
            opacity: 0.45;
          }
          70% {
            transform: translate(-3px, 1px);
            opacity: 0.25;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0;
          }
        }

        @keyframes glitchSplitB {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            transform: translate(-8px, 3px);
            opacity: 0.7;
          }
          30% {
            transform: translate(6px, -2px);
            opacity: 0.55;
          }
          50% {
            transform: translate(-4px, 1px);
            opacity: 0.45;
          }
          70% {
            transform: translate(3px, -1px);
            opacity: 0.25;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0;
          }
        }

        .glitch-split-r {
          mix-blend-mode: screen;
          filter: brightness(1.2) saturate(2) hue-rotate(-40deg);
          animation: glitchSplitR 0.48s steps(1, end) both;
        }

        .glitch-split-b {
          mix-blend-mode: screen;
          filter: brightness(1.2) saturate(2) hue-rotate(140deg);
          animation: glitchSplitB 0.48s steps(1, end) both;
        }

        @keyframes glitchFlash {
          0%,
          100% {
            opacity: 0;
          }
          5%,
          15% {
            opacity: 0.5;
          }
          10% {
            opacity: 0;
          }
        }

        .glitch-flash {
          background: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.15) 0px,
            rgba(255, 255, 255, 0.15) 2px,
            transparent 2px,
            transparent 4px
          );
          animation: glitchFlash 0.48s steps(1, end) both;
        }
      `}</style>
    </main>
  );
}
