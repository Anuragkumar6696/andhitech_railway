'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, Settings, Zap, Shield, ArrowRight, ChevronDown } from 'lucide-react';

const steps = [
  {
    Icon: Search,
    n: '01',
    title: 'Design & Engineering',
    subtitle: 'Concept to Blueprint',
    text: 'Customer requirements are translated into precision designs using advanced simulation, CAD tools, and RDSO-aligned specifications. Every tolerance is calculated for operational excellence.',
    metrics: ['CAD/CAM Design','Stress Analysis','Tolerance Studies','RDSO Alignment'],
    color: '#E3510F',
  },
  {
    Icon: Settings,
    n: '02',
    title: 'Strategic Procurement',
    subtitle: 'Materials & Supply Chain',
    text: 'High-quality materials sourced exclusively from certified vendors with full traceability. Each batch is tested upon receipt for chemical composition, mechanical properties, and dimensional accuracy.',
    metrics: ['Certified Vendors','Batch Traceability','Incoming QC','Cost Optimisation'],
    color: '#F59E0B',
  },
  {
    Icon: Zap,
    n: '03',
    title: 'Precision Manufacturing',
    subtitle: 'CNC Machining & Assembly',
    text: 'State-of-the-art CNC machining centres with integrated quality checkpoints at every stage of the production cycle. Our facilities run DN Solutions machines for sub-micron precision.',
    metrics: ['CNC Machining','Surface Finishing','Assembly & Fitting','In-Process QC'],
    color: '#3B82F6',
  },
  {
    Icon: Shield,
    n: '04',
    title: 'Rigorous Testing',
    subtitle: 'Certification & Delivery',
    text: 'Every component certified through comprehensive testing aligned with RDSO, ISO 9001, and international railway safety standards. Full documentation package provided with each delivery.',
    metrics: ['Dimensional Verify','Load Testing','RDSO Certification','Full Documentation'],
    color: '#10B981',
  },
];

const ease = [.22, 1, .36, 1];

