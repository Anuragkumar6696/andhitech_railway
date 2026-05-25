'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function InfrastructureGallerySections({ sections = [] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <section className="py-20 bg-[#f9f8f6]">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="section-label mb-5"><span>Facility Gallery</span></div>
          <h2 className="section-heading max-w-xl">
            Our <span>Manufacturing Facilities</span>
          </h2>
        </motion.div>

        <div className="space-y-16">
          {sections.map((section, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sIdx * 0.1, duration: 0.7 }}
            >
              {section.title && (
                <h3
                  className="text-xl font-bold text-[#1a1a1a] mb-7 flex items-center gap-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="w-8 h-[2px] bg-brand-orange block" />
                  {section.title}
                </h3>
              )}

              {section.images?.length > 0 && (
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="!pb-10"
                >
                  {section.images.map((img, iIdx) => (
                    <SwiperSlide key={iIdx}>
                      <div className="relative h-56 rounded-xl overflow-hidden group">
                        <Image
                          src={img.image}
                          alt={img.caption || `Gallery ${iIdx + 1}`}
                          fill
                          className="object-cover group-hover:scale-[1.05] transition-transform duration-600"
                          unoptimized
                        />
                        {img.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0e0e0e]/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs font-semibold">{img.caption}</p>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
