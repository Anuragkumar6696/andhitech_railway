"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ArrowRight, Target, Eye, ShieldCheck, Shield, Cpu, TrendingUp, Quote, Award, Globe } from "lucide-react";

const ease = [.22, 1, .36, 1];

const MILESTONES = [
  { year: '2013', label: 'Founded', desc: 'AND Hitech Industries incorporated in New Delhi with a mission to serve Indian Railways', accent: '#E3510F' },
  { year: '2015', label: 'RDSO Approved', desc: 'First batch of RDSO-approved components delivered to Indian Railways\' network', accent: '#3B82F6' },
  { year: '2018', label: 'HVAC Expansion', desc: 'Entered advanced HVAC engineering for metro rail and industrial applications', accent: '#10B981' },
  { year: '2022', label: 'Dual Certification', desc: 'ISO 9001:2015 and ISO 14001:2015 certifications achieved simultaneously', accent: '#8B5CF6' },
  { year: '2024', label: 'Pan-India Scale', desc: '500+ projects delivered. Expanded product portfolio to 15+ product lines', accent: '#F59E0B' },
];

const STRENGTHS = [
  {
    Icon: Shield,
    title: 'RDSO-Approved Manufacturing',
    desc: 'All railway-critical components manufactured to Research Designs & Standards Organisation specifications — the highest standard in Indian railway supply.',
  },
  {
    Icon: Cpu,
    title: 'Advanced CNC Infrastructure',
    desc: 'State-of-the-art 5-axis CNC machining centres from DN Solutions achieving sub-micron tolerances across all critical component dimensions.',
  },
  {
    Icon: TrendingUp,
    title: 'Government-Trusted Partner',
    desc: 'Decade-long track record supplying to Indian Railways, Metro Corporations, and PSUs — making us one of India\'s most trusted railway OEM partners.',
  },
  {
    Icon: Globe,
    title: 'Growing Export Capability',
    desc: 'International quality standards and documentation make AHIL components export-ready for South Asian and emerging market railway programmes.',
  },
];

const MISSION_TABS = [
  {
    id: 'mission', label: 'Our Mission', Icon: Target,
    content: 'To deliver reliable, high-performance engineering solutions for Indian Railways, Metro Corporations, and PSUs — combining precision manufacturing with exceptional customer service and technical excellence.',
    points: ['Railway Rolling Stock Components', 'HVAC Systems for Metro & Industrial', 'Customer-Centric Engineering', 'On-Time Delivery Excellence'],
  },
  {
    id: 'vision', label: 'Our Vision', Icon: Eye,
    content: 'To be a globally recognized leader in industrial engineering, setting new standards for quality, safety, and sustainable innovation in transportation infrastructure and critical manufacturing.',
    points: ['Global Engineering Leadership', 'Sustainable Innovation', 'Safety Standard Setting', 'Technological Advancement'],
  },
  {
    id: 'value', label: 'Our Values', Icon: ShieldCheck,
    content: 'Integrity, precision, and a relentless focus on quality are the pillars that support our commitment to partners, employees, and the communities we serve across India\'s rail network.',
    points: ['Uncompromising Integrity', 'Precision in Every Detail', 'Relentless Quality Focus', 'Community Commitment'],
  },
];

