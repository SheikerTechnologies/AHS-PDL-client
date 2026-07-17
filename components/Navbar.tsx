'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Site-wide Navbar for AHS Properties & Development Ltd.
 * - Sticky, fixed to top — transparent on hero, solid on scroll
 * - Active route detection via usePathname
 * - Primary nav items: Home, Projects, Landowners, Blog, About, Contact
 * - "More" dropdown (desktop hover / mobile expandable): Services, Layout
 * - Desktop: nav links, phone icon, Enquire Now button, theme toggle
 * - Mobile: compact Enquire + hamburger in bar; slide-in drawer with Framer Motion
 *
 * NAV TEXT VISIBILITY FIX:
 * Pages with dark hero backgrounds (Home, Landowners) get white nav text when
 * at scrollY === 0. All other pages (light background) use normal brand colors
 * regardless of scroll position. Text always reverts to brand colors on scroll.
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageCircle, ArrowUpRight, ChevronDown } from 'lucide-react';
import AHSLogo from './AHSLogo';
import ThemeToggle from './ThemeToggle';
import { AGENTS } from '@/lib/data';

/* ─── Constants ─────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Landowners', href: '/landowners' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

const MORE_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Interior Design', href: '/services/interior-design' },
  { label: 'Careers', href: '/careers' },
  { label: 'Layout', href: '/layout' },
] as const;

// Use existing contact info from shared data (do not hardcode duplicate values)
const PHONE_SALES = AGENTS[0].phone; // "01625-555700"
const WHATSAPP_DIGITS = AGENTS[1].phone.replace(/[^0-9]/g, ''); // "01725555700" → used with country code
const WHATSAPP_FULL = `880${WHATSAPP_DIGITS}`; // "8801725555700"

/** Scroll window to top instantly on nav clicks */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ─── Subcomponents ─────────────────────────────────────────────── */

function DesktopNavLink({
  href,
  label,
  isActive,
  useLightText,
}: {
  href: string;
  label: string;
  isActive: boolean;
  useLightText: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={scrollToTop}
      className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
        isActive
          ? 'text-accent'
          : useLightText
            ? 'text-white/90 hover:text-white'
            : 'text-text-main hover:text-accent'
      }`}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
            useLightText ? 'bg-white' : 'bg-accent'
          }`}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

