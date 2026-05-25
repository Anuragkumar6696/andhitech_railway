'use client';
import { motion } from 'framer-motion';
import { Lightbulb, Users, TrendingUp } from 'lucide-react';

const reasons = [
  { Icon:Lightbulb, n:'01', title:'Drive Innovation in Real-World Engineering', desc:"At AND Hitech, we don't just solve problems — we engineer solutions that shape the future. Join a team building smarter, more sustainable infrastructure." },
  { Icon:Users, n:'02', title:'Collaborative and Inclusive Work Culture', desc:"AND Hitech thrives on team spirit, diversity, and equality. You'll find a supportive network where contributions are valued and ideas spark innovations." },
  { Icon:TrendingUp, n:'03', title:'Long-Term Career Growth & Benefits', desc:'We offer competitive salaries, performance incentives, health benefits, and retirement plans. Join a company proud of the <strong>Make in India</strong> initiative.' },
];

export default function JoinUs() {
  return (
    <section className="py-24 md:py-32 bg-[#07080C] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-eng opacity-40 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <span className="eyebrow mb-5 block">Why Join Us?</span>
            <h2 className="display-md">Reasons to <span style={{color:'#E3510F'}}>Work Here</span></h2>
          </motion.div>
          <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.15 }}
            className="text-[#9BA5B4] leading-relaxed border-l-2 border-[#E3510F]/40 pl-6">
            If you are looking for a career where work meets ethics and ambition meets action, welcome to AND Hitech Industries.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reasons.map(({ Icon, n, title, desc }, i) => (
            <motion.div key={i} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.12 }} className="process-step group relative">
              <div className="absolute top-7 right-7 text-[#111827] font-bold text-5xl leading-none select-none pointer-events-none" style={{fontFamily:'var(--font-display)'}}>{n}</div>
              <div className="w-12 h-12 rounded-xl bg-[#E3510F]/10 flex items-center justify-center mb-7 group-hover:bg-[#E3510F] transition-colors duration-400 relative z-10">
                <Icon size={22} className="text-[#E3510F] group-hover:text-white transition-colors" />
              </div>
              <div className="accent-line mb-5" />
              <h3 className="text-[#F0F2F5] font-semibold text-base mb-4 leading-snug">{title}</h3>
              <p className="text-[#5A6478] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html:desc }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
