'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

const ease = [.22, 1, .36, 1];

export default function Footer({ initialData }) {
  const [s, setS] = useState(initialData || null);

  useEffect(() => {
    if (initialData) return;
    fetch('/api/proxy/site-settings').then(r => r.json()).then(setS).catch(() => {});
  }, []);

  const year = new Date().getFullYear();

  const socials = [
    { Icon:Linkedin,  href: s?.linkedin  || '#', label:'LinkedIn'  },
    { Icon:Facebook,  href: s?.facebook  || '#', label:'Facebook'  },
    { Icon:Instagram, href: s?.instagram || '#', label:'Instagram' },
    { Icon:Twitter,   href: s?.twitter   || '#', label:'Twitter'   },
  ];

  return (
    <footer className="bg-[#07080C] relative overflow-hidden">
      {/* Flame top stripe */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E3510F] to-transparent opacity-60"/>
      <div className="absolute inset-0 bg-grid opacity-22 pointer-events-none"/>

      {/* Subtle left glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 500px 500px at 0% 100%,rgba(227,81,15,.04),transparent 70%)' }}/>

      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 pb-14">

          {/* Brand column */}
          <div className="lg:col-span-4 space-y-7">
            <Link href="/">
              {s?.logo ? (
                <Image
                  src={s.logo} alt="AND Hitech" width={160} height={50}
                  className="h-10 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="font-bold tracking-[.08em] text-[1.3rem] opacity-80 hover:opacity-100 transition-opacity"
                  style={{ fontFamily:'var(--font-display)' }}>
                  AND<span style={{ color:'#E3510F' }}>HI</span>TECH
                </span>
              )}
            </Link>
            <p className="text-[#5A6478] text-[.85rem] leading-relaxed max-w-xs">
              Engineering excellence and innovative industrial solutions for railways, metros, and critical infrastructure worldwide.
            </p>
            {/* Socials */}
            <div className="flex gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-[#5A6478]
                    hover:text-white hover:bg-[#E3510F] hover:border-[#E3510F] transition-all duration-300">
                  <Icon size={14}/>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-2 space-y-5">
            <p className="text-[.58rem] font-mono font-medium uppercase tracking-[.22em] text-[#E3510F]">Navigation</p>
            <ul className="space-y-3">
              {[
                ['Home','/'],['About Us','/about-us'],['Products','/products'],
                ['Industries','/industries'],['Infrastructure','/infrastructure'],
                ['Career','/career'],['News & Media','/news-media'],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h}
                    className="text-[#5A6478] hover:text-[#F0F2F5] text-[.84rem] transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-[#E3510F] overflow-hidden transition-all duration-300"/>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-[.58rem] font-mono font-medium uppercase tracking-[.22em] text-[#E3510F]">Contact</p>
            <div className="space-y-4">
              {[
                { Icon:Mail,  href:'mailto:Info@andhitech.in', text:'Info@andhitech.in' },
                { Icon:Phone, href:'tel:01125710064',          text:'011-25710064'       },
              ].map(({ Icon, href, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={12} className="text-[#E3510F]"/>
                  </div>
                  <a href={href} className="text-[#5A6478] hover:text-[#F0F2F5] text-[.84rem] transition-colors">{text}</a>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={12} className="text-[#E3510F]"/>
                </div>
                <address className="not-italic text-[#5A6478] text-[.82rem] leading-relaxed">
                  509, 5th Floor, Kirti Mahal Building 19,<br/>
                  Rajendra Place, New Delhi – 110008
                </address>
              </div>
            </div>
          </div>

          {/* CTA column */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-[.58rem] font-mono font-medium uppercase tracking-[.22em] text-[#E3510F]">Get in Touch</p>
            <p className="text-[#5A6478] text-[.84rem] leading-relaxed">
              Ready to discuss your next engineering project? Our team responds within 24 hours.
            </p>
            <Link href="/contact" className="btn-flame inline-flex items-center gap-2 group w-full justify-center py-4">
              <span>Start a Project</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            {/* ISO badge */}
            <div className="pt-5 border-t border-white/[.05] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E3510F]/10 flex items-center justify-center">
                <span className="text-[#E3510F] text-[.5rem] font-bold font-mono">ISO</span>
              </div>
              <div>
                <div className="text-[#9BA5B4] text-[.78rem] font-semibold">ISO 9001:2015 Certified</div>
                <div className="text-[#4A5568] text-[.68rem]">Quality Management System</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[.05] py-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#4A5568] text-[.75rem]">
            © {year} AND Hitech Industries Limited. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {[['Privacy Policy','/privacy-policy'],['Terms','/terms'],['Online Complaint','/online-complaint']].map(([l, h]) => (
              <Link key={h} href={h} className="text-[#4A5568] hover:text-[#9BA5B4] text-[.72rem] transition-colors">{l}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
