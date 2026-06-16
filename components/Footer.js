'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, ArrowRight, ShieldCheck } from 'lucide-react';

const ease = [.22, 1, .36, 1];

async function safeFetch(url) {
  const r = await fetch(url, { headers: { 'Accept': 'application/json', 'x-nextjs-data': '1' } });
  if (!r.ok) return null;
  const ct = r.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return null;
  return r.json();
}

const PRODUCTS = [
  ['Axle Brake Disc', '/products/axle-mounted-brake-disc'],
  ['Air Suspension System', '/products/air-suspension-control-equipment'],
  ['RMPU for LHB Coaches', '/products/roof-mounted-package-unit-rmpu-for-lhb-coaches'],
  ['IV Coupler', '/products/iv-coupler'],
  ['Pantograph', '/products/pantograph'],
  ['Tamping Tools', '/products/tamping-tools'],
  ['Brake Pads', '/products/brake-pads'],
  ['Vande Bharat Door', '/products/single-leaf-plug-door-vande-bharat-trains'],
];

const COMPANY_LINKS = [
  ['About Us', '/about-us'],
  ['Products', '/products'],
  ['Industries', '/industries'],
  ['Infrastructure', '/infrastructure'],
  ['Career', '/career'],
  ['News & Media', '/news-media'],
  ['Contact', '/contact'],
];

const COMPLIANCE = [
  'ISO 9001:2015 Certified',
  'ISO 14001:2015 Certified',
  'RDSO Approved Vendor',
  'Make in India',
];

export default function Footer({ initialData }) {
  const [s, setS] = useState(initialData || null);

  useEffect(() => {
    if (initialData) return;
    safeFetch('/api/proxy/site-settings')
      .then((data) => { if (data) setS(data); })
      .catch(() => {});
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: '#050608' }}>
      {/* Flame top stripe */}
      <div className="h-[1.5px]" style={{ background: 'linear-gradient(90deg,transparent,#E3510F 30%,rgba(227,81,15,.4) 70%,transparent)' }} />
      <div className="absolute inset-0 bg-grid opacity-18 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 600px 500px at 0% 100%,rgba(227,81,15,.04),transparent 70%)' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Pre-footer CTA band ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .75, ease }}
          className="py-14 border-b border-white/[.04] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <h3 className="display-sm mb-2" style={{ lineHeight: 1 }}>
              Ready to engineer<br /><span style={{ color: '#E3510F' }}>something great?</span>
            </h3>
            <p className="text-[#4E5A6E] text-[.85rem] mt-3">Talk to our team about your next railway project.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/contact" className="btn-flame py-4 px-10 text-[.64rem] group inline-flex items-center gap-3">
              <span>Start a Conversation</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+911144766444"
              className="btn-wire py-4 px-8 text-[.64rem] inline-flex items-center gap-3"
            >
              <Phone size={13} />
              <span>+91 11 4476 6444</span>
            </a>
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-16">

          {/* Brand column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="block group">
              <Image
                src="/images/logo-main.png" alt="AND Hitech Industries" width={230} height={100}
                className="h-20 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-[#A0AABA] text-[.84rem] leading-relaxed max-w-xs">
              Engineering excellence and innovative industrial solutions for Indian Railways, Metro Corporations, and critical infrastructure worldwide.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a href={s?.linkedin || '#'} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-[#ADBAC7]
                  hover:text-white hover:bg-[#E3510F] hover:border-[#E3510F] transition-all duration-500">
                <Linkedin size={16} />
              </a>
            </div>

            {/* Compliance badges */}
            <div className="space-y-2.5">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.48rem', letterSpacing: '.28em', color: '#1C2540', textTransform: 'uppercase' }} className="mb-3">
                Compliance & Certifications
              </p>
              {COMPLIANCE.map(label => (
                <div key={label} className="flex items-center gap-2.5">
                  <ShieldCheck size={11} className="text-[#E3510F] flex-shrink-0" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.60rem', letterSpacing: '.08em', color: '#4E5A6E' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Company navigation */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-[.56rem] font-medium uppercase tracking-[.26em] text-[#E3510F]" style={{ fontFamily: 'var(--font-mono)' }}>
              Company
            </p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(([l, h]) => (
                <li key={h}>
                  <Link href={h}
                    className="text-[#A0AABA] hover:text-[#EDF0F5] text-[.83rem] transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-[#E3510F] overflow-hidden transition-all duration-300" />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-[.56rem] font-medium uppercase tracking-[.26em] text-[#E3510F]" style={{ fontFamily: 'var(--font-mono)' }}>
              Products
            </p>
            <ul className="space-y-3">
              {PRODUCTS.map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    className="text-[#A0AABA] hover:text-[#EDF0F5] text-[.83rem] transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-[#E3510F] overflow-hidden transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-[.56rem] font-medium uppercase tracking-[.26em] text-[#E3510F]" style={{ fontFamily: 'var(--font-mono)' }}>
              Contact
            </p>
            <div className="space-y-5">
              {[
                { Icon: Mail, href: 'mailto:info@andhitech.in', text: 'info@andhitech.in' },
                { Icon: Phone, href: 'tel:+911144766444', text: '+91 11 4476 6444' },
              ].map(({ Icon, href, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(227,81,15,.08)', border: '1px solid rgba(227,81,15,.14)' }}>
                    <Icon size={12} className="text-[#E3510F]" />
                  </div>
                  <a href={href} className="text-[#C8D0DA] hover:text-[#EDF0F5] text-[.83rem] transition-colors">{text}</a>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(227,81,15,.08)', border: '1px solid rgba(227,81,15,.14)' }}>
                  <MapPin size={12} className="text-[#E3510F]" />
                </div>
                <address className="not-italic text-[#C8D0DA] text-[.80rem] leading-relaxed">
                  403, 4th floor, Kirti Mahal Building 19,<br />
                  Rajendra Place, New Delhi – 110008
                </address>
              </div>
            </div>

            {/* Map link */}
            <a href="https://maps.google.com/?q=AND+Hitech+Industries+New+Delhi" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#3D4A5C] hover:text-[#E3510F] transition-colors text-[.68rem]"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.1em' }}
            >
              Open in Maps <ArrowRight size={10} />
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[.04] py-8 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-[#4E5A6E] text-[.80rem]">
            © {year} AND Hitech Industries Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {[
              ['Privacy Policy', '/privacy-policy'],
              ['Terms & Conditions', '/terms'],
              ['Online Complaint', '/online-complaint'],
              ['Our Policy', '/our-policy'],
            ].map(([l, h]) => (
              <Link key={h} href={h}
                className="text-[#2E3848] hover:text-[#8C98AA] text-[.70rem] transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
