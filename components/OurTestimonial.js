'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Quote, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function OurTestimonial({ initialData }) {
  const [testimonials, setTestimonials] = useState(initialData?.testimonials || []);
  const [clientLogos, setClientLogos] = useState(initialData?.clientLogos || []);

  useEffect(() => {
    if (initialData?.testimonials && initialData?.clientLogos) return;

    fetch('/api/proxy/testimonials')
      .then((res) => res.json())
      .then((data) => setTestimonials(data.results || []))
      .catch((err) => console.error('Failed to fetch testimonials:', err));

    fetch('/api/proxy/client-logos')
      .then((res) => res.json())
      .then((data) => setClientLogos(data.results || []))
      .catch((err) => console.error('Failed to fetch client logos:', err));
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Client Logos Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-bold">Trusted by Industry Leaders</span>
          </motion.div>
          
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            spaceBetween={50}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            className="flex items-center"
          >
            {clientLogos.length > 0 ? clientLogos.map((logo) => (
              <SwiperSlide key={logo.id}>
                <div className="flex justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <Image src={logo.image} alt={logo.name || 'Client'} width={120} height={60} className="h-12 w-auto object-contain" />
                </div>
              </SwiperSlide>
            )) : (
              // Fallback/Mock logos if none fetched
              [1, 2, 3, 4, 5, 6].map((i) => (
                <SwiperSlide key={i}>
                  <div className="flex justify-center grayscale opacity-30 hover:opacity-100 transition-all">
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Client Testimonials</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-8">
                What Our Partners <span className="text-brand-orange">Say About Us</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                We take pride in building long-lasting relationships with our clients through consistent quality and engineering excellence.
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                      <Image src={`/images/author-${i}.jpg`} alt="User" width={40} height={40} className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold text-brand-dark">500+ Satisfied Clients</div>
                  <div className="text-gray-500 flex items-center">
                    <Star size={12} className="text-brand-orange fill-current" />
                    <Star size={12} className="text-brand-orange fill-current" />
                    <Star size={12} className="text-brand-orange fill-current" />
                    <Star size={12} className="text-brand-orange fill-current" />
                    <Star size={12} className="text-brand-orange fill-current" />
                    <span className="ml-1 font-bold">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Testimonial Slider */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-3xl" />
            
            <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 relative z-10">
              <Quote className="text-brand-orange/20 absolute top-10 right-10" size={80} />
              
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                pagination={{ clickable: true, el: '.testimonial-pagination' }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                className="pb-12"
              >
                {testimonials.length > 0 ? testimonials.map((t) => (
                  <SwiperSlide key={t.id}>
                    <div className="space-y-6">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < (t.rating || 5) ? "text-brand-orange fill-current" : "text-gray-300"} />
                        ))}
                      </div>
                      <p className="text-xl md:text-2xl text-brand-dark font-medium italic leading-relaxed">
                        &quot;{t.message}&quot;
                      </p>
                      <div className="flex items-center space-x-4 pt-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-orange/20">
                          <Image src={t.image || "/images/author-1.jpg"} alt={t.name} width={56} height={56} className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-dark">{t.name}</h4>
                          <p className="text-gray-500 text-sm uppercase tracking-wider">{t.designation}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )) : (
                  <SwiperSlide>
                    <div className="space-y-6">
                      <p className="text-xl text-gray-400 italic">No testimonials available yet.</p>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
              
              <div className="testimonial-pagination flex mt-4"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
