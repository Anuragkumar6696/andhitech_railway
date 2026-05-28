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

const SpecialItem = ({ text }) => {
  const isVande = text.includes('VANDE BHARAT');
  const isMakeInIndia = text.includes('MAKE IN INDIA');
  
  if (isVande || isMakeInIndia) {
    return (
      <span className="flex items-center gap-8 px-16">
        <span style={{ 
          color: '#E3510F', 
          fontWeight: '950',
          textShadow: '0 0 40px rgba(227,81,15,0.7), 0 0 10px rgba(227,81,15,0.4)',
          letterSpacing: '.5em',
          fontSize: '.85rem'
        }}>
          {text}
        </span>
        <div className="w-24 h-px bg-[#E3510F]/60 shadow-[0_0_10px_rgba(227,81,15,0.3)]" />
      </span>
    );
  }

  return (
    <span
      className="flex-shrink-0 px-12 select-none"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '.65rem',
        letterSpacing: '.32em',
        textTransform: 'uppercase',
        color: text.startsWith('●') ? '#E3510F' : 'rgba(237,240,245,.25)',
        fontWeight: '600'
      }}
    >
      {text}
    </span>
  );
};

export default function IndustrialTicker({ inverted = false }) {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative overflow-hidden py-8 border-y"
      style={{
        background: inverted ? 'rgba(227,81,15,.12)' : 'rgba(255,255,255,.03)',
        borderColor: inverted ? 'rgba(227,81,15,.3)' : 'rgba(255,255,255,.08)',
      }}
    >
      {/* Fade masks */}
      <div className="absolute left-0 inset-y-0 w-32 z-10 pointer-events-none"
        style={{ background: `linear-gradient(90deg,${inverted ? 'rgba(5,6,8,1)' : '#050608'},transparent)` }}/>
      <div className="absolute right-0 inset-y-0 w-32 z-10 pointer-events-none"
        style={{ background: `linear-gradient(270deg,${inverted ? 'rgba(5,6,8,1)' : '#050608'},transparent)` }}/>

      <div className="flex w-max ticker" style={{ animationDuration: inverted ? '45s' : '32s', animationDirection: inverted ? 'reverse' : 'normal' }}>
        {doubled.map((item, i) => (
          <SpecialItem key={i} text={item} />
        ))}
      </div>
    </div>
  );
}
