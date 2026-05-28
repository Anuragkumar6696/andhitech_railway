'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css'; import 'swiper/css/navigation'; import 'swiper/css/pagination'; import 'swiper/css/effect-fade';

export default function ServiceContent({ product }) {
  if (!product) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-2 border-[#E3510F] border-t-transparent rounded-full animate-spin" /></div>;
  
  // Asset Overrides based on slug
  let images = product.images?.length > 0 ? product.images : product.image ? [{id:'f',image:product.image}] : [];
  
  const slug = (product.slug || '').toLowerCase();
  const isIVCoupler = slug.includes('iv-coupler');
  const isAirSuspension = slug.includes('air-suspension');
  const isRMPU = slug.includes('roof-mounted-package-unit') || slug.includes('rmpu');
  
  if (isIVCoupler) {
    images = [
      { id: 'iv2_v2', image: '/images/products/iv-coupler-v2/iv-2.jpg', alt_text: 'IV Coupler New 2' },
      { id: 'iv3_v2', image: '/images/products/iv-coupler-v2/iv-3.jpg', alt_text: 'IV Coupler New 3' },
      { id: 'iv_final', image: '/images/products/iv-coupler-v2/iv-final.png', alt_text: 'IV Coupler Final' }
    ];
  } else if (isAirSuspension) {
    images = [
      { id: 'as1_v2', image: '/images/products/air-suspension-v2/as-1.jpg', alt_text: 'Air Suspension New 1' },
      { id: 'as2_v2', image: '/images/products/air-suspension-v2/as-2.jpg', alt_text: 'Air Suspension New 2' },
      { id: 'as3_v2', image: '/images/products/air-suspension-v2/as-3.png', alt_text: 'Air Suspension New 3' },
      { id: 'as4_v2', image: '/images/products/air-suspension-v2/as-4.jpg', alt_text: 'Air Suspension New 4' }
    ];
  } else if (isRMPU) {
    images = [
      { id: 'rmpu1', image: '/images/products/rmpu-21.jpg', alt_text: 'RMPU Main Layout' }
    ];
  } else if (slug.includes('axle-mounted-brake-disc')) {
    images = [
      { id: 'br1_v2', image: '/images/products/axle-brake-v2/br-1.jpg', alt_text: 'Axle Brake New 1' },
      { id: 'br2_v2', image: '/images/products/axle-brake-v2/br-2.jpg', alt_text: 'Axle Brake New 2' },
      { id: 'br3_v2', image: '/images/products/axle-brake-v2/br-3.jpg', alt_text: 'Axle Brake New 3' },
      { id: 'br4_v2', image: '/images/products/axle-brake-v2/br-4.jpg', alt_text: 'Axle Brake New 4' },
      { id: 'br5_v2', image: '/images/products/axle-brake-v2/br-5.jpg', alt_text: 'Axle Brake New 5' }
    ];
  } else if (slug.includes('wheel-mounted-brake-disc-vande-bharat')) {
    images = [
      { id: 'vb1', image: '/images/products/wm-vb/vb-1.jpg', alt_text: 'Vande Bharat Brake 1' },
      { id: 'vb2', image: '/images/products/wm-vb/vb-2.jpg', alt_text: 'Vande Bharat Brake 2' },
      { id: 'vb3', image: '/images/products/wm-vb/vb-3.jpg', alt_text: 'Vande Bharat Brake 3' }
    ];
  } else if (slug.includes('single-leaf-plug-door-vande-bharat-trains')) {
    images = [
      { id: 'vb_door1', image: '/images/products/vande-bharat-door/image1.jpg', alt_text: 'Vande Bharat Door 1' },
      { id: 'vb_door2', image: '/images/products/vande-bharat-door/image2.jpg', alt_text: 'Vande Bharat Door 2' },
      { id: 'vb_door3', image: '/images/products/vande-bharat-door/image3.jpg', alt_text: 'Vande Bharat Door 3' },
      { id: 'vb_door4', image: '/images/products/vande-bharat-door/image4.jpg', alt_text: 'Vande Bharat Door 4' },
      { id: 'vb_door5', image: '/images/products/vande-bharat-door/image5.jpg', alt_text: 'Vande Bharat Door 5' }
    ];
  } else if (slug.includes('pantograph')) {
    images = [
      { id: 'panto1', image: '/images/products/pantograph/image1.jpg', alt_text: 'Pantograph 1' },
      { id: 'panto2', image: '/images/products/pantograph/image2.jpg', alt_text: 'Pantograph 2' },
      { id: 'panto3', image: '/images/products/pantograph/image3.jpg', alt_text: 'Pantograph 3' },
      { id: 'panto4', image: '/images/products/pantograph/image4.jpg', alt_text: 'Pantograph 4' }
    ];
  } else if (slug.includes('wheel-mounted-brake-disc-delhi-metro')) {
    images = [
      { id: 'dm_brake1', image: '/images/products/delhi-metro-brake/image1.jpg', alt_text: 'Delhi Metro Brake 1' },
      { id: 'dm_brake2', image: '/images/products/delhi-metro-brake/image2.jpg', alt_text: 'Delhi Metro Brake 2' },
      { id: 'dm_brake3', image: '/images/products/delhi-metro-brake/image3.jpg', alt_text: 'Delhi Metro Brake 3' },
      { id: 'dm_brake4', image: '/images/products/delhi-metro-brake/image4.jpg', alt_text: 'Delhi Metro Brake 4' },
      { id: 'dm_brake5', image: '/images/products/delhi-metro-brake/image5.jpg', alt_text: 'Delhi Metro Brake 5' }
    ];
  } else if (slug.includes('split-axle-mounted-brake-disc')) {
    images = [
      { id: 'split1', image: '/images/products/split-brake/split-1.jpg', alt_text: 'Split Brake 1' },
      { id: 'split2', image: '/images/products/split-brake/split-2.jpg', alt_text: 'Split Brake 2' },
      { id: 'split3', image: '/images/products/split-brake/split-3.jpg', alt_text: 'Split Brake 3' }
    ];
  } else if (slug.includes('brake-pads')) {
    images = [
      { id: 'pad1', image: '/images/products/brake-pads/pad-1.jpg', alt_text: 'Brake Pad 1' },
      { id: 'pad2', image: '/images/products/brake-pads/pad-2.jpg', alt_text: 'Brake Pad 2' },
      { id: 'pad3', image: '/images/products/brake-pads/pad-3.jpg', alt_text: 'Brake Pad 3' }
    ];
  } else if (slug.includes('lhb-dampers')) {
    images = [
      { id: 'damp1', image: '/images/products/lhb-dampers/damper-1.jpg', alt_text: 'LHB Damper 1' },
      { id: 'damp2', image: '/images/products/lhb-dampers/damper-2.jpg', alt_text: 'LHB Damper 2' }
    ];
  }

  return (
    <div className="space-y-12">
      {images.length > 0 && (
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="relative rounded-2xl overflow-hidden bg-[#0D1117] border border-white/6">
          <Swiper 
            modules={[Navigation,Pagination,Autoplay,EffectFade]} 
            navigation 
            pagination={{ clickable:true }} 
            autoplay={{ delay:5000 }}
            effect={isRMPU ? "fade" : undefined}
            fadeEffect={isRMPU ? { crossFade: true } : undefined}
            className="aspect-[16/9] md:aspect-[21/9]">
            {images.map(img => (
              <SwiperSlide key={img.id}>
                <div className="relative w-full h-full">
                  <Image 
                    src={img.image||'/images/agriculture.jpg'} 
                    alt={img.alt_text||product.title} 
                    fill 
                    className={`object-contain ${isRMPU ? 'p-0' : 'p-8 md:p-12'}`} 
                    priority 
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="space-y-6">
        <span className="eyebrow block">Product Overview</span>
        <h2 className="text-[#F0F2F5] font-bold leading-tight" style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.8rem,3vw,2.6rem)'}}>About {product.title}</h2>
        <div className="text-[#8C98AA] leading-relaxed space-y-5 text-[15px] prose prose-invert max-w-none 
          prose-p:text-[#8C98AA] prose-headings:text-white prose-strong:text-[#E3510F] prose-li:text-[#8C98AA]"
          dangerouslySetInnerHTML={{ __html:product.description||product.content||'Product information coming soon.' }} />
      </motion.div>
    </div>
  );
}
