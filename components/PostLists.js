'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function PostLists({ posts }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

        {posts.length > 0 && (
          <div className="mb-14">
            <div className="section-label mb-5"><span>Insights &amp; News</span></div>
            <h2 className="section-heading max-w-xl">
              Latest from <span>Our Blog</span>
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.08, duration: 0.65 }}
              className="group card-premium flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.featured_image || '/images/blog-1.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-700"
                />
                {/* Category tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    {post.category?.name || (typeof post.category === 'string' ? post.category : 'Industry')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-grow">
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#bbb]"
                    style={{ fontFamily: 'var(--font-label)' }}>
                    <Calendar size={12} className="text-brand-orange" />
                    {post.date_published || '—'}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#bbb]"
                    style={{ fontFamily: 'var(--font-label)' }}>
                    <User size={12} className="text-brand-orange" />
                    {post.author || 'Admin'}
                  </span>
                </div>

                <h3
                  className="text-[18px] font-bold text-[#1a1a1a] mb-4 group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-[#777] text-sm leading-relaxed mb-7 line-clamp-3 flex-grow">
                  {post.excerpt || 'Discover the latest insights and trends in industrial engineering and technology solutions.'}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-brand-orange font-bold text-[12px] uppercase tracking-wider group/link pt-5 border-t border-[#ede9e4]"
                  style={{ fontFamily: 'var(--font-label)' }}
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
