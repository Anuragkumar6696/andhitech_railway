'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutImages() {
  return (
    <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl"
          >
            <Image
              src="/images/about-office-logo.jpg"
              alt="AND HITECH Corporate Office"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <h4 className="text-[#B88746] font-bold text-2xl mb-3 uppercase tracking-wider" style={{ fontFamily:'var(--font-display)' }}>Our Corporate Identity</h4>
               <p className="text-[#9AAABB] text-base font-medium leading-relaxed">
                 The AND HITECH logo stands as a symbol of our unwavering commitment to precision, safety, and excellence in the global railway infrastructure sector.
               </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[450px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl"
          >
            <Image
              src="/images/about-train-painting.jpg"
              alt="Railway Heritage and Innovation"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <h4 className="text-[#B88746] font-bold text-2xl mb-3 uppercase tracking-wider" style={{ fontFamily:'var(--font-display)' }}>Heritage & Innovation</h4>
               <p className="text-[#9AAABB] text-base font-medium leading-relaxed">
                 Blending the rich heritage of railway engineering with cutting-edge technological advancements to move the future of transit.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
