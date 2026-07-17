'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContactIcons from '@/components/FloatingContactIcons';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Prevent browser scroll restoration — we control scroll position ourselves
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Scroll to top on every route change (including same-page anchor navigations)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow">{children}</main>
      <Footer />

      {/* Floating Contact Icons - WhatsApp, Messenger, Phone */}
      <FloatingContactIcons />

      {/* Sticky Mobile Enquiry Bar — always one tap away on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-surface-alt/95 backdrop-blur-lg border-t border-border-main px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Enquire now</span>
        </div>
        <div className="flex gap-2">
          <a
            href="tel:01625555700"
            className="inline-flex items-center gap-1.5 bg-surface-muted border border-border-main text-text-main text-xs font-bold px-4 py-2 rounded-full hover:bg-surface transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Call
          </a>
          <a
            href="/#contact-broker-section"
            className="inline-flex items-center gap-1.5 bg-accent text-text-on-accent text-xs font-bold px-5 py-2 rounded-full hover:bg-accent-hover transition-colors shadow-sm"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </div>
  );
}
