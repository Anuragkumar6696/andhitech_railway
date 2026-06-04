'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 18, 95));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: .6, ease: [.22,1,.36,1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B1F3A] overflow-hidden"
    >
      {/* Atmospheric grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"/>

      {/* Radial glow pulse */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [.06, .12, .06] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,135,70,.15) 0%, transparent 70%)' }}
      />

      {/* Corner accents */}
      {[
        'top-8 left-8 border-t border-l',
        'top-8 right-8 border-t border-r',
        'bottom-8 left-8 border-b border-l',
        'bottom-8 right-8 border-b border-r',
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: .8 }}
          animate={{ opacity: .3, scale: 1 }}
          transition={{ delay: i * .08, duration: .6 }}
          className={`absolute w-12 h-12 border-[#B88746]/40 ${cls}`}
        />
      ))}

      {/* Main logo mark */}
      <div className="relative mb-12 flex flex-col items-center">
        {/* Spinning SVG rings */}
        <div className="relative w-28 h-28 mb-8">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            viewBox="0 0 112 112"
          >
            <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(184,135,70,.1)" strokeWidth="1" strokeDasharray="6 4"/>
          </motion.svg>
          <motion.svg
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
            viewBox="0 0 112 112"
          >
            <circle
              cx="56" cy="56" r="46"
              fill="none"
              stroke="url(#loaderGrad)"
              strokeWidth="1.5"
              strokeDasharray="32 282"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B88746"/>
                <stop offset="100%" stopColor="rgba(184,135,70,0)"/>
              </linearGradient>
            </defs>
          </motion.svg>
          {/* Centre text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              animate={{ opacity: [.5, 1, .5] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', letterSpacing:'.32em', color:'#EDF0F5' }}
            >
              AHIL
            </motion.span>
          </div>
        </div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .4, duration: .7 }}
          style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1rem,3vw,1.4rem)', letterSpacing:'.22em', color:'rgba(237,240,245,.35)' }}
        >
          AND HITECH INDUSTRIES
        </motion.div>
      </div>

      {/* Progress track */}
      <div className="w-72 h-px bg-white/[.04] overflow-hidden relative rounded-full mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg,#B88746,#D4A054)',
            boxShadow: '0 0 12px rgba(184,135,70,.6)',
            transition: 'width .12s linear',
          }}
        />
        {/* Shimmer */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: .4 }}
          className="absolute inset-y-0 w-1/3 rounded-full"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)' }}
        />
      </div>

      {/* Status text */}
      <motion.p
        animate={{ opacity: [.2, .5, .2] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ fontFamily:'var(--font-mono)', fontSize:'.5rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(237,240,245,.3)' }}
      >
        Initialising Systems
      </motion.p>
    </motion.div>
  );
}
