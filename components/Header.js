'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, ArrowRight, Zap, Shield, Settings, Train, Building2, Wrench, Factory } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const PRODUCT_CATEGORIES = [
  {
    label: 'Brake Systems',
    icon: Shield,
    desc: 'Axle-mounted, wheel-mounted, brake pads & blocks',
    href: '/products?cat=Brake',
    color: '#EF4444',
  },
  {
    label: 'Air Suspension',
    icon: Zap,
    desc: 'LHB & Vande Bharat air suspension control systems',
    href: '/products?cat=LHB',
    color: '#3B82F6',
  },
  {
    label: 'HVAC & RMPU',
    icon: Settings,
    desc: 'Roof-mounted package units for LHB coaches',
    href: '/products?cat=LHB',
    color: '#10B981',
  },
  {
    label: 'Metro Components',
    icon: Building2,
    desc: 'Specialized components for urban metro networks',
    href: '/products?cat=Metro',
    color: '#8B5CF6',
  },
  {
    label: 'Track Equipment',
    icon: Wrench,
    desc: 'Tamping tools & track maintenance solutions',
    href: '/products?cat=Track',
    color: '#F59E0B',
  },
  {
    label: 'Vande Bharat',
    icon: Train,
    desc: 'Plug doors, wheel-mounted discs & coupler systems',
    href: '/products?cat=Vande Bharat',
    color: '#E3510F',
  },
];

const SOLUTIONS = [
  { label: 'Indian Railways', href: '/industries', sub: 'Rolling Stock Components' },
  { label: 'Metro Rail', href: '/industries', sub: 'HVAC & Precision Parts' },
  { label: 'PSU & EPC', href: '/industries', sub: 'Contract Manufacturing' },
  { label: 'Export & OEM', href: '/contact', sub: 'Global Supply Chain' },
];

const NAV_LINKS = [
  { label: 'About', href: '/about-us' },
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'Solutions', href: '/industries', hasSolutions: true },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'News', href: '/news-media' },
  { label: 'Career', href: '/career' },
];

async function safeFetch(url) {
  const r = await fetch(url, { headers: { 'Accept': 'application/json', 'x-nextjs-data': '1' } });
  if (!r.ok) return null;
  const ct = r.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return null;
  return r.json();
}

