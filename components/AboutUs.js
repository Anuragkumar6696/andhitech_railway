'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutUs() {
  const features = [
    "Railway Rolling Stock Components",
    "Advanced HVAC Systems & Components",
    "Precision Manufacturing Excellence",
    "State-of-the-art Facilities"
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image Composition */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/aboutback.jpg"
                alt="Precision Engineering"
                width={600}
                height={700}
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-10 -right-10 z-20 w-2/3 rounded-2xl overflow-hidden shadow-2xl border-8 border-white hidden md:block"
            >
              <Image
                src="/images/aboutfront.jpg"
                alt="Facility"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Experience Badge */}
            <motion.div 
              initial={{ opacity: 0, rotate: -10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="absolute -top-6 -left-6 z-30 bg-brand-orange text-white p-8 rounded-2xl shadow-xl hidden md:block"
            >
              <div className="text-4xl font-bold mb-1">10+</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-80">Years of Innovation</div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">About Our Company</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-6">
                Leading the Way in <span className="text-brand-orange">Industrial Precision</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Established in 2013, AND HITECH INDUSTRIES LTD (AHIL) has emerged as a trusted name in precision manufacturing, specializing in high-quality components for Railway Rolling Stock and advanced HVAC systems.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange transition-colors duration-300">
                    <CheckCircle2 size={14} className="text-brand-orange group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8"
            >
              <Link href="/about-us" className="btn-premium flex items-center group w-full sm:w-auto justify-center">
                <span>Discover More</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-orange">
                  <Image src="/images/andhitechmd.jpg" alt="CEO" width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <div className="text-brand-dark font-bold">Managing Director</div>
                  <div className="text-gray-500 text-sm italic">Engineering Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
