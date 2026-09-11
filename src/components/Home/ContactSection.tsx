"use client";

import React, { useState } from "react";
import { Terminal, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "Publisher Grant Inquiry",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: "",
                email: "",
                category: "Publisher Grant Inquiry",
                message: "",
            });
        }, 4000);
    };

    return (
        <section className="relative z-10 w-full py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
            <div className="text-center mb-12">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">
                    Transmission Terminal
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-mono mt-4">
                    Connect With Nexus Protocol
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light">
                    Inquire about publishing grants, validator node hosting, or closed alpha access.
                </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-white/10 shadow-2xl backdrop-blur-xl">
                {submitted ? (
                    <div className="py-12 text-center space-y-3 font-mono">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                            Packet Dispatched Successfully
                        </h3>
                        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                            Our engineering team has received your transmission and will respond within 24 hours.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-zinc-400 uppercase tracking-wider mb-2">
                                    Callsign / Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Commander Chen"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400"
                                />
                            </div>

                            <div>
                                <label className="block text-zinc-400 uppercase tracking-wider mb-2">
                                    Network Comms / Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="operator@studio.xyz"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-zinc-400 uppercase tracking-wider mb-2">
                                Inquiry Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
                            >
                                <option value="Publisher Grant Inquiry">Indie Publisher Grant Application ($5M Pool)</option>
                                <option value="Validator Node Inquiry">Dedicated Validator Node Operator</option>
                                <option value="Closed Alpha Access">Closed Alpha Player Access</option>
                                <option value="General Engineering">General Protocol Architecture Inquiry</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-zinc-400 uppercase tracking-wider mb-2">
                                Transmission Data / Message
                            </label>
                            <textarea
                                rows={4}
                                required
                                placeholder="Outline your studio stack, title concept, or validator specifications..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2"
                        >
                            <span>Transmit Signal</span>
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}