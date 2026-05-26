'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label:'Home',       href:'/' },
  { label:'About',      href:'/about-us' },
  { label:'Products',   href:'/products' },
  { label:'Industries', href:'/industries' },
  { label:'Infra',      href:'/infrastructure' },
  { label:'Career',     href:'/career' },
  { label:'News',       href:'/news-media' },
  { label:'Contact',    href:'/contact' },
];

export default function Header({ initialData }) {
  const [settings, setSettings] = useState(initialData || null);
  const [open, setOpen]         = useState(false);
  const [scrollY, setScrollY]   = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    if (!initialData) {
      fetch('/api/proxy/site-settings').then(r => r.json()).then(setSettings).catch(() => {});
    }
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router]);

  const scrolled = scrollY > 64;
  const active   = (h) => h === '/' ? router.pathname === '/' : router.pathname.startsWith(h);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500
        ${scrolled ? 'bg-[#07080C]/92 backdrop-blur-2xl border-b border-white/[.05] py-3' : 'bg-transparent py-5'}`}
    >
      {/* Flame top stripe — animates in on scroll */}
      <div
        className={`absolute top-0 inset-x-0 h-[1.5px] transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(90deg,transparent 0%,#E3510F 40%,#FF6B35 60%,transparent 100%)' }}
      />

      <div className="max-w-screen-xl mx-auto px-5 md:px-10 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex-shrink-0">
          {settings?.logo ? (
            <Image
              src={settings.logo}
              alt="AND Hitech Industries"
              width={160} height={50}
              className="h-10 w-auto brightness-0 invert transition-opacity hover:opacity-80"
              priority
            />
          ) : (
            <span className="font-bold tracking-[.08em] text-[1.2rem]" style={{ fontFamily:'var(--font-display)' }}>
              AND<span style={{ color:'#E3510F' }}>HI</span>TECH
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(({ label, href }) => (
            <Link
              key={href} href={href}
              className={`nav-link ${active(href) ? 'active !text-[#E3510F]' : 'text-[#9BA5B4] hover:text-[#F0F2F5]'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link href="/contact" className="btn-flame hidden lg:inline-flex py-3 px-7 text-xs">
          Get a Quote
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          className="lg:hidden relative z-10 text-[#9BA5B4] hover:text-white transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.div key="x"  initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}  transition={{duration:.18}}><X    size={22}/></motion.div>
              : <motion.div key="m" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:.18}}><Menu size={22}/></motion.div>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:-6 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-6 }}
            transition={{ duration:.3, ease:[.22,1,.36,1] }}
            className="absolute top-full inset-x-0 bg-[#07080C]/98 backdrop-blur-2xl border-b border-white/5 lg:hidden"
          >
            <div className="max-w-screen-xl mx-auto px-5 py-8 space-y-px">
              {links.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity:0, x:-14 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay: i * .05 }}
                >
                  <Link
                    href={href}
                    className={`block py-3.5 px-3 border-b border-white/[.04] text-[.95rem] font-medium tracking-wide transition-colors
                      ${active(href) ? 'text-[#E3510F]' : 'text-[#9BA5B4] hover:text-white'}`}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-7">
                <Link href="/contact" className="btn-flame w-full justify-center" onClick={() => setOpen(false)}>
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