export default function AboutUs() {
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ['start end', 'end start'] });
  const lineH = useTransform(timelineProgress, [.1, .9], ['0%', '100%']);

  return (
    <>
      <Head>
        <title>About Us | AND Hitech Industries</title>
        <meta name="description" content="AND Hitech Industries — established 2013, RDSO approved, ISO certified precision manufacturer for Indian Railways and Metro networks." />
      </Head>

      <Header />

      <PageBanner
        title="About Us"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="About Us"
      />

      {/* ── WHO WE ARE ── */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#07080C' }}>
        <div className="absolute inset-0 bg-grid-eng opacity-40 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}
              className="space-y-8">
              <div>
                <span className="eyebrow mb-7 block">Who We Are</span>
                <h2 className="display-md mb-8">Welcome to <span style={{ color: '#E3510F' }}>AND HITECH</span> Industries</h2>
                <p className="text-[#9BA5B4] text-base leading-relaxed mb-6">
                  Established in 2013, AND HITECH INDUSTRIES LTD (AHIL) has emerged as a trusted name in precision manufacturing for India&apos;s railway sector. We specialise in high-quality components for Railway Rolling Stock and advanced HVAC systems for Railways and Metros.
                </p>
                <p className="text-[#6A7888] text-[.90rem] leading-relaxed">
                  With 100+ skilled professionals across engineering, manufacturing, and quality assurance, we partner with Indian Railways, Metro Corporations, and PSUs to drive transformation through precision engineering that meets the highest global standards.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Precision Engineering Excellence',
                  'RDSO Approved Vendor',
                  'ISO 9001:2015 & 14001:2015',
                  'Government-Trusted Partner',
                  'Make in India Committed',
                  'Pan-India Supply Network',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 px-4 rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#E3510F]/20 transition-colors group cursor-default">
                    <CheckCircle2 size={13} className="text-[#E3510F] flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-[#9BA5B4] text-[.80rem] font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link href="/products" className="btn-flame group inline-flex items-center gap-2 py-3 px-7 text-[.66rem]">
                  <span>Explore Products</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="btn-wire inline-flex items-center gap-2 py-3 px-7 text-[.66rem]">
                  <span>Get in Touch</span>
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .9 }}
              className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/[.06] relative group" style={{ height: 500 }}>
                <Image src="/images/production-unit-final.jpg" alt="AND Hitech Manufacturing Facility" fill
                  className="object-cover opacity-70 group-hover:opacity-88 group-hover:scale-[1.03] transition-all duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080C]/60 to-transparent" />
                {/* Stats overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-2">
                    {[['2013', 'Founded'], ['500+', 'Projects'], ['100+', 'Engineers']].map(([n, l]) => (
                      <div key={l} className="glass p-3 text-center">
                        <div className="text-[#EDF0F5] text-[1.2rem] font-bold" style={{ fontFamily: 'var(--font-display)', lineHeight: 1 }}>{n}</div>
                        <div className="text-[#4E5A6E] text-[.58rem] uppercase tracking-[.15em] mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-[#E3510F] opacity-8 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MD MESSAGE ── */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#050608' }}>
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E3510F]/4 rounded-full blur-[140px] -mr-64 -mt-64 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: Message */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
              <span className="eyebrow mb-7 block">Leadership Message</span>
              <h2 className="display-md mb-10">
                Message from our <br />
                <span style={{ color: '#E3510F' }}>Managing Director</span>
              </h2>

              {/* Quote */}
              <div className="relative pl-7 border-l-2 border-[#E3510F]/35 space-y-5 mb-10">
                <Quote size={24} className="text-[#E3510F]/30 mb-3" />
                <p className="text-[#9BA5B4] text-lg md:text-xl leading-relaxed font-light italic">
                  "At AND HITECH, we believe engineering excellence is built through precision, integrity, and continuous innovation. Over the years, our focus has remained unchanged — delivering reliable solutions that support critical transportation infrastructure while creating lasting value for our customers, partners, and industry stakeholders."
                </p>
                <div className="pt-6 border-t border-white/[.06]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-px bg-[#E3510F]" />
                    <div>
                      <h4 className="text-[#F0F2F5] font-light text-xl tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>Angad Singh</h4>
                      <p className="text-[#5A6478] text-sm uppercase tracking-widest mt-1" style={{ fontFamily: 'var(--font-mono)' }}>Managing Director</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials */}
              <div className="flex flex-wrap gap-3">
                {['IIT Graduate', 'Railway Engineering Expert', '10+ Years Leadership'].map(badge => (
                  <span key={badge} className="badge text-[.56rem]">{badge}</span>
                ))}
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .9 }}
              className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/[.08] group" style={{ height: 520 }}>
                <Image src="/images/md.jpg" alt="Angad Singh — Managing Director, AND Hitech" fill
                  className="object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/50 to-transparent" />
                {/* Award badge */}
                <div className="absolute top-6 right-6">
                  <div className="glass p-4 flex items-center gap-3">
                    <Award size={18} className="text-[#E3510F]" />
                    <div>
                      <div className="text-[#EDF0F5] text-[.70rem] font-medium">Excellence Award</div>
                      <div className="text-[#4E5A6E] text-[.58rem]" style={{ fontFamily: 'var(--font-mono)' }}>Manufacturing 2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMPANY TIMELINE ── */}
      <section ref={timelineRef} className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#0B0E15' }}>
        <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(227,81,15,.2),transparent)' }} />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="eyebrow mb-5 block">Our Journey</span>
            <h2 className="display-md max-w-xl">A Decade of Engineering<br /><span style={{ color: '#E3510F' }}>Milestones</span></h2>
          </motion.div>

          {/* Timeline — vertical on mobile, horizontal on desktop */}
          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-5 top-0 w-px h-full hidden md:hidden pointer-events-none" style={{ background: 'rgba(227,81,15,.15)' }} />

            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-5 md:gap-6">
              {MILESTONES.map(({ year, label, desc, accent }, i) => (
                <motion.div key={year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * .1, duration: .7, ease }}
                  className="relative group"
                >
                  {/* Connector line on desktop */}
                  {i < MILESTONES.length - 1 && (
                    <div className="hidden md:block absolute top-5 left-[calc(100%-0px)] right-0 h-px"
                      style={{ background: 'linear-gradient(90deg,rgba(227,81,15,.3),rgba(255,255,255,.05))' }} />
                  )}

                  {/* Dot */}
                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110"
                    style={{ borderColor: `${accent}50`, background: `${accent}12` }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
                  </div>

                  {/* Year */}
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', lineHeight: 1, color: '#EDF0F5' }} className="mb-1">
                    {year}
                  </div>

                  {/* Label */}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.56rem', letterSpacing: '.18em', color: accent, textTransform: 'uppercase' }} className="mb-2.5">
                    {label}
                  </div>

                  {/* Desc */}
                  <p className="text-[#3D4A5C] text-[.74rem] leading-relaxed group-hover:text-[#5C6A7E] transition-colors">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#07080C' }}>
        <div className="absolute inset-0 bg-grid-eng opacity-35 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-14 gap-8">
            <div>
              <span className="eyebrow mb-5 block">Our Direction</span>
              <h2 className="display-md max-w-xl">Mission, Vision &<br /><span style={{ color: '#E3510F' }}>Core Values</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {MISSION_TABS.map(({ id, label, Icon, content, points }, i) => (
              <motion.div key={id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * .1, duration: .7, ease }}
                className="bento-cell p-8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E3510F]/10 flex items-center justify-center mb-6 group-hover:bg-[#E3510F] transition-all duration-400">
                  <Icon size={20} className="text-[#E3510F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[#EDF0F5] text-xl font-bold mb-4 group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {label}
                </h3>
                <p className="text-[#9BA5B4] text-[.85rem] leading-relaxed italic mb-6">&ldquo;{content}&rdquo;</p>
                <ul className="space-y-3">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <CheckCircle2 size={13} className="text-[#E3510F] flex-shrink-0" />
                      <span className="text-[#6A7888] text-[.78rem] group-hover:text-[#8C98AA] transition-colors">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE STRENGTHS ── */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#050608' }}>
        <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16">
            <div>
              <span className="eyebrow mb-5 block">Why Choose AHIL</span>
              <h2 className="display-md">Core Strengths in<br /><span style={{ color: '#E3510F' }}>Industrial Innovation</span></h2>
            </div>
            <p className="text-[#9BA5B4] leading-relaxed border-l-2 border-[#E3510F]/40 pl-6 italic text-[.92rem]">
              &ldquo;Our strength lies in combining precision engineering, ethical practices, and customer-focused manufacturing to deliver products that meet the highest global standards.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {STRENGTHS.map(({ Icon, title, desc }, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * .1, duration: .7, ease }}
                  className="bento-cell p-9 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E3510F]/10 flex items-center justify-center mb-6 group-hover:bg-[#E3510F] transition-colors duration-400">
                    <Icon size={22} className="text-[#E3510F] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[#EDF0F5] text-[.92rem] font-bold mb-3 group-hover:text-white transition-colors">{title}</h3>
                  <p className="text-[#B4BEC9] leading-relaxed text-[.82rem]">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: .4, duration: .7, ease }}
              className="lg:col-span-4 flex flex-col justify-center p-9 rounded-2xl"
              style={{ background: 'linear-gradient(135deg,#E3510F,#C44208)' }}
            >
              <ShieldCheck size={40} className="text-white/80 mb-6" />
              <h3 className="text-white text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>Ready to Partner?</h3>
              <p className="text-white/70 text-[.85rem] leading-relaxed mb-6">
                Let&apos;s discuss how our precision manufacturing capabilities can elevate your next railway project.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-white text-white text-[.78rem] font-semibold rounded-xl hover:bg-white hover:text-[#E3510F] transition-all duration-300"
                style={{ width: 'fit-content', fontFamily: 'var(--font-mono)', letterSpacing: '.1em' }}
              >
                Contact Us <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
