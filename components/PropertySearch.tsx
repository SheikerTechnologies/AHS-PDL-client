/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowUpRight, Eye } from 'lucide-react';
import { DevelopmentProject } from '@/lib/types';
import { DEVELOPMENT_PROJECTS } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

interface PropertySearchProps {
  onInquire?: (project: DevelopmentProject) => void;
  maxItems?: number;
  viewAllHref?: string;
}

export default function PropertySearch({
  onInquire,
  maxItems,
  viewAllHref,
}: PropertySearchProps) {
  const [savedProjects, setSavedProjects] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ahsp-saved-projects');
      if (stored) setSavedProjects(JSON.parse(stored));
    } catch {}
  }, []);

  const persistSaved = (ids: string[]) => {
    setSavedProjects(ids);
    try {
      localStorage.setItem('ahsp-saved-projects', JSON.stringify(ids));
    } catch {}
  };

  const toggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const next = savedProjects.includes(id)
      ? savedProjects.filter((pid) => pid !== id)
      : [...savedProjects, id];
    persistSaved(next);
  };

  const displayedProjects = maxItems ? DEVELOPMENT_PROJECTS.slice(0, maxItems) : DEVELOPMENT_PROJECTS;

  return (
    <div className="flex flex-col gap-8">
      {/* Results count */}
      <div className="flex justify-between items-center px-1">
        <span className="text-xs text-text-secondary font-bold tracking-wide uppercase">
          Found {DEVELOPMENT_PROJECTS.length} Projects
        </span>
      </div>

      {/* Property Grid */}
      {DEVELOPMENT_PROJECTS.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              isSaved={savedProjects.includes(project.id)}
              onToggleSave={toggleSave}
              onInquire={onInquire}
              index={idx}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface-muted border border-dashed border-border-main rounded-3xl p-12 text-center">
          <HelpCircle className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <h4 className="font-bold text-text-main">No Projects Found</h4>
          <p className="text-xs text-text-secondary mt-1">Check back soon for new listings.</p>
        </div>
      )}

      {/* See More / View All Button */}
      {viewAllHref && DEVELOPMENT_PROJECTS.length > (maxItems || 0) && (
        <div className="flex justify-center pt-4">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-text-on-accent text-sm font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 group"
          >
            <Eye className="w-4 h-4 text-text-muted group-hover:text-text-on-accent transition-colors" />
            <span>See All Projects</span>
            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-on-accent transition-colors" />
          </Link>
        </div>
      )}
    </div>
  );
}