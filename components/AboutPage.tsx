/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import AboutHero from '@/components/sections/AboutHero';
import AboutContentSection from '@/components/sections/AboutContentSection';
import AboutBenefitsGrid from '@/components/sections/AboutBenefitsGrid';
import AboutLeadership from '@/components/sections/AboutLeadership';
import AboutStatsBanner from '@/components/sections/AboutStatsBanner';
import AboutCTA from '@/components/sections/AboutCTA';
import AboutCEOMessageFull from '@/components/sections/AboutCEOMessageFull';

interface AboutPageProps {
  onInquireClick: () => void;
}

export default function AboutPage({ onInquireClick }: AboutPageProps) {
  return (
    <div className="w-full bg-surface pt-24 overflow-hidden selection:bg-navy selection:text-text-on-accent">
      <AboutHero />
      <AboutContentSection />
      <AboutBenefitsGrid />
      <AboutLeadership />
      <AboutCEOMessageFull />
      <AboutStatsBanner />
      <AboutCTA onInquireClick={onInquireClick} />
    </div>
  );
}
