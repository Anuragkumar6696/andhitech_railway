'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Settings2, Wrench } from 'lucide-react';

const capabilities = [
  {
    icon: <Cpu size={22} className="text-brand-orange" />,
    title: 'Automation & Smart Manufacturing',
    desc: 'Streamlining operations with integrated systems and modern technologies.',
  },
  {
    icon: <ShieldCheck size={22} className="text-brand-orange" />,
    title: 'Advanced Quality Control',
    desc: 'Ensuring uncompromised product performance through rigorous testing and standards.',
  },
  {
    icon: <Settings2 size={22} className="text-brand-orange" />,
    title: 'Process Engineering & Optimization',
    desc: 'Enhancing manufacturing workflows for greater speed, accuracy, and scalability.',
  },
  {
    icon: <Wrench size={22} className="text-brand-orange" />,
    title: 'Custom Product Development',
    desc: 'Collaborating with clients to design and deliver components tailored to real-world demands.',
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative bg-[#0e0e0e] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

        {/* ── LEFT: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center px-8 md:px-16 py-20 lg:py-28 relative z-10"
        >
          {/* Label */}
          <div className="section-label mb-6">
            <span>What We Do</span>
          </div>

          <h2 className="section-heading section-heading-light mb-10 max-w-lg">
            Empowering Industry with <span>Engineering Excellence</span>
          </h2>

          {/* Capability list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                className="group flex gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-brand-orange/30 transition-all duration-400"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                  {cap.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px] mb-1 leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {cap.title}
                  </h3>
                  <p className="text-white/50 text-[13px] leading-relaxed">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer text + CTA */}
          <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              We deliver end-to-end manufacturing solutions combining innovation, precision, and efficiency.
            </p>
            <Link href="/contact" className="btn-premium flex-shrink-0">
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* ── RIGHT: Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[480px] lg:min-h-0 overflow-hidden"
        >
          <Image
            src="/images/whatwedorightimage.jpg"
            alt="What We Do"
            fill
            className="object-cover"
            unoptimized
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-transparent to-transparent lg:via-transparent lg:to-transparent" />
          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0e0e0e]/60 to-transparent" />

          {/* Contact Circle */}
          <div className="absolute bottom-8 right-8 z-10">
            <Link href="/contact" className="block group">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="w-[90px] h-[90px]"
                >
                  <Image
                    src="/images/contact-now-circle.svg"
                    alt="Contact Now"
                    width={90}
                    height={90}
                    unoptimized
                    className="opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              </div>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
