'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function InfraSection({ title, description, sections=[], subTitle }) {
  const words = (title||'').trim().split(/\s+/).filter(Boolean);
  const last = words.pop();
  const first = words.join(' ');

  return (
    <section className="py-24 md:py-32 bg-[#07080C] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-eng opacity-40 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ duration:0.8 }} className="lg:sticky lg:top-28">
            <span className="eyebrow mb-5 block">{subTitle||'Our Infrastructure'}</span>
            <h2 className="display-md mb-6">{first} <span style={{color:'#B88746'}}>{last}</span></h2>
            {description && <p className="text-[#9BA5B4] text-base leading-relaxed">{description}</p>}
            <div className="mt-8 h-px w-16 bg-[#B88746]" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sections.map((item, i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.1 }} className="bento-cell p-7 group">
                {item.icon
                  ? <div className="w-12 h-12 rounded-xl bg-[#111827] border border-white/8 flex items-center justify-center mb-6 group-hover:bg-[#B88746] group-hover:border-[#B88746] transition-all duration-400">
                      <Image src={item.icon} width={26} height={26} alt={item.section_title||'Icon'} className="group-hover:brightness-0 group-hover:invert transition-all" unoptimized />
                    </div>
                  : <div className="w-12 h-12 rounded-xl bg-[#B88746]/10 flex items-center justify-center mb-6">
                      <div className="w-5 h-5 rounded-md bg-[#B88746]/40" />
                    </div>
                }
                <h3
                  className="text-[#B88746] mb-2.5 group-hover:text-[#F2F4F7] transition-colors duration-300"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '1.5',
                    letterSpacing: '0.02em',
                  }}
                >{item.section_title}</h3>
                <p className="text-[#AAB4C3] text-sm leading-relaxed">{item.section_content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
