'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [siteSettings, setSiteSettings] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const fetchSiteSettings = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/site-settings/`);
        const data = await response.json();
        setSiteSettings(data);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      }
    };

    fetchSiteSettings();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Products & Services', href: '/products' },
    { name: 'Industries', href: '/industries' },
    { name: 'Infra', href: '/infrastructure' },
    { name: 'Career', href: '/career' },
    { name: 'News & Media', href: '/news-media' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-[1000] transition-all duration-500",
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 block w-40 md:w-48">
            <Image
              src={siteSettings?.logo || "/images/footer-logo.svg"}
              alt="AND Hitech"
              width={180}
              height={60}
              className={cn(
                "h-auto w-full transition-all duration-300",
                scrolled ? "brightness-100" : "brightness-100 md:brightness-0 md:invert"
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className={cn(
                      "text-sm font-semibold uppercase tracking-wider transition-colors hover:text-brand-orange",
                      scrolled ? "text-brand-dark" : "text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              href="/contact" 
              className="btn-premium py-2.5 px-6 text-sm"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "lg:hidden relative z-10 p-2 rounded-md transition-colors",
              scrolled ? "text-brand-dark" : "text-white"
            )}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-brand-dark z-[999] pt-24 px-6 lg:hidden"
          >
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className="text-2xl font-bold text-white hover:text-brand-orange transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12">
              <Link 
                href="/contact" 
                className="btn-premium w-full text-center inline-block"
                onClick={() => setMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