export default function Header({ initialData }) {
  const [settings, setSettings] = useState(initialData || null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState('up');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const lastY = useRef(0);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 72);
    setScrollDir(y > lastY.current ? 'down' : 'up');
    lastY.current = y;
  });

  useEffect(() => {
    if (initialData) return;
    safeFetch('/api/proxy/site-settings')
      .then((data) => { if (data) setSettings(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const close = () => { setOpen(false); setActiveDropdown(null); };
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const active = (h) => h === '/' ? router.pathname === '/' : router.pathname.startsWith(h);

  return (
    <motion.header
      animate={{ y: scrolled && scrollDir === 'down' && !open ? -100 : 0 }}
      transition={{ duration: .45, ease: [.22, 1, .36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
        scrolled
          ? 'bg-[#050608]/92 backdrop-blur-2xl border-b border-white/[.04]'
          : 'bg-transparent'
      }`}
      ref={dropdownRef}
    >
      {/* Animated flame top stripe */}
      <motion.div
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: .5 }}
        className="absolute top-0 inset-x-0 h-[1px] origin-left"
        style={{ background: 'linear-gradient(90deg,#E3510F 0%,#FF6835 40%,rgba(227,81,15,.4) 70%,transparent 100%)' }}
      />

      <div
        className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8"
        style={{ paddingTop: scrolled ? 14 : 22, paddingBottom: scrolled ? 14 : 22, transition: 'padding .3s' }}
      >
        {/* Logo */}
        <Link href="/" className="relative z-10 flex-shrink-0 group">
          <Image
            src="/images/logo.png"
            alt="AND Hitech Industries"
            width={500} height={90}
            className="h-10 md:h-14 w-auto brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href, hasDropdown, hasSolutions }) => {
            const isOpen = activeDropdown === label;
            return (
              <div key={href} className="relative">
                {hasDropdown || hasSolutions ? (
                  <button
                    onMouseEnter={() => setActiveDropdown(label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onClick={() => setActiveDropdown(isOpen ? null : label)}
                    className={`nav-link flex items-center gap-1 text-[.70rem] font-medium px-3 py-2 ${
                      active(href) ? 'active !text-[#E3510F]' : 'text-[#8C98AA] hover:text-[#EDF0F5]'
                    }`}
                  >
                    {label}
                    <ChevronDown
                      size={11}
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#E3510F]' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={href}
                    className={`nav-link text-[.70rem] font-medium px-3 py-2 block ${
                      active(href) ? 'active !text-[#E3510F]' : 'text-[#8C98AA] hover:text-[#EDF0F5]'
                    }`}
                  >
                    {label}
                  </Link>
                )}

                {/* Products Mega-Menu */}
                {hasDropdown && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: .22, ease: [.22, 1, .36, 1] }}
                        onMouseEnter={() => setActiveDropdown(label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] bg-[#08090E]/98 backdrop-blur-2xl border border-white/[.06] rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,.8)]"
                      >
                        {/* Top bar */}
                        <div className="px-7 py-4 border-b border-white/[.04] flex items-center justify-between">
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.52rem', letterSpacing: '.28em', color: '#E3510F', textTransform: 'uppercase' }}>
                            Product Portfolio
                          </span>
                          <Link href="/products" className="text-[#4E5A6E] hover:text-[#E3510F] text-[.60rem] flex items-center gap-1.5 transition-colors" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.1em' }}>
                            View All <ArrowRight size={10} />
                          </Link>
                        </div>
                        {/* Grid */}
                        <div className="grid grid-cols-3 gap-px bg-white/[.03] p-px">
                          {PRODUCT_CATEGORIES.map(({ label: catLabel, icon: Icon, desc, href: catHref, color }) => (
                            <Link key={catLabel} href={catHref}
                              className="group flex items-start gap-3.5 p-5 bg-[#08090E] hover:bg-[#0F1420] transition-colors duration-200"
                            >
                              <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                              >
                                <Icon size={16} style={{ color }} />
                              </div>
                              <div>
                                <div className="text-[#EDF0F5] text-[.78rem] font-medium mb-1 group-hover:text-white">{catLabel}</div>
                                <div className="text-[#4E5A6E] text-[.68rem] leading-relaxed group-hover:text-[#6A7888]">{desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        {/* Bottom CTA */}
                        <div className="px-7 py-4 border-t border-white/[.04] flex items-center gap-3">
                          <span className="text-[#2E3848] text-[.62rem]" style={{ fontFamily: 'var(--font-mono)' }}>Need a custom solution?</span>
                          <Link href="/contact" className="text-[#E3510F] text-[.62rem] hover:text-[#FF6835] flex items-center gap-1 transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>
                            Speak to an engineer <ArrowRight size={9} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Solutions Dropdown */}
                {hasSolutions && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: .22 }}
                        onMouseEnter={() => setActiveDropdown(label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#08090E]/98 backdrop-blur-2xl border border-white/[.06] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,.7)]"
                      >
                        <div className="px-6 py-3.5 border-b border-white/[.04]">
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.5rem', letterSpacing: '.28em', color: '#E3510F', textTransform: 'uppercase' }}>
                            Industries Served
                          </span>
                        </div>
                        {SOLUTIONS.map(({ label: solLabel, href: solHref, sub }) => (
                          <Link key={solLabel} href={solHref}
                            className="flex items-start gap-4 px-6 py-4 hover:bg-[#0F1420] border-b border-white/[.03] last:border-0 group transition-colors"
                          >
                            <div className="w-1 h-1 rounded-full bg-[#E3510F] mt-2.5 flex-shrink-0 group-hover:scale-150 transition-transform" />
                            <div>
                              <div className="text-[#EDF0F5] text-[.78rem] font-medium group-hover:text-white">{solLabel}</div>
                              <div className="text-[#3D4A5C] text-[.66rem] mt-0.5 group-hover:text-[#6A7888]">{sub}</div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop Right: Contact + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+911144766444"
            className="text-[#4E5A6E] hover:text-[#8C98AA] text-[.66rem] transition-colors"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.1em' }}
          >
            +91 11 4476 6444
          </a>
          <Link href="/contact" className="btn-flame py-3 px-7 text-[.68rem]">
            <span>Get a Quote</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          className="lg:hidden relative z-10 w-9 h-9 flex items-center justify-center text-[#8C98AA] hover:text-white transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .18 }}><X size={20} /></motion.div>
              : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: .18 }}><Menu size={20} /></motion.div>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .32, ease: [.22, 1, .36, 1] }}
            className="absolute top-full inset-x-0 bg-[#050608]/98 backdrop-blur-3xl border-b border-white/[.04] lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-px">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about-us' },
                { label: 'Products', href: '/products' },
                { label: 'Industries', href: '/industries' },
                { label: 'Infrastructure', href: '/infrastructure' },
                { label: 'News & Media', href: '/news-media' },
                { label: 'Career', href: '/career' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * .04, duration: .4, ease: [.22, 1, .36, 1] }}
                >
                  <Link
                    href={href}
                    className={`flex items-center justify-between py-4 border-b border-white/[.035] text-[.88rem] font-medium tracking-wide transition-colors group
                      ${active(href) ? 'text-[#E3510F]' : 'text-[#8C98AA] hover:text-white'}`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{label}</span>
                    <span className="w-0 group-hover:w-5 h-px bg-[#E3510F] transition-all duration-300 overflow-hidden" />
                  </Link>
                </motion.div>
              ))}

              {/* Product categories on mobile */}
              <div className="pt-4 pb-2">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.52rem', letterSpacing: '.28em', color: '#E3510F', textTransform: 'uppercase' }} className="mb-3">
                  Product Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCT_CATEGORIES.map(({ label: catLabel, href: catHref, color }) => (
                    <Link key={catLabel} href={catHref}
                      onClick={() => setOpen(false)}
                      className="text-[#5C6A7E] hover:text-[#EDF0F5] text-[.75rem] py-2 px-3 rounded-lg border border-white/[.04] hover:border-white/[.08] transition-all"
                    >
                      {catLabel}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <a href="tel:+911144766444" className="block text-center py-3 border border-white/10 rounded-lg text-[#8C98AA] text-[.78rem]" style={{ fontFamily: 'var(--font-mono)' }}>
                  +91 11 4476 6444
                </a>
                <Link href="/contact" className="btn-flame w-full justify-center" onClick={() => setOpen(false)}>
                  <span>Get a Free Quote</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
