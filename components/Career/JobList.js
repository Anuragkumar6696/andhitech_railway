'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

export default function JobList({ jobs }) {
  return (
    <section className="py-20 md:py-28 bg-[#f9f8f6]">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="section-label mb-5"><span>Open Positions</span></div>
          <h2 className="section-heading max-w-lg">
            Current <span>Job Openings</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="group bg-white rounded-2xl p-8 border border-[#ede9e4] shadow-sm hover:shadow-xl hover:border-brand-orange/20 hover:-translate-y-1 transition-all duration-400"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-400">
                <Briefcase size={24} className="text-brand-orange group-hover:text-white transition-colors" />
              </div>

              <h3
                className="text-[18px] font-bold text-[#1a1a1a] mb-5 group-hover:text-brand-orange transition-colors leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {job.title}
              </h3>

              <div className="space-y-2 mb-7">
                {job.experience && (
                  <div className="flex items-center gap-2.5 text-[#777] text-sm">
                    <Briefcase size={14} className="text-brand-orange flex-shrink-0" />
                    <span><strong className="text-[#444]">Experience:</strong> {job.experience}</span>
                  </div>
                )}
                {job.qualification && (
                  <div className="flex items-center gap-2.5 text-[#777] text-sm">
                    <GraduationCap size={14} className="text-brand-orange flex-shrink-0" />
                    <span><strong className="text-[#444]">Qualification:</strong> {job.qualification}</span>
                  </div>
                )}
                {job.location && (
                  <div className="flex items-center gap-2.5 text-[#777] text-sm">
                    <MapPin size={14} className="text-brand-orange flex-shrink-0" />
                    <span>{job.location}</span>
                  </div>
                )}
              </div>

              <Link
                href={`/career/${job.slug}`}
                className="inline-flex items-center gap-2 text-brand-orange font-bold text-[12px] uppercase tracking-wider group/link"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                <span>View Details</span>
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
