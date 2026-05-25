'use client';

import { motion } from 'framer-motion';
import { Users, Briefcase, Award, Globe } from 'lucide-react';

export default function Statistics() {
  const stats = [
    { icon: <Users size={32} />, value: "500+", label: "Happy Clients" },
    { icon: <Briefcase size={32} />, value: "250+", label: "Projects Completed" },
    { icon: <Award size={32} />, value: "15+", label: "Industry Awards" },
    { icon: <Globe size={32} />, value: "10+", label: "Global Partners" },
  ];

  return (
    <section className="py-20 bg-brand-orange">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="text-center text-white"
            >
              <div className="flex justify-center mb-4 opacity-80">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-[0.2em] font-bold opacity-90">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
