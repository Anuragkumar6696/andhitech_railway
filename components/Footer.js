'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ initialData }) {
  const [siteSettings, setSiteSettings] = useState(initialData || null);

  useEffect(() => {
    if (initialData) return;
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch('/api/proxy/site-settings');
        const data = await response.json();
        setSiteSettings(data);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      }
    };
    fetchSiteSettings();
  }, []);

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Products', href: '/products' },
    { name: 'Industries', href: '/industries' },
    { name: 'Infrastructure', href: '/infrastructure' },
    { name: 'Career', href: '/career' },
    { name: 'News & Media', href: '/news-media' },
  ];

  const socials = [
    { icon: Linkedin, href: siteSettings?.linkedin || '#', label: 'LinkedIn' },
    { icon: Facebook, href: siteSettings?.facebook || '#', label: 'Facebook' },
    { icon: Instagram, href: siteSettings?.instagram || '#', label: 'Instagram' },
    { icon: Twitter, href: siteSettings?.twitter || '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-[#0e0e0e] text-white overflow-hidden relative">
      {/* Top border accent */}
      <div className="h-[3px] w-full bg-brand-orange" />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/6 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-10">

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-16 pb-14">

          {/* Brand column */}
          <div className="lg:col-span-4 space-y-7">
            <Link href="/" className="block w-44">
              <Image
                src={siteSettings?.logo || '/images/logo.png'}
                alt="AND Hitech Industries"
                width={180}
                height={56}
                className="h-auto w-full brightness-0 invert"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Engineering excellence and innovative industrial solutions. We drive the future of transportation technology with precision and trustworthiness.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-5">
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/40 hover:text-white text-sm font-medium transition-all duration-250 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-brand-orange transition-all duration-300 overflow-hidden block" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-5">
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center mt-0.5">
                  <Mail size={14} className="text-brand-orange" />
                </div>
                <a href="mailto:Info@andhitech.in" className="text-white/45 hover:text-white transition-colors text-sm leading-relaxed">
                  Info@andhitech.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center mt-0.5">
                  <Phone size={14} className="text-brand-orange" />
                </div>
                <a href="tel:01125710064" className="text-white/45 hover:text-white transition-colors text-sm">
                  011-25710064
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center mt-0.5">
                  <MapPin size={14} className="text-brand-orange" />
                </div>
                <address className="text-white/40 text-sm not-italic leading-relaxed">
                  509, 5th floor, Kirti Mahal Building 19, Rajendra Place, New Delhi – 110008, India.
                </address>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="lg:col-span-3 space-y-5">
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-orange"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Get In Touch
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Ready to elevate your industrial operations? Let's discuss your next project.
            </p>
            <Link
              href="/contact"
              className="btn-premium inline-flex items-center gap-2 group w-full justify-center"
            >
              <span>Start a Project</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Certifications badge */}
            <div className="pt-4 border-t border-white/8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-orange text-[10px] font-bold">ISO</span>
              </div>
              <div>
                <div className="text-white/60 text-xs font-semibold">ISO 9001:2015 Certified</div>
                <div className="text-white/30 text-[11px]">Quality Management System</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-[13px]">
            © {currentYear} AND Hitech Industries Limited. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-white/25 hover:text-white/60 text-[13px] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/25 hover:text-white/60 text-[13px] transition-colors">
              Terms of Service
            </Link>
            <Link href="/online-complaint" className="text-white/25 hover:text-white/60 text-[13px] transition-colors">
              Online Complaint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
