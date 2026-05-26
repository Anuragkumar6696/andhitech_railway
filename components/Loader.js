'use client';
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07080C]">
      {/* Grid BG */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none"/>
      {/* Center glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 600px 400px at 50% 50%,rgba(227,81,15,.06),transparent 70%)'
      }}/>

      {/* Spinner rings */}
      <div className="relative flex items-center justify-center mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute w-24 h-24 rounded-full"
          style={{ border:'1px solid rgba(227,81,15,.25)', borderTopColor:'#E3510F' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute w-14 h-14 rounded-full"
          style={{ border:'1px dashed rgba(227,81,15,.18)', borderTopColor:'rgba(227,81,15,.5)' }}
        />
        {/* Center icon */}
        <motion.div
          animate={{ opacity: [.4, 1, .4] }}
          transition={{ duration: 1.9, repeat: Infinity }}
          className="relative z-10"
          style={{ fontFamily:'var(--font-display)', fontSize:'.85rem', letterSpacing:'.3em', color:'#F0F2F5' }}
        >
          AHIL
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="w-[240px] h-[1px] bg-white/[.06] overflow-hidden rounded-full">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-1/2 rounded-full"
          style={{ background: 'linear-gradient(90deg,transparent,#E3510F,transparent)' }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: .22 }}
        transition={{ delay: .6 }}
        className="absolute bottom-14 text-[.55rem] uppercase tracking-[.45em] text-[#F0F2F5] font-mono"
      >
        Engineering Excellence
      </motion.p>
    </div>
  );
}
