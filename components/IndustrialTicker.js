'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ITEMS = [
  { type: 'text', content: '● RDSO APPROVED' },
  { type: 'text', content: '● MAKE IN INDIA' },
  { type: 'image', content: '/images/mid.png' },
  { type: 'text', content: '● PRECISION ENGINEERING' },
  { type: 'text', content: '● ISO 9001:2015' },
  { type: 'image', content: '/images/ISO.jpeg' },
  { type: 'text', content: '● RAILWAY ROLLING STOCK' },
  { type: 'text', content: '● PAN-INDIA DISTRIBUTION' },
  { type: 'text', content: '● METRO RAIL SYSTEMS' },
  { type: 'text', content: '● VANDE BHARAT COMPONENTS' },
  { type: 'image', content: '/images/VB.jpeg' },
  // { type: 'text', content: '● MAKE IN INDIA' },
  { type: 'text', content: '● 500+ PROJECTS DELIVERED' },
  { type: 'text', content: '● 10+ YEARS EXCELLENCE' },
];

const SpecialItem = ({ item }) => {
  if (item.type === 'image') {
    return (
      <div className="flex-shrink-0 px-12 h-14 flex items-center">
        <div className="relative h-12 w-20 rounded-lg overflow-hidden border border-white/10 shadow-lg">
          <Image src={item.content} alt="Railway Product" fill className="object-cover" unoptimized />
        </div>
      </div>
    );
  }

  const text = item.content;
  const isVande = text.includes('VANDE BHARAT');
  const isMakeInIndia = text.includes('MAKE IN INDIA');
  
  if (isVande || isMakeInIndia) {
    return (
      <span className="flex items-center gap-8 px-16">
        <span style={{ 
          color: '#E3510F', 
          fontWeight: '950',
          textShadow: '0 0 40px rgba(227,81,15,0.7), 0 0 10px rgba(227,81,15,0.4)',
          letterSpacing: '.2em',
          fontSize: '0.85rem'
        }}>
          {text}
        </span>
      </span>
    );
  }

  return (
    <span
      className="flex-shrink-0 px-12 select-none"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '.85rem',
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
      className="relative overflow-hidden py-10 border-y"
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

      <div className="flex w-max ticker items-center" style={{ animationDuration: inverted ? '45s' : '32s', animationDirection:   'normal' }}>
        {doubled.map((item, i) => (
          <SpecialItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
