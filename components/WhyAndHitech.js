'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Train, Settings, Lightbulb, Award, Users } from 'lucide-react';

const cards = [
  { Icon: Settings,    title: 'Engineering Expertise',      desc: 'Decade-long expertise in railway component engineering, backed by in-house CNC machining and precision manufacturing capability.' },
  { Icon: Train,       title: 'Railway Focus',              desc: 'Exclusively focused on railway applications — every product designed, tested, and certified for the demands of rail operations.' },
  { Icon: ShieldCheck, title: 'Quality Systems',            desc: 'ISO 9001:2015 certified processes with multi-stage quality checkpoints from incoming materials to final dispatch.' },
  { Icon: Lightbulb,   title: 'Innovation Culture',         desc: 'Continuously investing in new manufacturing technologies and product development to stay ahead of evolving railway requirements.' },
  { Icon: Award,       title: 'RDSO Approved',              desc: 'Recognized by the Research Designs & Standards Organisation, meeting the stringent standards set for Indian railway suppliers.' },
  { Icon: Users,       title: 'Customer Commitment',        desc: 'Long-term partnerships built on reliability, on-time delivery, and technical support throughout the product lifecycle.' },
];

const ease = [.22, 1, .36, 1];

export default function WhyAndHitech() {
  return (
    <section className="relative overflow-hidden section-gap" style={{ background: '#F7F5F0' }}>
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .8, ease }}
          className="text-center mb-14"
        >
          <div className="label-dark mb-4 inline-block">The AND Hitech Difference</div>
          <h2 className="display-lg-dark max-w-xl mx-auto mb-4">
            Why Partner with<br />
            <span className="text-copper">And Hitech Industries</span>
          </h2>
          <div className="accent mx-auto mb-4" />
          <p className="text-[#6B7A8E] max-w-lg mx-auto text-[.9rem] leading-relaxed">
            We bring together engineering depth, manufacturing precision, and railway-specific expertise to deliver components you can depend on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7, ease, delay: i * .09 }}
              className="card-light p-8 group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                style={{ background: 'rgba(11,31,58,.05)', border: '1px solid rgba(184,135,70,.2)' }}>
                <Icon size={20} className="text-[#B88746] group-hover:text-[#0B1F3A] transition-colors duration-300" />
              </div>
              <h3 className="text-[#0B1F3A] font-semibold text-[1rem] mb-3">{title}</h3>
              <p className="text-[#6B7A8E] text-[.84rem] leading-relaxed">{desc}</p>
              <div className="mt-6 w-10 h-0.5 bg-[#B88746]/30 group-hover:w-full group-hover:bg-[#B88746]/50 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
