'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight, Box, ShieldCheck, Zap } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function getExcerpt(html, wordCount = 15) {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, "");
  return text.split(" ").slice(0, wordCount).join(" ") + "...";
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
    <section className="py-24 bg-brand-dark overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center mb-4"
            >
              <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Our Expertise</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
            >
              Precision Engineering for <br />
              <span className="text-brand-orange text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-400">Critical Applications</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:mb-2"
          >
            <Link href="/products" className="btn-outline border-white/20 text-white hover:bg-white hover:text-brand-dark group">
              View All Products
              <ArrowRight className="ml-2 inline group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative group/swiper">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!pb-16"
            >
              {products.map((product, idx) => (
                <SwiperSlide key={product.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col hover:bg-white/10 transition-all duration-500 hover:border-brand-orange/50"
                  >
                    <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                      <Image
                        src={product.icon}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          {product.category?.name || (typeof product.category === 'string' ? product.category : 'Engineering')}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                      {getExcerpt(product.description || product.content)}
                    </p>
                    
                    <Link 
                      href={`/products/${product.slug}`}
                      className="flex items-center text-brand-orange font-bold text-sm uppercase tracking-wider group/link"
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" size={16} />
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="hidden lg:block">
              <button className="swiper-button-prev-custom absolute top-1/2 -left-16 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all z-20">
                <ArrowRight className="rotate-180" size={20} />
              </button>
              <button className="swiper-button-next-custom absolute top-1/2 -right-16 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all z-20">
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Custom Pagination */}
            <div className="swiper-pagination-custom flex justify-center mt-8 gap-2"></div>
          </div>
        )}
      </div>
    </section>
  );
}
