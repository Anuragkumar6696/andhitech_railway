'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Zap, TrendingUp, Cpu } from 'lucide-react';

export default function OurFeatures() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-brand-orange" />,
      title: "High Reliability & Dependability",
      desc: "Years of experience in railway rolling stock components and HVAC systems enable us to deliver high-performance, dependable products for critical applications."
    },
    {
      icon: <Cpu className="w-8 h-8 text-brand-orange" />,
      title: "Precision Manufacturing",
      desc: "Our state-of-the-art facilities and strict quality control processes ensure every component meets the highest reliability and safety standards."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-brand-orange" />,
      title: "Growth-Oriented Approach",
      desc: "We focus on building lasting relationships by delivering on time, supporting evolving client needs, and expanding into new markets like metros and heat exchangers."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center mb-4">
              <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Our Key Strengths</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight">
              Core Strengths in <br />
              <span className="text-brand-orange">Industrial Innovation</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-brand-orange pl-6 italic">
              &quot;At AHIL, our strength lies in combining precision engineering, ethical practices, and customer-focused manufacturing to deliver products that meet the highest standards of reliability.&quot;
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-brand-orange p-10 rounded-[2rem] text-white flex flex-col justify-center"
            >
              <Zap className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Ready for Innovation?</h3>
              <p className="text-white/80 text-sm mb-6">Let's discuss how our precision manufacturing can elevate your next project.</p>
              <div className="h-1 w-20 bg-white/20" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-full min-h-[400px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/ourkeystegnth.png"
                alt="Industrial Technology"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
