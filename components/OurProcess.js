'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Settings, CheckCircle, Zap, Shield, Search } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Design & Engineering',
    text: 'We begin by closely understanding customer requirements and translating them into functional product designs using advanced simulation tools.',
  },
  {
    icon: Settings,
    title: 'Strategic Procurement',
    text: 'We source high-quality materials from trusted vendors, ensuring timely availability and cost-efficiency for every project.',
  },
  {
    icon: Zap,
    title: 'Precision Manufacturing',
    text: 'Our modern facilities enable high-precision manufacturing backed by rigorous quality control at every stage of production.',
  },
  {
    icon: Shield,
    title: 'Rigorous Testing',
    text: 'Each product undergoes thorough testing and inspection to ensure consistent performance, reliability, and maximum safety.',
  },
];

export default function OurProcess() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="section-label mb-5">
              <span>Our Workflow</span>
            </div>
            <h2 className="section-heading">
              Streamlined Process for <span>Optimal Efficiency</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <p className="text-[#666] text-base leading-relaxed border-l-4 border-brand-orange pl-6">
              At AHIL, we follow a structured and collaborative approach to deliver high-performance products with precision and speed. Each stage is designed to maximize quality and meet evolving needs.
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.65 }}
                className="relative group"
              >
                {/* Connector line between steps */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[36px] left-[calc(100%-12px)] w-[calc(100%-20px)] h-[1px] bg-[#ede9e4] z-0">
                    <div className="h-full bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </div>
                )}

                <div className="relative z-10 bg-[#f9f8f6] rounded-2xl p-8 border border-[#ede9e4] hover:bg-white hover:shadow-xl hover:shadow-[#0e0e0e]/6 hover:border-brand-orange/20 transition-all duration-500 h-full">
                  {/* Step number */}
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-4"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Step 0{idx + 1}
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-400 border border-[#ede9e4] group-hover:border-brand-orange">
                    <Icon
                      size={24}
                      className="text-brand-orange group-hover:text-white transition-colors duration-400"
                    />
                  </div>

                  <h3
                    className="text-[17px] font-bold text-[#1a1a1a] mb-3 group-hover:text-brand-orange transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#777] text-sm leading-relaxed">{step.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Image Banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl overflow-hidden shadow-2xl relative h-[380px]"
        >
          <Image
            src="/images/ourprocess.jpg"
            alt="Manufacturing Process"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/75 via-[#0e0e0e]/40 to-transparent flex items-center px-12 md:px-16">
            <div className="max-w-md">
              <div className="section-label mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Quality Assurance</span>
              </div>
              <h3
                className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Committed to Quality
              </h3>
              <p className="text-white/65 mb-7 text-sm leading-relaxed">
                Our processes are ISO certified and follow international standards for safety and reliability.
              </p>
              <Link href="/about-us" className="btn-premium py-3 px-7">
                Learn About Our Standards
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
