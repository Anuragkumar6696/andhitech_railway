'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function PostLists({ posts }) {
  return (
    <section className="py-24 md:py-32 bg-[#07080C] relative">
      <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        {posts.length > 0 && (
          <div className="mb-14">
            <span className="eyebrow mb-5 block">Insights & News</span>
            <h2 className="display-md max-w-xl">Latest from <span style={{color:'#E3510F'}}>Our Blog</span></h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.article key={post.slug} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:(i%6)*0.08 }}
              className="product-card flex flex-col h-full group">
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <Image src={post.featured_image||'/images/blog-1.jpg'} alt={post.title} fill
                  className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.06] transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080C]/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#E3510F] text-white text-[9px] font-medium uppercase tracking-widest px-3 py-1" style={{fontFamily:'var(--font-mono)',clipPath:'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))'}}>
                    {post.category?.name || 'Industry'}
                  </span>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex gap-4 mb-4">
                  <span className="flex items-center gap-1.5 text-[#4A5568] text-[10px] uppercase tracking-wider" style={{fontFamily:'var(--font-mono)'}}>
                    <Calendar size={11} className="text-[#E3510F]" />{post.date_published||'—'}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#4A5568] text-[10px] uppercase tracking-wider" style={{fontFamily:'var(--font-mono)'}}>
                    <User size={11} className="text-[#E3510F]" />{post.author||'Admin'}
                  </span>
                </div>
                <h3 className="text-[#F0F2F5] font-semibold text-base mb-4 group-hover:text-[#E3510F] transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-[#5A6478] text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt||'Discover the latest insights and trends in industrial engineering.'}
                </p>
                <Link href={`/blog/${post.slug}`}
                  className="flex items-center gap-2 text-[#9BA5B4] hover:text-[#E3510F] transition-colors text-[10px] uppercase tracking-wider font-medium pt-5 border-t border-white/5 group/link"
                  style={{fontFamily:'var(--font-mono)'}}>
                  <span>Read Article</span>
                  <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
