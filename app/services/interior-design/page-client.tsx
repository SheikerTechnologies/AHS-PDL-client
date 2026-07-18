'use client';

import InteriorHero from '@/components/interior/InteriorHero';
import ServiceGrid from '@/components/interior/ServiceGrid';
import PortfolioGallery from '@/components/interior/PortfolioGallery';
import ProcessTimeline from '@/components/interior/ProcessTimeline';

export default function InteriorDesignPageClient() {
  return (
    <div className="min-h-screen bg-surface">
      <InteriorHero />
      <ServiceGrid />
      <PortfolioGallery />
      <ProcessTimeline />
    </div>
  );
}
