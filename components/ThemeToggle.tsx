'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, startTransition } from 'react';
import { Sun, Moon } from 'lucide-react';

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem('ahsp-theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
      const initial = getInitialDark();
      setDark(initial);
      if (initial) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }, []);

  const toggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ahsp-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ahsp-theme', 'light');
    }
  }, [dark]);

  // Avoid flash of wrong icon on SSR
  if (!mounted) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 flex items-center justify-center rounded-full bg-surface-muted dark:bg-surface-raised text-text-secondary hover:text-accent hover:bg-accent/10 dark:hover:bg-accent/15 border border-border-light dark:border-border-main transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface cursor-pointer group"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light Mode' : 'Dark Mode'}
    >
      <span className="relative flex items-center justify-center w-full h-full">
        {/* Sun icon */}
        <Sun
          className={`absolute w-4 h-4 transition-all duration-300 ${
            dark
              ? 'opacity-100 scale-100 rotate-0'
              : 'opacity-0 scale-50 rotate-90'
          }`}
        />
        {/* Moon icon */}
        <Moon
          className={`absolute w-4 h-4 transition-all duration-300 ${
            !dark
              ? 'opacity-100 scale-100 rotate-0'
              : 'opacity-0 scale-50 -rotate-90'
          }`}
        />
      </span>
      <span className="sr-only">{dark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </button>
  );
}
