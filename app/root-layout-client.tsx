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
    </div>
  );
}
