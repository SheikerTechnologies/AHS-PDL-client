"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Layout } from "@/lib/layouts";

interface JolshiriLayoutPageClientProps {
  layouts: Layout[];
}

export default function JolshiriLayoutPageClient({
  layouts,
}: JolshiriLayoutPageClientProps) {
  return (
    <div className="min-h-screen bg-surface pt-24 relative overflow-hidden">
      {/* Master Plan Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src="/assets/maps/Jolshiri_Layout_Plan_by_RAJUK.jpg"
          alt="Jolshiri Master Plan Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/60 to-surface" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-20">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-text-main">
            Jolshiri Abashon
          </h1>
          <p className="text-2xl text-accent font-medium mt-3">Master Layout Plan</p>
          <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
            RAJUK Approved Master Plan • Sector-wise Detailed Maps
          </p>
        </div>

        {layouts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No layout plans available.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {layouts.map((layout, index) => (
                <motion.div
                  key={layout._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-surface-alt rounded-3xl overflow-hidden shadow-sm border border-border-main hover:shadow-2xl transition-all duration-300 dark:card-hover-glow"
                >
                  <div className="h-64 bg-surface-muted relative overflow-hidden">
                    <Image
                      src={layout.image}
                      alt={layout.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full">
                      SECTOR {layout.title.replace('Sector ', '')}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text-main">{layout.title}</h3>
                    <p className="text-text-secondary mt-1 text-sm">{layout.description}</p>

                    <a
                      href={layout.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 block w-full bg-accent hover:bg-accent-hover text-text-on-accent text-center py-3.5 rounded-2xl font-semibold transition-colors dark:btn-glow-accent"
                    >
                      View Detailed Sector Map →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a
                href="/assets/maps/Jolshiri_Layout_Plan_by_RAJUK.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-accent text-text-on-accent px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-accent-hover transition-all shadow-lg dark:btn-glow-accent"
              >
                📋 View Complete Master Layout Plan (RAJUK)
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
