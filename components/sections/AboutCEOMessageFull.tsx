/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Quote, ChevronDown, Building2 } from "lucide-react";

export default function AboutCEOMessageFull() {
  const [showBengali, setShowBengali] = useState(false);

  return (
    <section id="ceo-message" className="w-full bg-surface border-b border-border-main/60 py-20 select-none scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Section Main Title */}
          <div className="text-center lg:text-left mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-3">
              Leadership Message
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight relative inline-block">
              Message from our CEO
              <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 w-16 h-[3px] bg-accent" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: CEO Image / Badge Area */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative group w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-md border-4 border-white mb-6 transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="/assets/pepole/MdSohanurRahmanSohan.jpeg"
                  alt="Md. Sohanur Rahman Sohan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 288px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-text-main tracking-tight">
                  Md. Sohanur Rahman Sohan
                </h4>
                <p className="text-sm font-bold uppercase tracking-widest text-accent mt-1">
                  Chief Executive Officer
                </p>
                <p className="text-xs text-text-muted mt-0.5">AHS Properties & Development Ltd.</p>
                <div className="mt-4 text-xs text-text-secondary space-y-0.5">
                  <p>Managing Director, Sun Solaris Ltd.</p>
                  <p>Proprietor, AHS Enterprise</p>
                </div>
              </div>
            </div>

            {/* Right Column: Full Message Content */}
            <div className="lg:col-span-8 bg-surface-alt rounded-3xl border border-border-main/80 p-8 md:p-10 shadow-sm relative overflow-hidden">
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-border-light font-serif text-8xl leading-none pointer-events-none select-none">
                &ldquo;
              </div>

              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-text-main tracking-tight">
                  Building Legacies, Shaping the Future
                </h3>
                <p className="text-accent font-medium mt-2">
                  Welcome to AHS Properties & Development Ltd.
                </p>
              </div>

              {/* Full English Message */}
              <div className="text-text-secondary space-y-6 text-[15.2px] leading-relaxed font-normal">
                <p>
                  Our journey began with a vision&ndash; &ldquo;We Build Tomorrow&rdquo; to establish
                  a benchmark of unyielding reliability, top-tier quality, and strategic innovation in
                  Bangladesh&rsquo;s most vital sectors. Over the years, through M/S. AHS Enterprise and Sun Solaris Limited, we have had
                  the distinct honor of serving as a trusted partner to both the military and civil
                  sectors of our nation.
                </p>
                <p>
                  From executing high-stakes strategic projects for the Bangladesh Armed Forces
                  through the DGDP, to delivering critical maritime solutions for the Bangladesh Navy
                  (including the prestigious supply of submarine machinery spares), our track record
                  speaks for itself. Our deep-rooted enlistments with premier national
                  authorities&mdash;such as Dhaka Cantonment Board, BIWTA, PWD, HED, CAAB, MES,
                  BADC, RAJUK, DPHE, CPA, PPA and Distributor of Moddhapara Granite &amp; Mining Co.
                  Ltd &mdash;reflect a legacy built entirely on trust and flawless execution.
                </p>
                <div className="pt-4 border-t border-border-light">
                  <h4 className="text-lg font-semibold text-text-main mb-3">
                    The Evolution: Trust Meets Sustainable Living
                  </h4>
                  <p>
                    True leadership lies in adaptability and forward-thinking. Having mastered major
                    civil construction and critical supply chains, expanding our expertise into
                    premium real estate and sustainable infrastructure was a natural evolution.
                  </p>
                  <p>
                    At AHS Properties &amp; Development Ltd., we don&rsquo;t just build structures;
                    we create environments where modern living aligns with strategic foresight. We
                    bring the same military-grade precision, absolute faithfulness, and uncompromising
                    quality that defined our past successes straight into the property development
                    sector.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-main mb-3">
                    A Vision for Tomorrow
                  </h4>
                  <p>
                    Parallel to shaping urban landscapes, our sister concern, Sun Solaris Limited, is
                    actively driving a mission toward a carbon-free world by making renewable energy
                    both accessible and affordable. This dual commitment to excellence&mdash;crafting
                    superior real estate spaces while championing sustainable, green energy
                    solutions&mdash;positions us at the forefront of Bangladesh&rsquo;s modern
                    development era.
                  </p>
                </div>
                <div className="pt-6 border-t border-border-light text-text-secondary">
                  <p className="italic">
                    To our clients, partners, and stakeholders: thank you for your unwavering trust.
                    As we step into this new era of growth, we pledge to continue delivering superior
                    results, pushing the boundaries of innovation, and building a brighter, more
                    sustainable future for generations to come.
                  </p>
                </div>
              </div>

              {/* Bengali Version */}
              <div
                id="bengali-message"
                role="region"
                lang="bn"
                aria-hidden={!showBengali}
                className={`overflow-hidden transition-all duration-500 ease-in-out mt-10 border-t border-border-light pt-8 ${
                  showBengali ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-text-secondary space-y-6 text-[15px] leading-relaxed">
                  <p className="font-medium text-text-main text-lg">
                    গৌরবময় অর্জনের ধারায় আগামীর রূপরেখা&hellip;
                  </p>
                  <p>
                    আমাদের যাত্রাটি মূলত শুরু &ldquo;গড়ি আগামী&rdquo;- এই লক্ষ্যে অটল আস্থা ও
                    নির্ভরতায় কৌশলগত উদ্ভাবনের দ্বারা উৎকর্ষ মানদন্ড বিনির্মাণ। সময়ের পরিক্রমায়, এ
                    এইচ এস এন্টারপ্রাইজ ও সান সোলারিস লিঃ এর মাধ্যমে সামরিক ও বেসামরিক উভয় খাতে
                    বিশ্বস্ত অংশীদার হিসেবে সেবা করার গৌরব অর্জন করেছি।
                  </p>
                  <p>
                    বাংলাদেশ সশস্ত্র বাহিনীর উচ্চ অগ্রাধিকারপ্রাপ্ত কৌশলগত চাহিদাগুলো ডিজিডিপি ( DGDP
                    ) এর প্রকল্পের মাধ্যমে নির্ভুলভাবে বাস্তবায়ন, বাংলাদেশ নেভি&rsquo;র জন্য
                    গুরুত্বপূর্ণ সামুদ্রিক সমাধান (বিশেষত, সাবমেরিন এর যুদ্ধাস্ত্র ও খুচরা যন্ত্রাংশ)
                    দক্ষতার সাথে সরবরাহ &ndash; প্রতিটি ক্ষেত্রেই আমাদের কর্মদক্ষতা, নিষ্ঠা ও উৎকর্ষের
                    অঙ্গীকার সুস্পষ্টভাবে প্রতিফলিত হয়েছে যা আমাদের সাফল্যের ধারাবাহিকতা নির্দেশক।
                  </p>
                  <p>
                    ঢাকা ক্যান্টনমেন্ট বোর্ড, BIWTA, PWD, HED, CAAB, MES, BADC, RAJUK, DPHE, CPA,
                    PPA and Distributor of Moddhapara Granite &amp; Mining Co. Ltd প্রভৃতি
                    শীর্ষস্থানীয় সরকারি দপ্তর ও সংস্থার সাথে স্বীকৃত প্রাতিষ্ঠানিক সম্পৃক্ততা আমাদের
                    নিখুঁত কর্মতৎপরতা ও গুণগত মান রক্ষায় আপসহীনতার সম্মিলন।
                  </p>
                  <div className="pt-4 border-t border-border-light">
                    <p className="font-medium text-text-main mb-3">
                      আস্থার শক্তিতে সমৃদ্ধ আবাসনের &ndash; অগ্রযাত্রা&hellip;
                    </p>
                    <p>
                      প্রকৃত নেতৃত্বের শক্তি নিহিত থাকে দূরदर्शী চেতনায় এবং পরিবর্তনের সাথে খাপ
                      খাইয়ে নেয়ায়। বৃহৎ বেসামরিক নির্মাণ প্রকল্প নিখুঁতভাবে বাস্তবায়ন ও হস্তান্তর
                      এবং গুরুত্ববহ কৌশলগত সরবরাহ ব্যবস্থাপনায় সুনামের সাথে সাফল্য অর্জন এবং দীর্ঘ
                      অভিজ্ঞতার পরে অভিজাত মানের রিয়েল এস্টেট এবং আধুনিক দীর্ঘমেয়াদী অবকাঠামো
                      নির্মাণশিল্পে আমাদের পদচারণা একটি সুপরিকল্পিত পদক্ষেপ।
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowBengali((prev) => !prev)}
                  aria-expanded={showBengali}
                  aria-controls="bengali-message"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-on-accent text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
                >
                  {showBengali ? "Hide Bengali" : "বাংলায় পড়ুন"}
                </button>

                <a
                  href="mailto:ahspropertiesdevelopmentltd@gmail.com"
                  className="inline-flex items-center gap-2 border border-border-main hover:bg-surface-muted text-text-main text-xs font-medium px-6 py-3 rounded-xl transition-all duration-200"
                >
                  Contact CEO
                </a>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-6 border-t border-border-light flex items-center gap-4 text-sm">
                <div>
                  <p className="font-semibold text-text-main">Md. Sohanur Rahman Sohan</p>
                  <p className="text-accent text-xs">CEO, AHS Properties &amp; Development Ltd.</p>
                </div>
                <div className="text-xs text-text-muted ml-auto text-right">
                  <span className="font-semibold">CEO Direct:</span> +8801725555700
                  <br />
                  <span className="font-semibold">Sales:</span> +8801625555700
                </div>
              </div>
            </div>
          </div>

          {/* AHS Group Structure */}
          <div className="mt-12 pt-8 border-t border-border-main/60">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-extrabold text-accent tracking-widest uppercase text-center">
                Part of the AHS Group
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                <a
                  href="https://ahspdl.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-alt border border-border-main rounded-2xl p-4 text-center hover:shadow-md transition-shadow block"
                >
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2 relative">
                    <Image
                      src="/assets/ahspdl1.png"
                      alt="AHS Properties & Development Ltd."
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-text-main">AHS Properties &amp;<br/>Development Ltd.</h4>
                  <p className="text-[9px] text-text-secondary mt-1">Real Estate Development</p>
                </a>
                <a
                  href="https://sunsolaris.ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-alt border border-border-main rounded-2xl p-4 text-center hover:shadow-md transition-shadow block"
                >
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2 relative">
                    <Image
                      src="/assets/sunSolarisLimited.png"
                      alt="Sun Solaris Ltd."
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-text-main">Sun Solaris Ltd.</h4>
                  <p className="text-[9px] text-text-secondary mt-1">Renewable Energy Solutions</p>
                </a>
                <a
                  href="https://ahs.redesstech.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-alt border border-border-main rounded-2xl p-4 text-center hover:shadow-md transition-shadow block"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <h4 className="text-xs font-bold text-text-main">M/S. AHS Enterprise</h4>
                  <p className="text-[9px] text-text-secondary mt-1">Supply &amp; Contracting</p>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
