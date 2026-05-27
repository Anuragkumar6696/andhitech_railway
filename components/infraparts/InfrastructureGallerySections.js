'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css'; import 'swiper/css/pagination';

export default function InfrastructureGallerySections({ sections=[] }) {
  if (!sections?.length) return null;

  // Override images for "Brake Pads and Brake Blocks Production" section
  const enhancedSections = sections.map(section => {
    const isBrakeProduction = section.title?.toLowerCase().includes('brake pads') || section.title?.toLowerCase().includes('brake blocks');
    if (isBrakeProduction) {
      return {
        ...section,
        images: [
          { image: '/images/infra/infra-1.jpg', caption: 'Brake Production 1' },
          { image: '/images/infra/infra-2.jpg', caption: 'Brake Production 2' },
          { image: '/images/infra/infra-3.jpg', caption: 'Brake Production 3' },
          { image: '/images/infra/infra-4.jpg', caption: 'Brake Production 4' },
          { image: '/images/infra/infra-5.png', caption: 'Brake Production 5' },
          { image: '/images/infra/infra-6.jpg', caption: 'Brake Production 6' }
        ]
      };
    }
    return section;
  });

  return (
    <section className="py-20 bg-[#07080C] relative">
      <div className="absolute inset-0 bg-grid-eng opacity-30 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-14">
          <span className="eyebrow mb-5 block">Facility Gallery</span>
          <h2 className="display-md max-w-xl">Our <span style={{color:'#E3510F'}}>Manufacturing Facilities</span></h2>
        </motion.div>
        <div className="space-y-16">
          {enhancedSections.map((section, si) => (
            <motion.div key={si} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              {section.title && <h3 className="text-[#F0F2F5] font-semibold text-lg mb-7 flex items-center gap-3"><span className="accent-line" />{section.title}</h3>}
              {section.images?.length > 0 && (
                <Swiper modules={[Navigation,Pagination,Autoplay]} autoplay={{ delay:4000 }} pagination={{ clickable:true }}
                  spaceBetween={16} slidesPerView={1} breakpoints={{ 640:{slidesPerView:2}, 1024:{slidesPerView:3} }} className="!pb-10">
                  {section.images.map((img, ii) => (
                    <SwiperSlide key={ii}>
                      <div className="relative h-56 rounded-xl overflow-hidden border border-white/6 group">
                        <Image src={img.image} alt={img.caption||`Gallery ${ii+1}`} fill
                          className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.05] transition-all duration-500" unoptimized />
                        {img.caption && <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#07080C]/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity"><p className="text-[#F0F2F5] text-xs font-medium">{img.caption}</p></div>}
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
