'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, FileCheck } from 'lucide-react';

export default function Certificates() {
  const certificates = [
    { src: "/images/certificate1.png", title: "ISO 9001:2015", desc: "Quality Management System" },
    { src: "/images/certificate2.png", title: "ISO 14001:2015", desc: "Environmental Management" },
    { src: "/images/certificate3.png", title: "RDSO Approved", desc: "Railway Standards Organization" },
    { src: "/images/rocertificate.png", title: "Industry Excellence", desc: "Certified Manufacturing" },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center mb-4"
            >
              <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Trust & Compliance</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight"
            >
              Recognized for Excellence and <span className="text-brand-orange">Industry Leadership</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-brand-dark font-bold text-sm">Fully Certified</div>
              <div className="text-gray-500 text-xs">Compliant with global standards</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-brand-orange/20"
            >
              <div className="relative aspect-[3/4] mb-6 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <Image
                  src={cert.src}
                  alt={cert.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-colors duration-500"></div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-brand-dark mb-1 group-hover:text-brand-orange transition-colors">{cert.title}</h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <Award size={16} className="text-brand-orange" />
            <span>Award winning manufacturing processes and safety standards since 2013</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
