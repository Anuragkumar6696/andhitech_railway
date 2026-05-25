'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ initialData }) {
  const [siteSettings, setSiteSettings] = useState(initialData || null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (initialData) return () => window.removeEventListener('scroll', handleScroll);

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    const handle = () => setMenuOpen(false);
    router.events.on('routeChangeStart', handle);
    return () => router.events.off('routeChangeStart', handle);
  }, [router]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Products', href: '/products' },
    { name: 'Industries', href: '/industries' },
    { name: 'Infra', href: '/infrastructure' },
    { name: 'Career', href: '/career' },
    { name: 'News & Media', href: '/news-media' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        scrolled
          ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 w-full h-[3px] bg-brand-orange transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
        <nav className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="relative z-10 block flex-shrink-0">
            <Image
              src={siteSettings?.logo || '/images/logo.png'}
              alt="AND Hitech Industries"
              width={160}
              height={52}
              className={`h-auto transition-all duration-400 ${
                scrolled
                  ? 'brightness-100 w-36'
                  : 'brightness-0 invert w-40 md:w-44'
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 group ${
                  isActive(link.href)
                    ? 'text-brand-orange'
                    : scrolled
                    ? 'text-[#1a1a1a] hover:text-brand-orange'
                    : 'text-white/90 hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-label, "Barlow Condensed", sans-serif)' }}
              >
                {link.name}
                {/* Active indicator */}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-[2px] bg-brand-orange rounded-full transition-all duration-300 ${
                    isActive(link.href) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  } origin-left group-hover:opacity-100 group-hover:scale-x-100`}
                />
              </Link>
            ))}

            <Link
              href="/contact"
              className="ml-6 btn-premium py-[10px] px-7 text-[11px]"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden relative z-10 p-2 rounded-md transition-colors ${
              scrolled || menuOpen ? 'text-[#1a1a1a]' : 'text-white'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={26} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={26} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 w-full min-h-screen bg-[#0e0e0e] z-[999] pt-24 px-6 pb-12 lg:hidden"
          >
            {/* Orange accent top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-orange" />

            <ul className="space-y-1 mb-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 px-2 text-2xl font-bold border-b border-white/5 transition-colors ${
                      isActive(link.href) ? 'text-brand-orange' : 'text-white hover:text-brand-orange'
                    }`}
                    style={{ fontFamily: 'var(--font-display, "Montserrat", sans-serif)' }}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/contact"
                className="btn-premium w-full justify-center text-base"
                onClick={() => setMenuOpen(false)}
              >
                Get a Free Quote
              </Link>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 pt-8 border-t border-white/10 space-y-2"
            >
              <a href="mailto:Info@andhitech.in" className="block text-sm text-white/40 hover:text-white/70 transition-colors">
                Info@andhitech.in
              </a>
              <a href="tel:01125710064" className="block text-sm text-white/40 hover:text-white/70 transition-colors">
                011-25710064
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
