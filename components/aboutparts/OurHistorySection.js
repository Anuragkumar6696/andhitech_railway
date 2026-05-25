'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const historyData = {
  year: 'Since 2013',
  title: 'Pioneering Engineering Excellence',
  description:
    'Established in 2013, AND HITECH INDUSTRIES LTD (AHIL) has emerged as a trusted name in precision manufacturing. We specialize in high-quality components for Railway Rolling Stock and advanced HVAC systems for Railways and Metros. Our commitment to engineering excellence and on-time delivery has built strong partnerships across global industries.',
  image: '/images/aboutussectionimg1.jpg',
};

export default function HistoryTabs() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center mb-4">
                <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Who We Are</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-6">
                Welcome to <span className="text-brand-orange">AND HITECH</span> INDUSTRIES LTD
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {historyData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Precision Engineering Excellence',
                'Tailored Industrial Solutions',
                'Quality & Compliance',
                'Sustainable Practices',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 group">
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange transition-colors duration-300">
                    <CheckCircle2 size={14} className="text-brand-orange group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-700 font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src={historyData.image}
                alt={historyData.title}
                width={600}
                height={500}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl -z-0" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-orange rounded-3xl -z-0 hidden md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
