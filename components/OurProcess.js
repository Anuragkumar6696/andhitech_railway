'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Settings, Truck, CheckCircle, Zap, Shield, Search } from 'lucide-react';

export default function OurProcess() {
  const steps = [
    {
      icon: <Search className="text-brand-orange" size={24} />,
      title: "Design & Engineering",
      text: "We begin by closely understanding customer requirements and translating them into functional product designs using advanced simulation tools."
    },
    {
      icon: <Settings className="text-brand-orange" size={24} />,
      title: "Strategic Procurement",
      text: "We source high-quality materials from trusted vendors, ensuring timely availability and cost-efficiency for every project."
    },
    {
      icon: <Zap className="text-brand-orange" size={24} />,
      title: "Precision Manufacturing",
      text: "Our modern facilities enable high-precision manufacturing backed by rigorous quality control at every stage of production."
    },
    {
      icon: <Shield className="text-brand-orange" size={24} />,
      title: "Rigorous Testing",
      text: "Each product undergoes thorough testing and inspection to ensure consistent performance, reliability, and maximum safety."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Our Workflow</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight">
              Streamlined Process for <span className="text-brand-orange">Optimal Efficiency</span>
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              At AHIL, we follow a structured and collaborative approach to deliver high-performance products with precision and speed. Each stage is designed to maximize quality and meet evolving needs.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-[1px] bg-gray-100 z-0 -translate-x-8">
                  <div className="w-0 h-full bg-brand-orange group-hover:w-full transition-all duration-700"></div>
                </div>
              )}
              
              <div className="relative z-10 bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:shadow-brand-dark/5 transition-all duration-500 border border-transparent hover:border-brand-orange/20">
                <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500">
                  {step.icon}
                </div>
                <div className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-2">Step 0{idx + 1}</div>
                <h3 className="text-xl font-bold text-brand-dark mb-4">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-3xl overflow-hidden shadow-2xl relative h-[400px]"
        >
          <Image 
            src="/images/ourprocess.jpg" 
            alt="Manufacturing Process" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 to-transparent flex items-center p-12">
            <div className="max-w-md">
              <h3 className="text-3xl font-bold text-white mb-4">Committed to Quality</h3>
              <p className="text-gray-200 mb-6">Our processes are ISO certified and follow international standards for safety and reliability.</p>
              <Link href="/about-us" className="btn-premium py-2 px-6">Learn About Our Standards</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
