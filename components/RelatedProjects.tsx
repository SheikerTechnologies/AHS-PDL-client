/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { DevelopmentProject } from '@/lib/types';
import { getProjects } from '@/lib/api/projects';
import { titleToSlug } from '@/lib/slugs';

interface RelatedProjectsProps {
  currentProject: DevelopmentProject;
  maxItems?: number;
}

function getLocationString(project: DevelopmentProject): string {
  const parts = [project.location.area, project.location.city].filter(Boolean);
  return parts.join(', ') || project.location.address;
}

export default function RelatedProjects({ currentProject, maxItems = 3 }: RelatedProjectsProps) {
  const [projects, setProjects] = useState<DevelopmentProject[]>([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(() => {});
  }, []);

  const related = projects.filter(
    (p) =>
      p.id !== currentProject.id &&
      (p.location.area === currentProject.location.area || p.status === currentProject.status)
  )
    .slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold text-text-main mb-6">Similar Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((project, idx) => {
          const slug = project.slug || titleToSlug(project.title);
          const photoCount = project.gallery?.length || 0;
          const isOngoing = project.status?.toLowerCase() === 'ongoing';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              <Link
                href={`/projects/${slug}`}
                className="group block relative rounded-xl overflow-hidden bg-surface-alt border border-border-main/80 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-muted">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full backdrop-blur-sm border ${
                        isOngoing
                          ? 'bg-teal-500/20 text-teal-300 border-teal-400/30'
                          : 'bg-coral-500/20 text-coral-300 border-coral-400/30'
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          isOngoing ? 'bg-teal-400' : 'bg-coral-400'
                        }`}
                      />
                      {isOngoing ? 'Ongoing' : 'Done'}
                    </span>
                  </div>

                  {/* Photo count */}
                  {photoCount > 0 && (
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[10px] font-medium text-white/80 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded">
                      <Camera className="w-3 h-3" />
                      <span>{photoCount}</span>
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="text-xs font-semibold text-text-main leading-snug group-hover:text-accent transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-1">
                    {getLocationString(project)}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
