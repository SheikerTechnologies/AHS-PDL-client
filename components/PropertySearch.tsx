/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowUpRight, Eye } from 'lucide-react';
import { DevelopmentProject } from '@/lib/types';
import { getProjects } from '@/lib/api/projects';
import ProjectCard from '@/components/ProjectCard';

interface PropertySearchProps {
  onInquire?: (project: DevelopmentProject) => void;
  maxItems?: number;
  viewAllHref?: string;
  projects?: DevelopmentProject[];
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-surface-alt border border-border-main/80 animate-pulse">
      <div className="aspect-[3/4] bg-surface-muted" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-surface-muted rounded w-3/4" />
        <div className="h-3 bg-surface-muted rounded w-1/2" />
      </div>
    </div>
  );
}

export default function PropertySearch({
  onInquire,
  maxItems,
  viewAllHref,
  projects: initialProjects,
}: PropertySearchProps) {
  const [projects, setProjects] = useState<DevelopmentProject[]>(
    () => initialProjects
      ? [...initialProjects].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      : []
  );
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState(false);
  const [savedProjects, setSavedProjects] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('ahsp-saved-projects');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (initialProjects) return;
    let cancelled = false;
    getProjects()
      .then((data) => {
        if (cancelled) return;
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setProjects(sorted);
        setError(false);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [maxItems, initialProjects]);

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

  const displayedProjects = maxItems ? projects.slice(0, maxItems) : projects;

  return (
    <div className="flex flex-col gap-8">
      {/* Results count */}
      {!loading && !error && (
        <div className="flex justify-between items-center px-1">
          <span className="text-xs text-text-secondary font-bold tracking-wide uppercase">
            Found {projects.length} Projects
          </span>
        </div>
      )}

      {/* Property Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: maxItems || 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-surface-muted border border-dashed border-border-main rounded-3xl p-12 text-center">
          <HelpCircle className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <h4 className="font-bold text-text-main">Unable to load featured projects</h4>
          <p className="text-xs text-text-secondary mt-1">Please try again later.</p>
        </div>
      ) : projects.length > 0 ? (
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
          <h4 className="font-bold text-text-main">No featured projects available</h4>
          <p className="text-xs text-text-secondary mt-1">Check back soon for new listings.</p>
        </div>
      )}

      {/* See More / View All Button */}
      {viewAllHref && !loading && !error && projects.length > 0 && (
        <div className="flex justify-center pt-4">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-text-on-accent text-sm font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 group"
          >
            <Eye className="w-4 h-4 text-text-muted group-hover:text-text-on-accent transition-colors" />
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-text-on-accent transition-colors" />
          </Link>
        </div>
      )}
    </div>
  );
}