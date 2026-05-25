'use client';

import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { motion } from 'framer-motion';
import { Train, Building2, Factory, ShieldCheck, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Industries() {
  const industries = [
    {
      title: "Railways & Rolling Stock",
      icon: <Train size={40} className="text-brand-orange" />,
      image: "/images/ind-train.jpg",
      desc: "Specialized components for passenger and freight trains, including braking systems, suspension, and HVAC solutions.",
      features: ["Brake Discs & Pads", "Air Suspension", "Shock Absorbers", "Coupler Components"]
    },
    {
      title: "Metro & Urban Transit",
      icon: <Building2 size={40} className="text-brand-orange" />,
      image: "/images/gallery-5.jpg",
      desc: "Advanced HVAC systems and precision components tailored for modern metro networks and urban rail transit.",
      features: ["Saloon HVAC", "Driver Cab HVAC", "Electronic Controls", "Maintenance Support"]
    },
    {
      title: "Industrial HVAC",
      icon: <Factory size={40} className="text-brand-orange" />,
      image: "/images/gallery-9.jpg",
      desc: "High-efficiency thermal management solutions for large-scale industrial plants and commercial buildings.",
      features: ["Heat Exchangers", "Thermal Coils", "Control Systems", "Energy Efficiency"]
    },
    {
      title: "Precision Manufacturing",
      icon: <ShieldCheck size={40} className="text-brand-orange" />,
      image: "/images/aboutfront.jpg",
      desc: "Contract manufacturing and engineering services for critical sectors requiring high-precision metal components.",
      features: ["CNC Machining", "Custom Fabrication", "Quality Assurance", "Rapid Prototyping"]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Industries We Serve | AND Hitech</title>
        <meta name="description" content="Explore the diverse industries AHIL serves with precision engineering and advanced solutions." />
      </Head>

      <Header />
      
      <PageBanner
        title="Industries We Serve"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Industries"
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center mb-4"
            >
              <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Our Reach</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight">
              Driving Innovation Across <span className="text-brand-orange">Key Industrial Sectors</span>
            </h2>
          </div>

          <div className="space-y-24">
            {industries.map((industry, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}
              >
                {/* Image side */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image 
                      src={industry.image} 
                      alt={industry.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-orange rounded-2xl flex items-center justify-center text-white shadow-xl hidden md:flex">
                    {industry.icon}
                  </div>
                </div>

                {/* Content side */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-brand-dark">{industry.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {industry.desc}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {industry.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-brand-orange" />
                        <span className="text-gray-700 font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6">
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center space-x-3 text-brand-dark font-bold uppercase tracking-widest group"
                    >
                      <span>Discuss Your Needs</span>
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                        <ArrowRight size={18} />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
