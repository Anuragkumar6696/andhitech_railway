'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Twitter, ArrowRight, ArrowUpRight } from 'lucide-react';

const ease = [.22,1,.36,1];

export default function Footer({ initialData }) {
  const [s, setS] = useState(initialData || null);

  useEffect(() => {
    if (initialData) return;
    fetch('/api/proxy/site-settings').then(r=>r.json()).then(setS).catch(()=>{});
  }, []);

  const year = new Date().getFullYear();
  const socials = [
    { Icon:Linkedin,  href:s?.linkedin  ||'#', label:'LinkedIn'  },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background:'#050608' }}>
      {/* Flame top stripe */}
      <div className="h-[1.5px]" style={{ background:'linear-gradient(90deg,transparent,#E3510F 30%,rgba(227,81,15,.4) 70%,transparent)' }}/>
      <div className="absolute inset-0 bg-grid opacity-18 pointer-events-none"/>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 600px 500px at 0% 100%,rgba(227,81,15,.04),transparent 70%)' }}/>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Pre-footer CTA band ── */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.75, ease }}
          className="py-14 border-b border-white/[.04] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <h3 className="display-sm mb-2" style={{ lineHeight:1 }}>
              Ready to engineer<br/><span style={{ color:'#E3510F' }}>something great?</span>
            </h3>
            <p className="text-[#4E5A6E] text-[.85rem] mt-3">Talk to our team about your next railway project.</p>
          </div>
          <Link href="/contact" className="btn-flame flex-shrink-0 py-4 px-10 text-[.64rem] group inline-flex items-center gap-3">
            <span>Start a Conversation</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">

          {/* Brand column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="block group">
              {s?.logo ? (
                <Image
                  src={s.logo} alt="AND Hitech Industries" width={180} height={56}
                  className="h-11 w-auto brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <div className="absolute inset-0" style={{ background:'#E3510F', clipPath:'polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)' }}/>
                    <div className="absolute inset-[2.5px]" style={{ background:'#050608', clipPath:'polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)' }}/>
                    <div className="absolute inset-[4.5px]" style={{ background:'#E3510F', clipPath:'polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)', opacity:.7 }}/>
                  </div>
                  <span className="font-bold tracking-[.1em] text-[1.15rem] opacity-75 group-hover:opacity-100 transition-opacity"
                    style={{ fontFamily:'var(--font-display)' }}>
                    AND<span style={{ color:'#E3510F' }}>HITECH</span>
                  </span>
                </div>
              )}
            </Link>
            <p className="text-[#3D4A5C] text-[.84rem] leading-relaxed max-w-xs">
              Engineering excellence and innovative industrial solutions for railways, metros, and critical infrastructure worldwide.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/[.06] flex items-center justify-center text-[#3D4A5C]
                    hover:text-white hover:bg-[#E3510F] hover:border-[#E3510F] transition-all duration-300">
                  <Icon size={13}/>
                </a>
              ))}
            </div>
            {/* ISO badge */}
            <div className="flex items-center gap-3 pt-2">
              <div className="badge text-[.52rem]">ISO 9001:2015</div>
              <div className="badge text-[.52rem]">RDSO Approved</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-[.56rem] font-medium uppercase tracking-[.26em] text-[#E3510F]" style={{ fontFamily:'var(--font-mono)' }}>
              Navigation
            </p>
            <ul className="space-y-3.5">
              {[
                ['Home','/'],['About Us','/about-us'],['Products','/products'],
                ['Industries','/industries'],['Infrastructure','/infrastructure'],
                ['Career','/career'],['News & Media','/news-media'],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h}
                    className="text-[#3D4A5C] hover:text-[#EDF0F5] text-[.83rem] transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-[#E3510F] overflow-hidden transition-all duration-300"/>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-[.56rem] font-medium uppercase tracking-[.26em] text-[#E3510F]" style={{ fontFamily:'var(--font-mono)' }}>
              Products
            </p>
            <ul className="space-y-3.5">
              {[
                'LHB Coach Components','Vande Bharat Systems','Metro Rail Components',
                'Brake Systems','HVAC Engineering','Track Maintenance Equipment',
              ].map(label => (
                <li key={label}>
                  <Link href="/products"
                    className="text-[#3D4A5C] hover:text-[#EDF0F5] text-[.83rem] transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-[#E3510F] overflow-hidden transition-all duration-300"/>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-[.56rem] font-medium uppercase tracking-[.26em] text-[#E3510F]" style={{ fontFamily:'var(--font-mono)' }}>
              Contact
            </p>
            <div className="space-y-5">
              {[
                { Icon:Mail,  href:'mailto:Info@andhitech.in', text:'Info@andhitech.in'  },
                { Icon:Phone, href:'tel:01125710064',          text:'011-25710064'        },
              ].map(({ Icon, href, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background:'rgba(227,81,15,.08)', border:'1px solid rgba(227,81,15,.14)' }}>
                    <Icon size={12} className="text-[#E3510F]"/>
                  </div>
                  <a href={href} className="text-[#3D4A5C] hover:text-[#EDF0F5] text-[.83rem] transition-colors">{text}</a>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background:'rgba(227,81,15,.08)', border:'1px solid rgba(227,81,15,.14)' }}>
                  <MapPin size={12} className="text-[#E3510F]"/>
                </div>
                <address className="not-italic text-[#3D4A5C] text-[.81rem] leading-relaxed">
                  509, 5th Floor, Kirti Mahal Building 19,<br/>
                  Rajendra Place, New Delhi – 110008
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[.04] py-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#2E3848] text-[.73rem]">
            © {year} AND Hitech Industries Limited. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {[['Privacy Policy','/privacy-policy'],['Terms & Conditions','/terms'],['Online Complaint','/online-complaint'],['Our Policy','/our-policy']].map(([l, h]) => (
              <Link key={h} href={h}
                className="text-[#2E3848] hover:text-[#8C98AA] text-[.71rem] transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
