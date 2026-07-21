'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import type { InteriorDesign } from '@/lib/designs';

interface PortfolioGalleryProps {
  designs: InteriorDesign[];
}

export default function PortfolioGallery({ designs }: PortfolioGalleryProps) {
  const [selectedDesign, setSelectedDesign] = useState<InteriorDesign | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedDesign) return;
      if (e.key === 'Escape') {
        setSelectedDesign(null);
        setCurrentImageIndex(0);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => Math.max(0, prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev => Math.min(selectedDesign.images.length - 1, prev + 1));
      }
    },
    [selectedDesign]
  );

  useEffect(() => {
    if (selectedDesign) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedDesign, handleKeyDown]);

  if (designs.length === 0) {
    return (
      <section className="w-full py-20 bg-surface select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <p className="text-text-secondary">No interior projects available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-surface select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-accent block mb-2">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
            Our Design Work
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl mx-auto mt-2">
            A curated selection of residential and commercial interiors — click any image to explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {designs.map((design, idx) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => {
                setSelectedDesign(design);
                setCurrentImageIndex(0);
              }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-muted border border-border-light cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              {design.images.length > 0 ? (
                <Image
                  src={design.images[0]}
                  alt={design.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-text-secondary/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-xs font-bold truncate block">{design.title}</span>
                <span className="text-white/70 text-[10px] line-clamp-2">{design.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => {
              setSelectedDesign(null);
              setCurrentImageIndex(0);
            }}
          >
            <button
              onClick={() => {
                setSelectedDesign(null);
                setCurrentImageIndex(0);
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
              {selectedDesign.title}
            </div>

            {selectedDesign.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(prev => Math.max(0, prev - 1));
                  }}
                  disabled={currentImageIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(prev => Math.min(selectedDesign.images.length - 1, prev + 1));
                  }}
                  disabled={currentImageIndex === selectedDesign.images.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              key={`${selectedDesign.id}-${currentImageIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedDesign.images[currentImageIndex] || '/assets/placeholder.jpg'}
                alt={`${selectedDesign.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
