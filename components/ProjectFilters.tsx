/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SlidersHorizontal,
  Search,
  ChevronDown,
  X,
} from 'lucide-react';
import { ProjectStatus } from '@/lib/types';

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'ONGOING', label: 'Ongoing' },
  { value: 'COMPLETED', label: 'Completed' },
];

const LOCATION_OPTIONS = ['All', 'Jolshiri Abashon', 'Nayapaltan'];

interface DropdownState {
  status: boolean;
  location: boolean;
}

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedStatuses: ProjectStatus[];
  onStatusChange: (statuses: ProjectStatus[]) => void;
  selectedArea: string;
  onAreaChange: (area: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
  statusCounts: Record<ProjectStatus, number>;
  locationCounts: Record<string, number>;
}

export default function ProjectFilters({
  searchQuery,
  onSearchChange,
  selectedStatuses,
  onStatusChange,
  selectedArea,
  onAreaChange,
  onClearFilters,
  hasActiveFilters,
  resultCount,
  statusCounts,
  locationCounts,
}: ProjectFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<keyof DropdownState | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: keyof DropdownState) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleStatus = (status: ProjectStatus) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  const FilterDropdowns = () => {
    const statusTriggerCount = selectedStatuses.length === 0
      ? (statusCounts.ONGOING ?? 0) + (statusCounts.COMPLETED ?? 0)
      : selectedStatuses.length === 1
        ? (statusCounts[selectedStatuses[0]] ?? 0)
        : resultCount;

    return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status multi-select */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('status')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-main bg-surface-alt text-xs font-medium text-text-main hover:border-text-muted transition-colors cursor-pointer"
        >
          <span>
            {selectedStatuses.length === 0
              ? 'Status'
              : selectedStatuses.length === 1
              ? selectedStatuses[0] === 'ONGOING'
                ? 'Ongoing'
                : 'Completed'
              : `${selectedStatuses.length} selected`}
          </span>
          <span className="text-[10px] font-semibold text-text-muted bg-surface-muted rounded-md px-1.5 py-0.5 tabular-nums">
            {statusTriggerCount}
          </span>
          <ChevronDown className={`w-3 h-3 text-text-muted transition-transform ${openDropdown === 'status' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'status' && (
          <div className="absolute top-full left-0 mt-1 z-30 min-w-[160px] bg-surface-alt border border-border-main rounded-xl shadow-lg p-2">
            {STATUS_OPTIONS.map((opt) => {
              const count = statusCounts[opt.value] ?? 0;
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleStatus(opt.value)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedStatuses.includes(opt.value)
                      ? 'bg-accent/10 text-accent'
                      : 'text-text-secondary hover:bg-surface-muted'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                        selectedStatuses.includes(opt.value)
                          ? 'border-accent bg-accent'
                          : 'border-border-main'
                      }`}
                    >
                      {selectedStatuses.includes(opt.value) && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {opt.label}
                  </div>
                  <span className="text-[10px] font-semibold text-text-muted bg-surface-muted rounded-md px-1.5 py-0.5 tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Location dropdown */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('location')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-main bg-surface-alt text-xs font-medium text-text-main hover:border-text-muted transition-colors cursor-pointer"
        >
          <span>{selectedArea}</span>
          <span className="text-[10px] font-semibold text-text-muted bg-surface-muted rounded-md px-1.5 py-0.5 tabular-nums">
            {locationCounts[selectedArea] ?? 0}
          </span>
          <ChevronDown className={`w-3 h-3 text-text-muted transition-transform ${openDropdown === 'location' ? 'rotate-180' : ''}`} />
        </button>
        {openDropdown === 'location' && (
          <div className="absolute top-full left-0 mt-1 z-30 min-w-[180px] bg-surface-alt border border-border-main rounded-xl shadow-lg p-2">
            {LOCATION_OPTIONS.map((loc) => {
              const count = locationCounts[loc] ?? 0;
              return (
                <button
                  key={loc}
                  onClick={() => { onAreaChange(loc); toggleDropdown('location'); }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedArea === loc
                      ? 'bg-accent/10 text-accent'
                      : 'text-text-secondary hover:bg-surface-muted'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedArea === loc ? 'border-accent' : 'border-border-main'
                      }`}
                    >
                      {selectedArea === loc && (
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                    {loc}
                  </div>
                  <span className="text-[10px] font-semibold text-text-muted bg-surface-muted rounded-md px-1.5 py-0.5 tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
  };

  return (
    <div className="flex flex-col gap-4" ref={dropdownRef}>
      {/* Header row: title + count */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mt-10 text-text-main tracking-tight">
            Our Developments
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            <span className="font-semibold text-text-main">{resultCount}</span> projects found
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-main bg-surface-alt text-xs font-medium text-text-main hover:bg-surface-muted transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by project name or location..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-main bg-surface-alt text-sm focus:outline-none focus:border-accent/50 transition-colors text-text-main placeholder:text-text-muted"
        />
      </div>

      {/* Desktop filter bar */}
      <div className="hidden md:flex flex-wrap items-center justify-between gap-3">
        <FilterDropdowns />

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-xs font-medium text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Mobile filter panel */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-2 pt-2 pb-1">
              <FilterDropdowns />
            </div>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1 text-xs font-medium text-text-muted hover:text-text-secondary transition-colors mt-2 cursor-pointer"
              >
                <X className="w-3 h-3" />
                Clear all filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
