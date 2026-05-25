'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const [banner, setBanner] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    async function fetchBanner() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home-banner/`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setBanner(data.results[0]);
        }
      } catch (error) {
        console.error('Failed to fetch hero banner:', error);
      }
    }

    fetchBanner();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 md:pt-40 overflow-hidden bg-brand-dark">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/20 z-10" />
        
        {banner?.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-60' : 'opacity-0'}`}
          >
            <source src={banner.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/images/hero-bg.jpg"
            alt="Industrial Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        )}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <motion.div 
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <span className="text-brand-orange uppercase tracking-[0.3em] text-sm font-bold">
              Engineering the Future
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-8"
            dangerouslySetInnerHTML={{ __html: banner?.title || 'Advanced Industrial <span class="text-brand-orange">Technology</span> Solutions' }}
          />

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: banner?.content || 'Pioneering excellence in industrial engineering and technology. We provide world-class solutions for a sustainable and efficient future.' }}
          />

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href={banner?.button_link || "/products"} className="btn-premium flex items-center group w-full sm:w-auto justify-center">
              <span>{banner?.button_text || 'Explore Our Solutions'}</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link href="/about-us" className="text-white hover:text-brand-orange font-semibold flex items-center space-x-2 group transition-colors">
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-orange group-hover:bg-brand-orange/10 transition-all">
                <Play size={16} className="fill-current ml-1" />
              </span>
              <span>Our Story</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-orange to-transparent"></div>
        </div>
      </motion.div>

      {/* Stats Overlay - Minimalist */}
      <div className="absolute bottom-0 right-0 z-20 hidden lg:block p-10 bg-brand-dark/40 backdrop-blur-md border-t border-l border-white/10">
        <div className="flex space-x-12">
          <div>
            <div className="text-3xl font-bold text-white mb-1">25+</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Projects Done</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
