'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { useRef } from 'react';

const ease = [.22, 1, .36, 1];

export default function ContactCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1     = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2     = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scaleX = useTransform(scrollYProgress, [0, .5], [0.92, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#050608' }}>
      {/* Grid */}
      <div className="absolute inset-0 bg-grid z-[1] pointer-events-none opacity-50"/>

      {/* Parallax glows */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background:'radial-gradient(ellipse 1100px 750px at 50% 65%,rgba(227,81,15,.08),transparent 68%)', y: y1 }}
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-0 left-[-5%] z-[1] pointer-events-none w-[45%] h-[55%]"
        style={{ background:'radial-gradient(circle,rgba(227,81,15,.04),transparent 70%)', y: y2 }}
      />

      {/* Diagonal structural lines */}
      {[-60, -30, 0, 30, 60].map((offset, i) => (
        <div key={i} className="absolute inset-0 pointer-events-none z-[1]" style={{
          background:`linear-gradient(${offset}deg,transparent 49.5%,rgba(255,255,255,.01) 49.5%,rgba(255,255,255,.01) 50.5%,transparent 50.5%)`,
          backgroundSize: '80px 80px',
        }}/>
      ))}

      {/* Flame accent line */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] z-[2]"
        style={{ background:'linear-gradient(90deg,transparent,rgba(227,81,15,.35),transparent)' }}/>

      {/* ── Large display number watermark ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-[1] hidden xl:block"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22rem',
          lineHeight: 1,
          color: 'rgba(255,255,255,.012)',
          letterSpacing: '-.02em',
          right: '-2rem',
        }}
      >
        LET&apos;S
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-32 md:py-52 relative z-10">
        <div className="max-w-5xl">

          {/* Ready pill */}
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.75, ease }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 border border-[#E3510F]/22 rounded-full px-6 py-2.5"
              style={{ background:'rgba(227,81,15,.07)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3510F] animate-pulse"/>
              <span className="text-[#E3510F] text-[.55rem] uppercase tracking-[.26em]"
                style={{ fontFamily:'var(--font-mono)' }}>
                Ready to Start?
              </span>
            </div>
          </motion.div>

          {/* Large headline */}
          <motion.h2
            initial={{ opacity:0, y:36, filter:'blur(8px)' }}
            whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
            viewport={{ once:true }} transition={{ delay:.08, duration:1, ease }}
            className="display-lg mb-10"
            style={{ lineHeight:.88 }}
          >
            Have a Project<br/>in Mind?&nbsp;
            <span style={{ color:'#E3510F' }}>Let&apos;s Build.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:.18, duration:.8, ease }}
            className="text-[#8C98AA] text-[1rem] md:text-[1.08rem] leading-relaxed max-w-2xl mb-16 font-light"
          >
            Our engineering team is ready to provide high-performance industrial solutions tailored to your exact specifications — from first consultation through to final delivery and certification.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:.28, duration:.75, ease }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-wrap mb-20"
          >
            <Link href="/contact"
              className="btn-flame group py-4 px-12 text-[.64rem] inline-flex items-center gap-3">
              <span>Get a Free Quote</span>
              <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <ArrowRight size={12}/>
              </div>
            </Link>
            <a href="mailto:Info@andhitech.in"
              className="btn-wire group py-4 px-9 text-[.64rem] inline-flex items-center gap-2.5">
              <Mail size={14}/>
              <span>Info@andhitech.in</span>
            </a>
            <a href="tel:+911144766444"
              className="btn-wire group py-4 px-9 text-[.64rem] inline-flex items-center gap-2.5">
              <Phone size={14}/>
              <span>+91 11 44766444</span>
            </a>
          </motion.div>

          {/* Contact details + trust marks */}
          <motion.div
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ delay:.4, duration:.8 }}
            className="flex flex-col sm:flex-row gap-8 pt-10 border-t border-white/[.05]"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background:'rgba(227,81,15,.1)', border:'1px solid rgba(227,81,15,.18)' }}>
                <MapPin size={13} className="text-[#E3510F]"/>
              </div>
              <address className="not-italic text-[#3D4A5C] text-[.82rem] leading-relaxed">
                403, 4th floor Kirti Mahal Building 19,<br/>
                Rajendra Place, New Delhi – 110008
              </address>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background:'rgba(227,81,15,.1)', border:'1px solid rgba(227,81,15,.18)' }}>
                <span className="text-[#E3510F] text-[.48rem] font-bold" style={{ fontFamily:'var(--font-mono)' }}>ISO</span>
              </div>
              <div>
                <div className="text-[#8C98AA] text-[.78rem] font-medium">ISO 9001:2015 Certified</div>
                <div className="text-[#3D4A5C] text-[.68rem]">Quality Management System</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"/>
              <span className="text-[#3D4A5C] text-[.78rem]">RDSO Approved Manufacturer</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
