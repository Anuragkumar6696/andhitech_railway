'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function getExcerpt(html, wordCount = 18) {
  if (!html) return '';
  const text = html.replace(/<[^>]*>/g, '');
  return text.split(' ').slice(0, wordCount).join(' ') + '…';
}

export default function Services({ initialData }) {
  const [products, setProducts] = useState(initialData || []);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData && initialData.length > 0) return;
    async function fetchProducts() {
      try {
        const res = await fetch('/api/proxy/products');
        const data = await res.json();
        setProducts(data.results);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#0e0e0e] overflow-hidden relative">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="section-label section-label-light mb-5">
              <span>Our Expertise</span>
            </div>
            <h2
              className="font-extrabold text-white leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Precision Engineering for <br />
              <span className="text-brand-orange">Critical Applications</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Custom nav buttons */}
            <button className="swiper-prev-svc w-11 h-11 rounded-lg border border-white/15 flex items-center justify-center text-white/60 hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-250">
              <ChevronLeft size={20} />
            </button>
            <button className="swiper-next-svc w-11 h-11 rounded-lg border border-white/15 flex items-center justify-center text-white/60 hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-250">
              <ChevronRight size={20} />
            </button>
            <Link
              href="/products"
              className="btn-ghost flex items-center gap-2 group"
            >
              <span>View All</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Swiper */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{ prevEl: '.swiper-prev-svc', nextEl: '.swiper-next-svc' }}
            pagination={{ clickable: true, el: '.swiper-pagination-svc' }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!pb-14"
          >
            {products.map((product, idx) => (
              <SwiperSlide key={product.id}>
                <div className="group card-dark h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={product.icon}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
                    {/* Category badge */}
                    <div className="absolute bottom-4 left-4">
                      <span
                        className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm"
                        style={{ fontFamily: 'var(--font-label)' }}
                      >
                        {product.category?.name || (typeof product.category === 'string' ? product.category : 'Engineering')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3
                      className="text-[17px] font-bold text-white mb-3 group-hover:text-brand-orange transition-colors leading-snug"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-white/40 text-[13px] leading-relaxed mb-6 flex-grow">
                      {getExcerpt(product.description || product.content)}
                    </p>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center gap-2 text-brand-orange font-bold text-[12px] uppercase tracking-wider group/link"
                      style={{ fontFamily: 'var(--font-label)' }}
                    >
                      <span>Explore Details</span>
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Pagination */}
        <div className="swiper-pagination-svc flex justify-center gap-2 mt-2" />
      </div>
    </section>
  );
}
