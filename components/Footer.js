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

const companyLinks = [
  { label: 'About Us',       href: '/about-us' },
  { label: 'Products',       href: '/products' },
  { label: 'Industries',     href: '/industries' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Careers',        href: '/career' },
  { label: 'News & Media',   href: '/news-media' },
];

const productLinks = [
  'HVAC & RMPU Systems',
  'Brake Discs & Pads',
  'Air Spring Suspension',
  'Axle-Mounted Components',
  'Rolling Stock Parts',
  'Custom Engineering',
];

export default function Footer({ initialData }) {
  const [s, setS] = useState(initialData || null);
  useEffect(() => {
    if (initialData) return;
    safeFetch('/api/proxy/site-settings').then(d => { if (d) setS(d); }).catch(() => {});
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: '#071529' }}>
      {/* Copper top stripe */}
      <div style={{ height: '1.5px', background: 'linear-gradient(90deg,transparent,#B88746 30%,rgba(184,135,70,.3) 70%,transparent)' }} />
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* Pre-footer CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .75, ease }}
          className="py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}
        >
          <div>
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.5rem,2.5vw,2.4rem)',
              fontWeight: 700, lineHeight: 1.1, color: '#F7F5F0',
            }}>
              Ready to engineer<br />
              <span style={{ color: '#B88746' }}>something great?</span>
            </h3>
            <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '.84rem', marginTop: '10px' }}>
              Talk to our team about your next railway project.
            </p>
          </div>
          <Link href="/contact" className="btn-primary flex-shrink-0 group inline-flex items-center gap-3" style={{ padding: '16px 40px', fontSize: '.8rem' }}>
            <span>Start a Conversation</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Main footer grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16"
          style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}
        >
          {/* Brand col */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="block">
              <Image
                src="/images/logo-main.png" alt="AND Hitech Industries"
                width={220} height={90}
                className="h-16 w-auto"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
              />
            </Link>
            <p style={{ color: 'rgba(255,255,255,.35)', fontSize: '.83rem', lineHeight: 1.8, maxWidth: '280px' }}>
              Engineering excellence and precision manufacturing for Indian Railways, Metro networks, and the next generation of rail transportation.
            </p>
            <div className="flex gap-3">
              <a
                href={s?.linkedin || '#'}
                aria-label="LinkedIn"
                target="_blank" rel="noopener noreferrer"
                style={{
                  width: '44px', height: '44px', borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,.4)',
                  transition: 'color .2s, background .2s, border-color .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#B88746'; e.currentTarget.style.borderColor = '#B88746'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = 'rgba(255,255,255,.4)'; }}
              >
                <Linkedin size={16} />
              </a>
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="badge">ISO 9001:2015</div>
              <div className="badge">RDSO Approved</div>
              <div className="badge">Make in India</div>
            </div>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2">
            <h4 style={{
              color: 'rgba(255,255,255,.35)',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '.62rem', fontWeight: 600, letterSpacing: '.25em', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {companyLinks.map(({ label, href }) => (
                <Link key={href} href={href}
                  style={{
                    color: 'rgba(255,255,255,.42)', fontSize: '.82rem',
                    textDecoration: 'none', transition: 'color .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#B88746'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.42)'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h4 style={{
              color: 'rgba(255,255,255,.35)',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '.62rem', fontWeight: 600, letterSpacing: '.25em', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Products
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {productLinks.map(p => (
                <Link key={p} href="/products"
                  style={{
                    color: 'rgba(255,255,255,.42)', fontSize: '.82rem',
                    textDecoration: 'none', transition: 'color .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#B88746'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.42)'}
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 style={{
              color: 'rgba(255,255,255,.35)',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '.62rem', fontWeight: 600, letterSpacing: '.25em', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { Icon: Phone,  val: s?.phone   || 'Sales & Engineering', label: 'Call for enquiries' },
                { Icon: Mail,   val: s?.email   || 'info@andhitech.com',  label: 'General correspondence' },
                { Icon: MapPin, val: s?.address || 'Jaipur, Rajasthan',   label: 'Head Office & Manufacturing' },
              ].map(({ Icon, val, label }) => (
                <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Icon size={14} color="#B88746" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,.55)', fontSize: '.82rem' }}>{val}</div>
                    <div style={{ color: 'rgba(255,255,255,.25)', fontSize: '.68rem', marginTop: '2px' }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-7 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p style={{ color: 'rgba(255,255,255,.22)', fontSize: '.72rem' }}>
            © {year} AND Hitech Industries Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Quality Policy'].map(t => (
              <Link key={t} href="/our-policy"
                style={{
                  color: 'rgba(255,255,255,.22)', fontSize: '.72rem',
                  textDecoration: 'none', transition: 'color .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,.5)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.22)'}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
