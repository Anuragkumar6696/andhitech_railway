'use client';
import { motion } from 'framer-motion';

/*
 * WhyAndHitech — Trust + Differentiators
 * Layout: centred heading + 3×2 card grid
 * Style: ivory background, white cards, copper icon borders
 */

const cards = [
  {
    title: 'Engineering Expertise',
    desc: 'A decade of in-house railway component engineering, backed by CNC machining capability and multi-stage quality systems.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
  {
    title: 'Railway-Only Focus',
    desc: 'Exclusively railway. Every product, process, and system designed, tested, and certified for the demands of rail operations.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    title: 'ISO 9001:2015 Quality',
    desc: 'Certified end-to-end quality management. Multi-stage inspection from incoming raw material through to final dispatch.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'RDSO Approved',
    desc: 'Recognised by the Research Designs & Standards Organisation — India's highest authority for railway vendor standards.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    title: 'Innovation Culture',
    desc: 'Continuous investment in manufacturing technology and product development to stay ahead of evolving railway requirements.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    title: 'Long-Term Partnership',
    desc: 'Built on reliability, on-time delivery, and full technical support throughout the entire product lifecycle.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const ease = [.22, 1, .36, 1];

export default function WhyAndHitech() {
  return (
    <section
      className="relative overflow-hidden section-gap"
      style={{ background: '#F7F5F0' }}
      aria-label="Why choose AND Hitech"
    >
      <div className="absolute inset-0 bg-dots opacity-45 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .8, ease }}
          className="text-center mb-16"
          style={{ maxWidth: '640px', margin: '0 auto 64px' }}
        >
          <div className="label-dark mb-4 inline-block">The AND Hitech Difference</div>
          <h2 className="display-lg-dark leading-tight">
            Built for Railway.<br />
            <span className="text-copper">Certified for Excellence.</span>
          </h2>
          <div
            style={{ width: '40px', height: '2px', background: '#B88746', margin: '20px auto 20px' }}
          />
          <p style={{ color: '#6B7A8E', fontSize: '.88rem', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto' }}>
            Over a decade of exclusive railway focus gives us an engineering edge no generalist manufacturer can match.
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '2px', background: 'rgba(11,31,58,.06)', borderRadius: '4px', overflow: 'hidden' }}
        >
          {cards.map(({ title, desc, icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7, ease, delay: i * .09 }}
              className="group"
              style={{
                background: '#fff', padding: '40px 36px',
                transition: 'background .3s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F7F5F0'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              {/* Icon */}
              <div style={{
                width: '48px', height: '48px',
                borderRadius: '6px',
                background: 'rgba(11,31,58,.04)',
                border: '1px solid rgba(184,135,70,.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                {icon}
              </div>

              <h4 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '1rem', fontWeight: 600,
                color: '#0B1F3A', marginBottom: '10px',
              }}>
                {title}
              </h4>
              <p style={{ fontSize: '.82rem', color: '#6B7A8E', lineHeight: 1.7 }}>{desc}</p>

              {/* Hover bar */}
              <div
                className="group-hover:w-full group-hover:bg-[#B88746]/50 transition-all duration-500"
                style={{
                  width: '32px', height: '2px',
                  background: 'rgba(184,135,70,.25)',
                  marginTop: '20px',
                  transition: 'width .5s, background .3s',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
