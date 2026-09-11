"use client";

import React from "react";
import { Cpu } from "lucide-react";

export default function HomeFooter() {
    return (
        <footer className="relative z-10 w-full border-t border-white/10 bg-[#07080A] py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                        <span className="font-mono text-sm font-extrabold tracking-wider text-white">
                            NEXUS STUDIOS
                        </span>
                        <p className="text-[10px] text-zinc-500 font-mono">
                            Decentralized Gaming & Publisher Infrastructure
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono">
                    <span className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Protocol</span>
                    <span className="hover:text-cyan-400 cursor-pointer transition-colors">Documentation</span>
                    <span className="hover:text-cyan-400 cursor-pointer transition-colors">Terms of Node</span>
                </div>

                <div className="text-[11px] font-mono text-zinc-600">
                    © 2026 Nexus Labs. All rights reserved.
                </div>
            </div>
        </footer>
    );
}