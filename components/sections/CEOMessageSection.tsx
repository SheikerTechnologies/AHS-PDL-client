/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Quote } from "lucide-react";

export default function CEOMessageSection() {
  return (
    <section className="w-full bg-surface-muted/40 border-y border-border-main/30 py-16 md:py-20 select-none">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-surface-alt border border-border-main/60 rounded-3xl p-8 md:p-10 shadow-md relative overflow-hidden">
            {/* Decorative quote */}
            <div className="absolute top-4 right-6 text-accent/5 pointer-events-none select-none">
              <Quote className="w-20 h-20 md:w-28 md:h-28" strokeWidth={1} />
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
              {/* CEO photo */}
              <div className="shrink-0">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-accent/20 shadow-md">
                  <Image
                    src="/assets/pepole/MdSohanurRahmanSohan.jpeg"
                    alt="Md. Sohanur Rahman Sohan"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-extrabold text-accent tracking-widest uppercase block mb-1">
                    LEADERSHIP MESSAGE
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-text-main tracking-tight">
                    Message from our CEO
                  </h2>
                </div>

                <blockquote className="text-sm md:text-base text-text-secondary leading-relaxed italic border-l-2 border-accent/30 pl-4">
                  &ldquo;Our journey began with a vision&mdash;to establish a benchmark of unyielding reliability, top-tier quality, and strategic innovation in Bangladesh&rsquo;s most vital sectors. Today, we bring that same military-grade precision into premium real estate and sustainable infrastructure.&rdquo;
                </blockquote>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <div>
                    <p className="font-bold text-text-main text-sm">Md. Sohanur Rahman Sohan</p>
                    <p className="text-xs text-text-muted">Chief Executive Officer, AHS Properties &amp; Development Ltd.</p>
                  </div>
                  <Link
                    href="/about#ceo-message"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors group"
                  >
                    <span>Read full message</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
