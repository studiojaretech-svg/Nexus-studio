"use client";

import React from "react";
import { X, Bell, Zap, ShieldAlert, Gift } from "lucide-react";

interface NotificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NOTIFICATIONS = [
    {
        icon: Zap,
        title: "Valkyrie's Bane Playtest Live",
        desc: "Testnet phase 3 node validation rewards have been distributed.",
        time: "10m ago",
    },
    {
        icon: Gift,
        title: "Seasonal Drop Available",
        desc: "Claim your Cyberpunk Neo-Kyoto weapon skin passport voucher.",
        time: "1h ago",
    },
    {
        icon: ShieldAlert,
        title: "HyperMesh Upgrade v2.4",
        desc: "Validator nodes synchronized to 128Hz continuous state tick.",
        time: "4h ago",
    },
];

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-md bg-[#0E1015] border border-white/10 rounded-2xl p-5 shadow-2xl z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-cyan-400" />
                        <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                            Network Telemetry & Alerts
                        </h3>
                    </div>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-2.5">
                    {NOTIFICATIONS.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3"
                            >
                                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                                    <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-bold text-white font-mono">{item.title}</h4>
                                        <span className="text-[9px] text-zinc-500 font-mono">{item.time}</span>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}