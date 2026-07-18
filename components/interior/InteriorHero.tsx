'use client';

import { motion } from 'motion/react';
import { Paintbrush } from 'lucide-react';

export default function InteriorHero() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-surface pt-28 pb-16 select-none">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:50px_50px] opacity-40 dark:opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-surface to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 bg-surface-alt px-5 py-2 rounded-full border border-border-main mb-8 shadow-sm"
        >
          <Paintbrush className="w-4 h-4 text-accent" />
          <span className="uppercase tracking-[3px] font-medium text-xs text-text-secondary">
            Interior Design Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-text-main tracking-tight leading-[1.1] max-w-4xl mx-auto"
        >
          Interiors that feel as good{' '}
          <span className="text-accent">as the address looks</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          From concept to completion, our in-house design studio creates bespoke interiors
          for AHS homeowners and beyond — blending modern aesthetics with timeless comfort.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
        </motion.div>
      </div>
    </section>
  );
}
