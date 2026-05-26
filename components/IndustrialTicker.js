'use client';
import { motion } from 'framer-motion';

const ITEMS = [
  '● RDSO APPROVED',
  '// ISO 9001:2015',
  '× PRECISION ENGINEERING',
  '● RAILWAY ROLLING STOCK',
  '// PAN-INDIA DISTRIBUTION',
  '× METRO RAIL SYSTEMS',
  '● VANDE BHARAT COMPONENTS',
  '// MAKE IN INDIA',
  '× 500+ PROJECTS DELIVERED',
  '● 10+ YEARS EXCELLENCE',
];

export default function IndustrialTicker({ inverted = false }) {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{
        background: inverted ? 'rgba(227,81,15,.07)' : 'rgba(255,255,255,.015)',
        borderColor: inverted ? 'rgba(227,81,15,.18)' : 'rgba(255,255,255,.04)',
      }}
    >
      {/* Fade masks */}
      <div className="absolute left-0 inset-y-0 w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(90deg,${inverted ? 'rgba(5,6,8,1)' : '#050608'},transparent)` }}/>
      <div className="absolute right-0 inset-y-0 w-24 z-10 pointer-events-none"
        style={{ background: `linear-gradient(270deg,${inverted ? 'rgba(5,6,8,1)' : '#050608'},transparent)` }}/>

      <div className="flex w-max ticker" style={{ animationDuration: inverted ? '50s' : '38s', animationDirection: inverted ? 'reverse' : 'normal' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-8 select-none"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '.52rem',
              letterSpacing: '.28em',
              textTransform: 'uppercase',
              color: item.startsWith('●') ? '#E3510F' : 'rgba(237,240,245,.18)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
