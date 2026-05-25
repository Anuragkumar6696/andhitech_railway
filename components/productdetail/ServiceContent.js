'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { getAbsoluteURL } from '@/utils/url';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ServiceContent({ product }) {
  if (!product) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : product.image
      ? [{ id: 'featured', image: product.image }]
      : [];

  return (
    <div className="space-y-12">

      {/* Product Gallery */}
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden bg-[#f9f8f6] border border-[#ede9e4]"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="aspect-[16/9] md:aspect-[21/9]"
          >
            {images.map((img) => (
              <SwiperSlide key={img.id}>
                <div className="relative w-full h-full group">
                  <Image
                    src={img.image || '/images/agriculture.jpg'}
                    alt={img.alt_text || product.title}
                    fill
                    className="object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-[1.03]"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}

      {/* Product Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="section-label mb-2"><span>Product Overview</span></div>
        <h2
          className="font-extrabold text-[#1a1a1a] leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.7rem, 3vw, 2.6rem)',
            letterSpacing: '-0.02em',
          }}
        >
          About {product.title}
        </h2>
        {/* Prose content */}
        <div
          className="text-[#555] leading-relaxed space-y-5 text-[15px] prose prose-headings:font-bold prose-headings:text-[#1a1a1a] prose-a:text-brand-orange prose-strong:text-[#1a1a1a] max-w-none"
          style={{ fontFamily: 'var(--font-sans)' }}
          dangerouslySetInnerHTML={{
            __html: product.description || product.content || 'Detailed information about this product will be available soon.',
          }}
        />
      </motion.div>
    </div>
  );
}