function DesktopMoreDropdown({
  isMoreActive,
  useLightText,
}: {
  isMoreActive: boolean;
  useLightText: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open]);

  const triggerTextClass = isMoreActive || open
    ? 'text-accent'
    : useLightText
      ? 'text-white/90 hover:text-white'
      : 'text-text-main hover:text-accent';

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`relative flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap ${triggerTextClass}`}
      >
        More
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
        {(isMoreActive || open) && (
          <motion.span
            layoutId="nav-underline"
            className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
              useLightText ? 'bg-white' : 'bg-accent'
            }`}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-48 bg-surface-alt dark:bg-surface-muted border border-border-main rounded-xl shadow-lg overflow-hidden"
          >
            {MORE_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { setOpen(false); scrollToTop(); }}
                className="block px-4 py-3 text-sm font-semibold text-text-main hover:text-accent hover:bg-accent/5 transition-colors duration-150 border-b border-border-main/50 last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  /* ---- Scroll detection ---- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ---- Lock body scroll when drawer open ---- */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /* ---- Close drawer on route change ---- */
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileMoreOpen(false);
  }, [pathname]);

  /* ---- Active link check ---- */
  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    },
    [pathname],
  );

  const isMoreActive = MORE_ITEMS.some((item) => isActive(item.href));

  /* ---- Hero variant detection (route-based) ----
   * Pages with dark/image heroes need white nav text at scrollY === 0.
   * All other pages have light/solid backgrounds and use normal text colors. */
  const heroVariant = useMemo<'dark' | 'light'>(() => {
    if (pathname === '/') return 'dark';
    if (pathname.startsWith('/landowners')) return 'dark';
    return 'light';
  }, [pathname]);

  // Use light (white) text only when over a dark hero and not yet scrolled
  const useLightText = !scrolled && heroVariant === 'dark';

  /* ---- Scroll to consultation form ---- */
  const scrollToEnquire = useCallback(() => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('contact-broker-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/contact');
      }
    }, 200);
  }, [router]);

  return(
    <>
      {/* ============================================================
           NAVBAR BAR (fixed top)
           ============================================================ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 dark:bg-nav-bg backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16 md:h-18' : 'h-20 md:h-24'
          }`}
        >
          {/* ---- Left: Logo (links to homepage) ---- */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex items-center gap-0 select-none shrink-0"
            aria-label="AHS Properties & Development Ltd. — Home"
          >
            <AHSLogo
              type="horizontal"
              iconSize={scrolled ? 38 : 42}
              className="transition-all duration-300"
            />
          </Link>

          {/* ---- Center: Desktop nav links + More dropdown ---- */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <DesktopNavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isActive(item.href)}
                useLightText={useLightText}
              />
            ))}
            <DesktopMoreDropdown
              isMoreActive={isMoreActive}
              useLightText={useLightText}
            />
          </nav>

          {/* ---- Right: Phone + Enquire + ThemeToggle + Mobile group ---- */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Phone icon (desktop) — over dark hero gets white/glass look */}
            <a
              href={`tel:${PHONE_SALES}`}
              className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
                useLightText
                  ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  : 'bg-surface-muted dark:bg-surface-raised text-text-secondary hover:text-accent hover:bg-accent/10 border border-border-light dark:border-border-main'
              }`}
              aria-label={`Call sales at ${PHONE_SALES}`}
              title={`Call ${PHONE_SALES}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Enquire Now button (desktop) */}
            <button
              onClick={scrollToEnquire}
              className="hidden lg:inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-text-on-accent text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer dark:btn-glow-accent"
            >
              Enquire Now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Compact Enquire button + Hamburger (mobile) */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={scrollToEnquire}
                className="inline-flex items-center gap-1 bg-accent hover:bg-accent-hover text-text-on-accent text-[11px] font-bold px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
                aria-label="Enquire Now"
              >
                Enquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 cursor-pointer ${
                  useLightText
                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    : 'bg-surface-muted dark:bg-surface-raised text-text-secondary hover:text-accent hover:bg-accent/10 border border-border-light dark:border-border-main'
                }`}
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================
           MOBILE DRAWER (slide-in from right)
           ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="nav-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer panel */}
            <motion.div
              key="nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-surface-alt dark:bg-surface-muted shadow-2xl flex flex-col border-l border-border-main"
            >
              {/* ---- Drawer header: Logo + Close ---- */}
              <div className="flex items-center justify-between px-5 pt-5 pb-2">
                <Link
                  href="/"
                  onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
                  aria-label="AHS Properties & Development Ltd. — Home"
                >
                  <AHSLogo type="horizontal" iconSize={36} />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-muted dark:bg-surface-raised text-text-secondary hover:text-accent hover:bg-accent/10 border border-border-light dark:border-border-main transition-all duration-200 cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ---- Nav links ---- */}
              <nav className="flex flex-col px-5 mt-4 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
                      className={`flex items-center py-4 border-b border-border-main/60 text-base font-semibold transition-colors duration-200 ${
                        active
                          ? 'text-accent'
                          : 'text-text-main hover:text-accent'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                    </Link>
                  );
                })}

                {/* ---- "More" expandable row ---- */}
                <div className="border-b border-border-main/60">
                  <button
                    onClick={() => setMobileMoreOpen((prev) => !prev)}
                    className={`flex items-center w-full py-4 text-base font-semibold transition-colors duration-200 cursor-pointer ${
                      isMoreActive
                        ? 'text-accent'
                        : 'text-text-main hover:text-accent'
                    }`}
                  >
                    More
                    <motion.span
                      animate={{ rotate: mobileMoreOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-auto inline-flex"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.span>
                  </button>

                  {/* Sub-items */}
                  <AnimatePresence>
                    {mobileMoreOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 flex flex-col gap-1">
                          {MORE_ITEMS.map((item) => {
                            const active = isActive(item.href);
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
                                className={`flex items-center pl-5 py-3 text-sm font-medium transition-colors duration-200 rounded-lg ${
                                  active
                                    ? 'text-accent bg-accent/5'
                                    : 'text-text-secondary hover:text-accent hover:bg-accent/5'
                                }`}
                              >
                                {item.label}
                                {active && (
                                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* ---- Enquire Now button ---- */}
              <div className="px-5 mt-6">
                <button
                  onClick={scrollToEnquire}
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-on-accent text-sm font-bold px-5 py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer dark:btn-glow-accent"
                >
                  Enquire Now
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* ---- Call + WhatsApp side-by-side ---- */}
              <div className="px-5 mt-4 flex gap-3">
                <a
                  href={`tel:${PHONE_SALES}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-surface-muted dark:bg-surface-raised border border-border-main text-text-main text-sm font-semibold px-4 py-3 rounded-xl hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all duration-200"
                  aria-label={`Call sales at ${PHONE_SALES}`}
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_FULL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold px-4 py-3 rounded-xl hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-200"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {/* ---- Bottom spacer ---- */}
              <div className="flex-1" />

              {/* ---- Footer note in drawer ---- */}
              <div className="px-5 pb-6">
                <p className="text-[10px] text-text-muted text-center">
                  AHS Properties &amp; Development Ltd.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
