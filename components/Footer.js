'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, ArrowRight } from 'lucide-react';

const ease = [.22, 1, .36, 1];

async function safeFetch(url) {
  const r = await fetch(url, { headers: { 'Accept': 'application/json', 'x-nextjs-data': '1' } });
  if (!r.ok) return null;
  const ct = r.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return null;
  return r.json();
}

export default function Footer({ initialData }) {
  const [s, setS] = useState(initialData || null);
  useEffect(() => {
    if (initialData) return;
    safeFetch('/api/proxy/site-settings').then((data) => { if (data) setS(data); }).catch(() => {});
  }, []);

  const year = new Date().getFullYear();
  const socials = [{ Icon: Linkedin, href: s?.linkedin || '#', label: 'LinkedIn' }];

  return (
    <footer className="relative overflow-hidden" style={{ background: '#0B1F3A' }}>
      {/* Copper top stripe */}
      <div className="h-[1.5px]" style={{ background: 'linear-gradient(90deg,transparent,#B88746 30%,rgba(184,135,70,.3) 70%,transparent)' }} />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* Pre-footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .75, ease }}
          className="py-14 border-b border-white/[.05] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <h3 className="display-sm mb-2 leading-tight">
              Ready to engineer<br />
              <span style={{ color: '#B88746' }}>something great?</span>
            </h3>
            <p className="text-white/35 text-[.85rem] mt-3">Talk to our team about your next railway project.</p>
          </div>
          <Link href="/contact" className="btn-primary flex-shrink-0 py-4 px-10 text-[.8rem] group inline-flex items-center gap-3">
            <span>Start a Conversation</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-7">
            <Link href="/" className="block group">
              <Image src="/images/logo-main.png" alt="AND Hitech Industries" width={230} height={100}
                className="h-20 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-white/40 text-[.84rem] leading-relaxed max-w-xs">
              Engineering excellence and precision manufacturing for Indian Railways, Metro networks, and the next generation of rail transportation.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg border border-white/10 flex items-center justify-center text-white/40
                    hover:text-white hover:bg-[#B88746] hover:border-[#B88746] transition-all duration-400">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="badge">ISO 9001:2015</div>
              <div className="badge">RDSO Approved</div>
              <div className="badge">Make in India</div>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-white/60 text-[.65rem] uppercase tracking-widest mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Company</h4>
            <div className="space-y-3">
              {[
                { label: 'About Us', href: '/about-us' },
                { label: 'Products', href: '/products' },
                { label: 'Industries', href: '/industries' },
                { label: 'Infrastructure', href: '/infrastructure' },
                { label: 'Careers', href: '/career' },
                { label: 'News & Media', href: '/news-media' },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="block text-white/45 text-[.82rem] hover:text-[#B88746] transition-colors duration-200">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h4 className="text-white/60 text-[.65rem] uppercase tracking-widest mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Products</h4>
            <div className="space-y-3">
              {[
                'HVAC & RMPU Systems',
                'Brake Discs & Pads',
                'Air Spring Suspension',
                'Axle-Mounted Components',
                'Rolling Stock Parts',
                'Custom Engineering',
              ].map(p => (
                <Link key={p} href="/products"
                  className="block text-white/45 text-[.82rem] hover:text-[#B88746] transition-colors duration-200">
                  {p}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white/60 text-[.65rem] uppercase tracking-widest mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>Contact</h4>
            <div className="space-y-5">
              {[
                { Icon: Phone,  val: s?.phone || '+91 141 123 4567',    label: 'Sales & Engineering' },
                { Icon: Mail,   val: s?.email || 'info@andhitech.com',  label: 'General Enquiries' },
                { Icon: MapPin, val: s?.address || 'Jaipur, Rajasthan', label: 'Head Office' },
              ].map(({ Icon, val, label }) => (
                <div key={label} className="flex gap-3 items-start">
                  <Icon size={15} className="text-[#B88746] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white/60 text-[.82rem]">{val}</div>
                    <div className="text-white/30 text-[.68rem] mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-white/[.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[.73rem]">
            © {year} And Hitech Industries Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Quality Policy'].map(t => (
              <Link key={t} href="/our-policy"
                className="text-white/25 text-[.73rem] hover:text-white/60 transition-colors">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
