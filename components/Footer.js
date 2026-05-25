'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ initialData }) {
  const [siteSettings, setSiteSettings] = useState(initialData || null);

  useEffect(() => {
    if (initialData) return; // Skip fetch if data provided via props

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

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="block w-48">
              <Image 
                src={siteSettings?.logo || "/images/logo.png"} 
                alt="AND Hitech" 
                width={200} 
                height={60} 
                className="h-auto w-full brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Engineering excellence and innovative industrial solutions. We drive the future of technology with precision and trustworthiness.
            </p>
            <div className="flex items-center space-x-4">
              <a href={siteSettings?.linkedin || "#"} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href={siteSettings?.facebook || "#"} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href={siteSettings?.instagram || "#"} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href={siteSettings?.twitter || "#"} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-brand-orange">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Products', 'Industries', 'Infrastructure', 'Career', 'News'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-brand-orange">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <Mail className="mt-1 flex-shrink-0 text-brand-orange" size={18} />
                <a href="mailto:Info@andhitech.in" className="hover:text-white transition-colors">Info@andhitech.in</a>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <Phone className="mt-1 flex-shrink-0 text-brand-orange" size={18} />
                <span>011-25710064</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="mt-1 flex-shrink-0 text-brand-orange" size={18} />
                <span className="leading-relaxed">
                  509, 5th floor, Kirti Mahal Building 19, Rajendra Place New Delhi – 110008 India.
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-brand-orange">Get In Touch</h3>
            <p className="text-gray-400 text-sm">Ready to elevate your industrial operations? Let's discuss your next project.</p>
            <Link href="/contact" className="btn-premium inline-block w-full text-center">
              Start a Project
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
          <p>© {currentYear} AND Hitech Industries Limited. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
