/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
  status: string;
}

export default function ProjectGallery({ images, projectTitle, status }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const goToImage = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main slider */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface-muted border border-border-main group">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={images[activeIndex]}
                alt={`${projectTitle} - Image ${activeIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority={activeIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Dark overlay at edges for readability */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

          {/* Status badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm border ${
                status?.toLowerCase() === 'ongoing'
                  ? 'bg-teal-500/20 text-teal-300 border-teal-400/30'
                  : 'bg-coral-500/20 text-coral-300 border-coral-400/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status?.toLowerCase() === 'ongoing' ? 'bg-teal-400' : 'bg-coral-400'
                }`}
              />
              {status?.toLowerCase() === 'ongoing' ? 'Ongoing' : 'Completed'}
            </span>
          </div>

          {/* Expand button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Open fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium border border-white/10">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div
            ref={thumbnailScrollRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin"
            style={{ scrollbarWidth: 'thin' }}
          >
            {images.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                onClick={() => goToImage(idx)}
                className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  idx === activeIndex
                    ? 'border-accent ring-1 ring-accent/30'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${projectTitle} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        currentIndex={activeIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
        projectTitle={projectTitle}
      />
    </>
  );
}
