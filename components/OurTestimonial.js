'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

export default function OurTestimonial({ initialData }) {
  const [testimonials, setTestimonials] = useState(initialData?.testimonials || []);
  const [clientLogos, setClientLogos] = useState(initialData?.clientLogos || []);

  useEffect(() => {
    if (initialData?.testimonials && initialData?.clientLogos) return;
    fetch('/api/proxy/testimonials')
      .then(r => r.json())
      .then(d => setTestimonials(d.results || []))
      .catch(e => console.error(e));
    fetch('/api/proxy/client-logos')
      .then(r => r.json())
      .then(d => setClientLogos(d.results || []))
      .catch(e => console.error(e));
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

        {/* ── Client Logos ── */}
        {clientLogos.length > 0 && (
          <div className="mb-20 pb-16 border-b border-[#ede9e4]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span
                className="text-[#bbb] text-[11px] uppercase tracking-[0.25em] font-bold"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Trusted by Industry Leaders
              </span>
            </motion.div>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop
              spaceBetween={48}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
              }}
              className="flex items-center"
            >
              {clientLogos.map((logo) => (
                <SwiperSlide key={logo.id}>
                  <div className="flex justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <Image
                      src={logo.image}
                      alt={logo.name || 'Client'}
                      width={120}
                      height={56}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* ── Testimonials ── */}
        {testimonials.length > 0 && (
          <div>
            <div className="flex flex-col lg:flex-row justify-between items-end mb-14 gap-6">
              <div>
                <div className="section-label mb-5">
                  <span>What Clients Say</span>
                </div>
                <h2 className="section-heading max-w-lg">
                  Trusted by <span>Industry Leaders</span>
                </h2>
              </div>
            </div>

            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: '.pagination-testimonial' }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              className="!pb-14"
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={t.id || idx}>
                  <div className="h-full bg-[#f9f8f6] rounded-2xl p-8 border border-[#ede9e4] hover:shadow-lg hover:border-brand-orange/15 transition-all duration-400 flex flex-col group">
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-brand-orange text-brand-orange" />
                      ))}
                    </div>

                    {/* Quote icon */}
                    <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center mb-5 group-hover:bg-brand-orange transition-colors duration-400">
                      <Quote size={16} className="text-brand-orange group-hover:text-white transition-colors" />
                    </div>

                    <p className="text-[#555] text-sm leading-relaxed mb-7 flex-grow italic">
                      "{t.content || t.message || t.review}"
                    </p>

                    <div className="flex items-center gap-3 pt-5 border-t border-[#ede9e4]">
                      {t.image ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-orange flex-shrink-0">
                          <Image
                            src={t.image}
                            alt={t.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-orange/15 flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-orange font-bold text-sm">
                            {(t.name || 'C').charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-[#1a1a1a] font-bold text-sm"
                          style={{ fontFamily: 'var(--font-display)' }}>
                          {t.name}
                        </div>
                        {t.designation && (
                          <div className="text-[#aaa] text-[12px]">{t.designation}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="pagination-testimonial flex justify-center gap-2 mt-2" />
          </div>
        )}
      </div>
    </section>
  );
}
