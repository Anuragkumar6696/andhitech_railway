'use client';

import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Head from "next/head";
import { motion } from 'framer-motion';
import { ArrowRight, Search, Filter } from 'lucide-react';
import { getAbsoluteURL } from "@/utils/url";

export async function getServerSideProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    const [productsRes, logosRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/client-logos/`)
    ]);

    const productsData = await productsRes.json();
    const logosData = await logosRes.json();

    const products = Array.isArray(productsData) ? productsData : productsData.results || [];
    const clientLogos = Array.isArray(logosData) ? logosData : logosData.results || [];

    return {
      props: {
        products,
        clientLogos
      }
    };
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return {
      props: {
        products: [],
        clientLogos: []
      }
    };
  }
}

export default function Products({ products }) {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Products & Services | AND Hitech</title>
        <meta name="description" content="Explore our premium industrial products and services for railways and beyond." />
      </Head>

      <Header />
      
      <PageBanner
        title="Products & Services"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Products & Services"
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Our Solutions</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight">
                  High-Performance Components for <span className="text-brand-orange">Critical Infrastructure</span>
                </h2>
              </motion.div>
            </div>
            <div className="lg:col-span-4">
              <p className="text-gray-500 text-lg italic leading-relaxed border-l-4 border-brand-orange pl-6">
                "At AHIL, we specialize in manufacturing high-performance components designed for safety, efficiency, and reliability."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.icon}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {product.category?.name || 'Engineering'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {product.content?.replace(/<[^>]*>/g, "") || "Precision engineered component designed for maximum efficiency and long-term reliability in industrial applications."}
                  </p>
                  
                  <Link 
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center text-brand-dark font-bold text-sm uppercase tracking-wider group/link"
                  >
                    <span>View Details</span>
                    <div className="ml-3 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover/link:bg-brand-orange group-hover/link:border-brand-orange group-hover/link:text-white transition-all duration-300">
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
