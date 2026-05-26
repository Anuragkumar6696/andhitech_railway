'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getAbsoluteURL } from '@/utils/url';

const strip = (html, n = 22) =>
  (html || '').replace(/<[^>]*>/g, '').split(' ').slice(0, n).join(' ') + '…';

const ease = [.22, 1, .36, 1];

export default function Services({ initialData }) {
  const [products, setProducts] = useState(initialData || []);
  const [loading,  setLoading]  = useState(!initialData);

  useEffect(() => {
    if (initialData?.length) return;
    fetch('/api/proxy/products')
      .then(r => r.json())
      .then(d => { setProducts(d.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#0D1117] py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-55"/>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E3510F]/30 to-transparent"/>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[.04] to-transparent"/>

      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.7, ease }}
          >
            <span className="eyebrow mb-6 block">Featured Products</span>
            <h2 className="display-md">Precision-Engineered for<br/><span style={{ color:'#E3510F' }}>Critical Infrastructure</span></h2>
          </motion.div>

          <motion.div
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} className="flex items-center gap-4"
          >
            <div className="flex gap-2">
              <button className="swiper-products-prev w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-[#9BA5B4] hover:border-[#E3510F] hover:text-[#E3510F] transition-colors">
                <ChevronLeft size={16}/>
              </button>
              <button className="swiper-products-next w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-[#9BA5B4] hover:border-[#E3510F] hover:text-[#E3510F] transition-colors">
                <ChevronRight size={16}/>
              </button>
            </div>
            <Link href="/products" className="btn-wire py-3 px-7 text-xs group flex items-center gap-2">
              <span>All Products</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </motion.div>
        </div>

        {/* Skeleton loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="cell h-80 animate-pulse bg-white/[.03]"/>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{ prevEl:'.swiper-products-prev', nextEl:'.swiper-products-next' }}
            pagination={{ clickable:true, el:'.products-dots' }}
            autoplay={{ delay:6000, disableOnInteraction:false }}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{ 640:{ slidesPerView:2 }, 1024:{ slidesPerView:3 } }}
            className="!pb-14"
          >
            {products.map((p, i) => (
              <SwiperSlide key={p.id}>
                <motion.div
                  initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ delay:(i % 3) * .09, duration:.65, ease }}
                >
                  <div className="pcard group flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden flex-shrink-0">
                      <Image
                        src={p.icon ? getAbsoluteURL(p.icon) : '/images/placeholder.jpg'}
                        alt={p.title} fill
                        className="object-cover opacity-70 group-hover:opacity-95 group-hover:scale-[1.06] transition-all duration-700"
                        unoptimized
                      />
                      <div className="absolute inset-0" style={{ background:'linear-gradient(to top,#0D1117 0%,transparent 55%)' }}/>
                      {/* Category chip */}
                      <div className="absolute top-4 left-4">
                        <span
                          className="text-white text-[.58rem] font-mono font-medium uppercase tracking-[.14em] px-3 py-1.5 bg-[#E3510F]"
                          style={{ clipPath:'polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))' }}
                        >
                          {p.category?.name || 'Engineering'}
                        </span>
                      </div>
                      {/* Arrow icon on hover */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 rounded-full bg-[#E3510F] flex items-center justify-center shadow-lg">
                          <ArrowUpRight size={13} className="text-white"/>
                        </div>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="p-7 flex flex-col flex-grow">
                      <h3 className="text-[#F0F2F5] font-semibold text-[.96rem] mb-3 leading-snug group-hover:text-[#E3510F] transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="text-[#5A6478] text-[.82rem] leading-relaxed mb-6 flex-grow">
                        {strip(p.description || p.content)}
                      </p>
                      <Link
                        href={`/products/${p.slug}`}
                        className="flex items-center gap-2 text-[.62rem] font-mono uppercase tracking-[.14em] text-[#9BA5B4] hover:text-[#E3510F] transition-colors group/link pt-5 border-t border-white/[.05]"
                      >
                        <span>Explore Details</span>
                        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform"/>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="products-dots flex justify-center gap-2 mt-1"/>
      </div>
    </section>
  );
}
