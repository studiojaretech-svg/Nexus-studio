"use client";

import React, { useState, useRef } from "react";
import { PROJECTS, Project } from "../data/projects";
import {
  Header,
  HeroHeadline,
  TechStackBanner,
  NetworkStats,
  PlayerStudioBenefits,
  StudioStory,
  StudioNews,
  Testimonials,
  PricingMatrix,
  ContactSection,
  CallToActionBanner,
  HomeFooter,
  CardDeck,
  MorphOverlay,
  GamesHub,
  Ecosystem,
  Engine,
  Tokenomics,
  Dashboard,
  type MorphState,
} from "../components";
import GameDetailModal from "../components/GameDetail/GameDetailModal";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Titles");
  const [isGlitching, setIsGlitching] = useState(false);

  const animFrameRef = useRef<number | null>(null);
  const currentProject = PROJECTS[currentIndex];

  const triggerMorph = (targetIdx: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    setIsGlitching(true);

    const turb = document.getElementById("glitchTurbulence");
    const disp = document.getElementById("glitchDisplacement");
    const startTime = performance.now();
    const duration = 850;
    let swapped = false;

    const animateDistortion = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (elapsed >= 450 && !swapped) {
        setCurrentIndex(targetIdx);
        swapped = true;
      }

      if (turb && disp) {
        const peak = Math.sin(progress * Math.PI);
        const currentScale = peak * 12;

        const freqX = 0.01 + peak * 0.02;
        const freqY = 0.15 + peak * 0.1;

        disp.setAttribute("scale", currentScale.toFixed(1));
        turb.setAttribute("baseFrequency", `${freqX} ${freqY}`);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animateDistortion);
      } else {
        setIsGlitching(false);
        if (disp) disp.setAttribute("scale", "0");
        if (turb) turb.setAttribute("baseFrequency", "0.01 0.15");
      }
    };

    animFrameRef.current = requestAnimationFrame(animateDistortion);
  };

  const handleCardSelect = (item: Project) => {
    if (isGlitching) return;
    const targetIdx = PROJECTS.findIndex((p) => p.id === item.id);
    if (targetIdx === currentIndex) return;

    triggerMorph(targetIdx);
  };

  const upcomingProjects = Array.from({ length: PROJECTS.length - 1 }, (_, i) => {
    const nextIdx = (currentIndex + 1 + i) % PROJECTS.length;
    return PROJECTS[nextIdx];
  });

  const [wishlistIds, setWishlistIds] = useState<number[]>([1, 2, 3]);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const handleToggleWishlist = (id: number) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const detailedProject = PROJECTS.find((p) => p.id === selectedGameId) || null;

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-[#0A0B0E] text-white flex flex-col font-sans">
      <div className="fixed top-0 left-0 w-2/3 h-[3px] bg-gradient-to-r from-cyan-400 via-cyan-400/50 to-transparent z-40" />

      {/* Hidden Procedural SVG Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="displacementGlitch" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              id="glitchTurbulence"
              type="fractalNoise"
              baseFrequency="0.01 0.15"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap
              id="glitchDisplacement"
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Soft Ambient Chroma & Scanline Overlay */}
      {isGlitching && (
        <div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden page-glitch-pass"
          aria-hidden="true"
        >
          <div className="glitch-chromatic chromatic-cyan" />
          <div className="glitch-chromatic chromatic-rose" />
          <div className="glitch-scanlines" />
        </div>
      )}

      {/* 1. HERO CAROUSEL STAGE (Full Viewport) */}
      <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden shrink-0 select-none">
        {/* Background Image confined to the Hero Stage */}
        <div
          className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${isGlitching ? "displace-active" : ""
            }`}
        >
          <img
            key={currentIndex}
            src={currentProject.image}
            alt={currentProject.title}
            className="w-full h-full object-cover bg-fade"
          />
        </div>

        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onOpenGameDetail={(id) => setSelectedGameId(id)}
        />

        {/* Hero Content Area */}
        <div
          className={`relative z-10 flex flex-col items-center flex-1 px-4 sm:px-8 md:px-16 lg:px-28 pb-8 lg:pb-12 ${isGlitching ? "displace-active" : ""
            }`}
        >
          <div className="flex-1 flex items-center justify-center w-full">
            <HeroHeadline currentProject={currentProject} currentIndex={currentIndex} />
          </div>

          <div className="w-full flex items-center justify-center overflow-visible mb-2">
            <CardDeck
              upcomingProjects={upcomingProjects}
              isMorphing={isGlitching}
              onSelect={handleCardSelect}
            />
          </div>
        </div>
      </div>

      {/* 2. LOWER HOME SECTIONS (Flows naturally on scroll) */}
      <TechStackBanner />
      <NetworkStats />
      <PlayerStudioBenefits />
      <StudioStory />
      <StudioNews />
      <Testimonials />
      <PricingMatrix />
      <ContactSection />
      <CallToActionBanner
        onEnterVault={() => setActiveTab("Games Hub")}
        onDeployNode={() => setActiveTab("Engine")}
      />
      <HomeFooter />

      {/* 3. OVERLAYS & MODALS */}
      {activeTab === "Games Hub" && (
        <GamesHub
          onClose={() => setActiveTab("Titles")}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectGame={(id: number) => setSelectedGameId(id)}
        />
      )}

      {activeTab === "Ecosystem" && (
        <Ecosystem onClose={() => setActiveTab("Titles")} />
      )}

      {activeTab === "Engine" && (
        <Engine onClose={() => setActiveTab("Titles")} />
      )}

      {activeTab === "Tokenomics" && (
        <Tokenomics onClose={() => setActiveTab("Titles")} />
      )}

      {/* Detail Overlay */}
      <GameDetailModal
        game={detailedProject}
        isOpen={selectedGameId !== null}
        isWishlisted={selectedGameId !== null && wishlistIds.includes(selectedGameId)}
        onClose={() => setSelectedGameId(null)}
        onToggleWishlist={handleToggleWishlist}
      />

      {activeTab === "Dashboard" && (
        <Dashboard
          userName="NIKITIN"
          onClose={() => setActiveTab("Titles")}
        />
      )}

      <style jsx global>{`
        /* Subtle organic displacement */
        .displace-active {
          filter: url(#displacementGlitch);
          will-change: filter;
          transform: translateZ(0);
        }

        /* Ambient Glitch Overlay (Muted Opacities) */
        .page-glitch-pass {
          animation: glitchPassFade 0.85s ease-out forwards;
        }

        @keyframes glitchPassFade {
          0% { opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { opacity: 0; }
        }

        .glitch-chromatic {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        /* Muted cyan sheen */
        .chromatic-cyan {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(6, 182, 212, 0.1) 30%,
            transparent 50%,
            rgba(6, 182, 212, 0.08) 75%,
            transparent 100%
          );
          animation: cyanWarp 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes cyanWarp {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-6px, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* Muted magenta sheen */
        .chromatic-rose {
          background: linear-gradient(
            to bottom,
            rgba(244, 63, 94, 0.08) 15%,
            transparent 45%,
            rgba(244, 63, 94, 0.1) 65%,
            transparent 90%
          );
          animation: roseWarp 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes roseWarp {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(6px, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* Ultra-light scanlines */
        .glitch-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.03) 0px,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px,
            transparent 3px
          );
          opacity: 0.35;
          animation: scanlineScroll 0.3s linear infinite;
        }

        @keyframes scanlineScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(6px); }
        }

        /* Smooth settle for image swap */
        @keyframes bgFadeIn {
          0% {
            opacity: 0.85;
            transform: scale(1.006);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .bg-fade {
          animation: bgFadeIn 0.35s ease-out both;
          will-change: opacity, transform;
          transform: translateZ(0);
        }

        /* Minimal text twitch during active glitch */
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
          opacity: 0;
        }

        .displace-active .glitch-layer::before {
          opacity: 0.5;
          left: 1.5px;
          text-shadow: -1px 0 #06b6d4;
          clip-path: inset(25% 0 45% 0);
          transform: translate3d(-1.5px, 0, 0);
        }

        .displace-active .glitch-layer::after {
          opacity: 0.5;
          left: -1.5px;
          text-shadow: 1px 0 #f43f5e;
          clip-path: inset(50% 0 20% 0);
          transform: translate3d(1.5px, 0, 0);
        }
      `}</style>
    </main>
  );
}