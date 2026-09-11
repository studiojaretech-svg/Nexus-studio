"use client";

import React from "react";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
    {
        quote:
            "Integrating the 128Hz rollback SDK took less than five days. Input registration is completely on par with native Steam builds, while on-chain item persistence just works.",
        author: "Kaito Vance",
        role: "Lead Systems Architect",
        org: "CyberForge Studio",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
        quote:
            "Our guild members have real asset ownership. If our squad grinds for a legendary weapon skin in Neo-Kyoto, that item isn't wiped or trapped in an abandoned game server.",
        author: "Elena Rostova",
        role: "Guild Master",
        org: "Syndicate Zero Esports",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
        quote:
            "Running an edge validator node on Nexus generates verifiable uptime revenue without complex devops overhead. The Tendermint-based sub-second consensus is rock solid.",
        author: "Marcus Lindqvist",
        role: "Node Infrastructure Lead",
        org: "Nordic Validator Mesh",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
];

export default function Testimonials() {
    return (
        <section className="relative z-10 w-full py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
                    Industry Endorsements
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-mono mt-4">
                    Trusted By Builders & Guilds
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, idx) => (
                    <div
                        key={idx}
                        className="p-8 rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between relative"
                    >
                        <Quote className="w-8 h-8 text-cyan-400/20 absolute top-6 right-6" />

                        <div>
                            <div className="flex items-center gap-1 mb-4 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light italic mb-8">
                                "{t.quote}"
                            </p>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                            <img
                                src={t.avatar}
                                alt={t.author}
                                className="w-10 h-10 rounded-full object-cover border border-cyan-400/30"
                            />
                            <div>
                                <h4 className="text-xs font-mono font-bold text-white uppercase">{t.author}</h4>
                                <p className="text-[10px] font-mono text-zinc-400">
                                    {t.role} · <span className="text-cyan-400">{t.org}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}