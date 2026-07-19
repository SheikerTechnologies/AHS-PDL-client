'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, MapPin, Ruler, BedDouble, Building2, Percent } from 'lucide-react';
import { DevelopmentProject } from '@/lib/types';
import { PROJECT_EXTRAS, getDefaultExtras } from '@/lib/projectExtras';
import ProjectGallery from '@/components/ProjectGallery';
import FloorPlanTabs from '@/components/FloorPlanTabs';
import RelatedProjects from '@/components/RelatedProjects';

interface ProjectDetailClientProps {
  project: DevelopmentProject;
  images: string[];
}

export default function ProjectDetailClient({ project, images }: ProjectDetailClientProps) {
  const extras = PROJECT_EXTRAS[project.id] || getDefaultExtras();

  return (
    <div className="min-h-screen bg-surface">
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 flex flex-col gap-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-sm text-text-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/projects" className="hover:text-accent transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-secondary truncate max-w-[200px]">{project.title}</span>
        </motion.nav>

        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all projects
        </Link>

        {/* Gallery (main visual focus) */}
        <ProjectGallery images={images} projectTitle={project.title} status={project.status} />

        {/* Two-column content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          {/* Main column — ~65% */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
            {/* Project name & location */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-main tracking-tight">
                {project.title}
              </h1>
              <div className="flex items-center gap-1.5 mt-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{project.location}</span>
              </div>
            </motion.div>

            {/* Spec grid — 4 stat boxes */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { icon: Ruler, label: 'Size', value: project.sqft || '—', sub: 'sqft' },
                { icon: BedDouble, label: 'Bedrooms', value: project.beds || project.bedrooms || '—', sub: null },
                { icon: Building2, label: 'Total Units', value: `${project.totalUnits}`, sub: 'units' },
                { icon: Percent, label: 'Availability', value: `${project.percentAvailable}%`, sub: null },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-surface-alt border border-border-main/80 rounded-xl p-4 flex flex-col items-start gap-1.5"
                  >
                    <Icon className="w-4 h-4 text-text-muted" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      {stat.label}
                    </span>
                    <span className="text-lg font-bold text-text-main leading-none">{stat.value}</span>
                    {stat.sub && (
                      <span className="text-[10px] text-text-muted">{stat.sub}</span>
                    )}
                  </div>
                );
              })}
            </motion.div>

            {/* About this project */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-lg font-bold text-text-main mb-3">About This Project</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {project.description}
              </p>
              {extras.amenities && extras.amenities.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {extras.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Floor plans section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <h2 className="text-lg font-bold text-text-main mb-4">Floor Plans</h2>
              <FloorPlanTabs units={extras.units} />
            </motion.div>

            {/* Location map */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-lg font-bold text-text-main mb-4">Location</h2>
              <div className="aspect-[16/9] rounded-xl overflow-hidden border border-border-main bg-surface-muted">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902!2d${encodeURIComponent(project.area === 'Jolshiri Abashon' ? '90.4632' : '90.4085')}!3d${encodeURIComponent(project.area === 'Jolshiri Abashon' ? '23.7556' : '23.7381')}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzIwLjAiTiA5MMKwMjcnNDcuNSJF!5e0!3m2!1sen!2sbd!4v1`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '280px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${project.title} location`}
                />
              </div>
            </motion.div>
          </div>

        </div>

        {/* Related projects */}
        <RelatedProjects currentProject={project} />
      </section>
    </div>
  );
}
