'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ArrowRight, Award, Users, Wrench, Globe, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

const features = [
  'Railway Rolling Stock Components',
  'Advanced HVAC Systems & Engineering',
  'Precision CNC Manufacturing',
  'State-of-the-Art Production Facilities',
];

const metrics = [
  { Icon: Award,  value: 'ISO',  label: '9001:2015 Certified' },
  { Icon: Users,  value: '100+', label: 'Engineers on staff' },
  { Icon: Globe,  value: 'PAN',  label: 'India Distribution' },
];

const ease = [.22, 1, .36, 1];

export default function AboutUs() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden section-gap" style={{ background: '#0B1F3A' }}>
      <div className="absolute inset-0 bg-grid-fine opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 700px 600px at 0% 50%, rgba(184,135,70,.05), transparent 70%)' }} />
      <div className="absolute inset-x-0 top-0 h-px divider pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-center">

          {/* ── Visual mosaic ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .95, ease }}
            className="relative"
          >
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden relative group" style={{ height: 480 }}>
              <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.12]">
                <Image
                  src="/images/aboutback.jpg"
                  alt="AND Hitech Engineering Facility"
                  fill
                  className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700"
                />
              </motion.div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,31,58,.7) 0%, transparent 45%)' }} />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-px h-16" style={{ background: 'linear-gradient(to bottom, rgba(184,135,70,.7), transparent)' }} />
              <div className="absolute top-0 left-0 h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(184,135,70,.7), transparent)' }} />
              <div className="absolute bottom-6 left-7 right-7">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, rgba(184,135,70,.6), transparent)' }} />
                  <span className="text-white/40 text-[.66rem]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Manufacturing Excellence Since 2013</span>
                </div>
              </div>
            </div>

            {/* Secondary image overlap */}
            <div className="absolute -bottom-10 -right-10 w-[52%] rounded-2xl overflow-hidden border-4 border-[#0B1F3A] shadow-2xl hidden md:block z-10">
              <Image src="/images/aboutfront.jpg" alt="AHIL Production Floor" width={340} height={240} className="w-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(11,31,58,.5))' }} />
            </div>

            {/* Years badge */}
            <div className="absolute -top-6 -left-6 hidden md:flex flex-col items-center justify-center text-white z-20"
              style={{ width: 96, height: 96, background: '#B88746', clipPath: 'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))' }}>
              <span className="text-3xl font-bold leading-none" style={{ fontFamily: 'Cormorant Garamond, serif' }}>10+</span>
              <span className="text-[.48rem] uppercase tracking-wider opacity-80 mt-0.5" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Years</span>
            </div>
          </motion.div>

          {/* ── Text content ── */}
          <div className="space-y-9">
            <motion.div
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .75, ease }}
            >
              <span className="eyebrow mb-7 block">About AHIL</span>
              <h2 className="display-md mb-7">
                Leading the Way in<br />
                <span style={{ color: '#B88746' }}>Railway Engineering</span>
              </h2>
              <p className="text-white/55 text-[.96rem] leading-relaxed font-light">
                Established in 2013, AND HITECH INDUSTRIES LTD (AHIL) has emerged as a trusted name in precision manufacturing, specialising in high-quality components for Railway Rolling Stock and advanced HVAC systems for Indian Railways and Metro networks.
              </p>
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: .14, duration: .75, ease }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {features.map((f, i) => (
                <div key={i}
                  className="flex items-center gap-3 py-3.5 px-5 rounded-xl transition-all duration-400 group cursor-default"
                  style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }}>
                  <CheckCircle2 size={14} className="text-[#B88746] flex-shrink-0" />
                  <span className="text-white/65 text-[.83rem] font-medium">{f}</span>
                </div>
              ))}
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: .24, duration: .75, ease }}
              className="flex gap-7 pt-4"
            >
              {metrics.map(({ Icon, value, label }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(184,135,70,.1)', border: '1px solid rgba(184,135,70,.2)' }}>
                    <Icon size={15} className="text-[#B88746]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-[.9rem]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{value}</div>
                    <div className="text-white/40 text-[.68rem]">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: .32, duration: .7, ease }}
              className="pt-6 border-t border-white/[.06] flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <Link href="/about-us" className="btn-primary group inline-flex items-center gap-2.5">
                <span>Discover Our Story</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-wire inline-flex items-center gap-2 group">
                <span>Get in Touch</span>
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
