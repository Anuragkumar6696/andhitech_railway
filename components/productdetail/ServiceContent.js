'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css'; import 'swiper/css/navigation'; import 'swiper/css/pagination';

export default function ServiceContent({ product }) {
  if (!product) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-2 border-[#E3510F] border-t-transparent rounded-full animate-spin" /></div>;
  const images = product.images?.length > 0 ? product.images : product.image ? [{id:'f',image:product.image}] : [];

  return (
    <div className="space-y-12">
      {images.length > 0 && (
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="relative rounded-2xl overflow-hidden bg-[#0D1117] border border-white/6">
          <Swiper modules={[Navigation,Pagination,Autoplay]} navigation pagination={{ clickable:true }} autoplay={{ delay:5000 }}
            className="aspect-[16/9] md:aspect-[21/9]">
            {images.map(img => (
              <SwiperSlide key={img.id}>
                <div className="relative w-full h-full">
                  <Image src={img.image||'/images/agriculture.jpg'} alt={img.alt_text||product.title} fill className="object-contain p-8 md:p-12" priority />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="space-y-6">
        <span className="eyebrow block">Product Overview</span>
        <h2 className="text-[#F0F2F5] font-bold leading-tight" style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.8rem,3vw,2.6rem)'}}>About {product.title}</h2>
        <div className="text-[#9BA5B4] leading-relaxed space-y-5 text-[15px] prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html:product.description||product.content||'Product information coming soon.' }} />
      </motion.div>
    </div>
  );
}
