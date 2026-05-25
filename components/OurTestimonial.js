'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css'; import 'swiper/css/pagination';

export default function OurTestimonial({ initialData }) {
  const [testimonials, setTestimonials] = useState(initialData?.testimonials || []);
  const [logos,        setLogos]        = useState(initialData?.clientLogos  || []);

  useEffect(() => {
    if (initialData?.testimonials && initialData?.clientLogos) return;
    fetch('/api/proxy/testimonials').then(r=>r.json()).then(d=>setTestimonials(d.results||[])).catch(()=>{});
    fetch('/api/proxy/client-logos').then(r=>r.json()).then(d=>setLogos(d.results||[])).catch(()=>{});
  }, []);

  const doubled = [...logos, ...logos];

  return (
    <section className="bg-[#0D1117] overflow-hidden relative">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50"/>

      {/* ─── TICKER ─── */}
      <div className="border-b border-white/[.05] py-11 relative overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 inset-y-0 w-40 z-10 pointer-events-none" style={{background:'linear-gradient(90deg,#0D1117,transparent)'}}/>
        <div className="absolute right-0 inset-y-0 w-40 z-10 pointer-events-none" style={{background:'linear-gradient(270deg,#0D1117,transparent)'}}/>

        <div className="max-w-screen-xl mx-auto px-10 mb-8 flex items-center gap-5">
          <motion.span className="eyebrow text-[.62rem]" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>
            Trusted by Industry Leaders
          </motion.span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#E3510F]/20 to-transparent"/>
        </div>

        <div className="overflow-hidden">
          <div className="ticker" style={{width:'max-content'}}>
            {doubled.length > 0 ? doubled.map((logo,i) => (
              <div key={i} className="flex-shrink-0 h-10 flex items-center
                grayscale brightness-75 opacity-40
                hover:grayscale-0 hover:brightness-100 hover:opacity-100
                transition-all duration-500 cursor-pointer">
                <Image src={logo.image} alt={logo.name||'Partner'} width={120} height={40}
                  className="h-9 w-auto object-contain"/>
              </div>
            )) : (
              /* Placeholder shimmer blocks */
              Array.from({length:14}).map((_,i) => (
                <div key={i} className="flex-shrink-0 h-9 w-28 rounded bg-white/[.04] animate-pulse"/>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ─── TESTIMONIALS ─── */}
      {testimonials.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 py-24 md:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
              <span className="eyebrow mb-6 block">Client Voices</span>
              <h2 className="display-md">What Our Partners<br/><span style={{color:'#E3510F'}}>Say About Us</span></h2>
            </motion.div>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay:5500, disableOnInteraction:false }}
            pagination={{ clickable:true, el:'.testimonial-dots' }}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{ 768:{slidesPerView:2}, 1200:{slidesPerView:3} }}
            className="!pb-14">
            {testimonials.map((t,i) => (
              <SwiperSlide key={t.id||i}>
                <div className="cell h-full flex flex-col p-8 group min-h-[280px]">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({length:5}).map((_,si) => (
                      <Star key={si} size={12} className="fill-[#E3510F] text-[#E3510F]"/>
                    ))}
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#E3510F]/10 flex items-center justify-center mb-5
                    group-hover:bg-[#E3510F] transition-colors duration-400">
                    <Quote size={15} className="text-[#E3510F] group-hover:text-white transition-colors"/>
                  </div>

                  <p className="text-[#9BA5B4] text-[.88rem] leading-relaxed mb-7 flex-grow italic">
                    &ldquo;{t.content || t.message || t.review}&rdquo;
                  </p>

                  <div className="flex items-center gap-3.5 pt-5 border-t border-white/[.05]">
                    <div className="w-10 h-10 rounded-full bg-[#E3510F]/12 flex items-center justify-center flex-shrink-0 border border-[#E3510F]/20 overflow-hidden">
                      {t.image
                        ? <Image src={t.image} alt={t.name} width={40} height={40} className="object-cover w-full h-full"/>
                        : <span className="text-[#E3510F] font-bold text-sm">{(t.name||'C')[0]}</span>
                      }
                    </div>
                    <div>
                      <div className="text-[#F0F2F5] font-semibold text-[.88rem]">{t.name}</div>
                      {t.designation && <div className="text-[#5A6478] text-xs">{t.designation}</div>}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testimonial-dots flex justify-center gap-2 mt-2"/>
        </div>
      )}
    </section>
  );
}
