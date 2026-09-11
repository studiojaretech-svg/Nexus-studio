"use client";

import React, { useState } from "react";
import { Search, Heart, Bell, User, LayoutDashboard } from "lucide-react";
import WishlistDrawer from "./WishlistDrawer";
import AccountDrawer from "./AccountDrawer";
import SearchModal from "./SearchModal";
import NotificationsModal from "./NotificationsModal";
import { Project, PROJECTS } from "../../data/projects";

interface HeaderActionsProps {
    wishlistIds: number[];
    onToggleWishlist: (id: number) => void;
    onOpenGameDetail: (id: number) => void;
    onViewAllWishlist?: () => void;
    onNavigateDashboard?: () => void;
}

export default function HeaderActions({
    wishlistIds = [],
    onToggleWishlist,
    onOpenGameDetail,
    onViewAllWishlist,
    onNavigateDashboard,
}: HeaderActionsProps) {
    const [activeModal, setActiveModal] = useState<
        "search" | "wishlist" | "notifications" | "account" | null
    >(null);

    const [user, setUser] = useState<{ email: string; name: string } | null>(null);

    const wishlistedProjects = PROJECTS.filter((p) => (wishlistIds ?? []).includes(p.id));

    return (
        <>
            <div className="flex items-center gap-2">
                {/* Search */}
                <button
                    type="button"
                    aria-label="Search"
                    onClick={() => setActiveModal("search")}
                    className="p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 text-white/70 transition-all backdrop-blur-md"
                >
                    <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Wishlist Icon with Dynamic Badge */}
                <button
                    type="button"
                    aria-label="Wishlist"
                    onClick={() => setActiveModal("wishlist")}
                    className={`relative flex p-2 sm:p-2.5 rounded-full border transition-all backdrop-blur-md ${(wishlistIds?.length || 0) > 0
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:border-rose-400"
                        : "bg-white/5 border-white/10 hover:border-rose-400/50 hover:text-rose-400 text-white/70"
                        }`}
                >
                    <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${(wishlistIds?.length || 0) > 0 ? "fill-rose-400 text-rose-400" : ""
                            }`}
                    />
                    {(wishlistIds?.length || 0) > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-mono font-bold text-white flex items-center justify-center shadow-lg">
                            {wishlistIds.length}
                        </span>
                    )}
                </button>

                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    onClick={() => setActiveModal("notifications")}
                    className="relative p-2 sm:p-2.5 rounded-full border bg-white/5 border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 text-white/70 transition-all backdrop-blur-md"
                >
                    <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                </button>

                {/* Account / Dashboard */}
                <button
                    type="button"
                    aria-label="Account / Dashboard"
                    onClick={() => setActiveModal("account")}
                    className={`p-2 sm:p-2.5 rounded-full border transition-all backdrop-blur-md ${user
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                        : "bg-white/5 border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-white/80"
                        }`}
                    title={user ? "Operator Dashboard" : "Sign In"}
                >
                    {user ? (
                        <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                </button>
            </div>

            {/* Drawers & Modals */}
            <WishlistDrawer
                isOpen={activeModal === "wishlist"}
                onClose={() => setActiveModal(null)}
                wishlistedProjects={wishlistedProjects}
                onRemoveItem={onToggleWishlist}
                onViewAllWishlist={onViewAllWishlist}
                onSelectGame={(id) => onOpenGameDetail(id)}
            />

            <AccountDrawer
                isOpen={activeModal === "account"}
                onClose={() => setActiveModal(null)}
                user={user}
                onLogin={(userData) => setUser(userData)}
                onLogout={() => setUser(null)}
                onNavigateDashboard={onNavigateDashboard}
            />

            <SearchModal
                isOpen={activeModal === "search"}
                onClose={() => setActiveModal(null)}
                onSelectProject={(id) => onOpenGameDetail(id)}
            />

            <NotificationsModal
                isOpen={activeModal === "notifications"}
                onClose={() => setActiveModal(null)}
            />
        </>
    );
}