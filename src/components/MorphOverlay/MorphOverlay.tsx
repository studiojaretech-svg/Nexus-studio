"use client";

import React from "react";

export interface MorphState {
  image: string;
  stage: "glitch" | "out";
}

interface MorphOverlayProps {
  morph: MorphState | null;
  onTransitionEnd: () => void;
}

export default function MorphOverlay({ morph, onTransitionEnd }: MorphOverlayProps) {
  if (!morph) return null;

  const isOut = morph.stage === "out";

  return (
    <div
      // onTransitionEnd only governs the final "out" fade (a real CSS
      // transition). The "glitch" stage is a CSS *animation* (keyframes),
      // which fires animationend, not transitionend — its stage change is
      // driven by a JS timer in page.tsx instead, matching how the old
      // grow/fade stages were handled.
      onTransitionEnd={onTransitionEnd}
      className={`fixed inset-0 z-20 overflow-hidden pointer-events-none transition-opacity ${
        isOut ? "opacity-0 duration-200 ease-out" : "opacity-100 duration-0"
      }`}
    >
      {/* Base layer: the incoming image, revealed via jittery clip-path banding */}
      <img
        src={morph.image}
        alt=""
        aria-hidden
        className="glitch-reveal absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Chromatic-aberration split layers, echoing the RGB-split wipe in the reference */}
      <img
        src={morph.image}
        alt=""
        aria-hidden
        className="glitch-split-r absolute inset-0 w-full h-full object-cover object-center"
      />
      <img
        src={morph.image}
        alt=""
        aria-hidden
        className="glitch-split-b absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Brief scanline flash for a "digital" texture during the reveal */}
      <div className="glitch-flash absolute inset-0" />

      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
