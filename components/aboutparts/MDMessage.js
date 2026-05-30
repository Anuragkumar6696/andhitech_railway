'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function MDMessage() {
  return (
    <section className="py-24 md:py-32 bg-[#050608] relative overflow-hidden">
      {/* Background decorations matching the About page template */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E3510F]/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content: Message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow mb-7 block">Leadership Message</span>
            <h2 className="display-md mb-10">
              Message from our <br />
              <span style={{ color: '#E3510F' }}>Managing Director</span>
            </h2>

            <div className="relative">
              {/* Quote Section with Dark Theme Styling */}
              <div className="space-y-8 relative">
                <Quote className="text-[#E3510F] opacity-20 absolute -top-8 -left-8" size={60} />
                
                <p className="text-[#9BA5B4] text-lg md:text-xl leading-relaxed font-medium italic relative z-10">
                  “At AND HITECH, we believe engineering excellence is built through precision, integrity, and continuous innovation. Over the years, our focus has remained unchanged—delivering reliable solutions that support critical transportation infrastructure while creating lasting value for our customers, partners, and industry stakeholders.”
                </p>

                <div className="pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-px bg-[#E3510F]" />
                    <div>
                      <h4 className="text-[#F0F2F5] font-light text-xl tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>Angad Singh</h4>
                      <p className="text-[#5A6478] text-sm uppercase tracking-widest mt-1" style={{ fontFamily: 'var(--font-mono)' }}>Managing Director</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content: Image with Industrial Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* The industrial-style frame seen in other parts of the site */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
              <div className="aspect-[4/5] relative">
                <Image 
                  src="/images/mdhi.jpeg" 
                  alt="Angad Singh - Managing Director"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E3510F]/40 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E3510F]/40 rounded-br-xl" />
            </div>

            {/* Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E3510F]/10 rounded-full blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
