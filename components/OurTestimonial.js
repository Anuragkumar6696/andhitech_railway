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
      <div className="border-b border-white/[.04] py-12 relative overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 inset-y-0 w-48 z-10 pointer-events-none"
          style={{ background:'linear-gradient(90deg,#0F1420,transparent)' }}/>
        <div className="absolute right-0 inset-y-0 w-48 z-10 pointer-events-none"
          style={{ background:'linear-gradient(270deg,#0F1420,transparent)' }}/>

        {/* Label */}
        <div className="max-w-screen-xl mx-auto px-10 mb-10 flex items-center gap-5 relative z-20">
          <motion.span
            className="eyebrow text-[.58rem]"
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          >
            Trusted by Industry Leaders
          </motion.span>
          <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,rgba(227,81,15,.18),transparent)' }}/>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden">
          <div className="flex w-max ticker">
            {doubled.map((logo, i) => (
              <div key={i} className="flex-shrink-0 h-12 flex items-center px-2
                grayscale brightness-60 opacity-30
                hover:grayscale-0 hover:brightness-100 hover:opacity-100
                transition-all duration-500 cursor-pointer"
              >
                <Image
                  src={logo.image?.startsWith('http') ? logo.image : getAbsoluteURL(logo.image)}
                  alt={logo.name||'Partner'}
                  width={130} height={48}
                  className="h-10 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS — only show if we have real ones ── */}
      {realTestimonials.length > 0 && (
        <div className="section-gap-sm">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

            <motion.div
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:.7, ease }}
              className="flex items-center gap-5 mb-14"
            >
              <span className="eyebrow">Client Voices</span>
              <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,rgba(227,81,15,.18),transparent)' }}/>
            </motion.div>

            <div className="relative">
              <motion.div
                key={activeIdx}
                initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:.55, ease }}
                className="story-card p-10 md:p-14 max-w-4xl mx-auto"
              >
                <Quote size={40} className="text-[#E3510F] opacity-25 mb-8"/>
                <blockquote className="text-[#EDF0F5] text-[1.05rem] md:text-[1.2rem] leading-relaxed font-light mb-10">
                  "{realTestimonials[activeIdx]?.content || realTestimonials[activeIdx]?.message}"
                </blockquote>
                <div className="flex items-center gap-5">
                  {realTestimonials[activeIdx]?.image && (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E3510F]/25 flex-shrink-0">
                      <Image
                        src={getAbsoluteURL(realTestimonials[activeIdx].image)}
                        alt={realTestimonials[activeIdx].name}
                        width={48} height={48}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-[#EDF0F5] font-semibold text-[.92rem]">
                      {realTestimonials[activeIdx]?.name}
                    </div>
                    <div className="text-[#4E5A6E] text-[.78rem]">
                      {realTestimonials[activeIdx]?.designation || realTestimonials[activeIdx]?.company}
                    </div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length:5 }).map((_,s) => (
                      <Star key={s} size={13} className="fill-[#E3510F] text-[#E3510F]"/>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Navigation */}
              {realTestimonials.length > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                  <button
                    onClick={() => setActiveIdx(i => (i-1+realTestimonials.length)%realTestimonials.length)}
                    className="w-10 h-10 rounded-full border border-white/[.08] flex items-center justify-center text-[#8C98AA] hover:border-[#E3510F] hover:text-[#E3510F] transition-all"
                  >
                    <ChevronLeft size={16}/>
                  </button>
                  {realTestimonials.map((_,i) => (
                    <button key={i} onClick={() => setActiveIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i===activeIdx?'bg-[#E3510F] w-6':'bg-white/[.15] hover:bg-white/30'}`}
                    />
                  ))}
                  <button
                    onClick={() => setActiveIdx(i => (i+1)%realTestimonials.length)}
                    className="w-10 h-10 rounded-full border border-white/[.08] flex items-center justify-center text-[#8C98AA] hover:border-[#E3510F] hover:text-[#E3510F] transition-all"
                  >
                    <ChevronRight size={16}/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
