'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function OurStory() {
  return (
    <section className="py-24 md:py-32 bg-[#0D1117] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <span className="eyebrow mb-5 block">Our Story</span>
            <h2 className="display-md max-w-lg">Transforming Industries Through <span style={{color:'#E3510F'}}>Innovation</span></h2>
          </motion.div>
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.15 }}
            className="grid grid-cols-2 gap-4">
            {['/images/storytopleft.jpg','/images/storytopright.jpg'].map((src,i) => (
              <div key={i} className={`rounded-xl overflow-hidden border border-white/6 group ${i===1?'mt-8':''}`}>
                <Image src={src} alt="AND Hitech" width={360} height={260} className="w-full h-52 object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-600" unoptimized />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/6">
              <Image src="/images/storybottom.jpg" alt="AND Hitech Railway" width={680} height={480} className="w-full h-auto object-cover opacity-70" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/40 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-[#E3510F] hidden md:block" style={{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)',opacity:0.7}} />
          </motion.div>
          <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.1 }} className="space-y-6">
            <p className="text-[#9BA5B4] leading-relaxed border-l-2 border-[#E3510F]/40 pl-6">
              Founded in 2013, AHIL has steadily built a reputation for trust, reliability, and customer-centric manufacturing. Under visionary leadership, we've grown into a dynamic organization known for innovative engineering solutions.
            </p>
            <p className="text-[#5A6478] leading-relaxed text-sm">
              With a team of 100+ skilled professionals, we partner with Indian Railways, Metros, and PSUs — driving transformation through precision and innovation.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              {[['10+','Years'],['100+','Engineers'],['500+','Projects']].map(([n,l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-bold text-[#E3510F] mb-0.5" style={{fontFamily:'var(--font-display)'}}>{n}</div>
                  <div className="text-[10px] text-[#4A5568] uppercase tracking-wider" style={{fontFamily:'var(--font-mono)'}}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
