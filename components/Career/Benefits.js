'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const benefitsData = [
  {
    id: 1,
    title: 'Drive Innovation in Real-World Engineering Challenges',
    content:
      "At AND Hitech, we don't just solve problems—we engineer solutions that shape the future. When you join us, you become part of a team that is committed to building smarter, more sustainable, and efficient infrastructures, systems, and technologies.",
  },
  {
    id: 2,
    title: 'Collaborative and Inclusive Work Culture',
    content:
      "AND Hitech is all about collaborative team spirit and culture. Diversity & Equality are our strong pillars. You'll find a supportive network where your contributions are valued and your ideas can spark industry-leading innovations.",
  },
  {
    id: 3,
    title: 'Long-Term Career Growth and Industry-Leading Benefits',
    content:
      'We offer competitive salaries, performance incentives, health benefits, and retirement plans designed with long-term security in mind. Join a company proud to be part of the Make in India initiative.',
  },
];

export default function Benefits() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="relative bg-[#0e0e0e] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center px-8 md:px-16 py-20 lg:py-28 relative z-10"
        >
          <div className="section-label section-label-light mb-6">
            <span>Why Join Us?</span>
          </div>
          <h2
            className="font-extrabold text-white leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Become a Part of <span className="text-brand-orange">Our Team</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-md">
            If you are looking for a career where work meets ethics and ambition meets action, welcome to AND Hitech Industries.
          </p>

          {/* Accordion */}
          <div className="space-y-3">
            {benefitsData.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/8 overflow-hidden transition-all duration-300"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-white/5 transition-colors"
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                >
                  <span
                    className={`font-bold text-[15px] leading-snug transition-colors ${openId === item.id ? 'text-brand-orange' : 'text-white group-hover:text-white/80'}`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.title}
                  </span>
                  <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${openId === item.id ? 'bg-brand-orange text-white' : 'bg-white/8 text-white/40'}`}>
                    {openId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 border-t border-white/6">
                        <p className="text-white/50 text-sm leading-relaxed pt-4">{item.content}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative min-h-[400px] lg:min-h-0 overflow-hidden"
        >
          <Image
            src="/images/whatwedorightimage.jpg"
            alt="Join AND Hitech Team"
            fill
            className="object-cover opacity-50"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent" />

          {/* Floating card */}
          <div className="absolute bottom-10 left-10 right-10 lg:right-6 bg-[#0e0e0e]/70 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="text-brand-orange text-[11px] font-bold uppercase tracking-widest mb-2"
              style={{ fontFamily: 'var(--font-label)' }}>
              Open Positions
            </div>
            <div className="text-white font-bold text-xl mb-1"
              style={{ fontFamily: 'var(--font-display)' }}>
              We're always hiring talent
            </div>
            <div className="text-white/45 text-xs">Email: careers@andhitech.in</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
