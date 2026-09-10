"use client";

import React, { useState } from "react";
import {
  Cpu,
  Search,
  Heart,
  Bell,
  User,
  Wallet,
  CheckCircle2,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import NavDropdown, { MenuItem } from "./NavDropdown";

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const NAV_ITEMS: MenuItem[] = [
  {
    title: "Games",
    submenu: [
      { title: "Neo-Kyoto: 2088", badge: "Live" },
      { title: "Valkyrie's Bane", badge: "Testnet" },
      { title: "Eclipse Horizon", badge: "Alpha" },
      { title: "Sector Zero", badge: "Live" },
      { title: "Abyssal Trench", badge: "Devnet" },
      { title: "Paradox Shift", badge: "Phase 3" },
    ],
  },
  {
    title: "Ecosystem",
    submenu: [
      { title: "Sovereign Gamer ID" },
      { title: "Guild DAO Governance" },
      { title: "Asset Bridge" },
    ],
  },
  {
    title: "Engine",
    submenu: [
      { title: "Spatial Multi-Server Mesh" },
      { title: "Game Dev SDK" },
      { title: "Validator Diagnostics", badge: "<15ms" },
    ],
  },
  {
    title: "Tokenomics",
  },
];

export default function Header({ activeTab = "Games", onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletToggle = () => {
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddress(null);
      return;
    }

    setIsConnecting(true);
    setTimeout(() => {
      setWalletAddress("0x7F2a...B49e");
      setWalletConnected(true);
      setIsConnecting(false);
    }, 600);
  };

  return (
    <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 pt-4 sm:pt-6 lg:pt-7 w-full">
      {/* 1. Left: Brand Studio Identity */}
      <div
        onClick={() => onTabChange?.("Games")}
        className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group flex-shrink-0"
      >
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center transition-all group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <Cpu className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-wider text-sm sm:text-base text-white font-mono leading-none">
              NEXUS
            </span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
              STUDIOS
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-zinc-400 tracking-tight font-normal mt-0.5">
            Next-Gen Gaming Network
          </span>
        </div>
      </div>

      {/* 2. Center: Desktop Nav with click-to-dismiss dropdowns */}
      <nav className="hidden xl:flex items-center gap-7 lg:gap-9">
        {NAV_ITEMS.map((item) => (
          <NavDropdown
            key={item.title}
            item={item}
            isActive={activeTab === item.title}
            onSelect={(title) => onTabChange?.(title)}
          />
        ))}
      </nav>

      {/* 3. Right: Network Status, Icons & Solid Connect Node */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-medium text-zinc-300 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Network Online</span>
        </div>

        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          onClick={() => onTabChange?.("Search")}
          className="p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 text-white/70 transition-all backdrop-blur-md"
        >
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Wishlist"
          onClick={() => onTabChange?.("Wishlist")}
          className={`flex p-2 sm:p-2.5 rounded-full border transition-all backdrop-blur-md ${activeTab === "Wishlist"
            ? "bg-rose-500/20 border-rose-400 text-rose-400"
            : "bg-white/5 border-white/10 hover:border-rose-400/50 hover:text-rose-400 text-white/70"
            }`}
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => onTabChange?.("Notifications")}
          className={`relative p-2 sm:p-2.5 rounded-full border transition-all backdrop-blur-md ${activeTab === "Notifications"
            ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
            : "bg-white/5 border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 text-white/70"
            }`}
        >
          <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        </button>

        {/* Account Profile */}
        <button
          type="button"
          aria-label="Account Profile"
          onClick={() => onTabChange?.("Account")}
          className={`p-2 sm:p-2.5 rounded-full border transition-all backdrop-blur-md ${activeTab === "Account"
            ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
            : "bg-white/5 border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-white/80"
            }`}
        >
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Solid Non-Transparent Connect Node Button */}
        <button
          type="button"
          onClick={handleWalletToggle}
          disabled={isConnecting}
          className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-mono text-xs font-bold tracking-tight transition-all duration-200 shadow-lg ${walletConnected
            ? "bg-zinc-900 border border-cyan-400 text-cyan-300 hover:border-red-500 hover:text-red-400"
            : "bg-cyan-400 border border-cyan-300 text-black hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            }`}
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Syncing...</span>
            </>
          ) : walletConnected ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{walletAddress}</span>
            </>
          ) : (
            <>
              <Wallet className="w-3.5 h-3.5 fill-black stroke-black" />
              <span>Connect Node</span>
            </>
          )}
        </button>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="xl:hidden p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 text-white/80 transition-all backdrop-blur-md ml-1"
        >
          {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>

      {/* 4. Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-3 p-5 sm:p-6 bg-[#0E1015]/95 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col gap-5 xl:hidden z-50 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <div key={item.title} className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    onTabChange?.(item.title);
                    if (!item.submenu) setMobileMenuOpen(false);
                  }}
                  className={`text-left text-xs sm:text-sm font-bold uppercase tracking-widest ${activeTab === item.title ? "text-cyan-400" : "text-white/80"
                    }`}
                >
                  {item.title}
                </button>

                {item.submenu && (
                  <div className="pl-3.5 flex flex-col gap-1.5 border-l border-white/10 mt-1">
                    {item.submenu.map((sub, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          onTabChange?.(sub.title);
                          setMobileMenuOpen(false);
                        }}
                        className="text-left text-[11px] sm:text-xs font-medium text-white/60 hover:text-cyan-300 py-1"
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-zinc-400 font-mono">Mesh Live</span>
            </div>

            <button
              type="button"
              onClick={() => {
                handleWalletToggle();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-bold font-mono uppercase tracking-wider"
            >
              <Wallet className="w-3.5 h-3.5 fill-black stroke-black" />
              <span>{walletConnected ? walletAddress : "Connect Node"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}