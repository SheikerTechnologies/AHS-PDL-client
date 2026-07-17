'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Image from "next/image";
import HeroSection from "@/components/sections/HeroSection";
import TrustStats from "@/components/TrustStats";
import ClientMarqueeSection from "@/components/sections/ClientMarqueeSection";
import CEOMessageSection from "@/components/sections/CEOMessageSection";
import ServicesAccordionSection from "@/components/sections/ServicesAccordionSection";
import CTACardSection from "@/components/sections/CTACardSection";
import NewsSection from "@/components/sections/NewsSection";
import ThemeAnalyzer from "@/components/ThemeAnalyzer";
import PropertySearch from "@/components/PropertySearch";
import FAQSection from "@/components/FAQSection";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import { useAppContext } from "./providers";

export default function Home() {
  const { themeAnalyzerOpen, setThemeAnalyzerOpen } = useAppContext();

  const [blurLevel, setBlurLevel] = useState<string>("md");
  const [roundedLevel, setRoundedLevel] = useState<string>("full");
  const handleViewProperties = () => {
    const element = document.getElementById("discover-properties-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStarted = () => {
    const element = document.getElementById("discover-properties-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-surface text-text-main relative flex flex-col justify-between selection:bg-navy selection:text-text-on-accent">
      {/* 1. Hero — simplified with two CTAs */}
        <HeroSection
          onViewProperties={handleViewProperties}
        />

      {/* 2. Trust Stat Strip */}
      <TrustStats />

      {/* 3. Government & Institutional Partners marquee */}
      <ClientMarqueeSection />

      {/* 4. Featured Properties */}
      <section
        id="discover-properties-section"
        className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 flex flex-col gap-6 scroll-mt-24"
      >
        <div>
          <span className="text-xs font-extrabold text-navy tracking-widest uppercase block mb-1">
            REAL ESTATE DECK
          </span>
          <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
            Our Signature Properties
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl">
            Browse our portfolio of premium residential and commercial properties.
          </p>
        </div>
        <PropertySearch
          maxItems={6}
          viewAllHref="/projects"
        />
      </section>

      {/* 5. Video Section */}
      <VideoSection />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* Services Accordion */}
      <ServicesAccordionSection />

      {/* CTA Card */}
      <CTACardSection onGetStarted={handleGetStarted} />

      {/* 7. CEO Message — condensed pull-quote */}
      <CEOMessageSection />

      {/* Theme Analyzer Panel */}
      {themeAnalyzerOpen && (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-4 animate-in slide-in-from-top-10 duration-300">
          <ThemeAnalyzer
            blurLevel={blurLevel}
            setBlurLevel={setBlurLevel}
            roundedLevel={roundedLevel}
            setRoundedLevel={setRoundedLevel}
            onClose={() => setThemeAnalyzerOpen(false)}
          />
        </section>
      )}

      {/* APDL RJSC Registration Certificate */}
      <section
        id="certificate-section"
        className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 scroll-mt-24"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold text-navy tracking-widest uppercase block mb-1">
            OFFICIAL CREDENTIALS
          </span>
          <h2 className="text-3xl font-extrabold text-text-main tracking-tight">
            APDL RJSC Registration Certificate
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl mx-auto mt-2">
            Authenticated by the Registrar of Joint Stock Companies &amp; Firms, Government of the People&rsquo;s Republic of Bangladesh
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative select-none">
          <div className="relative rounded-2xl overflow-hidden border-4 border-border-main shadow-xl bg-surface-muted">
            <Image
              src="/attachments/APDL_RJSC-1.png"
              alt="APDL RJSC Registration Certificate"
              width={1836}
              height={2376}
              className="w-full h-auto object-contain"
              draggable={false}
              loading="lazy"
            />
          </div>
          <p className="text-center text-xs text-text-muted mt-4 select-none">
            RJSC Registration Certificate — AHS Properties &amp; Development Ltd.
          </p>
        </div>
      </section>

      {/* 8. Publications / Blog */}
      <NewsSection />

      {/* 9. FAQ */}
      <FAQSection />

    </div>
  );
}
