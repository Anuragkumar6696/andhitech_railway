'use client';

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { motion } from 'framer-motion';
import { Train, Building2, Factory, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Industries() {
  const industries = [
    {
      icon: Train,
      title: 'Railways & Rolling Stock',
      image: '/images/ind-train.jpg',
      desc: 'Specialized components for passenger and freight trains, including braking systems, suspension, and HVAC solutions.',
      features: ['Brake Discs & Pads', 'Air Suspension', 'Shock Absorbers', 'Coupler Components'],
    },
    {
      icon: Building2,
      title: 'Metro & Urban Transit',
      image: '/images/gallery-5.jpg',
      desc: 'Advanced HVAC systems and precision components tailored for modern metro networks and urban rail transit.',
      features: ['Saloon HVAC', 'Driver Cab HVAC', 'Electronic Controls', 'Maintenance Support'],
    },
    {
      icon: Factory,
      title: 'Industrial HVAC',
      image: '/images/gallery-9.jpg',
      desc: 'High-efficiency thermal management solutions for large-scale industrial plants and commercial buildings.',
      features: ['Heat Exchangers', 'Thermal Coils', 'Control Systems', 'Energy Efficiency'],
    },
    {
      icon: ShieldCheck,
      title: 'Precision Manufacturing',
      image: '/images/aboutfront.jpg',
      desc: 'Contract manufacturing and engineering services for critical sectors requiring high-precision metal components.',
      features: ['CNC Machining', 'Custom Fabrication', 'Quality Assurance', 'Rapid Prototyping'],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Industries We Serve | AND Hitech</title>
        <meta name="description" content="Explore the diverse industries AHIL serves with precision engineering." />
      </Head>

      <Header />
      <PageBanner
        title="Industries We Serve"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Industries"
      />

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

          {/* Section header */}
          <div className="max-w-3xl mb-20 md:mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <div className="section-label mb-5"><span>Our Reach</span></div>
              <h2 className="section-heading">
                Driving Innovation Across <span>Key Industrial Sectors</span>
              </h2>
            </motion.div>
          </div>

          {/* Industries list — alternating layout */}
          <div className="space-y-28 md:space-y-36">
            {industries.map((industry, idx) => {
              const Icon = industry.icon;
              const reversed = idx % 2 === 1;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-14 lg:gap-20 items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={industry.image}
                        alt={industry.title}
                        width={700}
                        height={480}
                        className="w-full h-[380px] md:h-[440px] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>

                    {/* Icon badge */}
                    <div className={`absolute -bottom-7 ${reversed ? 'left-8' : 'right-8'} w-16 h-16 bg-brand-orange rounded-xl flex items-center justify-center text-white shadow-xl`}>
                      <Icon size={28} />
                    </div>

                    {/* Index number */}
                    <div
                      className={`absolute -top-5 ${reversed ? 'right-8' : 'left-8'} text-[#e8e4e0] font-extrabold text-7xl leading-none select-none`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-7">
                    <div className="section-label mb-2"><span>Industry {String(idx + 1).padStart(2, '0')}</span></div>
                    <h3
                      className="font-extrabold text-[#1a1a1a] leading-tight"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {industry.title}
                    </h3>
                    <p className="text-[#666] text-[15px] leading-relaxed">{industry.desc}</p>

                    <div className="grid grid-cols-2 gap-3">
                      {industry.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={12} className="text-brand-orange" />
                          </div>
                          <span className="text-[#333] font-semibold text-sm">{f}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-3 group/cta"
                    >
                      <span
                        className="font-bold text-[11px] uppercase tracking-[0.18em] text-[#1a1a1a] group-hover/cta:text-brand-orange transition-colors"
                        style={{ fontFamily: 'var(--font-label)' }}
                      >
                        Discuss Your Needs
                      </span>
                      <div className="w-9 h-9 rounded-full border border-[#e0ddd8] flex items-center justify-center group-hover/cta:bg-brand-orange group-hover/cta:border-brand-orange group-hover/cta:text-white transition-all duration-300">
                        <ArrowRight size={15} />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
