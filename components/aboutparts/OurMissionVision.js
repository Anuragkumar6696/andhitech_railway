'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function OurMissionVision() {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    {
      id: 'mission',
      label: 'Our Mission',
      icon: <Target className="w-5 h-5" />,
      content: 'To deliver reliable and high-performance solutions for Indian Railways, Metro Corporations, and PSUs — combining precision engineering with exceptional customer service. We strive to be a trusted partner in the evolving transportation sectors.',
      points: [
        'Railway Rolling Stock Components',
        'HVAC Systems for Metro & Industrial',
        'Customer-Centric Engineering',
        'Delivery Excellence',
      ],
    },
    {
      id: 'vision',
      label: 'Our Vision',
      icon: <Eye className="w-5 h-5" />,
      content: 'To be a globally recognized leader in industrial engineering, setting new standards for quality, safety, and sustainable innovation in the transportation and manufacturing sectors.',
      points: [
        'Global Engineering Leadership',
        'Sustainable Innovation',
        'Safety Standard Setting',
        'Technological Advancement',
      ],
    },
    {
      id: 'value',
      label: 'Our Values',
      icon: <ShieldCheck className="w-5 h-5" />,
      content: 'Our core values define who we are and how we operate. Integrity, precision, and a relentless focus on quality are the pillars that support our commitment to our partners and the community.',
      points: [
        'Uncompromising Integrity',
        'Precision in Every Detail',
        'Relentless Quality Focus',
        'Community Commitment',
      ],
    },
  ];

  const active = tabs.find((t) => t.id === activeTab);

  return (
    <section className="py-24 md:py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <div className="section-label section-label-light mb-5">
              <span>Our Approach</span>
            </div>
            <h2
              className="font-extrabold text-white leading-tight max-w-xl"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Empowering Sustainable <span className="text-brand-orange">Growth in Industry</span>
            </h2>
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-7 py-3.5 rounded-sm font-bold text-[12px] uppercase tracking-[0.14em] transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/8'
              }`}
              style={{ fontFamily: 'var(--font-label)' }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-8 md:p-14 overflow-hidden">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                {/* Left: text */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="w-14 h-14 rounded-xl bg-brand-orange/15 flex items-center justify-center text-brand-orange">
                    {active.icon}
                  </div>
                  <h3
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {active.label}
                  </h3>
                  <p className="text-white/50 text-[15px] leading-relaxed italic">
                    &ldquo;{active.content}&rdquo;
                  </p>
                </div>

                {/* Right: points */}
                <div className="lg:col-span-5">
                  <div className="bg-white/[0.05] border border-white/8 rounded-xl p-8">
                    <h4
                      className="text-white/40 font-bold text-[11px] uppercase tracking-[0.2em] mb-6"
                      style={{ fontFamily: 'var(--font-label)' }}
                    >
                      Strategic Priorities
                    </h4>
                    <ul className="space-y-4">
                      {active.points.map((point, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="flex items-center gap-3 text-white"
                        >
                          <CheckCircle2 size={16} className="text-brand-orange flex-shrink-0" />
                          <span className="font-semibold text-[14px]">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
