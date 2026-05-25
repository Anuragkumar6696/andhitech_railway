'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lightbulb, Users, TrendingUp } from 'lucide-react';

const reasons = [
  {
    Icon: Lightbulb,
    icon: '/images/Group 4.svg',
    title: 'Drive Innovation in Real-World Engineering',
    description:
      "At AND Hitech, we don't just solve problems—we engineer solutions that shape the future. When you join us, you become part of a team committed to building smarter, more sustainable, and efficient infrastructures backed by state-of-the-art tools and advanced design methodologies.",
  },
  {
    Icon: Users,
    icon: '/images/Group 2.svg',
    title: 'Collaborative and Inclusive Work Culture',
    description:
      "AND Hitech thrives on team spirit, diversity, and equality. You'll find a supportive network where your contributions are valued and your ideas can spark industry-leading innovations. Here, you're not just another employee—you're part of a community that celebrates your achievements.",
  },
  {
    Icon: TrendingUp,
    icon: '/images/Group 5.svg',
    title: 'Long-Term Career Growth & Leading Benefits',
    description:
      'We offer competitive salaries, performance incentives, health benefits, and retirement plans designed with long-term security in mind. Join a company proud to be part of the <strong>Make in India</strong> initiative — where innovation meets purpose.',
  },
];

export default function JoinUs() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="section-label mb-5">
              <span>Why Join Us?</span>
            </div>
            <h2 className="section-heading">
              Main Reasons Why You Should <span>Work Here</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <p className="text-[#666] text-[15px] leading-relaxed border-l-4 border-brand-orange pl-6">
              If you are looking for a career where work meets ethics and ambition meets action, welcome to AND Hitech Industries.
            </p>
          </motion.div>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map(({ Icon, icon, title, description }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.65 }}
              className="group relative bg-[#f9f8f6] rounded-2xl p-10 border border-[#ede9e4] hover:bg-white hover:shadow-xl hover:shadow-[#0e0e0e]/6 hover:border-brand-orange/20 transition-all duration-500"
            >
              {/* Step number */}
              <div
                className="absolute top-8 right-8 text-[#e8e4e0] font-extrabold text-5xl leading-none select-none pointer-events-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                0{idx + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-white shadow-sm border border-[#ede9e4] flex items-center justify-center mb-7 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-400 relative z-10">
                <Icon size={26} className="text-brand-orange group-hover:text-white transition-colors duration-400" />
              </div>

              <h3
                className="text-[19px] font-bold text-[#1a1a1a] mb-4 leading-snug group-hover:text-brand-orange transition-colors relative z-10"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {title}
              </h3>
              <p
                className="text-[#666] text-sm leading-relaxed relative z-10"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
