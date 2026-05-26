'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';

const ease = [.22, 1, .36, 1];

export default function ContactCTA() {
  return (
    <section className="relative py-28 md:py-44 overflow-hidden bg-[#07080C]">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid z-[1] pointer-events-none opacity-65"/>
      {/* Centered flame radial glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background:'radial-gradient(ellipse 900px 600px at 50% 60%,rgba(227,81,15,.09),transparent 70%)' }}
      />
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-56 h-56 pointer-events-none z-[2]"
        style={{ background:'linear-gradient(135deg,rgba(227,81,15,.06) 0%,transparent 70%)' }}/>
      <div className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none z-[2]"
        style={{ background:'linear-gradient(315deg,rgba(227,81,15,.05) 0%,transparent 70%)' }}/>
      {/* Top rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E3510F]/30 to-transparent z-[2]"/>

      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.85, ease }}
          >
            {/* Pill label */}
            <div className="inline-flex items-center gap-2.5 bg-[#E3510F]/10 border border-[#E3510F]/18 px-5 py-2 rounded-full mb-12">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3510F] animate-pulse"/>
              <span className="text-[#E3510F] text-[.58rem] font-mono font-medium uppercase tracking-[.22em]">Ready to Start?</span>
            </div>

            {/* Headline */}
            <h2 className="display-lg mb-10">
              Have a Project<br/>in Mind?&nbsp;
              <span style={{ color:'#E3510F' }}>Let&apos;s Build.</span>
            </h2>

            <p className="text-[#9BA5B4] text-[1rem] md:text-[1.1rem] leading-relaxed max-w-2xl mx-auto mb-16">
              Our engineering team is ready to provide high-performance industrial solutions tailored to your exact specifications — from first consultation to final delivery.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 flex-wrap">
              <Link href="/contact" className="btn-flame group px-10 py-4 flex items-center gap-3">
                <span>Get a Free Quote</span>
                <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <ArrowRight size={13}/>
                </div>
              </Link>
              <a href="mailto:Info@andhitech.in" className="btn-wire group flex items-center gap-2.5">
                <Mail size={15}/>
                <span>Info@andhitech.in</span>
              </a>
              <a href="tel:01125710064" className="btn-wire group flex items-center gap-2.5">
                <Phone size={15}/>
                <span>011-25710064</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <div className="mt-24 divider"/>
      </div>
    </section>
  );
}
