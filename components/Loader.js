'use client';

import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-dark">
      <div className="relative">
        {/* Animated Rings */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-24 h-24 rounded-full border-4 border-brand-orange/20 border-t-brand-orange"
        />
        
        {/* Pulsing Logo or Text */}
        <motion.div
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-white font-bold text-xs uppercase tracking-[0.2em]">AHIL</div>
        </motion.div>
      </div>
      
      {/* Background Text Overlay */}
      <div className="absolute bottom-10 left-0 w-full text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="text-white text-[10px] uppercase tracking-[0.5em] font-bold"
        >
          Engineering Excellence
        </motion.p>
      </div>
    </div>
  );
}
