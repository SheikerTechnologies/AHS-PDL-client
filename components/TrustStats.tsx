/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CLIENT_METADATA } from "@/lib/data";
import { getProjects } from "@/lib/api/projects";
import { Building2, ShieldCheck, ScrollText, Handshake } from "lucide-react";

const partnerCount = CLIENT_METADATA.length;

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  target: number;
  suffix?: string;
  isPercentage?: boolean;
  isYear?: boolean;
  idx: number;
}

function StatItem({ icon: Icon, label, target, suffix, isPercentage, isYear, idx }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000;
            const duration = isYear ? 2 : 2;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(eased * target);
            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, isYear]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="bg-surface-muted border border-border-main/60 rounded-2xl p-5 md:p-6 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-accent/20 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <div className="flex flex-col gap-1">
        {isYear ? (
          <span className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight font-mono">
            <span>{count}</span>
          </span>
        ) : isPercentage ? (
          <span className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight font-mono">
            <span>{count}</span>
            <span className="text-accent">%</span>
          </span>
        ) : (
          <span className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight font-mono">
            <span>{count}</span>
            <span className="text-accent">{suffix}</span>
          </span>
        )}
        <span className="text-xs md:text-sm text-text-secondary font-medium leading-tight">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function TrustStats() {
  const [activeProjects, setActiveProjects] = useState(0);

  useEffect(() => {
    getProjects().then((projects) => {
      const count = projects.filter(
        (p) => p.status?.toLowerCase() === 'ongoing'
      ).length;
      setActiveProjects(count);
    }).catch(() => {});
  }, []);

  const STATS: Omit<StatItemProps, "idx">[] = [
    {
      icon: Handshake,
      label: "Government & Institutional Partners",
      target: partnerCount,
      suffix: "+",
    },
    {
      icon: Building2,
      label: "Active Projects",
      target: activeProjects,
      suffix: "",
    },
    {
      icon: ShieldCheck,
      label: "RAJUK Approved",
      target: 100,
      isPercentage: true,
    },
    {
      icon: ScrollText,
      label: "RJSC Registered Since",
      target: 2025,
      isYear: true,
    },
  ];

  return (
    <section className="w-full bg-surface-alt border-b border-border-main/50 py-12 md:py-16 select-none">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, idx) => (
            <StatItem key={stat.label} {...stat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
