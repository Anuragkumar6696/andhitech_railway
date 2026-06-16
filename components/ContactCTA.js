'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin, FileText, Wrench } from 'lucide-react';
import { useRef } from 'react';

const ease = [.22, 1, .36, 1];

const CONTACT_TRACKS = [
  {
    Icon: FileText,
    label: 'Request a Quote',
    desc: 'Share your specifications and we\'ll prepare a technical proposal within 48 hours.',
    href: '/contact',
    cta: 'Start Inquiry',
    accent: '#E3510F',
    primary: true,
  },
  {
    Icon: Wrench,
    label: 'Technical Consultation',
    desc: 'Speak directly with our engineering team about component compatibility or custom requirements.',
    href: '/contact',
    cta: 'Schedule Call',
    accent: '#3B82F6',
    primary: false,
  },
];

const CONTACT_ITEMS = [
  { Icon: Mail, label: 'Email', value: 'info@andhitech.in', href: 'mailto:info@andhitech.in' },
  { Icon: Phone, label: 'Phone', value: '+91 11 4476 6444', href: 'tel:+911144766444' },
  { Icon: MapPin, label: 'Office', value: 'Rajendra Place, New Delhi', href: '#' },
];

export default function ContactCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#050608' }}>
      <div className="absolute inset-0 bg-grid z-[1] pointer-events-none opacity-50" />
      <motion.div
        style={{ y: y1, background: 'radial-gradient(ellipse 1100px 750px at 50% 65%,rgba(227,81,15,.08),transparent 68%)' }}
        className="absolute inset-0 z-[1] pointer-events-none"
      />
      <div className="absolute inset-x-0 top-0 h-[1.5px] z-[2]"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(227,81,15,.35),transparent)' }} />

      {/* Large ghost text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-[1] hidden xl:block"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20rem',
          lineHeight: 1,
          color: 'rgba(255,255,255,.012)',
          letterSpacing: '-.02em',
          right: '-2rem',
        }}
      >
        CONNECT
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-28 md:py-44 relative z-10">

        {/* Top intro */}
        <div className="max-w-5xl mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .75, ease }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 border border-[#E3510F]/22 rounded-full px-6 py-2.5"
              style={{ background: 'rgba(227,81,15,.07)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3510F] animate-pulse" />
              <span className="text-[#E3510F] text-[.55rem] uppercase tracking-[.26em]"
                style={{ fontFamily: 'var(--font-mono)' }}>
                Ready to Start?
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: .1, duration: 1, ease }}
            className="display-lg mb-8"
            style={{ lineHeight: .88 }}
          >
            Let&apos;s engineer<br />
            <span style={{ color: '#E3510F' }}>something great</span><br />
            together.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: .2, duration: .8, ease }}
            className="text-[#4E5A6E] text-[.95rem] leading-relaxed max-w-xl"
          >
            Whether you need precision components for Indian Railways, custom HVAC systems for metro projects, or technical consultation — our engineering team is ready to deliver.
          </motion.p>
        </div>

        {/* ── DUAL CONTACT TRACKS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {CONTACT_TRACKS.map(({ Icon, label, desc, href, cta, accent, primary }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .12, duration: .75, ease }}
              className="group relative overflow-hidden"
              style={{
                background: primary ? `linear-gradient(135deg,${accent}18,rgba(11,14,21,.9))` : '#0B0E15',
                border: `1px solid ${primary ? `${accent}30` : 'rgba(255,255,255,.06)'}`,
                borderRadius: '20px',
                padding: '2rem',
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[20px]"
                style={{ background: `radial-gradient(ellipse at top left, ${accent}12, transparent 60%)` }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-400 group-hover:scale-110"
                  style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}>
                  <Icon size={20} style={{ color: accent }} />
                </div>

                <h3 className="text-[#EDF0F5] text-[1.1rem] font-medium mb-3 group-hover:text-white" style={{ fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
                  {label}
                </h3>
                <p className="text-[#4E5A6E] text-[.84rem] leading-relaxed mb-7 group-hover:text-[#6A7888]">{desc}</p>

                <Link href={href} className={primary ? 'btn-flame inline-flex items-center gap-2 group/btn py-3 px-7 text-[.66rem]' : 'btn-wire inline-flex items-center gap-2 group/btn py-3 px-7 text-[.66rem]'}>
                  <span>{cta}</span>
                  <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CONTACT DETAILS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: .2, duration: .7, ease }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/[.04]"
        >
          {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
            <a key={label} href={href}
              className="flex items-center gap-4 p-5 rounded-xl border border-white/[.05] hover:border-[#E3510F]/25 group transition-all duration-400"
              style={{ background: 'rgba(255,255,255,.02)' }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(227,81,15,.08)', border: '1px solid rgba(227,81,15,.15)' }}>
                <Icon size={14} className="text-[#E3510F]" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.50rem', letterSpacing: '.22em', color: '#3D4A5C', textTransform: 'uppercase' }} className="mb-0.5 group-hover:text-[#E3510F]/60 transition-colors">
                  {label}
                </div>
                <div className="text-[#8C98AA] text-[.80rem] group-hover:text-[#EDF0F5] transition-colors">{value}</div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
