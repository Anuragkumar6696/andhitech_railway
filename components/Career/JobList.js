'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

export default function JobList({ jobs }) {
  return (
    <section className="py-20 md:py-28 bg-[#07080C] relative">
      <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-14">
          <span className="eyebrow mb-5 block">Open Positions</span>
          <h2 className="display-md max-w-lg">Current <span style={{color:'#B88746'}}>Job Openings</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, i) => (
            <motion.div key={job.slug} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.08 }} className="story-card p-10 group flex flex-col hover:-translate-y-2 transition-all duration-500 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#B88746]/10 flex items-center justify-center mb-8 group-hover:bg-[#B88746] transition-all duration-500 shadow-lg border border-[#B88746]/20">
                <Briefcase size={28} className="text-[#B88746] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[#F7F5F0] font-bold text-2xl mb-6 group-hover:text-[#B88746] transition-colors leading-tight tracking-tight" style={{fontFamily:'var(--font-display)'}}>{job.title}</h3>
              <div className="space-y-4 mb-10 flex-grow">
                {job.experience && <div className="flex items-center gap-3 text-[#9AAABB] text-base font-medium"><div className="w-1.5 h-1.5 rounded-full bg-[#B88746]" /><span>{job.experience}</span></div>}
                {job.qualification && <div className="flex items-center gap-3 text-[#9AAABB] text-base font-medium"><div className="w-1.5 h-1.5 rounded-full bg-[#B88746]" /><span>{job.qualification}</span></div>}
                {job.location && <div className="flex items-center gap-3 text-[#9AAABB] text-base font-medium"><MapPin size={16} className="text-[#B88746] flex-shrink-0" /><span>{job.location}</span></div>}
              </div>
              <Link href={`/career/${job.slug}`}
                className="btn-wire w-full justify-center py-4 text-xs font-bold tracking-[0.2em] group/link border-white/10 hover:border-[#B88746]/50">
                <span>View Position</span><ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