/* ── Animated railway track SVG ── */
function TrackLine({ progress }) {
  const strokeDash = useTransform(progress, [0, 1], ['0, 1000', '1000, 0']);
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 8" preserveAspectRatio="none">
      <line x1="0" y1="4" x2="1200" y2="4" stroke="rgba(255,255,255,.04)" strokeWidth="2"/>
      <motion.line
        x1="0" y1="4" x2="1200" y2="4"
        stroke="url(#trackGrad)"
        strokeWidth="2"
        strokeDasharray={strokeDash}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E3510F"/>
          <stop offset="100%" stopColor="rgba(227,81,15,.15)"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Individual step card ── */
function StepCard({ step, index, isActive, onClick }) {
  const { Icon, n, title, subtitle, text, metrics, color } = step;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * .12, duration: .8, ease }}
      className="flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Step top connector */}
      <div className="flex items-center gap-4 mb-8">
        {/* Step dot */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
          style={{
            background: isActive ? color : '#141B2D',
            border: `1px solid ${isActive ? color : 'rgba(255,255,255,.06)'}`,
            boxShadow: isActive ? `0 0 32px ${color}40` : 'none',
          }}
        >
          <Icon size={20} style={{ color: isActive ? '#fff' : color }} className="transition-colors duration-300"/>
        </motion.div>

        {/* Large ghost number */}
        <div
          className="leading-none select-none font-bold transition-colors duration-500"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem,6vw,5.5rem)',
            color: isActive ? `${color}22` : 'rgba(255,255,255,.03)',
            letterSpacing: '-.02em',
          }}
        >
          {n}
        </div>
      </div>

      {/* Accent rule */}
      <div
        className="mb-6 transition-all duration-500 origin-left"
        style={{
          height: 2,
          width: isActive ? 56 : 32,
          background: `linear-gradient(90deg,${color},${color}40)`,
          borderRadius: 2,
        }}
      />

      <h3
        className="font-semibold mb-1.5 transition-colors duration-300"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem,2vw,1.5rem)',
          letterSpacing: '.02em',
          color: isActive ? '#EDF0F5' : '#8C98AA',
        }}
      >
        {title}
      </h3>

      <p className="text-[.68rem] mb-5 uppercase tracking-widest transition-colors duration-300 font-bold"
        style={{ fontFamily: 'var(--font-mono)', color: isActive ? color : '#3D4A5C' }}>
        {subtitle}
      </p>

      <p className={`text-[.92rem] leading-relaxed mb-7 transition-all duration-500 font-medium ${isActive ? 'text-[#ADBAC7]' : 'text-[#3D4A5C]'}`}>
        {text}
      </p>

      {/* Metric pills — visible when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: .4, ease }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * .06 }}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg"
                  style={{ background: `${color}10`, border: `1px solid ${color}20` }}
                >
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }}/>
                  <span className="text-[.66rem] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)', color }}>{m}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function OurProcess() {
  const sectionRef  = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineProgress = useTransform(scrollYProgress, [.1, .6], [0, 1]);
  const bgY          = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden section-gap" style={{ background: '#050608' }}>
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none"/>
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 900px 600px at 50% 40%,rgba(227,81,15,.05),transparent 65%)', y: bgY }}/>
      <div className="absolute inset-x-0 top-0 h-px divider pointer-events-none"/>
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none"/>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-end">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.75, ease }}>
            <span className="eyebrow mb-7 block">Engineering Workflow</span>
            <h2 className="display-md">
              From Concept to<br/><span style={{ color:'#E3510F' }}>Certified Product</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.14, duration:.75, ease }}
            className="border-l-2 border-[#E3510F]/32 pl-7">
            <p className="text-[#ADBAC7] leading-relaxed text-[1.1rem] font-medium">
              A structured four-stage manufacturing process ensures every component meets the precise standards required for railway and metro applications worldwide. Click any stage to explore.
            </p>
          </motion.div>
        </div>

        {/* ── Animated track connector (desktop) ── */}
        <div className="relative mb-0 hidden lg:block" style={{ height: 8, marginBottom: -4 }}>
          <TrackLine progress={lineProgress}/>
          {/* Dot nodes */}
          {[0, 1, 2, 3].map(i => (
            <motion.button
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * .15 + .35, duration: .5, ease }}
              onClick={() => setActive(i)}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-500"
              style={{
                left: `${(i / 3) * 100}%`,
                width: active === i ? 20 : 12,
                height: active === i ? 20 : 12,
                borderRadius: '50%',
                background: steps[i].color,
                boxShadow: active === i ? `0 0 20px ${steps[i].color}80` : 'none',
                border: `2px solid #050608`,
              }}
            />
          ))}
        </div>

        {/* ── Steps grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {steps.map((step, i) => (
            <StepCard
              key={i}
              step={step}
              index={i}
              isActive={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        {/* ── Quality banner ── */}
        <motion.div
          initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.4, duration:.85, ease }}
          className="mt-20 rounded-2xl overflow-hidden relative border border-white/[.05]"
          style={{ background:'linear-gradient(135deg,#0B0E15 0%,#0F1420 50%,#0B0E15 100%)', minHeight: 280 }}
        >
          {/* Blueprint SVG decoration */}
          <div className="absolute inset-0 bg-grid-dense opacity-25 pointer-events-none"/>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background:'radial-gradient(ellipse 700px 300px at 50% 50%,rgba(227,81,15,.055),transparent 65%)' }}/>
          <svg className="absolute right-0 top-0 h-full w-auto opacity-[.07]" viewBox="0 0 400 280" fill="none" preserveAspectRatio="xMaxYMid meet">
            <circle cx="340" cy="140" r="120" stroke="#E3510F" strokeWidth="1.5" strokeDasharray="8 5"/>
            <circle cx="340" cy="140" r="80"  stroke="#E3510F" strokeWidth="1" strokeDasharray="4 4"/>
            <circle cx="340" cy="140" r="40"  stroke="#E3510F" strokeWidth="1"/>
            <line x1="220" y1="140" x2="460" y2="140" stroke="#E3510F" strokeWidth="1" strokeDasharray="6 4"/>
            <line x1="340" y1="20"  x2="340" y2="260" stroke="#E3510F" strokeWidth="1" strokeDasharray="6 4"/>
            <g stroke="#E3510F" strokeWidth="2"><path d="M 12,12 L 12,36 M 12,12 L 36,12"/><path d="M 388,12 L 388,36 M 388,12 L 364,12"/></g>
          </svg>
          <div className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{ background:'linear-gradient(90deg,transparent,#E3510F,rgba(227,81,15,.25),transparent)' }}/>

          <div className="relative z-10 p-10 md:p-14 max-w-2xl">
            <p className="text-[#E3510F] text-[.56rem] tracking-[.28em] uppercase mb-6" style={{ fontFamily:'var(--font-mono)' }}>
              Quality Commitment
            </p>
            <h3 className="display-sm mb-6">Every Component.<br/><span style={{ color:'#E3510F' }}>Zero Compromise.</span></h3>
            <p className="text-[#8C98AA] text-[.9rem] leading-relaxed mb-10 max-w-lg">
              Our quality management system is certified to ISO 9001:2015. Every product is validated against RDSO standards before delivery — ensuring the highest safety and reliability for railway operations.
            </p>
            <Link href="/contact" className="btn-flame inline-flex group py-3.5 px-9 text-[.62rem] gap-2.5">
              <span>Request Certification Details</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
