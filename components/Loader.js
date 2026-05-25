'use client';
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07080C]">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"/>
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 600px 400px at 50% 50%,rgba(227,81,15,.06),transparent 70%)'}}/>

      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <motion.div animate={{rotate:360}} transition={{duration:3,repeat:Infinity,ease:'linear'}}
          className="absolute w-24 h-24 rounded-full"
          style={{border:'1px solid rgba(227,81,15,.25)',borderTopColor:'#E3510F'}}/>
        {/* Inner ring */}
        <motion.div animate={{rotate:-360}} transition={{duration:2,repeat:Infinity,ease:'linear'}}
          className="absolute w-14 h-14 rounded-full"
          style={{border:'1px dashed rgba(227,81,15,.18)',borderTopColor:'rgba(227,81,15,.5)'}}/>
        {/* Center text */}
        <motion.div animate={{opacity:[.4,1,.4]}} transition={{duration:1.9,repeat:Infinity}}
          className="font-bold text-[.7rem] tracking-[.35em] text-[#F0F2F5]"
          style={{fontFamily:'var(--font-display)'}}>
          AHIL
        </motion.div>
      </div>

      <motion.p initial={{opacity:0}} animate={{opacity:.22}} transition={{delay:.6}}
        className="absolute bottom-14 text-[.55rem] uppercase tracking-[.45em] text-[#F0F2F5] font-mono">
        Engineering Excellence
      </motion.p>
    </div>
  );
}
