'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function PostLists({ posts }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.featured_image || "/images/blog-1.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    {post.category?.name || (typeof post.category === 'string' ? post.category : 'Industry')}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} className="text-brand-orange" />
                    <span>{post.date_published}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User size={14} className="text-brand-orange" />
                    <span>{post.author || 'Admin'}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt || "Discover the latest insights and trends in industrial engineering and technology solutions."}
                </p>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-brand-dark font-bold text-sm uppercase tracking-wider group/link"
                >
                  <span>Read Article</span>
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
  );
}
