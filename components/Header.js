'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const links = [
  { label: 'Home',           href: '/' },
  { label: 'About',          href: '/about-us' },
  { label: 'Products',       href: '/products' },
  { label: 'Industries',     href: '/industries' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Career',         href: '/career' },
  { label: 'News & Media',   href: '/news-media' },
  { label: 'Contact',        href: '/contact' },
];

async function safeFetch(url) {
  const r = await fetch(url, { headers: { 'Accept': 'application/json', 'x-nextjs-data': '1' } });
  if (!r.ok) return null;
  const ct = r.headers.get('content-type') || '';
  if (!ct.includes('application/json')) return null;
  return r.json();
}

export default function Header({ initialData }) {
  const [settings,  setSettings]  = useState(initialData || null);
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [scrollDir, setScrollDir] = useState('up');
  const lastY = useRef(0);
  const router = useRouter();

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
    const close = () => setOpen(false);
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router]);

  const active = (h) => h === '/' ? router.pathname === '/' : router.pathname.startsWith(h);

  const isLight = !scrolled;

  return (
    <motion.header
      animate={{ y: scrolled && scrollDir === 'down' && !open ? -100 : 0 }}
      transition={{ duration: .45, ease: [.22, 1, .36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B1F3A]/95 backdrop-blur-2xl border-b border-white/[.06] shadow-lg shadow-[#071529]/40'
          : 'bg-transparent'
      }`}
    >
      {/* Copper top stripe on scroll */}
      <motion.div
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: .5 }}
        className="absolute top-0 inset-x-0 h-[1px] origin-left"
        style={{ background: 'linear-gradient(90deg,#B88746 0%,#D4A054 40%,rgba(184,135,70,.3) 70%,transparent 100%)' }}
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
            className={`h-10 md:h-14 w-auto transition-all duration-300 ${
              scrolled ? 'brightness-0 invert opacity-95' : 'brightness-0 invert opacity-90'
            } group-hover:opacity-100`}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(({ label, href }) => (
            <Link
              key={href} href={href}
              className={`nav-link text-[.76rem] font-medium transition-colors ${
                active(href) ? 'active text-[#B88746]' : 'text-white/75 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="btn-primary hidden lg:inline-flex py-2.5 px-7 text-[.74rem] font-semibold"
        >
          Get a Quote
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          className="lg:hidden relative z-10 w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.div key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}  transition={{ duration: .18 }}><X    size={20} /></motion.div>
              : <motion.div key="m"  initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: .18 }}><Menu size={20} /></motion.div>
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
            className="absolute top-full inset-x-0 bg-[#0B1F3A]/97 backdrop-blur-3xl border-b border-white/[.06] lg:hidden"
          >
            <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-px">
              {links.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * .04, duration: .4, ease: [.22, 1, .36, 1] }}
                >
                  <Link
                    href={href}
                    className={`flex items-center justify-between py-4 border-b border-white/[.04] text-[.88rem] font-medium tracking-wide transition-colors group
                      ${active(href) ? 'text-[#B88746]' : 'text-white/60 hover:text-white'}`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{label}</span>
                    <span className="w-0 group-hover:w-5 h-px bg-[#B88746] transition-all duration-300 overflow-hidden" />
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8 pb-2">
                <Link href="/contact" className="btn-primary w-full justify-center text-center" onClick={() => setOpen(false)}>
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
