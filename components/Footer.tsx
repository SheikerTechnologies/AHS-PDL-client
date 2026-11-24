'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Site-wide footer for AHS Properties & Development Ltd.
 * 4-column layout on desktop, stacks to single column on mobile.
 * Includes brand, navigation, AHS Group links, contact info, map card, and legal bottom bar.
 */

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import FooterLogo from './FooterLogo';
import { AGENTS } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const primaryAgent = AGENTS[0];

  return (
    <footer className="w-full bg-surface-muted border-t border-border-main">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {/* ============================================================
             MAIN 4-COLUMN GRID — staggered fade-in on scroll
             ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* ==========================================
               COLUMN 1 — Brand
               ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col gap-5"
          >
            <FooterLogo />

            <div>
              <h2 className="text-base font-bold text-text-main tracking-tight">
                AHS Properties &amp; Development Ltd.
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mt-1">
                Premium real estate development in Bangladesh — transforming properties into
                landmark destinations.
              </p>
            </div>

            {/* Social Icon Row */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com/ahsp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border-main bg-surface-alt text-text-secondary hover:bg-accent hover:text-text-on-accent hover:border-accent flex items-center justify-center transition-all duration-200 hover:scale-110"
                title="Facebook"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com/ahsp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border-main bg-surface-alt text-text-secondary hover:bg-accent hover:text-text-on-accent hover:border-accent flex items-center justify-center transition-all duration-200 hover:scale-110"
                title="Instagram"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://linkedin.com/company/ahsp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border-main bg-surface-alt text-text-secondary hover:bg-accent hover:text-text-on-accent hover:border-accent flex items-center justify-center transition-all duration-200 hover:scale-110"
                title="LinkedIn"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://youtube.com/@ahsp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border-main bg-surface-alt text-text-secondary hover:bg-accent hover:text-text-on-accent hover:border-accent flex items-center justify-center transition-all duration-200 hover:scale-110"
                title="YouTube"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube size={16} />
              </a>
            </div>
          </motion.div>

          {/* ==========================================
               COLUMN 2 — Explore (Site Navigation)
               ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em]">
              Explore
            </span>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Projects', href: '/projects' },
                { label: 'Landowners', href: '/landowners' },
                { label: 'Blog', href: '/blog' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors duration-200 w-fit"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3 h-3 text-text-muted group-hover:text-accent transition-colors opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-200" />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* ==========================================
               COLUMN 3 — AHS Group
               ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em]">
              AHS Group
            </span>
            <nav className="flex flex-col gap-3">
              {[
                {
                  label: 'AHS Properties & Development Ltd.',
                  href: 'https://ahspdl.com/',
                  external: true,
                },
                {
                  label: 'Sun Solaris Ltd.',
                  href: 'https://sunsolaris.ltd/',
                  external: true,
                },
                {
                  label: 'AHS Enterprise',
                  href: 'https://www.ahs-enterprise.com/',
                  external: true,
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="group inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors duration-200 w-fit"
                >
                  <span>{link.label}</span>
                  {link.external && (
                    <ArrowUpRight className="w-3 h-3 text-text-muted group-hover:text-accent transition-colors" />
                  )}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* ==========================================
               COLUMN 4 — Get in Touch
               ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em]">
              Get in touch
            </span>
            <div className="flex flex-col gap-3.5">
              {/* Address */}
              <a
                href="https://maps.google.com/?q=W-20/2+67/1+China+Town+VIP+Road+Naya+Palton+Dhaka+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                aria-label="Open office location on Google Maps"
              >
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>
                  W-20/2, 67/1, China Town,
                  <br />
                  VIP Road, Naya Palton, Dhaka
                </span>
              </a>

              {/* Phone (Sales) */}
              <a
                href="tel:01625555700"
                className="group flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                aria-label="Call sales at 01625-555700"
              >
                <Phone className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <span>01625-555700 (Sales)</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801725555700"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                aria-label="Chat on WhatsApp at 01725-555700"
              >
                <MessageCircle className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <span>01725-555700 (WhatsApp)</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${primaryAgent.email}`}
                className="group flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors duration-200 break-all"
                aria-label="Send us an email"
              >
                <Mail className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                <span>{primaryAgent.email}</span>
              </a>
            </div>

            {/* Enquire Now Button */}
            <Link
              href="/#contact-broker-section"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-text-on-accent text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md w-fit dark:btn-glow-accent"
            >
              Enquire Now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* ============================================================
             DIVIDER — fade in
             ============================================================ */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-px bg-border-main/80 mb-8 origin-left"
        />

        {/* ============================================================
             MAP CARD (replaces newsletter — no signup form)
             ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-surface-alt border border-border-main rounded-2xl overflow-hidden flex flex-col sm:flex-row items-stretch mb-10"
        >
          {/* Map Thumbnail */}
          <div className="relative w-full sm:w-[160px] h-[130px] shrink-0 overflow-hidden bg-surface-muted">
            <iframe
              src="https://maps.google.com/maps?q=W-20%2F2+67%2F1+China+Town+VIP+Road+Naya+Palton+Dhaka&output=embed"
              width="160"
              height="130"
              style={{ border: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AHS Properties office location map"
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Map Card Text */}
          <div className="flex-1 flex flex-col justify-center px-6 py-5 sm:py-0 gap-1.5">
            <h4 className="text-sm font-bold text-text-main tracking-tight">
              Visit our Naya Paltan office
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              W-20/2, 67/1, China Town, VIP Road, Naya Palton, Dhaka-1000
            </p>
            <a
              href="https://maps.google.com/?q=W-20/2+67/1+China+Town+VIP+Road+Naya+Palton+Dhaka+Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover transition-colors mt-1 w-fit"
            >
              Get directions
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* ============================================================
             BOTTOM BAR
             ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary"
        >
          <p className="text-center md:text-left">
            &copy; {currentYear} AHS Properties &amp; Development Ltd. All rights reserved.
          </p>
          <div className="flex gap-5 flex-wrap justify-center">
            <Link
              href="/legal#privacy-policy"
              className="hover:text-accent transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal#terms-of-service"
              className="hover:text-accent transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
