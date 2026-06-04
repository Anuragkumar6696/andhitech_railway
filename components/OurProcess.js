'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Settings, Zap, Shield, ArrowRight } from 'lucide-react';

const steps = [
  {
    Icon: Search, n: '01',
    title: 'Design & Engineering',
    subtitle: 'Concept to Blueprint',
    text: 'Customer requirements are translated into precision designs using advanced simulation, CAD tools, and RDSO-aligned specifications. Every tolerance is calculated for operational excellence and rail safety.',
    metrics: ['CAD/CAM Design', 'Stress Analysis', 'Tolerance Studies', 'RDSO Alignment'],
    color: '#B88746',
  },
  {
    Icon: Settings, n: '02',
    title: 'Strategic Procurement',
    subtitle: 'Materials & Supply Chain',
    text: 'High-quality materials sourced exclusively from certified vendors with full traceability. Each batch is tested upon receipt for chemical composition, mechanical properties, and dimensional accuracy.',
    metrics: ['Certified Vendors', 'Batch Traceability', 'Incoming QC', 'Cost Optimisation'],
    color: '#0F766E',
  },
  {
    Icon: Zap, n: '03',
    title: 'Precision Manufacturing',
    subtitle: 'CNC Machining & Assembly',
    text: 'State-of-the-art CNC machining centres with integrated quality checkpoints at every stage of the production cycle. Our facilities run DN Solutions machines for sub-micron precision.',
    metrics: ['CNC Machining', 'Surface Finishing', 'Assembly & Fitting', 'In-Process QC'],
    color: '#3B6B9A',
  },
  {
    Icon: Shield, n: '04',
    title: 'Rigorous Testing & Delivery',
    subtitle: 'Certification & Documentation',
    text: 'Every component certified through comprehensive testing aligned with RDSO, ISO 9001, and international railway safety standards. Full documentation package provided with each delivery.',
    metrics: ['Dimensional Verify', 'Load Testing', 'RDSO Certification', 'Full Documentation'],
    color: '#B88746',
  },
];

const ease = [.22, 1, .36, 1];

export default function OurProcess() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  return (
    <section ref={sectionRef} className="relative overflow-hidden section-gap" style={{ background: '#0B1F3A' }}>
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 800px 600px at 100% 50%, rgba(184,135,70,.05), transparent 70%)' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease }}
          >
            <div className="label mb-4">Manufacturing Excellence</div>
            <h2 className="display-lg">
              From Design to<br />
              <span style={{ color: '#B88746' }}>Certified Delivery</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease, delay: .15 }}
            className="lg:flex items-end"
          >
            <p className="text-white/50 text-[.9rem] leading-relaxed">
              Our manufacturing process is built on decades of railway engineering experience, combining
              precision CNC technology with rigorous quality systems aligned to RDSO and ISO standards.
            </p>
          </motion.div>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {steps.map(({ Icon, n, title, subtitle, text, metrics, color }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7, ease, delay: i * .12 }}
              className="step cursor-pointer group"
              style={{ borderColor: active === i ? `${color}40` : undefined }}
              onClick={() => setActive(i)}
            >
              {/* Number */}
              <div className="text-white/10 text-[3.5rem] font-bold leading-none mb-4 select-none"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>{n}</div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                <Icon size={22} style={{ color }} />
              </div>

              <h3 className="text-white font-semibold text-[.95rem] mb-1">{title}</h3>
              <div className="text-white/40 text-[.7rem] uppercase tracking-wider mb-4"
                style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{subtitle}</div>
              <p className="text-white/45 text-[.8rem] leading-relaxed mb-5">{text}</p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-1.5">
                {metrics.map(m => (
                  <div key={m} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-white/35 text-[.68rem]">{m}</span>
                  </div>
                ))}
              </div>

              {/* Active indicator */}
              <div className="mt-5 h-[1px] transition-all duration-500"
                style={{ background: active === i ? color : 'transparent', opacity: active === i ? .5 : 0 }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: .8, delay: .4 }}
          className="mt-12 pt-10 border-t border-white/[.06] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-white/70 text-[.9rem]">Ready to discuss your engineering requirements?</div>
            <div className="text-white/35 text-[.8rem] mt-1">Our team is available to support your project from design to delivery.</div>
          </div>
          <a href="/contact" className="btn-primary flex-shrink-0 group inline-flex items-center gap-2">
            <span>Start a Project</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
