'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactInfo() {
  return (
    <div className="space-y-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="text-[#E3510F] text-[12px] uppercase tracking-[0.25em] font-bold mb-5 block" style={{ fontFamily: 'var(--font-mono)' }}>Connect with Us</span>
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
          Let's Build the <br /><span className="text-[#E3510F]">Future Together</span>
        </h2>
        <p className="text-[#ADBAC7] text-lg leading-relaxed max-w-md font-medium">
          Our engineering experts are ready to provide technical support and project consultation for your infrastructure needs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5">
        {[
          { Icon: Mail, title: 'Direct Email', lines: ['info@andhitech.in'], href: 'mailto:info@andhitech.in' },
          { Icon: Phone, title: 'Support Line', lines: ['+91 11 44766444'], href: 'tel:+911144766444' },
          { Icon: MapPin, title: 'HQ Location', lines: ['403, 4th floor Kirti Mahal Building 19,', 'Rajendra Place, New Delhi – 110008'], href: 'https://maps.google.com' },
          { Icon: Clock, title: 'Business Hours', lines: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'] }
        ].map(({ Icon, title, lines, href }, i) => {
          const inner = (
            <div className="flex gap-6 p-6 rounded-2xl bg-[#0D1117] border border-white/10 hover:border-[#E3510F]/40 transition-all duration-500 group cursor-pointer shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E3510F]/5 blur-[30px] rounded-full pointer-events-none group-hover:bg-[#E3510F]/10 transition-all" />
              <div className="w-14 h-14 rounded-xl bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E3510F] transition-all duration-500">
                <Icon size={22} className="text-[#E3510F] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col justify-center relative z-10">
                <div className="text-[#E3510F] text-[11px] uppercase tracking-[0.2em] mb-2 font-bold" style={{ fontFamily: 'var(--font-mono)' }}>{title}</div>
                {lines.map((l, j) => <div key={j} className="text-white text-lg font-bold tracking-tight leading-snug group-hover:text-[#E3510F] transition-colors">{l}</div>)}
              </div>
            </div>
          );
          return (
            <motion.div key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              {href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{inner}</a> : inner}
            </motion.div>
          );
        })}
      </div>

      <Link href="/products" className="btn-wire inline-flex items-center gap-2">
        <MessageCircle size={15} /> View Our Products
      </Link>
    </div>
  );
}
