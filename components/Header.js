'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const links = [
  { label:'Home',           href:'/' },
  { label:'About',          href:'/about-us' },
  { label:'Products',       href:'/products' },
  { label:'Industries',     href:'/industries' },
  { label:'Infrastructure', href:'/infrastructure' },
  { label:'Career',         href:'/career' },
  { label:'News',           href:'/news-media' },
  { label:'Contact',        href:'/contact' },
];

export default function Header({ initialData }) {
  const [settings,   setSettings]   = useState(initialData || null);
  const [open,       setOpen]       = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [scrollDir,  setScrollDir]  = useState('up');
  const lastY = useRef(0);
  const router = useRouter();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 72);
    setScrollDir(y > lastY.current ? 'down' : 'up');
    lastY.current = y;
  });

  useEffect(() => {
    if (!initialData) {
      fetch('/api/proxy/site-settings').then(r => r.json()).then(setSettings).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router]);

  const active = (h) => h === '/' ? router.pathname === '/' : router.pathname.startsWith(h);

  return (
    <motion.header
      animate={{ y: scrolled && scrollDir === 'down' && !open ? -100 : 0 }}
      transition={{ duration: .45, ease: [.22,1,.36,1] }}
      className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
        scrolled
          ? 'bg-[#050608]/90 backdrop-blur-2xl border-b border-white/[.04]'
          : 'bg-transparent'
      }`}
    >
      {/* Animated flame top stripe */}
      <motion.div
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: .5 }}
        className="absolute top-0 inset-x-0 h-[1px] origin-left"
        style={{ background:'linear-gradient(90deg,#E3510F 0%,#FF6835 40%,rgba(227,81,15,.4) 70%,transparent 100%)' }}
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8" style={{ paddingTop: scrolled ? 14 : 22, paddingBottom: scrolled ? 14 : 22, transition:'padding .3s' }}>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex-shrink-0 group">
          <Image
            src="/images/logo.png"
            alt="AND Hitech Industries"
            width={180} height={54}
            className="h-11 w-auto brightness-0 invert opacity-85 group-hover:opacity-100 transition-opacity"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <Link
              key={href} href={href}
              className={`nav-link text-[.95rem] font-bold tracking-wide ${active(href) ? 'active !text-[#E3510F]' : 'text-[#ADBAC7] hover:text-[#EDF0F5]'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link href="/contact" className="btn-flame hidden lg:inline-flex py-3 px-7 text-[.6rem]">
          <span>Get a Quote</span>
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          className="lg:hidden relative z-10 w-9 h-9 flex items-center justify-center text-[#8C98AA] hover:text-white transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open
              ? <motion.div key="x"  initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}  transition={{duration:.18}}><X    size={20}/></motion.div>
              : <motion.div key="m"  initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:.18}}><Menu size={20}/></motion.div>
            }
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:-8, backdropFilter:'blur(0px)' }}
            animate={{ opacity:1, y:0,  backdropFilter:'blur(32px)' }}
            exit={{ opacity:0, y:-8 }}
            transition={{ duration:.32, ease:[.22,1,.36,1] }}
            className="absolute top-full inset-x-0 bg-[#050608]/96 border-b border-white/[.04] lg:hidden"
          >
            <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-px">
              {links.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity:0, x:-16 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay: i * .04, duration:.4, ease:[.22,1,.36,1] }}
                >
                  <Link
                    href={href}
                    className={`flex items-center justify-between py-4 border-b border-white/[.035] text-[.88rem] font-medium tracking-wide transition-colors group
                      ${active(href) ? 'text-[#E3510F]' : 'text-[#8C98AA] hover:text-white'}`}
                    onClick={() => setOpen(false)}
                  >
                    <span>{label}</span>
                    <span className="w-0 group-hover:w-5 h-px bg-[#E3510F] transition-all duration-300 overflow-hidden"/>
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8">
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
