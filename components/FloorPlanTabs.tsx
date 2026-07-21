'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import type { FloorPlan } from '@/lib/types';

interface FloorPlanTabsProps {
  floorPlans: FloorPlan[];
}

export default function FloorPlanTabs({ floorPlans }: FloorPlanTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!floorPlans || floorPlans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-text-muted gap-2 rounded-xl bg-surface-muted border border-border-main">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        <span className="text-sm font-medium">No floor plans available</span>
      </div>
    );
  }

  const currentPlan = floorPlans[activeTab];

  return (
    <div className="flex flex-col gap-4">
      {/* Tab bar */}
      <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
        {floorPlans.map((plan, idx) => (
          <button
            key={plan.id}
            onClick={() => setActiveTab(idx)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              idx === activeTab
                ? 'bg-accent text-text-on-accent shadow-sm'
                : 'bg-surface-muted text-text-secondary hover:bg-surface-alt border border-border-main'
            }`}
          >
            {plan.bedrooms} Bed - {plan.title}
          </button>
        ))}
      </div>

      {/* Floor plan display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-muted border border-border-main"
        >
          {currentPlan.image ? (
            <Image
              src={currentPlan.image}
              alt={currentPlan.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted gap-2">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <span className="text-xs font-medium">No floor plan image</span>
            </div>
          )}

          {/* Info overlay */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-medium">{currentPlan.title}</span>
                <span className="text-white/40">|</span>
                <span>{currentPlan.size} sqft</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentPlan.status === 'Available'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : currentPlan.status === 'Only 1 Left'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {currentPlan.status}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-white/60">
              <span>{currentPlan.bedrooms} beds</span>
              <span className="text-white/30">|</span>
              <span>{currentPlan.bathrooms} baths</span>
              <span className="text-white/30">|</span>
              <span>{currentPlan.balcony} balcony</span>
              <span className="ml-auto text-white font-semibold">
                ৳ {currentPlan.price.toLocaleString('en-US')}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
