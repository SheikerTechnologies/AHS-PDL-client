/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Camera, Eye } from 'lucide-react';
import { DevelopmentProject } from '@/lib/types';
import { titleToSlug } from '@/lib/slugs';

interface ProjectCardProps {
  project: DevelopmentProject;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onInquire?: (project: DevelopmentProject) => void;
  index?: number;
}

export default function ProjectCard({ project, isSaved, onToggleSave, onInquire, index = 0 }: ProjectCardProps) {
  const slug = titleToSlug(project.title);
  const photoCount = project.photoCount || project.images?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.4) }}
      className="group relative"
    >
      <Link
        href={`/projects/${slug}`}
        className="block relative rounded-2xl overflow-hidden bg-surface-alt border border-border-main/80 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        {/* Image container — ~80% of card height */}
        <div className="relative aspect-[3/4] overflow-hidden bg-surface-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 6 ? 'eager' : 'lazy'}
          />

          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Status badge — top-left */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm border ${
                project.status === 'ONGOING'
                  ? 'bg-teal-500/20 text-teal-300 border-teal-400/30'
                  : 'bg-coral-500/20 text-coral-300 border-coral-400/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.status === 'ONGOING' ? 'bg-teal-400' : 'bg-coral-400'
                }`}
              />
              {project.status === 'ONGOING' ? 'Ongoing' : 'Completed'}
            </span>
          </div>

          {/* Save/heart button — top-right */}
          <button
            onClick={(e) => onToggleSave(project.id, e)}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center transition-all duration-200 hover:bg-black/60"
            aria-label={isSaved ? 'Remove from saved' : 'Save project'}
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                isSaved ? 'fill-rose-400 text-rose-400 scale-110' : 'text-white/80'
              }`}
            />
          </button>

          {/* Photo count badge — bottom-left */}
          {photoCount > 0 && (
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 text-[11px] font-medium text-white/80 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
              <Camera className="w-3.5 h-3.5" />
              <span>{photoCount}</span>
            </div>
          )}

          {/* Availability % — bottom-right */}
          <div className="absolute bottom-3 right-3 z-10 text-right">
            <span className="text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {project.percentAvailable}%
            </span>
            <span className="block text-[9px] text-white/70 uppercase tracking-wider">
              Available
            </span>
          </div>
        </div>

        {/* Below image: only project name and location */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-text-main leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
            {project.location}
          </p>

          {onInquire && (
            <span className="mt-2 w-full flex items-center justify-center gap-1 bg-accent text-text-on-accent text-xs font-bold py-2 px-3 rounded-xl">
              View details
              <Eye className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
