'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, ShieldCheck, Settings2, Wrench, ArrowRight, Layers, TrendingUp, Wind } from 'lucide-react';
import { useRef } from 'react';

const caps = [
  { Icon: Wind,       title: 'HVAC & Climate Systems', desc: 'Roof-mounted package units (RMPU) and HVAC systems engineered for Vande Bharat, LHB coaches, and Metro rolling stock — meeting all RDSO specifications.' },
  { Icon: ShieldCheck, title: 'Brake Components', desc: 'Axle-mounted and wheel-mounted brake discs, brake pads, and braking system components manufactured to exacting railway safety standards.' },
  { Icon: Layers,     title: 'Suspension Systems', desc: 'Air springs and suspension components for smooth, safe ride quality across Indian Railways and Metro applications — designed for decades of service life.' },
  { Icon: Wrench,     title: 'Precision Engineering', desc: 'CNC-machined rolling stock components, couplers, and specialized railway parts manufactured on DN Solutions machinery to sub-millimeter tolerances.' },
];

const ease = [.22, 1, .36, 1];

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: '#F7F5F0' }}>
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px divider-light pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .9, ease }}
          >
            <div className="label-dark mb-4">Core Capabilities</div>
            <h2 className="display-lg-dark mb-4 leading-tight">
              Engineering Solutions<br />
              <span className="text-copper">Across Rail Systems</span>
            </h2>
            <div className="accent mb-6" />
            <p className="text-[#4A5568] leading-relaxed mb-8 text-[.95rem]">
              And Hitech Industries manufactures a comprehensive range of railway components that serve Indian Railways, Metro networks, and modern high-speed rail applications. Our engineering capability spans HVAC systems, braking components, suspension systems, and precision rolling stock parts.
            </p>

            {/* Capabilities list */}
            <div className="space-y-0 mb-10">
              {caps.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .65, ease, delay: i * .1 }}
                  className="feature-item group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300"
                      style={{ background: 'rgba(11,31,58,.06)' }}>
                      <Icon size={16} className="text-[#B88746]" />
                    </div>
                    <div>
                      <div className="text-[#0B1F3A] font-semibold text-[.88rem] mb-0.5">{title}</div>
                      <div className="text-[#6B7A8E] text-[.8rem] leading-relaxed">{desc}</div>
                    </div>
                  </div>
                  <span className="feature-num">{String(i+1).padStart(2,'0')}</span>
                </motion.div>
              ))}
            </div>

            <Link href="/products" className="btn-copper inline-flex items-center gap-2 group">
              <span>View All Products</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: image mosaic */}
          <motion.div
            initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .9, ease }}
            className="relative"
          >
            {/* Main image */}
            <div className="rounded-xl overflow-hidden relative group" style={{ height: 460 }}>
              <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.08]">
                <Image
                  src="/images/production-unit-final.jpg"
                  alt="AND Hitech Manufacturing Facility"
                  fill className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,31,58,.5) 0%, transparent 45%)' }} />
              {/* Corner frames */}
              <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-[#B88746]/60 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-[#B88746]/40 rounded-br-xl" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: .7, ease, delay: .3 }}
              className="absolute -bottom-8 -left-8 p-6 rounded-xl shadow-2xl"
              style={{ background: '#0B1F3A', border: '1px solid rgba(184,135,70,.2)' }}
            >
              <div className="text-[#B88746] text-3xl font-bold mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>500+</div>
              <div className="text-white/80 text-[.78rem] font-medium">Components Supplied</div>
              <div className="text-white/40 text-[.68rem] mt-1">To Indian Railways & Metro</div>
            </motion.div>

            {/* Second small image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .7, ease, delay: .2 }}
              className="absolute -top-6 -right-6 w-36 h-36 rounded-xl overflow-hidden border-2 border-white/80 shadow-xl hidden lg:block"
            >
              <Image src="/images/ourfeatures.jpg" alt="Engineering Quality" fill className="object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
