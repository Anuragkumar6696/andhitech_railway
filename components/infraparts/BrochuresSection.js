'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

export default function BrochuresSection({ brochures }) {
  if (!brochures || brochures.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-[#f9f8f6]">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label justify-center mb-5">
            <span>Resources</span>
          </div>
          <h2 className="section-heading max-w-2xl mx-auto">
            Downloadable <span>Brochures &amp; Plant Capabilities</span>
          </h2>
          <p className="text-[#777] mt-4 text-sm max-w-xl mx-auto">
            Discover our company brochures, plant capabilities, and other resources in PDF format.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brochures.map((brochure, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group bg-white rounded-2xl p-8 border border-[#ede9e4] shadow-sm hover:shadow-xl hover:border-brand-orange/20 hover:-translate-y-1 transition-all duration-400 text-center"
            >
              {/* PDF icon */}
              <div className="w-16 h-16 rounded-xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-orange transition-colors duration-400">
                <FileText size={28} className="text-brand-orange group-hover:text-white transition-colors" />
              </div>

              <h5
                className="text-[17px] font-bold text-[#1a1a1a] mb-6 group-hover:text-brand-orange transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {brochure.title}
              </h5>

              {brochure.pdf_file ? (
                <Link
                  href={brochure.pdf_file}
                  target="_blank"
                  download
                  className="inline-flex items-center gap-2 btn-premium py-3 px-7"
                >
                  <Download size={15} />
                  <span>Download PDF</span>
                </Link>
              ) : (
                <span className="text-[#aaa] text-sm italic">File not available</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
