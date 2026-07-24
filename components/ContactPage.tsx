/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Check,
  ArrowUpRight,
  CheckCircle,
  Navigation,
} from 'lucide-react';
import AHSLogo from './AHSLogo';
import { createInquiry } from '@/lib/api/inquiries';

interface ContactPageProps {
  onInquireClick: () => void;
}

interface Location {
  id: string;
  label: string;
  title: string;
  address: string;
  coords: string;
  lat: string;
  lng: string;
  landmarks: string[];
  routes: string[];
  accent: string;
}

export default function ContactPage({ onInquireClick }: ContactPageProps) {
  const [activeMapTab, setActiveMapTab] = useState('corporate');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('BD');
  const [phoneVal, setPhoneVal] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phoneVal || !message) {
      alert('Please fill out all required fields.');
      return;
    }
    setLoading(true);
    try {
      const prefixMap: Record<string, string> = { BD: '+880', US: '+1', UK: '+44' };
      const phone = phoneVal.startsWith('+') ? phoneVal : `${prefixMap[phonePrefix]}${phoneVal}`;

      await createInquiry({ firstName, lastName, email, phone, message });

      setLoading(false);
      setSubmitted(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneVal('');
      setMessage('');
    } catch (err) {
      console.error('Contact form error:', err);
      setLoading(false);
      alert(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const mapSrcs: Record<string, string> = {
    corporate: 'https://maps.google.com/maps?q=W-20%2F2+67%2F1+China+Town+VIP+Road+Naya+Palton+Dhaka&output=embed',
    cantonment: 'https://maps.google.com/maps?q=Rajanigandha+Tower+Dhaka+Cantonment&output=embed',
    jolshiri: 'https://maps.google.com/maps?q=Jolshiri+Abashon+Sector+16+Dhaka&output=embed',
  };

  const locations: Location[] = [
    {
      id: 'corporate',
      label: '🏢 CORPORATE HQ',
      title: 'Corporate Headquarters',
      address: 'W-20/2, 67/1, China Town, VIP Road, Naya Palton, Dhaka-1000.',
      coords: '23.7317° N, 90.4132° E',
      lat: '23.731720',
      lng: '90.413240',
      landmarks: ['China Town Plaza', 'Motijheel VIP Bypass', 'Baitul Mukarram'],
      routes: ['15 mins from Dhaka Station', '35 mins from Hazrot Shahjalal Airport'],
      accent: '#b84822',
    },
    {
      id: 'cantonment',
      label: '🔰 MILITARY OFFICE',
      title: 'Cantonment Project Office',
      address: '2nd Floor, Rajanigandha Tower, Dhaka Cantonment',
      coords: '23.7915° N, 90.3892° E',
      lat: '23.791515',
      lng: '90.389240',
      landmarks: ['Golf Club Gate', 'Rajnigandha Center', 'Armed Forces Division'],
      routes: ['5 mins from Cantonment Terminal', '20 mins from Airport via VIP Bypass'],
      accent: '#15803d',
    },
    {
      id: 'jolshiri',
      label: '🌿 LAKESIDE COMPLEX',
      title: 'Jolshiri Abashon Site',
      address: 'Plot-42, Road-505, Sector-16, Jolshiri Abashon',
      coords: '23.7745° N, 90.4908° E',
      lat: '23.774522',
      lng: '90.490815',
      landmarks: ['Sector 16 Canalway', 'Jolshiri Central Green Park', 'Lakeside Walkway'],
      routes: ['10 mins from Bashundhara Gate', '25 mins from Airport via Kuril Flyover'],
      accent: '#0369a1',
    },
  ];

  const activeLocation = locations.find((loc) => loc.id === activeMapTab)!;

  const getDirectionsUrl = (lat: string, lng: string) => 
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

  return (
    <div className="w-full bg-surface pt-24 overflow-hidden selection:bg-navy selection:text-text-on-accent font-sans">

      {/* HERO */}
      <section className="relative w-full h-[45vh] md:h-[55vh] flex flex-col items-center justify-center overflow-hidden bg-stone-900 border-b border-border-main">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.35 }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80"
              alt="Bangladesh Road Network Map"
              fill
              className="object-cover saturate-0 contrast-125"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/80" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-4 text-white select-none">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Contact & Locations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-sm md:text-lg text-stone-200 font-normal leading-relaxed"
          >
            Our offices across Dhaka
          </motion.p>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="w-full py-20 bg-surface-alt border-b border-border-light">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-2 select-none">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight">
              Send Us an Enquiry
            </h2>
            <p className="text-sm text-text-secondary leading-normal font-normal">
              Fill out the form below and we&rsquo;ll get back to you within 24 hours
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info (Cleaned - No Duplication) */}
            <div className="lg:col-span-5 flex flex-col gap-8 text-left select-none">
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-gold tracking-wider uppercase">PHONE</span>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <a href="tel:01625555700" className="text-sm font-bold text-text-main hover:text-gold transition-colors">01625-555700</a>
                      <a href="tel:01725555700" className="text-sm font-bold text-text-main hover:text-gold transition-colors">01725-555700</a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center text-text-secondary shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-gold tracking-wider uppercase">EMAIL</span>
                    <a href="mailto:ahspropertiesdevelopmentltd@gmail.com" className="text-sm font-bold text-text-main hover:text-gold transition-colors mt-0.5 break-all">
                      ahspropertiesdevelopmentltd@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-surface-muted/60 rounded-2xl border border-border-main/80 p-6 flex flex-col gap-4 shadow-sm">
                <h4 className="text-sm font-extrabold text-text-main tracking-tight">Why Choose AHS?</h4>
                <ul className="flex flex-col gap-3">
                  {[
                    'Premium residential and commercial spaces across Bangladesh',
                    'A legacy of elite discipline, integrity, and visionary leadership',
                    'Innovative architecture merging art with utility',
                    'Uncompromising material quality and delivery assurance',
                  ].map((bullet) => (
                    <li key={bullet} className="flex gap-2 items-start text-xs text-text-secondary font-medium leading-normal">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7 bg-surface-alt border border-border-main/80 rounded-[32px] p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 px-4"
                  >
                    <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a3a22] tracking-tight">Thank You for Reaching Out!</h3>
                    <p className="text-xs md:text-sm text-stone-500 leading-relaxed mt-2 max-w-sm">
                      We have received your enquiry. A dedicated specialist will contact you within 24 hours.
                    </p>
                    <button                       onClick={() => setSubmitted(false)}                       className="mt-6 font-extrabold bg-accent hover:bg-accent-hover text-text-on-accent text-xs px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer dark:btn-glow-accent"
                    >
                      Send Another Enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                    {/* Form fields remain the same - unchanged for brevity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider pl-0.5">First Name *</label>
                        <input type="text" required placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                          className="px-4 py-2.5 rounded-xl border border-border-main text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-surface-muted transition-all font-medium text-text-main" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider pl-0.5">Last Name *</label>
                        <input type="text" required placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}
                          className="px-4 py-2.5 rounded-xl border border-border-main text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-surface-muted transition-all font-medium text-text-main" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider pl-0.5">Email Address *</label>
                      <input type="email" required placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-border-main text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-surface-muted transition-all font-medium text-text-main" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider pl-0.5">Phone Number</label>
                      <div className="flex gap-2">
                        <select value={phonePrefix} onChange={(e) => setPhonePrefix(e.target.value)}
                          className="px-3 py-2.5 rounded-xl border border-border-main text-xs md:text-sm outline-none bg-surface-muted font-semibold cursor-pointer">
                          <option value="BD">BD (+880)</option>
                          <option value="US">US (+1)</option>
                          <option value="UK">UK (+44)</option>
                        </select>
                        <input type="tel" placeholder="+880 XXXXX-XXXXXX" value={phoneVal} onChange={(e) => setPhoneVal(e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-border-main text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-surface-muted transition-all font-medium text-text-main" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-extrabold text-text-secondary uppercase tracking-wider pl-0.5">Your Message *</label>
                      <textarea required rows={5} placeholder="Tell us about your property requirements..." value={message} onChange={(e) => setMessage(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-border-main text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-surface-muted transition-all font-medium text-text-main resize-none" />
                    </div>

                    <button type="submit" disabled={loading}                       className="w-full bg-accent text-text-on-accent hover:bg-accent-hover disabled:opacity-50 text-xs md:text-sm font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer">
                      {loading ? 'Sending Enquiry...' : 'Send Enquiry'}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MAP + CARDS */}
      <section className="w-full bg-surface-muted border-b border-border-main">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-8 text-center flex flex-col gap-2 select-none">
          <span className="text-[10px] font-extrabold text-[#b84822] tracking-[0.2em] uppercase">📍 OUR LOCATIONS</span>
          <h2 className="text-3xl font-extrabold text-text-main tracking-tight leading-none mt-1">
            Interactive Office Locator
          </h2>
        </div>

        {/* Tabs */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex gap-3 mb-6 overflow-x-auto pb-2 select-none">
          {locations.map((loc) => {
            const isActive = activeMapTab === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setActiveMapTab(loc.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border cursor-pointer"
                style={{
                  backgroundColor: isActive ? loc.accent : 'var(--color-surface-alt)',
                  color: isActive ? 'white' : 'var(--color-text-secondary)',
                  borderColor: isActive ? loc.accent : 'var(--color-border)',
                  boxShadow: isActive ? `0 4px 14px ${loc.accent}40` : 'none',
                }}
              >
                {loc.label}
              </button>
            );
          })}
        </div>

        {/* Map */}
        <div className="w-full relative h-[460px] md:h-[560px] lg:h-[620px]">
          <div className="absolute top-4 left-6 z-20 select-none pointer-events-none">
            <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-bold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>GPS SECTOR: {activeMapTab.toUpperCase()}</span>
            </div>
          </div>

          <iframe
            key={activeMapTab}
            src={mapSrcs[activeMapTab]}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map for ${activeLocation.title}`}
          />
        </div>

        {/* Location Cards */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc, i) => {
              const isActive = activeMapTab === loc.id;
              return (
                <motion.div
                  key={loc.id}
                  onClick={() => setActiveMapTab(loc.id)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-left w-full rounded-3xl overflow-hidden cursor-pointer transition-all bg-surface-alt border shadow-sm"
                  style={{
                    borderColor: isActive ? loc.accent : 'var(--color-border)',
                    boxShadow: isActive
                      ? `0 20px 50px ${loc.accent}20`
                      : '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="h-1 w-full" style={{ backgroundColor: isActive ? loc.accent : 'var(--color-border)' }} />

                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[9px] font-extrabold tracking-widest uppercase" style={{ color: isActive ? loc.accent : '#a8a29e' }}>
                          {loc.label}
                        </span>
                        <h3 className="text-sm font-black text-text-main mt-1">{loc.title}</h3>
                      </div>
                      <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black"
                        style={{ backgroundColor: isActive ? loc.accent : 'var(--color-surface-muted)', color: isActive ? 'white' : 'var(--color-text-muted)' }}>
                        {i + 1}
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <MapPin className="w-5 h-5 mt-0.5 shrink-0" style={{ color: isActive ? loc.accent : '#a8a29e' }} />
                      <p className="text-xs text-text-secondary leading-relaxed">{loc.address}</p>
                    </div>

                    <a
                      href={getDirectionsUrl(loc.lat, loc.lng)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold hover:underline"
                      style={{ color: loc.accent }}
                    >
                      <Navigation className="w-4 h-4" />
                      GET DIRECTIONS
                    </a>

                    {/* Other details (landmarks, routes) unchanged */}
                    <div className="text-[9px] font-mono font-bold px-3 py-1.5 rounded-lg w-fit"
                      style={{ backgroundColor: isActive ? `${loc.accent}10` : 'var(--color-surface-muted)', color: isActive ? loc.accent : 'var(--color-text-muted)' }}>
                      {loc.coords}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full py-16 bg-surface">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-alt rounded-[40px] border border-border-main/60 p-8 md:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.03)] grid grid-cols-1 md:grid-cols-12 gap-10 items-center"
          >
            <div className="md:col-span-7">
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight leading-snug">
                Ready to Find Your Perfect Property?
              </h2>
              <p className="text-sm text-text-secondary mt-3 max-w-md">
                Browse our exclusive listings or speak with our expert team.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <button onClick={onInquireClick} className="bg-accent hover:bg-accent-hover text-text-on-accent text-xs font-extrabold px-6 py-3 rounded-full flex items-center gap-2 transition-all dark:btn-glow-accent">
                  View Properties <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={onInquireClick} className="border border-accent text-accent text-xs font-extrabold px-6 py-3 rounded-full hover:bg-accent/10 transition-all">
                  Schedule a Viewing
                </button>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div className="w-56 h-56 bg-white rounded-2xl border border-border-main flex items-center justify-center">
                <AHSLogo type="full" iconSize={65} textColor="dark" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}