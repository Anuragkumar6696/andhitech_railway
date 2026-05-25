'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="py-24 bg-brand-dark overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-brand-orange text-xs font-bold uppercase tracking-widest mb-8">
            <MessageSquare size={14} />
            <span>Ready to start?</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
            Have a Project in Mind? <br />
            <span className="text-brand-orange">Let's Build It Together.</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Our team of expert engineers is ready to provide you with the most efficient and high-performance industrial solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/contact" className="btn-premium group flex items-center px-10 py-4 text-lg">
              <span>Get a Free Quote</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <a href="mailto:Info@andhitech.in" className="flex items-center space-x-3 text-white hover:text-brand-orange transition-colors font-bold text-lg">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-orange transition-all">
                <Mail size={20} />
              </div>
              <span>Email Us</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
