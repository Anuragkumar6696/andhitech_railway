'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

const ease = [.22,1,.36,1];

/* Default client logos shown when API data unavailable */
const DEFAULT_LOGOS = [
  { name:'Indian Railways',    image:'/images/indian railways.png' },
  { name:'Make In India',      image:'/images/make-in-india.jpg'   },
  { name:'Metro Rail',         image:'/images/Metro_logo.png'      },
  { name:'Aug Group',          image:'/images/aug.png'             },
];

export default function OurTestimonial({ initialData }) {
  const [testimonials, setTestimonials] = useState(initialData?.testimonials || []);
  const [logos,        setLogos]        = useState(initialData?.clientLogos  || []);
  const [activeIdx,    setActiveIdx]    = useState(0);

  useEffect(() => {
    if (initialData?.testimonials && initialData?.clientLogos) return;
    fetch('/api/proxy/testimonials').then(r=>r.json()).then(d=>setTestimonials(d.results||[])).catch(()=>{});
    fetch('/api/proxy/client-logos').then(r=>r.json()).then(d=>setLogos(d.results||[])).catch(()=>{});
  }, []);

  const displayLogos  = logos.length ? logos   : DEFAULT_LOGOS;
  const doubled       = [...displayLogos, ...displayLogos];

  /* Filter out obviously placeholder/fake testimonials */
  const realTestimonials = testimonials.filter(t =>
    t.name && !['Brooklyn Simmons','Wade Warren','Guy Hawkins','Kristin Watson'].includes(t.name)
  );

  return (
    <section className="relative overflow-hidden" style={{ background:'#0F1420' }}>
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-35"/>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(227,81,15,.2),transparent)' }}/>
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none"/>

      {/* ── TRUSTED BY MARQUEE ── */}
      <div className="py-20 relative overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 inset-y-0 w-48 z-10 pointer-events-none"
          style={{ background:'linear-gradient(90deg,#0F1420,transparent)' }}/>
        <div className="absolute right-0 inset-y-0 w-48 z-10 pointer-events-none"
          style={{ background:'linear-gradient(270deg,#0F1420,transparent)' }}/>

        {/* Label */}
        <div className="max-w-screen-xl mx-auto px-10 mb-14 flex items-center gap-5 relative z-20">
          <motion.span
            className="eyebrow text-[.7rem] font-bold text-white uppercase tracking-widest"
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          >
            Strategic Industry Partnerships
          </motion.span>
          <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,rgba(227,81,15,.4),transparent)' }}/>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden">
          <div className="flex w-max ticker" style={{ animationDuration: '40s' }}>
            {doubled.map((logo, i) => (
              <div key={i} className="flex-shrink-0 h-24 flex items-center px-12
                grayscale-0 brightness-110 opacity-90
                hover:scale-110 hover:brightness-125 hover:opacity-100
                transition-all duration-500 cursor-pointer"
              >
                <Image
                  src={logo.image?.startsWith('http') ? logo.image : getAbsoluteURL(logo.image)}
                  alt={logo.name||'Partner'}
                  width={200} height={80}
                  className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
