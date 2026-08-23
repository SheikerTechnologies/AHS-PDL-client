/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Image from 'next/image';
import { Building2, GraduationCap, Globe, Award, ChevronRight } from 'lucide-react';

const LEADERS = [
  {
    role: 'CHAIRMAN',
    name: 'Lt. Gen. Sabbir Ahmed',
    suffix: '(Retd.)',
    img: '/assets/pepole/LtGenSabbirAhmed.jpeg',
    company: 'AHS Properties & Development Ltd. | Sun Solaris Limited',
    badges: ['SBP', 'OSP', 'SGP', 'ndc', 'psc'],
    bio: 'A distinguished Bangladesh Army officer with 35 years of illustrious service. Served as Chief of General Staff, Bangladesh Army — recognized for exemplary leadership, integrity, and international peacekeeping contributions.',
    education: [
      'Sword of Honor & Academic Gold Medal — Bangladesh Military Academy',
      'Master of Defence Studies — National University of Bangladesh (1st Class)',
      'Master of Defence & Strategic Studies — NDU, Pakistan (CGPA 3.5/4)',
    ],
    global: 'International military, state, and academic delegations representing Bangladesh across the USA, UK, China, France, Germany, Japan & 15+ countries.',
  },
  {
    role: 'MANAGING DIRECTOR',
    name: 'DIG (Rtd.) Md. Abu Kalam Siddique',
    suffix: '',
    img: '/assets/pepole/',
    company: 'AHS Properties & Development Ltd. | Sun Solaris Limited',
    badges: ['UN Medal — Kosovo', 'Darfur Mission'],
    bio: 'Distinguished Police officer with 29 years of exemplary service in Bangladesh Police. Served as Police Commissioner Rajshahi, DIG Industrial Police, and Chief Investigator Monitor in UN Kosovo Mission and Liaison Officer in Darfur Mission, Sudan.',
    education: [
      'BSc (Hons.) & MSc in Botany — Dhaka University',
      'MBA — IBA, Rajshahi University',
      'Malaysia Royal College, Interpol Lyon (France), China University',
    ],
    global: 'General Secretary — Rangpur Bivag Somity. Passionate philanthropist and community leader guiding nation-building initiatives.',
  },
];

function LeaderCard({ leader, idx }: { leader: typeof LEADERS[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
      className="bg-surface-muted/75 hover:bg-surface-muted rounded-[40px] border border-border-main/80 shadow-md hover:shadow-lg transition-all duration-300 p-6 md:p-8 flex flex-col justify-between"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-[#dfad42]/30 shadow-md">
            <Image
              src={leader.img}
              alt={leader.name}
              fill
              className="object-cover"
              sizes="96px"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-extrabold text-[#dfad42] tracking-wider uppercase">{leader.role}</span>
            <h3 className="text-xl md:text-2xl font-extrabold text-text-main tracking-tight mt-0.5">
              {leader.name} {leader.suffix && <span className="text-sm text-stone-500 font-bold font-mono">{leader.suffix}</span>}
            </h3>
            <p className="text-xs text-text-secondary font-semibold tracking-wide flex items-center gap-1.5 mt-1.5">
              <Building2 className="w-3.5 h-3.5 text-stone-400" />
              <span>{leader.company}</span>
            </p>
            {leader.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2.5">
                {leader.badges.map((medal) => (                    <span key={medal} className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-surface-muted text-text-secondary font-mono tracking-wider">
                    {medal.startsWith('UN') || medal.startsWith('Darfur') ? '📌 ' : ''}{medal}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-[1px] bg-stone-250/50" />

        <div className="flex flex-col text-left gap-4">
          <p className="text-xs md:text-sm text-text-secondary font-medium leading-relaxed">{leader.bio}</p>

          <div className="flex flex-col gap-3.5 mt-2 bg-surface-alt/70 rounded-2xl p-4 border border-border-main/40">
            <div className="flex gap-3 items-start">
              <GraduationCap className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest leading-none">Academia & Achievements</span>
                <ul className="list-none flex flex-col gap-1.5 mt-1">
                  {leader.education.map((item, i) => (
                    <li key={i} className="text-[11px] text-stone-600 font-medium leading-normal flex items-start gap-1.5">
                      <ChevronRight className="w-3 h-3 text-[#dfad42] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 items-start border-t border-stone-100 pt-3">
              {idx === 0 ? (
                <Globe className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              ) : (
                <Award className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              )}
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest leading-none">
                  {idx === 0 ? 'Global Experience' : 'Social Impact & Philanthropy'}
                </span>
                <p className="text-[11px] text-stone-600 font-medium leading-relaxed mt-1">{leader.global}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutLeadership() {
  return (
    <section className="w-full py-24 bg-surface-alt border-b border-border-light font-sans">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-16">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
          <span className="text-[10px] font-extrabold text-[#dfad42] tracking-[0.25em] uppercase">
            Leadership & Governance
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight leading-tight">
            A Legacy of Trust and Vision
          </h2>
          <div className="w-12 h-1 bg-[#dfad42] mx-auto rounded-full mt-1" />
          <p className="text-sm md:text-base text-text-secondary leading-relaxed font-normal mt-2">
            Led by distinguished national figures whose careers embody discipline, integrity, and visionary leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {LEADERS.map((leader, idx) => (
            <LeaderCard key={leader.name} leader={leader} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
