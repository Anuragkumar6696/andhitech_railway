'use client';

import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0e0e0e]">
      {/* Outer ring */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-full border-[2px] border-transparent"
          style={{
            borderTopColor: '#e3510f',
            borderRightColor: 'rgba(227,81,15,0.3)',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          className="absolute w-12 h-12 rounded-full border-[2px] border-transparent"
          style={{
            borderTopColor: 'rgba(227,81,15,0.5)',
            borderLeftColor: 'rgba(227,81,15,0.15)',
          }}
        />

        {/* Center brand mark */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute text-white font-extrabold text-sm tracking-[0.25em]"
          style={{ fontFamily: 'var(--font-display, "Montserrat", sans-serif)' }}
        >
          AHIL
        </motion.div>
      </div>

      {/* Bottom label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.35, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute bottom-12 left-0 w-full text-center text-white text-[9px] uppercase tracking-[0.45em] font-bold"
        style={{ fontFamily: 'var(--font-label, "Barlow Condensed", sans-serif)' }}
      >
        Engineering Excellence
      </motion.p>
    </div>
  );
}
