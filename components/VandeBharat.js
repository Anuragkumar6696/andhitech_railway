'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Wind, Shield, Settings2, ArrowRight, Train } from 'lucide-react';

const systems = [
  { Icon: Wind,     title: 'HVAC Systems',       desc: 'Roof-mounted package units maintaining optimal cabin temperature across all weather conditions and speeds.' },
  { Icon: Shield,   title: 'Braking Systems',     desc: 'High-performance axle and wheel-mounted brake discs ensuring safe deceleration at operating speeds.' },
  { Icon: Settings2,title: 'Suspension Systems',  desc: 'Precision air springs and suspension components for smooth, stable ride quality at higher speeds.' },
  { Icon: Zap,      title: 'Precision Components',desc: 'CNC-machined rolling stock parts engineered to the exacting tolerances demanded by modern high-speed rail.' },
];

const ease = [.22, 1, .36, 1];

export default function VandeBharat() {
  return (
    <section className="relative overflow-hidden section-gap" style={{ background: '#0B1F3A' }}>
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />

      {/* VB train image background, right side */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute right-0 top-0 bottom-0 w-5/12 overflow-hidden opacity-20">
          <Image src="/images/VB.jpeg" alt="Vande Bharat" fill className="object-cover object-left" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #0B1F3A 0%, transparent 40%)' }} />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .9, ease }}
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="badge">
                <Train size={10} />
                Vande Bharat Ecosystem
              </div>
            </div>

            <h2 className="display-lg mb-6">
              Powering India's<br />
              <span style={{ color: '#B88746' }}>High-Speed Future</span>
            </h2>

            <p className="text-white/55 text-[.95rem] leading-relaxed mb-4">
              The Vande Bharat Express represents a landmark achievement in India's railway modernization — a semi-high-speed train designed, engineered, and manufactured entirely in India under the Make in India initiative.
            </p>
            <p className="text-white/45 text-[.88rem] leading-relaxed mb-8">
              Behind every Vande Bharat train is a network of precision component manufacturers, system integrators, and engineering specialists. And Hitech Industries is proud to be part of this ecosystem, supplying critical components that support passenger comfort, safety, and operational reliability.
            </p>

            {/* Systems grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {systems.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .6, ease, delay: i * .1 }}
                  className="p-5 rounded-lg group hover:bg-[#0F2847] transition-colors duration-300"
                  style={{ border: '1px solid rgba(255,255,255,.07)' }}
                >
                  <Icon size={18} className="text-[#B88746] mb-3" />
                  <div className="text-white/80 font-semibold text-[.84rem] mb-1">{title}</div>
                  <div className="text-white/40 text-[.75rem] leading-relaxed">{desc}</div>
                </motion.div>
              ))}
            </div>

            <Link href="/products" className="btn-primary group inline-flex items-center gap-2">
              <span>Explore Our Products</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: VB image + stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .9, ease, delay: .15 }}
            className="relative hidden lg:block"
          >
            <div className="rounded-2xl overflow-hidden relative" style={{ height: 500 }}>
              <Image src="/images/VB.jpeg" alt="Vande Bharat Express" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,31,58,.7) 0%, rgba(11,31,58,.1) 50%, transparent 100%)' }} />
              <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#B88746]/50 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-[#B88746]/30 rounded-br-2xl" />

              {/* Bottom overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-[#B88746] text-[.65rem] uppercase tracking-widest mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Vande Bharat Express</div>
                <div className="text-white font-semibold text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>India's Fastest Indigenous Train</div>
                <div className="text-white/50 text-[.8rem] mt-1">Max Speed: 180 km/h · Make in India</div>
              </div>
            </div>

            {/* Make in India badge */}
            <motion.div
              initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: .6, ease, delay: .4 }}
              className="absolute -bottom-6 -left-6 p-5 rounded-xl"
              style={{ background: 'rgba(11,31,58,.95)', border: '1px solid rgba(184,135,70,.25)', backdropFilter: 'blur(20px)' }}
            >
              <Image src="/images/make-in-india-lion.jpg" alt="Make in India" width={100} height={50} className="object-contain mb-2" />
              <div className="text-white/60 text-[.7rem] text-center">Proudly Supplying</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
