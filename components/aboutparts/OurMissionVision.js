'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function OurMissionVision() {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    {
      id: 'mission',
      label: 'Our Mission',
      icon: <Target className="w-5 h-5" />,
      content: 'To deliver reliable and high-performance solutions for Indian Railways, Metro Corporations, and PSUs - combining precision engineering with exceptional customer service. We strive to be a trusted partner in the evolving transportation sectors.',
      points: [
        'Railway Rolling Stock Components',
        'HVAC Systems for Metro & Industrial',
        'Customer-Centric Engineering',
        'Delivery Excellence',
      ]
    },
    {
      id: 'vision',
      label: 'Our Vision',
      icon: <Eye className="w-5 h-5" />,
      content: 'To be a globally recognized leader in industrial engineering, setting new standards for quality, safety, and sustainable innovation in the transportation and manufacturing sectors.',
      points: [
        'Global Engineering Leadership',
        'Sustainable Innovation',
        'Safety Standard Setting',
        'Technological Advancement',
      ]
    },
    {
      id: 'value',
      label: 'Our Values',
      icon: <ShieldCheck className="w-5 h-5" />,
      content: 'Our core values define who we are and how we operate. Integrity, precision, and a relentless focus on quality are the pillars that support our commitment to our partners and the community.',
      points: [
        'Uncompromising Integrity',
        'Precision in Every Detail',
        'Relentless Quality Focus',
        'Community Commitment',
      ]
    }
  ];

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Our Approach</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Empowering Sustainable <span className="text-brand-orange">Growth in Industry</span>
            </h2>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 md:p-16 min-h-[400px]">
            <AnimatePresence mode="wait">
              {tabs.map((tab) => (
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                  >
                    <div className="lg:col-span-7 space-y-6">
                      <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4">
                        {tab.icon}
                      </div>
                      <h3 className="text-3xl font-bold text-white">{tab.label}</h3>
                      <p className="text-gray-400 text-lg leading-relaxed italic">
                        &quot;{tab.content}&quot;
                      </p>
                    </div>
                    
                    <div className="lg:col-span-5">
                      <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 opacity-60">Strategic Priorities</h4>
                        <ul className="space-y-4">
                          {tab.points.map((point, idx) => (
                            <li key={idx} className="flex items-center space-x-3 text-white">
                              <CheckCircle2 size={18} className="text-brand-orange" />
                              <span className="font-medium">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
