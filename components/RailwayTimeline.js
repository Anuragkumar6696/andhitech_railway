'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { year: '1853', title: 'First Passenger Train', desc: 'India\'s first passenger train ran from Bombay to Thane — 34 km, marking the dawn of Indian rail.' },
  { year: '1900s', title: 'Railway Expansion', desc: 'Rapid expansion of the rail network across the subcontinent, connecting commerce and communities.' },
  { year: '1951', title: 'Indian Railways Formed', desc: 'Post-independence, all rail networks nationalized under Indian Railways — the world\'s largest employer.' },
  { year: '1970s', title: 'Indigenous Manufacturing', desc: 'India begins domestic production of locomotives and rolling stock, building manufacturing capability.' },
  { year: '1990s', title: 'Passenger Comfort Revolution', desc: 'Introduction of air-conditioned coaches, improved suspension systems, and modern passenger amenities.' },
  { year: '2010s', title: 'Modern Rail Technology', desc: 'LHB coaches, high-speed corridors, and technology partnerships elevate the network\'s capabilities.' },
  { year: '2023', title: 'Vande Bharat Era', desc: 'India\'s own semi-high-speed train sets a new benchmark — 180 km/h, indigenous design, world-class manufacturing.' },
  { year: '2030+', title: 'Smart Rail Future', desc: 'Bullet trains, hyperloop research, and AI-powered rail management — India\'s railway transformation accelerates.' },
];

const ease = [.22, 1, .36, 1];

export default function RailwayTimeline() {
  const [active, setActive] = useState(6);

  return (
    <section className="relative overflow-hidden section-gap" style={{ background: '#F7F5F0' }}>
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px divider-light pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .8, ease }}
          className="text-center mb-16"
        >
          <div className="label-dark mb-4 inline-block">A Legacy of Progress</div>
          <h2 className="display-lg-dark max-w-2xl mx-auto mb-4">
            170 Years of Indian<br />
            <span className="text-copper">Railway Innovation</span>
          </h2>
          <p className="text-[#6B7A8E] max-w-lg mx-auto text-[.9rem] leading-relaxed">
            From the first steam locomotive to Vande Bharat, India's railway story is one of relentless engineering ambition.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,135,70,.3) 10%, rgba(184,135,70,.3) 90%, transparent)' }} />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {milestones.map(({ year, title, desc }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .6, ease, delay: i * .07 }}
                className="relative cursor-pointer group"
                onClick={() => setActive(i)}
              >
                {/* Dot */}
                <div className="hidden lg:flex justify-center mb-4">
                  <div
                    className="w-4 h-4 rounded-full border-2 transition-all duration-300 relative z-10"
                    style={{
                      background: active === i ? '#B88746' : '#F7F5F0',
                      borderColor: active === i ? '#B88746' : 'rgba(184,135,70,.4)',
                      boxShadow: active === i ? '0 0 0 4px rgba(184,135,70,.15)' : 'none',
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className="p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: active === i ? '#0B1F3A' : '#fff',
                    border: `1px solid ${active === i ? 'rgba(184,135,70,.3)' : 'rgba(11,31,58,.08)'}`,
                    boxShadow: active === i ? '0 16px 48px rgba(11,31,58,.2)' : '0 2px 12px rgba(11,31,58,.05)',
                  }}
                >
                  <div className="text-[#B88746] font-bold text-sm mb-1" style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '.06em' }}>{year}</div>
                  <div className={`font-semibold text-[.78rem] mb-2 transition-colors ${active === i ? 'text-white' : 'text-[#0B1F3A]'}`}>{title}</div>
                  <p className={`text-[.72rem] leading-relaxed transition-colors ${active === i ? 'text-white/50' : 'text-[#6B7A8E]'}`}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: .8, delay: .4 }}
          className="mt-12 text-center"
        >
          <div className="inline-block px-8 py-5 rounded-xl" style={{ background: 'rgba(11,31,58,.04)', border: '1px solid rgba(184,135,70,.15)' }}>
            <p className="text-[#0B1F3A] text-[.9rem] italic leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem' }}>
              "Today, companies like And Hitech Industries contribute to the next chapter of railway innovation —<br className="hidden md:block" />
              building precision components that keep India moving forward."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
