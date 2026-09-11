"use client";

import React, { useState } from "react";
import { X, User, Lock, Mail, ArrowRight, ShieldCheck, LogOut, LayoutDashboard } from "lucide-react";

interface AccountDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: { email: string; name: string } | null;
    onLogin: (user: { email: string; name: string }) => void;
    onLogout: () => void;
    onNavigateDashboard?: () => void;
}

export default function AccountDrawer({
    isOpen,
    onClose,
    user,
    onLogin,
    onLogout,
    onNavigateDashboard,
}: AccountDrawerProps) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        onLogin({
            email,
            name: name || email.split("@")[0],
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-sm sm:max-w-md h-full bg-[#0E0F14] border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300">
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                {user ? <LayoutDashboard className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>
                            <h2 className="text-base font-bold font-mono text-white uppercase tracking-wider">
                                {user ? "OPERATOR PROFILE" : isSignUp ? "CREATE ID" : "SIGN IN"}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 text-zinc-400 hover:text-white transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {user ? (
                        /* Signed In State */
                        <div className="space-y-6">
                            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono uppercase text-zinc-400">Status</span>
                                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Verified Operator
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white font-mono">{user.name}</h3>
                                    <p className="text-xs text-zinc-400 font-mono">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onClose();
                                        onNavigateDashboard?.();
                                    }}
                                    className="w-full py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Enter Dashboard</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={onLogout}
                                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-zinc-300 hover:text-rose-400 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Disconnect ID</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Sign In / Sign Up Form */
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isSignUp && (
                                <div>
                                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                                        Gamer Tag / Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. CipherBlade"
                                            className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                                        />
                                        <User className="w-3.5 h-3.5 absolute right-3 top-3 text-zinc-500" />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="operator@nexus.network"
                                        className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                                    />
                                    <Mail className="w-3.5 h-3.5 absolute right-3 top-3 text-zinc-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                                    />
                                    <Lock className="w-3.5 h-3.5 absolute right-3 top-3 text-zinc-500" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            >
                                <span>{isSignUp ? "Create Network ID" : "Authenticate"}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp((prev) => !prev)}
                                    className="text-xs text-zinc-400 hover:text-cyan-400 font-mono transition-colors"
                                >
                                    {isSignUp
                                        ? "Already registered? Sign in"
                                        : "No network identity? Register now"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        Zero-Knowledge Auth
                    </span>
                    <span>Mesh v2.4</span>
                </div>
            </div>
        </div>
    );
}