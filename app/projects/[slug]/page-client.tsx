'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Link from 'next/link';
import {
  ChevronRight,
  ArrowLeft,
  MapPin,
  Ruler,
  BedDouble,
  Building2,
  Percent,
  Bath,
  User,
  Calendar,
  Layers,
  Car,
  Zap,
  Gauge,
  ShieldCheck,
  CreditCard,
  Clock,
  Map,
} from 'lucide-react';
import { DevelopmentProject } from '@/lib/types';
import ProjectGallery from '@/components/ProjectGallery';
import FloorPlanTabs from '@/components/FloorPlanTabs';
import RelatedProjects from '@/components/RelatedProjects';

interface ProjectDetailClientProps {
  project: DevelopmentProject;
  images: string[];
}

function formatPrice(price: number): string {
  return `৳ ${price.toLocaleString('en-US')}`;
}

function getLocationString(project: DevelopmentProject): string {
  const parts = [project.location.area, project.location.city].filter(Boolean);
  return parts.join(', ') || project.location.address;
}

export default function ProjectDetailClient({ project, images }: ProjectDetailClientProps) {
  const locationStr = getLocationString(project);
  const sizeMin = project.overview?.size?.min;
  const sizeMax = project.overview?.size?.max;
  const sizeStr = sizeMin && sizeMax ? `${sizeMin}–${sizeMax}` : '—';
  const bedMin = project.overview?.bedrooms?.min;
  const bedMax = project.overview?.bedrooms?.max;
  const bedStr = bedMin && bedMax ? `${bedMin}–${bedMax}` : '—';
  const bathMin = project.overview?.bathrooms?.min;
  const bathMax = project.overview?.bathrooms?.max;
  const bathStr = bathMin && bathMax ? `${bathMin}–${bathMax}` : '—';
  const totalUnits = project.overview?.totalUnits ?? 0;
  const availableUnits = project.overview?.availableUnits ?? 0;
  const percentAvailable = totalUnits > 0 ? Math.round((availableUnits / totalUnits) * 100) : 0;

  const statusColors: Record<string, string> = {
    Ongoing: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
    Upcoming: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700',
    Completed: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  };
  const statusColor = statusColors[project.status] || 'bg-surface-muted text-text-secondary border-border-main';

  const features = project.features || [];

  const projectInfo = project.projectInfo || {};
  const infoItems = [
    { icon: User, label: 'Developer', value: projectInfo.developer },
    { icon: Calendar, label: 'Completion Date', value: projectInfo.completionDate },
    { icon: Map, label: 'Land Area', value: projectInfo.landArea },
    { icon: Gauge, label: 'Building Height', value: projectInfo.buildingHeight },
    { icon: Layers, label: 'Total Floors', value: projectInfo.totalFloors != null ? `${projectInfo.totalFloors}` : null },
    { icon: Car, label: 'Parking', value: projectInfo.parking },
    { icon: Zap, label: 'Lift', value: projectInfo.lift },
    { icon: Zap, label: 'Generator', value: projectInfo.generator },
    { icon: ShieldCheck, label: 'RAJUK Approval', value: projectInfo.rajukApproved != null ? (projectInfo.rajukApproved ? 'Approved' : 'Not Approved') : null },
  ];

  const pricing = project.pricing || {};
  const pricingItems = [
    { label: 'Starting Price', value: pricing.startingPrice ? formatPrice(pricing.startingPrice) : null },
    { label: 'Maximum Price', value: pricing.maxPrice ? formatPrice(pricing.maxPrice) : null },
    { label: 'Booking Money', value: pricing.bookingMoney ? formatPrice(pricing.bookingMoney) : null },
    { label: 'Installment Available', value: pricing.installmentAvailable != null ? (pricing.installmentAvailable ? 'Yes' : 'No') : null },
    { label: 'Installment Duration', value: pricing.installmentDuration || null },
  ];

  const location = project.location;

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
            {/* Project name, location & status */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-main tracking-tight">
                  {project.title}
                </h1>
                <span className={`text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${statusColor}`}>
                  {project.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{locationStr}</span>
              </div>
            </motion.div>

            {/* Spec grid — 6 stat boxes */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { icon: Ruler, label: 'Size', value: sizeStr, sub: 'sqft' },
                { icon: BedDouble, label: 'Bedrooms', value: bedStr, sub: null },
                { icon: Bath, label: 'Bathrooms', value: bathStr, sub: null },
                { icon: Building2, label: 'Total Units', value: `${totalUnits}`, sub: 'units' },
                { icon: Percent, label: 'Availability', value: `${percentAvailable}%`, sub: `${availableUnits} of ${totalUnits} Units` },
                { icon: Building2, label: 'Status', value: project.status, sub: null },
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
              {project.shortDescription && (
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {project.shortDescription}
                </p>
              )}
              {project.description && (
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.description}
                </p>
              )}
            </motion.div>

            {/* Project Information section */}
            {infoItems.some((item) => item.value != null) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h2 className="text-lg font-bold text-text-main mb-4">Project Information</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {infoItems.map((item) => {
                    const Icon = item.icon;
                    const displayValue = item.value ?? 'Not Available';
                    return (
                      <div
                        key={item.label}
                        className="bg-surface-alt border border-border-main/80 rounded-xl p-3 flex flex-col gap-1.5"
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-text-muted" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{item.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-text-main">{displayValue}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Features & Amenities */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <h2 className="text-lg font-bold text-text-main mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-alt border border-border-main/80 rounded-xl px-3 py-2.5 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Floor plans section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-lg font-bold text-text-main mb-4">Floor Plans</h2>
              <FloorPlanTabs floorPlans={project.floorPlans || []} />
            </motion.div>

            {/* Pricing section */}
            {pricingItems.some((item) => item.value != null) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <h2 className="text-lg font-bold text-text-main mb-4">Pricing</h2>
                <div className="bg-surface-alt border border-border-main/80 rounded-xl p-5">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {pricingItems.map((item) => (
                      <div key={item.label} className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{item.label}</span>
                        <span className="text-sm font-bold text-text-main">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <h2 className="text-lg font-bold text-text-main mb-4">Location</h2>
              <div className="aspect-[16/9] rounded-xl overflow-hidden border border-border-main bg-surface-muted">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902!2d${encodeURIComponent(project.location.area === 'Jolshiri Abashon' ? '90.4632' : '90.4085')}!3d${encodeURIComponent(project.location.area === 'Jolshiri Abashon' ? '23.7556' : '23.7381')}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzIwLjAiTiA5MMKwMjcnNDcuNSJF!5e0!3m2!1sen!2sbd!4v1`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '280px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${project.title} location`}
                />
              </div>
              {/* Location details */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Country', value: location.country },
                  { label: 'City', value: location.city },
                  { label: 'Area', value: location.area },
                  { label: 'Sector', value: location.sector },
                  { label: 'Road', value: location.road },
                  { label: 'Full Address', value: location.address },
                ].map((item) => {
                  const displayValue = item.value || 'Not Available';
                  return (
                    <div
                      key={item.label}
                      className="bg-surface-alt border border-border-main/80 rounded-xl p-3 flex flex-col gap-1"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{item.label}</span>
                      <span className="text-sm font-semibold text-text-main">{displayValue}</span>
                    </div>
                  );
                })}
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
