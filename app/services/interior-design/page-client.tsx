'use client';

import InteriorHero from '@/components/interior/InteriorHero';
import ServiceGrid from '@/components/interior/ServiceGrid';
import PortfolioGallery from '@/components/interior/PortfolioGallery';
import ProcessTimeline from '@/components/interior/ProcessTimeline';
import type { InteriorDesign } from '@/lib/designs';

interface PageClientProps {
  designs: InteriorDesign[];
}

export default function InteriorDesignPageClient({ designs }: PageClientProps) {
  return (
    <div className="min-h-screen bg-surface">
      <InteriorHero />
      <ServiceGrid />
      <PortfolioGallery designs={designs} />
      <ProcessTimeline />
    </div>
  );
}
