/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ActiveTab, Currency, Language } from '@/lib/types';
import AHSLogo from './AHSLogo';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  onGetStartedClick: () => void;
  onOpenThemeAnalyzer: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  language,
  setLanguage,
  onGetStartedClick,
  onOpenThemeAnalyzer,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; tab: ActiveTab }[] = [
    { label: 'Home', tab: 'Home' },
    { label: 'Projects', tab: 'Projects' },
    { label: 'Layout', tab: 'Layout' },          
    { label: 'Contents', tab: 'Contents' },
    { label: 'About', tab: 'About' },
    { label: 'Contact', tab: 'Contact' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto">
      {/* 
        This frosted-glass pill navbar mirrors the premium, rounded-full, 
        translucent architectural theme of AHS Properties & Development.
      */}
      <div
        id="ahs-navbar"
        className="w-full bg-white/25 backdrop-blur-xl border border-white/35 rounded-full py-2 px-3 md:px-6 shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex items-center justify-between pointer-events-auto transition-all duration-300 hover:border-white/50 overflow-hidden"
      >
        {/* Left: Brand Logo & Typography */}
        <div
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-0 cursor-pointer pl-0 select-none group"
        >

          <AHSLogo type="horizontal" iconSize={45} className="pl-1 scale-150 transition-transform duration-300 group-hover:scale-[1.53]" />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 hover:bg-white/40 ${isActive
                  ? 'bg-white/85 text-[#b84822] shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
                  : 'text-zinc-800 hover:text-[#b84822]'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Selectors & CTA */}
        <div className="flex items-center gap-2">
          {/* Core Get Started CTA */}
          <button
            onClick={onGetStartedClick}
            className="bg-[#b84822] text-white hover:bg-[#a03d1b] text-[12px] font-bold tracking-tight px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-[0_4px_12px_rgba(184,72,34,0.25)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            Get Started
          </button>

          {/* Mobile Menu Button toggles mobile drawer */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 transition-colors text-slate-900 cursor-pointer ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-18 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-slate-200/60 rounded-3xl p-5 shadow-2xl z-40 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200 select-none">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2 px-4 rounded-xl text-sm font-semibold transition-colors ${activeTab === item.tab
                  ? 'bg-[#b84822] text-white'
                  : 'text-slate-800 hover:bg-slate-200'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="h-[1px] bg-slate-200/70" />

          <div className="flex gap-2">
            <button
              onClick={() => {
                onGetStartedClick();
                setMobileMenuOpen(false);
              }}
              className="flex-1 bg-[#b84822] text-white py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-[#a03d1b] transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
