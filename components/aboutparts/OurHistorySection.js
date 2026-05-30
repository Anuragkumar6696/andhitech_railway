'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function HistoryTabs() {
  return (
    <section className="py-24 md:py-32 bg-[#07080C] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-eng opacity-40 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            className="space-y-8">
            <div>
              <span className="eyebrow mb-7 block">Who We Are</span>
              <h2 className="display-md mb-8">Welcome to <span style={{color:'#E3510F'}}>AND HITECH</span> INDUSTRIES LTD</h2>
              <p className="text-[#9BA5B4] text-base leading-relaxed">
                Established in 2013, AND HITECH INDUSTRIES LTD (AHIL) has emerged as a trusted name in precision manufacturing. We specialize in high-quality components for Railway Rolling Stock and advanced HVAC systems for Railways and Metros.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Precision Engineering Excellence','Tailored Industrial Solutions','Quality & Compliance','Sustainable Practices'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 px-4 rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#E3510F]/20 transition-colors group cursor-default">
                  <div className="w-5 h-5 rounded-full bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E3510F] transition-colors">
                    <CheckCircle2 size={11} className="text-[#E3510F] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[#9BA5B4] text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.8 }}
            className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/6 relative">
              <Image src="/images/production-unit-final.jpg" alt="AND Hitech" width={600} height={500}
                className="w-full h-auto object-cover opacity-75 hover:opacity-90 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080C]/50 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-[#E3510F] opacity-10 rounded-full blur-3xl -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
