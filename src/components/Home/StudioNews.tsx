"use client";

import React from "react";
import { Newspaper, ArrowUpRight, Calendar, Tag } from "lucide-react";

const ARTICLES = [
    {
        category: "Mainnet Dispatch",
        title: "HyperMesh Rollup v2.4 Upgrade: 128Hz Deterministic State Verification",
        excerpt: "New zero-knowledge matchmaking modules and sub-12ms edge node routing live across Asia and EU clusters.",
        date: "Sep 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    },
    {
        category: "Ecosystem Fund",
        title: "$5,000,000 Unreal Engine 5 Indie Publishing Grant Window Now Open",
        excerpt: "Supporting independent developer studios building high-fidelity Web3 multiplayer action titles with low friction.",
        date: "Aug 2026",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    },
    {
        category: "Patch Notes",
        title: "Neo-Kyoto: 2088 Closed Alpha 3 Telemetry & Economy Tuning",
        excerpt: "Load balancing adjustments, weapon skin minting fixes, and gasless session account abstraction benchmarking results.",
        date: "Aug 2026",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80",
    },
];

export default function StudioNews() {
    return (
        <section className="relative z-10 w-full py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
                        Network Dispatch
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-mono mt-4">
                        Latest News & Patch Notes
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ARTICLES.map((article, idx) => (
                    <article
                        key={idx}
                        className="group rounded-3xl overflow-hidden bg-zinc-900/40 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between cursor-pointer"
                    >
                        <div>
                            <div className="relative h-48 w-full overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                                <span className="absolute top-3.5 left-3.5 text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-black/70 border border-white/10 text-cyan-400 backdrop-blur-md">
                                    {article.category}
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 mb-2">
                                    <span>{article.date}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                </div>

                                <h3 className="text-sm sm:text-base font-bold font-mono text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                                    {article.title}
                                </h3>

                                <p className="mt-3 text-xs text-zinc-400 line-clamp-2 font-light leading-relaxed">
                                    {article.excerpt}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono text-cyan-400 border-t border-white/5 mt-4">
                            <span>Read Dispatch</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}