'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const items = [
  { id:1, title:'Drive Innovation in Real-World Engineering Challenges', content:"At AND Hitech, we don't just solve problems—we engineer solutions that shape the future. Join a team committed to building smarter, more sustainable, and efficient infrastructures." },
  { id:2, title:'Collaborative and Inclusive Work Culture', content:"AND Hitech thrives on team spirit, diversity, and equality. You'll find a supportive network where your contributions are valued and your ideas can spark industry-leading innovations." },
  { id:3, title:'Long-Term Career Growth and Industry-Leading Benefits', content:"We offer competitive salaries, performance incentives, health benefits, and retirement plans designed with long-term security in mind. Join a company proud to be part of the Make in India initiative." },
];

export default function Benefits() {
  const [open, setOpen] = useState(1);
  return (
    <section className="relative bg-[#0D1117] overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
          className="flex flex-col justify-center px-8 md:px-16 py-20 lg:py-28 relative z-10">
          <span className="eyebrow mb-6 block">Why Join Us?</span>
          <h2 className="display-md mb-6">Become Part of <span style={{color:'#B88746'}}>Our Team</span></h2>
          <p className="text-[#6B7A8E] text-lg mb-12 max-w-md leading-relaxed font-light">At AND Hitech Industries, where engineering excellence meets professional integrity and action.</p>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.01]">
                <button onClick={() => setOpen(open===item.id?null:item.id)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left group hover:bg-white/[0.03] transition-all duration-300">
                  <span className={`font-bold text-lg leading-snug transition-colors tracking-tight ${open===item.id?'text-[#B88746]':'text-[#9AAABB] group-hover:text-white'}`} style={{fontFamily:'Inter, sans-serif'}}>{item.title}</span>
                  <span className={`flex-shrink-0 ml-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-lg ${open===item.id?'bg-[#B88746] text-white':'bg-white/5 text-[#6B7A8E]'}`}>
                    {open===item.id ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open===item.id && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}>
                      <div className="px-8 pb-8 border-t border-white/5">
                        <p className="text-[#6B7A8E] text-base leading-relaxed pt-6 font-light">{item.content}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:1 }}
          className="relative min-h-[400px] lg:min-h-0 overflow-hidden">
          <Image src="/images/whatwedorightimage.jpg" alt="Join AND Hitech" fill className="object-cover opacity-30" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/60 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 lg:right-8 glass-card p-6">
            <div className="text-[#B88746] text-[10px] uppercase tracking-[0.2em] mb-2 font-medium" style={{fontFamily:'var(--font-mono)'}}>Join Our Team</div>
            <div className="text-white font-bold text-lg mb-1" style={{fontFamily:'var(--font-display)'}}>We&apos;re always hiring talent</div>
            <div className="text-[#5A6478] text-xs">careers@andhitech.in</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
