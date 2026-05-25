'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { getAbsoluteURL } from '@/utils/url';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ServiceContent({ product }) {
  if (!product) {
    return <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : (product.image ? [{ id: 'featured', image: product.image }] : []);

  return (
    <div className="space-y-12">
      {/* Product Gallery */}
      {images.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100"
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
                    className="object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105"
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
        className="prose prose-lg max-w-none prose-headings:text-brand-dark prose-headings:font-bold prose-p:text-gray-600 prose-a:text-brand-orange"
      >
        <div className="flex items-center mb-6">
          <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Product Overview</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-8">
          About {product.title}
        </h2>
        <div 
          className="leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: product.description || product.content || 'Detailed information about this product will be available soon.' }} 
        />
      </motion.div>

      {/* Specifications / Features Grid (if data exists) */}
      {product.features && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Custom feature rendering logic could go here */}
        </div>
      )}
    </div>
  );
}
