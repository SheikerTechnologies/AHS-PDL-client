/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import { ArrowRight, Home, MessageCircle } from "lucide-react";
import { useRef } from "react";

interface HeroSectionProps {
  onViewProperties: () => void;
  onEnquireNow?: () => void;
}

export default function HeroSection({ onViewProperties, onEnquireNow }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax — track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map progress to Y offset (image moves slightly opposite to scroll)
  const rawY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const parallaxY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.5 });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen lg:h-[105vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-28 pb-16 lg:py-0 select-none"
    >
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.9 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
          style={{ y: parallaxY }}
        >
          <Image
            src="/assets/projects/Properties01-01.jpg"
            alt="AHS Properties & Development Ltd. — Premium Real Estate"
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 text-white h-full">
        {/* Left: Branding Titles */}
        <div className="max-w-2xl flex flex-col gap-6 text-left mt-8 lg:mt-0">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
            className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[#dfad42]"
          >
            Registered Real Estate Developer — Bangladesh
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            AHS Properties<br />
            <span className="text-[#dfad42]">&amp; Development</span><br />
            Limited
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="text-sm md:text-[15px] text-stone-200/90 leading-relaxed font-normal max-w-[550px]"
          >
            We Build Tomorrow&rsquo;s Addresses Today &mdash; crafting premium residential and commercial spaces across Bangladesh with architectural vision and uncompromising quality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="flex flex-wrap gap-3 mt-2"
          >
            <button
              onClick={onViewProperties}
              className="inline-flex items-center gap-2 bg-[#dfad42] hover:bg-[#c5a257] text-slate-950 text-sm font-extrabold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>View Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onEnquireNow && (
              <button
                onClick={onEnquireNow}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire Now</span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Right: Trust badge */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full lg:w-[280px] self-end lg:self-center"
        >
          <div className="backdrop-blur-xl bg-slate-900/35 border border-white/15 p-6 rounded-3xl shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-2">
              <span className="bg-[#dfad42]/20 text-[#dfad42] text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider w-fit border border-[#dfad42]/20">
                RJSC Registered
              </span>
              <span className="bg-emerald-500/15 text-emerald-300 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider w-fit border border-emerald-500/20">
                100% RAJUK Approved
              </span>
            </div>
            <p className="text-xs text-stone-300/80 leading-relaxed">
              Bangladesh&rsquo;s trusted real estate developer with military-grade precision and government-institutional partnerships.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-stone-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Part of the AHS Group</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
