"use client";

import React, { useState, useEffect, useRef } from "react";

export interface SubMenuItem {
  title: string;
  badge?: string;
}

export interface MenuItem {
  title: string;
  submenu?: SubMenuItem[];
}

interface NavDropdownProps {
  item: MenuItem;
  isActive: boolean;
  onSelect: (title: string) => void;
}

export default function NavDropdown({ item, isActive, onSelect }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (item.submenu) {
      setIsOpen((prev) => !prev);
    } else {
      onSelect(item.title);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative py-2">
      <button
        type="button"
        onClick={handleToggle}
        className={`text-xs font-bold uppercase tracking-[0.16em] transition-all flex items-center gap-1.5 focus:outline-none ${isActive || isOpen ? "text-cyan-400" : "text-zinc-300 hover:text-white"
          }`}
      >
        <span>{item.title}</span>

        {item.submenu && (
          <span
            className="w-1.5 h-1.5 border-b-[1.5px] border-r-[1.5px] border-current transform transition-transform duration-200 ease-out inline-block ml-0.5"
            style={{
              transform: isOpen
                ? "rotate(225deg) translateY(-1px)"
                : "rotate(45deg) translateY(-2px)",
            }}
          />
        )}
      </button>

      {item.submenu && isOpen && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <ul className="w-64 bg-[#0E1015]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/80 flex flex-col gap-0.5">
            {item.submenu.map((sub, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(sub.title);
                    setIsOpen(false);
                  }}
                  className="w-full text-left flex items-center justify-between text-xs font-semibold uppercase tracking-wider rounded-xl py-2.5 px-3 transition-colors text-zinc-300 hover:text-cyan-300 hover:bg-white/5"
                >
                  <span className="truncate">{sub.title}</span>
                  {sub.badge && (
                    <span className="text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">
                      {sub.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}