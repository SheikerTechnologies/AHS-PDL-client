"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function ServicesPageClient() {
  const services = [
    {
      icon: "🏠",
      title: "Premium Residential Plots",
      desc: "Carefully planned residential sectors with modern amenities and beautiful surroundings.",
      features: ["100% RAJUK Approved", "Clear Title", "Flexible Payment Plans"]
    },
    {
      icon: "🌳",
      title: "Master Planned Community",
      desc: "World-class infrastructure including roads, parks, lakes, and utility services.",
      features: ["Wide Roads", "Green Spaces", "Water Bodies", "Underground Utilities"]
    },
    {
      icon: "🏗️",
      title: "Infrastructure Development",
      desc: "Complete development of internal roads, drainage, electricity & water supply.",
      features: ["Paved Roads", "Electricity", "Water Supply", "Drainage System"]
    },
    {
      icon: "🏛️",
      title: "Community Facilities",
      desc: "Schools, mosques, hospitals, shopping centers and recreational spaces planned.",
      features: ["Educational Institutes", "Religious Facilities", "Healthcare", "Shopping Areas"]
    },
    {
      icon: "📍",
      title: "Sector-wise Planning",
      desc: "19 beautifully designed sectors with unique characteristics and plot layouts.",
      features: ["Lake View Sectors", "Park Facing", "Corner Plots", "Premium Zones"]
    },
    {
      icon: "🤝",
      title: "End-to-End Support",
      desc: "From plot selection to registration and post-sale support.",
      features: ["Site Visits", "Legal Assistance", "Documentation", "After Sales Service"]
    }
  ];

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:50px_50px] opacity-40 dark:opacity-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          
          <h1 className="text-6xl md:text-7xl font-bold text-text-main tracking-tighter">
            Our Services
          </h1>
          <p className="mt-6 text-2xl text-text-secondary max-w-2xl mx-auto">
            Building dreams in Jolshiri Abashon with world-class planning and execution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-surface-alt rounded-3xl p-10 shadow-sm hover:shadow-2xl border border-border-light transition-all duration-300 hover:-translate-y-2 dark:card-hover-glow"
            >
              <div className="text-6xl mb-8 transition-transform group-hover:scale-110 duration-300">
                {service.icon}
              </div>
              <h3 className="text-3xl font-semibold text-text-main mb-4">{service.title}</h3>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">{service.desc}</p>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-secondary">
                    <span className="text-[#b84822]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="bg-surface-alt rounded-3xl p-12 md:p-16 mb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold tracking-tight text-text-main mb-8">
                Why Jolshiri Abashon?
              </h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#b84822]/10 flex items-center justify-center text-2xl flex-shrink-0">🏆</div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">RAJUK Approved</h4>
                    <p className="text-text-secondary">Government approved master plan ensuring legal security and quality standards.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#b84822]/10 flex items-center justify-center text-2xl flex-shrink-0">🌊</div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">Scenic &amp; Sustainable</h4>
                    <p className="text-text-secondary">Thoughtfully designed around natural lakes and green spaces.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#b84822]/10 flex items-center justify-center text-2xl flex-shrink-0">🔒</div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2">Secure Investment</h4>
                    <p className="text-text-secondary">Clear land title and professional development by AHS Properties.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative" onContextMenu={(e) => e.preventDefault()}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border-8 border-[#8b1d1d] shadow-xl">
                <Image
                  src="/attachments/APDL_RJSC-1.png"
                  alt="Certificate of Incorporation"
                  fill
                  className="object-cover select-none"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-surface-alt rounded-2xl shadow-xl p-6 max-w-[220px]">
                <p className="font-semibold text-text-main">Officially Incorporated</p>
                <p className="text-sm text-text-secondary mt-1">Registrar of Joint Stock Companies &amp; Firms</p>
                <a href="/#certificate-section" className="mt-4 inline-block text-[#b84822] hover:underline font-medium">
                  View Certificate →
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
