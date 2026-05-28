'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css'; import 'swiper/css/pagination';

export default function InfrastructureGallerySections({ sections=[] }) {
  if (!sections?.length) return null;

  // Override images for "Brake Pads and Brake Blocks Production" or "Our Production Units" section
  const enhancedSections = sections.map(section => {
    const isBrakeProduction = section.title?.toLowerCase().includes('brake pads') || section.title?.toLowerCase().includes('brake blocks');
    const isRMPUDevelopment = section.title?.toLowerCase().includes('rmpu') && (section.title?.toLowerCase().includes('development') || section.title?.toLowerCase().includes('testing'));
    const isAssemblyQC = section.title?.toLowerCase().includes('assembly') || section.title?.toLowerCase().includes('qc') || section.title?.toLowerCase().includes('testing');
    const isProductionUnits = section.title?.toLowerCase().includes('production units');
    
    if (isBrakeProduction) {
      return {
        ...section,
        images: [
          { image: '/images/infra/brake/image1.jpg', caption: 'Brake Production 1' },
          { image: '/images/infra/brake/image2.jpg', caption: 'Brake Production 2' },
          { image: '/images/infra/brake/image3.jpg', caption: 'Brake Production 3' },
          { image: '/images/infra/brake/image4.jpg', caption: 'Brake Production 4' },
          { image: '/images/infra/brake/image5.jpg', caption: 'Brake Production 5' },
          { image: '/images/infra/brake/image6.jpg', caption: 'Brake Production 6' },
          { image: '/images/infra/brake/image7.jpg', caption: 'Brake Production 7' },
          { image: '/images/infra/brake/image8.jpg', caption: 'Brake Production 8' }
        ]
      };
    }

    if (isRMPUDevelopment) {
      return {
        ...section,
        images: [
          { image: '/images/infra/rmpu-testing/image1.jpg', caption: 'RMPU Testing 1' },
          { image: '/images/infra/rmpu-testing/image2.jpg', caption: 'RMPU Testing 2' },
          { image: '/images/infra/rmpu-testing/image3.jpg', caption: 'RMPU Testing 3' },
          { image: '/images/infra/rmpu-testing/image4.jpg', caption: 'RMPU Testing 4' },
          { image: '/images/infra/rmpu-testing/image5.jpg', caption: 'RMPU Testing 5' },
          { image: '/images/infra/rmpu-testing/image6.jpg', caption: 'RMPU Testing 6' },
          { image: '/images/infra/rmpu-testing/image7.jpg', caption: 'RMPU Testing 7' },
          { image: '/images/infra/rmpu-testing/image8.jpg', caption: 'RMPU Testing 8' }
        ]
      };
    }

    if (isAssemblyQC) {
      return {
        ...section,
        images: [
          { image: '/images/infra/assembly/image1.jpg', caption: 'Assembly & QC 1' },
          { image: '/images/infra/assembly/image2.jpg', caption: 'Assembly & QC 2' },
          { image: '/images/infra/assembly/image3.jpg', caption: 'Assembly & QC 3' },
          { image: '/images/infra/assembly/image4.jpg', caption: 'Assembly & QC 4' },
          { image: '/images/infra/assembly/image5.jpg', caption: 'Assembly & QC 5' },
          { image: '/images/infra/assembly/image6.jpg', caption: 'Assembly & QC 6' },
          { image: '/images/infra/assembly/image7.jpg', caption: 'Assembly & QC 7' },
          { image: '/images/infra/assembly/image8.jpg', caption: 'Assembly & QC 8' },
          { image: '/images/infra/assembly/image9.jpg', caption: 'Assembly & QC 9' }
        ]
      };
    }
    
    if (isProductionUnits) {
      return {
        ...section,
        images: [
          { image: '/images/infra/production/image1.jpg', caption: 'Production Unit 1' },
          { image: '/images/infra/production/image2.jpg', caption: 'Production Unit 2' },
          { image: '/images/infra/production/image3.jpg', caption: 'Production Unit 3' },
          { image: '/images/infra/production/image4.png', caption: 'Production Unit 4' },
          { image: '/images/infra/production/image5.jpg', caption: 'Production Unit 5' },
          { image: '/images/infra/production/image6.jpg', caption: 'Production Unit 6' },
          { image: '/images/infra/production/image7.jpg', caption: 'Production Unit 7' },
          { image: '/images/infra/production/image8.jpg', caption: 'Production Unit 8' }
        ]
      };
    }

    if (section.title?.toLowerCase().includes('precision machining')) {
      return {
        ...section,
        images: [
          { image: '/images/infra/precision-machining/image1.jpg', caption: 'Machining Center 1' },
          { image: '/images/infra/precision-machining/image2.jpg', caption: 'Machining Center 2' },
          { image: '/images/infra/precision-machining/image3.jpg', caption: 'Machining Center 3' },
          { image: '/images/infra/precision-machining/image4.jpg', caption: 'Machining Center 4' },
          { image: '/images/infra/precision-machining/image5.jpg', caption: 'Machining Center 5' },
          { image: '/images/infra/precision-machining/image6.jpg', caption: 'Machining Center 6' },
          { image: '/images/infra/precision-machining/image7.jpg', caption: 'Machining Center 7' }
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
