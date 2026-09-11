"use client";

import React, { useState } from "react";
import {
    Home as HomeIcon,
    Gamepad2,
    Gift,
    Tv,
    Moon,
    ShoppingBag,
    Plus,
    Search,
    Bell,
    ChevronRight,
    Play,
    Share2,
    Pause,
    X,
    Flame,
    Users,
    MessageSquare,
    ArrowRight,
} from "lucide-react";

interface DashboardProps {
    userName?: string;
    onClose?: () => void;
}

const SIDEBAR_ICONS = [
    { icon: HomeIcon, active: true },
    { icon: Gamepad2, active: false },
    { icon: Gift, active: false },
    { icon: Tv, active: false },
    { icon: Moon, active: false },
    { icon: ShoppingBag, active: false },
];

const SIDE_GAMES = [
    {
        title: "Unravel 2",
        subtitle: "(Standard Edition + Starter Pass)",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=120&q=80",
    },
    {
        title: "Subway Surf",
        subtitle: "Endless Runner",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=120&q=80",
    },
    {
        title: "Red Dead Redemption 3",
        subtitle: "(Premium Pack)",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=120&q=80",
    },
];

const FRIENDS = [
    { name: "Alex", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80", status: "In Game" },
    { name: "Sarah", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", status: "Online" },
    { name: "Dmitri", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80", status: "Offline" },
    { name: "Kaito", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80", status: "In Game" },
    { name: "Elena", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80", status: "Online" },
];

export default function Dashboard({
    userName = "NIKITIN",
    onClose,
}: DashboardProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [downloadPaused, setDownloadPaused] = useState(false);

    return (
        <div className="fixed inset-0 z-50 bg-[#140A0D]/90 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 lg:p-6 select-none font-sans overflow-hidden">
            {/* Outer Dashboard Shell */}
            <div className="relative w-full max-w-[1400px] h-[95vh] max-h-[920px] bg-[#221216] border border-white/5 rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex overflow-hidden">

                {/* ========================================================================= */}
                {/* 1. LEFT NAVIGATION RAIL */}
                {/* ========================================================================= */}
                <aside className="w-16 sm:w-20 bg-[#1B0C10] flex flex-col items-center justify-between py-6 shrink-0 border-r border-white/5">
                    {/* Top Brand Glyph */}
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E64C4C] to-[#8C2028] flex items-center justify-center shadow-lg shadow-rose-950/40 cursor-pointer">
                        <span className="font-extrabold text-white text-base tracking-tighter">N</span>
                    </div>

                    {/* Navigation Icon Suite */}
                    <div className="flex flex-col items-center gap-5 my-auto">
                        {SIDEBAR_ICONS.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={idx}
                                    className={`relative p-3 rounded-2xl transition-all ${item.active
                                        ? "bg-[#E64C4C] text-white shadow-[0_0_20px_rgba(230,76,76,0.6)]"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            );
                        })}
                    </div>

                    {/* Bottom Add Action */}
                    <button className="w-10 h-10 rounded-2xl bg-[#2A171B] border border-white/10 hover:border-[#E64C4C] text-white/60 hover:text-[#E64C4C] flex items-center justify-center transition-all">
                        <Plus className="w-4 h-4" />
                    </button>
                </aside>

                {/* ========================================================================= */}
                {/* 2. MAIN DASHBOARD STAGE */}
                {/* ========================================================================= */}
                <main className="flex-1 flex flex-col overflow-y-auto px-6 lg:px-8 py-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {/* Top Bar Greeting & Search */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                                Good evening, <span className="uppercase text-white font-black">{userName}</span>
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Pill Search Input */}
                            <div className="relative w-48 sm:w-72 lg:w-96">
                                <Search className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search"
                                    className="w-full pl-11 pr-4 py-2 rounded-full bg-[#1B0D11] border border-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E64C4C]/60 transition-all"
                                />
                            </div>

                            {/* Utility Badges */}
                            <button className="p-2.5 rounded-full bg-[#1B0D11] border border-white/5 text-white/60 hover:text-white hover:border-[#E64C4C] transition-all">
                                <ShoppingBag className="w-4 h-4" />
                            </button>
                            <button className="relative p-2.5 rounded-full bg-[#1B0D11] border border-white/5 text-white/60 hover:text-white hover:border-[#E64C4C] transition-all">
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E64C4C]" />
                            </button>

                            {/* Exit/Back to Home */}
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all ml-2"
                                    title="Close Dashboard"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Upper Section: Big Hero + Side Game Column */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-7">
                        {/* Coral Hero Card */}
                        <div className="lg:col-span-8 relative rounded-[32px] bg-gradient-to-br from-[#E25555] via-[#D34747] to-[#B33535] p-6 sm:p-8 overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[290px] shadow-xl">
                            {/* Abstract decorative ambient backdrop waves */}
                            <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

                            {/* Hero Game Character Render Overhang */}
                            <img
                                src="https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=600&q=80"
                                alt="Valorant Character"
                                className="absolute -right-4 -bottom-6 w-60 sm:w-80 md:w-96 h-auto object-contain pointer-events-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                            />

                            <div className="relative z-10 max-w-sm sm:max-w-md">
                                {/* Popular Pill */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFEAE0] text-[#B83737] text-[11px] font-bold shadow-sm mb-4">
                                    <Flame className="w-3.5 h-3.5 fill-[#B83737]" />
                                    <span>Popular</span>
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                                    Valorant
                                </h2>

                                {/* Blurb */}
                                <p className="text-xs text-white/85 leading-relaxed line-clamp-3 mb-6 font-normal">
                                    Valorant is a tactical hero shooter game developed and published by Riot Games.
                                    Play with precision gunplay and adaptive agent abilities across global servers.
                                </p>

                                {/* Avatars Stack & Reviews */}
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <img
                                            className="w-7 h-7 rounded-full border-2 border-[#D34747] object-cover"
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                                            alt="user"
                                        />
                                        <img
                                            className="w-7 h-7 rounded-full border-2 border-[#D34747] object-cover"
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                                            alt="user"
                                        />
                                        <img
                                            className="w-7 h-7 rounded-full border-2 border-[#D34747] object-cover"
                                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                                            alt="user"
                                        />
                                    </div>
                                    <span className="text-[11px] font-semibold text-white/90 bg-black/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                                        👍 +53 Reviews
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Game Rows */}
                        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
                            {SIDE_GAMES.map((game, idx) => (
                                <div
                                    key={idx}
                                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#2A161B] hover:bg-[#341C22] border border-white/5 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <img
                                            src={game.image}
                                            alt={game.title}
                                            className="w-11 h-11 rounded-xl object-cover border border-white/10 shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <h4 className="text-xs font-bold text-white truncate group-hover:text-[#E64C4C] transition-colors">
                                                {game.title}
                                            </h4>
                                            <p className="text-[10px] text-white/40 truncate mt-0.5">
                                                {game.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lower Grid: New Games, Last Downloads, and Your Statistic */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
                        {/* Left 8 Cols: "New Games" + "Last Downloads" */}
                        <div className="lg:col-span-8 flex flex-col justify-between gap-6">

                            {/* New Games Row */}
                            <div>
                                <div className="flex items-center justify-between mb-3.5">
                                    <h3 className="text-sm font-bold text-white tracking-wide">New Games</h3>
                                    <button className="text-[11px] font-semibold text-white/40 hover:text-white transition-colors">
                                        See More
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                                    {/* Card 1: Uncharted 4 with Frosted Floating Controls */}
                                    <div className="relative rounded-2xl p-4 bg-gradient-to-b from-[#2E181D] to-[#1F0E13] border border-white/5 h-44 flex flex-col justify-between overflow-hidden group">
                                        <div className="flex items-center justify-between">
                                            <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E64C4C] flex items-center justify-center text-white transition-all">
                                                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                                            </button>
                                            <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
                                                <ShoppingBag className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-bold text-white mb-1">Uncharted 4</h4>
                                            <p className="text-[10px] text-white/40 line-clamp-2 leading-relaxed font-light">
                                                A thief's end, seeking hidden pirate libertalia treasure.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 2: Dishonored */}
                                    <div className="relative rounded-2xl p-4 bg-[#2E181D] border border-white/5 h-44 flex flex-col justify-end overflow-hidden group">
                                        <img
                                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80"
                                            alt="Dishonored"
                                            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F0E13] via-[#1F0E13]/60 to-transparent" />

                                        <div className="relative z-10">
                                            <h4 className="text-xs font-bold text-white mb-0.5">Dishonored:</h4>
                                            <p className="text-[10px] text-white/50">Standard Edition</p>
                                        </div>
                                    </div>

                                    {/* Card 3: Next Pagination Pill Card */}
                                    <div className="relative rounded-2xl p-4 bg-[#231216] border border-white/5 h-44 flex items-center justify-center group cursor-pointer hover:border-white/15 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#E64C4C] flex items-center justify-center text-white/60 group-hover:text-white transition-all shadow-md">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Last Downloads Row */}
                            <div>
                                <div className="flex items-center justify-between mb-3.5">
                                    <h3 className="text-sm font-bold text-white tracking-wide">Last Downloads</h3>
                                    <button className="text-[11px] font-semibold text-white/40 hover:text-white transition-colors">
                                        See More
                                    </button>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#2A161B] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    {/* Left Game Tag */}
                                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black font-black text-xs font-mono shrink-0 shadow-md">
                                            FIFA 23
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white">FIFA 23</h4>
                                            <span className="text-[10px] text-white/40">Sports simulator</span>
                                        </div>
                                    </div>

                                    {/* Center Active Progress Track */}
                                    <div className="flex-1 max-w-xs w-full px-2">
                                        <div className="flex items-center justify-between text-[10px] text-white/60 mb-1.5 font-mono">
                                            <span>1 hour 23 min.</span>
                                            <span>355Mb of 1.23Gb</span>
                                        </div>
                                        <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-[#E64C4C] to-[#F59E0B] rounded-full"
                                                style={{ width: "38%" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Control Buttons */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => setDownloadPaused((p) => !p)}
                                            className="w-8 h-8 rounded-full bg-[#E64C4C] text-white flex items-center justify-center hover:scale-105 transition-all shadow-md"
                                        >
                                            {downloadPaused ? <Play className="w-3.5 h-3.5 fill-white ml-0.5" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right 4 Cols: "Your Statistic" Widget */}
                        <div className="lg:col-span-4 flex flex-col">
                            <div className="flex items-center justify-between mb-3.5">
                                <h3 className="text-sm font-bold text-white tracking-wide">Your Statistic</h3>
                                <ArrowRight className="w-4 h-4 text-white/30 cursor-pointer hover:text-white transition-colors" />
                            </div>

                            <div className="flex-1 rounded-3xl bg-[#281419] border border-white/5 p-6 flex flex-col items-center justify-between">
                                {/* Layered Organic Radial Playtime Ring */}
                                <div className="relative w-44 h-44 flex items-center justify-center my-auto">
                                    {/* Outer layered fluid glow blobs */}
                                    <div className="absolute inset-0 rounded-[42%] bg-gradient-to-tr from-[#E64C4C] via-[#C084FC] to-[#38BDF8] opacity-70 blur-md animate-pulse" />
                                    <div className="absolute inset-2 rounded-[45%] bg-gradient-to-br from-[#FB923C] to-[#818CF8] opacity-80" />

                                    {/* Dark Center Core */}
                                    <div className="relative z-10 w-28 h-28 rounded-full bg-[#1A0C10] shadow-2xl flex flex-col items-center justify-center border border-white/10">
                                        <span className="text-[9px] uppercase tracking-wider text-white/40">Total hours</span>
                                        <span className="text-sm font-black text-white font-mono mt-0.5">12,340h</span>
                                    </div>
                                </div>

                                {/* Bottom 3 Breakdown Pills */}
                                <div className="w-full grid grid-cols-3 gap-2 pt-4 border-t border-white/5 mt-4 text-center">
                                    <div className="p-2 rounded-xl bg-black/20">
                                        <div className="w-6 h-6 rounded-full bg-red-600 mx-auto mb-1 flex items-center justify-center text-[9px] font-black text-white">
                                            N
                                        </div>
                                        <span className="text-[10px] font-mono text-white/80 block">2,340h</span>
                                    </div>

                                    <div className="p-2 rounded-xl bg-black/20">
                                        <div className="w-6 h-6 rounded-full bg-amber-500 mx-auto mb-1 flex items-center justify-center text-[9px] font-black text-white">
                                            V
                                        </div>
                                        <span className="text-[10px] font-mono text-white/80 block">5,420h</span>
                                    </div>

                                    <div className="p-2 rounded-xl bg-black/20">
                                        <div className="w-6 h-6 rounded-full bg-indigo-600 mx-auto mb-1 flex items-center justify-center text-[9px] font-black text-white">
                                            C
                                        </div>
                                        <span className="text-[10px] font-mono text-white/80 block">4,580h</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* ========================================================================= */}
                {/* 3. RIGHT SOCIAL & FRIENDS RAIL */}
                {/* ========================================================================= */}
                <aside className="w-16 sm:w-20 bg-[#1B0C10] flex flex-col items-center justify-between py-6 shrink-0 border-l border-white/5">
                    {/* Top User Profile Orb */}
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                            alt="Operator"
                            className="w-10 h-10 rounded-2xl object-cover border border-[#E64C4C]"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1B0C10]" />
                    </div>

                    {/* Vertical Friends Stack */}
                    <div className="flex flex-col items-center gap-3.5 my-auto">
                        <Users className="w-4 h-4 text-white/30 mb-1" />
                        {FRIENDS.map((friend, idx) => (
                            <div key={idx} className="relative group cursor-pointer">
                                <img
                                    src={friend.avatar}
                                    alt={friend.name}
                                    className="w-9 h-9 rounded-2xl object-cover border border-white/10 hover:border-[#E64C4C] transition-all"
                                />
                                <span
                                    className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#1B0C10] ${friend.status === "In Game"
                                        ? "bg-[#E64C4C]"
                                        : friend.status === "Online"
                                            ? "bg-emerald-400"
                                            : "bg-zinc-600"
                                        }`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Bottom Chat Action */}
                    <button className="w-10 h-10 rounded-2xl bg-[#2A171B] border border-white/10 hover:border-[#E64C4C] text-white/60 hover:text-[#E64C4C] flex items-center justify-center transition-all">
                        <MessageSquare className="w-4 h-4" />
                    </button>
                </aside>

            </div>
        </div>
    );
}