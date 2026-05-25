'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

export default function BrochuresSection({ brochures }) {
  if (!brochures?.length) return null;
  return (
    <section className="py-20 md:py-28 bg-[#0D1117] relative">
      <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <div className="text-center mb-14">
          <span className="eyebrow justify-center mb-5 block">Resources</span>
          <h2 className="display-md max-w-xl mx-auto">Downloadable <span style={{color:'#E3510F'}}>Brochures</span></h2>
          <p className="text-[#5A6478] mt-4 text-sm max-w-xl mx-auto">Company brochures, plant capabilities, and resources in PDF format.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brochures.map((b, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.1 }} className="bento-cell p-8 text-center group hover:-translate-y-1 transition-transform duration-400">
              <div className="w-14 h-14 rounded-xl bg-[#E3510F]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#E3510F] transition-colors">
                <FileText size={24} className="text-[#E3510F] group-hover:text-white transition-colors" />
              </div>
              <h5 className="text-[#F0F2F5] font-semibold mb-6 group-hover:text-[#E3510F] transition-colors">{b.title}</h5>
              {b.pdf_file
                ? <Link href={b.pdf_file} target="_blank" download className="btn-flame inline-flex items-center gap-2 text-xs py-3 px-6">
                    <Download size={13} /> Download PDF
                  </Link>
                : <span className="text-[#4A5568] text-sm italic">File not available</span>
              }
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
