'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Cpu, TrendingUp, Zap } from 'lucide-react';

const features = [
  { Icon:Shield, title:'High Reliability & Dependability', desc:'Years of experience in railway rolling stock and HVAC systems enable us to deliver dependable products for critical applications.' },
  { Icon:Cpu, title:'Precision Manufacturing', desc:'State-of-the-art facilities and strict quality control ensure every component meets the highest reliability and safety standards.' },
  { Icon:TrendingUp, title:'Growth-Oriented Approach', desc:'We focus on building lasting relationships by delivering on time, supporting evolving client needs, and expanding into new markets.' },
];

export default function OurFeatures() {
  return (
    <section className="py-24 md:py-32 bg-[#07080C] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-eng opacity-40 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-20">
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="mb-14">
            <span className="eyebrow mb-5 block">Our Key Strengths</span>
            <h2 className="display-md">Core Strengths in <span style={{color:'#E3510F'}}>Industrial Innovation</span></h2>
          </motion.div>
          <motion.p initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.2 }}
            className="text-[#9BA5B4] leading-relaxed border-l-2 border-[#E3510F]/40 pl-6 italic text-sm">
            &ldquo;At AHIL, our strength lies in combining precision engineering, ethical practices, and customer-focused manufacturing to deliver products that meet the highest standards.&rdquo;
          </motion.p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="bento-cell p-9 group">
                <div className="w-12 h-12 rounded-xl bg-[#E3510F]/10 flex items-center justify-center mb-6 group-hover:bg-[#E3510F] transition-colors duration-400">
                  <Icon size={22} className="text-[#E3510F] group-hover:text-white transition-colors" />
                </div>
                <h3
                  className="text-[#E3510F] mb-2.5 group-hover:text-[#F2F4F7] transition-colors duration-300"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '1.5',
                    letterSpacing: '0.02em',
                  }}
                >{title}</h3>
                <p className="text-[#B4BEC9] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.3 }}
              className="p-9 flex flex-col justify-center" style={{background:'#E3510F',borderRadius:'16px'}}>
              <Zap size={40} className="text-white mb-5" />
              <h3 className="text-white text-xl font-bold mb-3" style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '1.5',
                    letterSpacing: '0.02em',
                  }}>Ready for Innovation?</h3>
              <p className="text-white/70 text-sm">Let&apos;s discuss how our precision manufacturing can elevate your next project.</p>
              <div className="mt-5 h-px w-16 bg-white/25 rounded-full" />
            </motion.div>
          </div>
          <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
            className="lg:col-span-5 relative">
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/6">
              <Image src="/images/ourkeystegnth.png" alt="Industrial Technology" fill className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080C]/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
