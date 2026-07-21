'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { DevelopmentProject, ProjectStatus } from '@/lib/types';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilters from '@/components/ProjectFilters';
import Pagination from '@/components/Pagination';
import TrustBadges from '@/components/TrustBadges';

const PROJECTS_PER_PAGE = 12;

interface ProjectsRouteClientProps {
  projects: DevelopmentProject[];
}

function getLocationString(project: DevelopmentProject): string {
  const parts = [project.location.area, project.location.city].filter(Boolean);
  return parts.join(', ') || project.location.address;
}

/** Shared search matcher used by both the main filter and dynamic count badges. */
function matchesSearch(project: DevelopmentProject, query: string): boolean {
  if (query === '') return true;
  const q = query.toLowerCase();
  return (
    project.title.toLowerCase().includes(q) ||
    getLocationString(project).toLowerCase().includes(q) ||
    project.description.toLowerCase().includes(q)
  );
}

/** Parse a comma-separated status string from the URL, filtering out invalid values. */
function parseStatusParam(raw: string | null): ProjectStatus[] {
  if (!raw) return [];
  return raw.split(',').filter((s): s is ProjectStatus =>
    s === 'Ongoing' || s === 'Completed'
  );
}

export default function ProjectsRouteClient({ projects }: ProjectsRouteClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── Initialize state from URL search params ────────────────────────
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>(
    () => parseStatusParam(searchParams.get('status'))
  );
  const [selectedArea, setSelectedArea] = useState(searchParams.get('area') ?? 'All');
  const [currentPage, setCurrentPage] = useState(() => {
    const raw = searchParams.get('page');
    return raw ? Math.max(1, parseInt(raw, 10)) : 1;
  });

  // Saved projects (localStorage)
  const [savedProjects, setSavedProjects] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('ahsp-saved-projects');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

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

  // ── Sync state → URL search params ─────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set('q', searchQuery);
    if (selectedStatuses.length > 0) params.set('status', selectedStatuses.join(','));
    if (selectedArea !== 'All') params.set('area', selectedArea);
    if (currentPage > 1) params.set('page', String(currentPage));

    const queryString = params.toString();
    const newUrl = queryString ? `/projects?${queryString}` : '/projects';

    // Use replace so the browser back button works cleanly per navigation
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedStatuses, selectedArea, currentPage, router]);

  // ── Dynamic count badges ───────────────────────────────────────────
  const dynamicStatusCounts = useMemo(() => {
    const base = projects.filter((p) => {
      const searchMatch = matchesSearch(p, searchQuery);
      const areaMatch = selectedArea === 'All' || p.location.area === selectedArea;
      return searchMatch && areaMatch;
    });
    return {
      Ongoing: base.filter((p) => p.status?.toLowerCase() === 'ongoing').length,
      Completed: base.filter((p) => p.status?.toLowerCase() === 'completed').length,
    };
  }, [projects, searchQuery, selectedArea]);

  const dynamicLocationCounts = useMemo(() => {
    const base = projects.filter((p) => {
      const searchMatch = matchesSearch(p, searchQuery);
      const statusMatch =
        selectedStatuses.length === 0 || selectedStatuses.includes(p.status as ProjectStatus);
      return searchMatch && statusMatch;
    });
    const counts: Record<string, number> = { All: base.length };
    for (const p of base) {
      counts[p.location.area] = (counts[p.location.area] ?? 0) + 1;
    }
    return counts;
  }, [projects, searchQuery, selectedStatuses]);

  // ── Derived filter logic ───────────────────────────────────────────
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchMatch = matchesSearch(project, searchQuery);
      const statusMatch =
        selectedStatuses.length === 0 || selectedStatuses.includes(project.status as ProjectStatus);
      const areaMatch = selectedArea === 'All' || project.location.area === selectedArea;
      return searchMatch && statusMatch && areaMatch;
    });
  }, [projects, searchQuery, selectedStatuses, selectedArea]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedStatuses.length > 0 ||
    selectedArea !== 'All';

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedStatuses([]);
    setSelectedArea('All');
    setCurrentPage(1);
  }, []);

  return (
    <div className="w-full min-h-screen bg-surface">
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 flex flex-col gap-8">
        {/* Filters */}
        <ProjectFilters
          searchQuery={searchQuery}
          onSearchChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
          selectedStatuses={selectedStatuses}
          onStatusChange={(s) => { setSelectedStatuses(s); setCurrentPage(1); }}
          selectedArea={selectedArea}
          onAreaChange={(a) => { setSelectedArea(a); setCurrentPage(1); }}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          resultCount={filteredProjects.length}
          statusCounts={dynamicStatusCounts}
          locationCounts={dynamicLocationCounts}
        />

        {/* Project card grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6"
        >
          {paginatedProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedProjects.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isSaved={savedProjects.includes(project.id)}
                    onToggleSave={toggleSave}
                    index={idx}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-muted flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-text-main mb-1">No projects match your filters</h3>
              <p className="text-sm text-text-secondary mb-4 max-w-sm">
                Try adjusting your search criteria or clearing all filters to see all available projects.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 bg-accent text-text-on-accent text-xs font-bold rounded-full hover:bg-accent-hover transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Trust badges */}
        <div className="mt-8">
          <TrustBadges />
        </div>
      </section>
    </div>
  );
}
