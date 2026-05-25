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
          <h2 className="display-md max-w-lg">Current <span style={{color:'#E3510F'}}>Job Openings</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job, i) => (
            <motion.div key={job.slug} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.08 }} className="bento-cell p-8 group flex flex-col hover:-translate-y-1 transition-transform duration-400">
              <div className="w-12 h-12 rounded-xl bg-[#E3510F]/10 flex items-center justify-center mb-6 group-hover:bg-[#E3510F] transition-colors">
                <Briefcase size={22} className="text-[#E3510F] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[#F0F2F5] font-semibold text-base mb-5 group-hover:text-[#E3510F] transition-colors leading-snug">{job.title}</h3>
              <div className="space-y-2 mb-7 flex-grow">
                {job.experience && <div className="flex items-center gap-2 text-[#5A6478] text-sm"><Briefcase size={13} className="text-[#E3510F] flex-shrink-0" /><span>{job.experience}</span></div>}
                {job.qualification && <div className="flex items-center gap-2 text-[#5A6478] text-sm"><GraduationCap size={13} className="text-[#E3510F] flex-shrink-0" /><span>{job.qualification}</span></div>}
                {job.location && <div className="flex items-center gap-2 text-[#5A6478] text-sm"><MapPin size={13} className="text-[#E3510F] flex-shrink-0" /><span>{job.location}</span></div>}
              </div>
              <Link href={`/career/${job.slug}`}
                className="flex items-center gap-2 text-[#E3510F] text-[10px] uppercase tracking-wider font-medium group/link pt-5 border-t border-white/5"
                style={{fontFamily:'var(--font-mono)'}}>
                <span>View Details</span><ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
