import Head from 'next/head';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

export async function getServerSideProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const API = (process.env.NEXT_PUBLIC_API_BASE_URL||'').replace(/\/+$/,'');
  try {
    const r = await fetch(`${API}/news-media/`);
    const d = await r.json();
    const items = (d.results||[]).map(i => ({...i, image:i.image?.startsWith('http')?i.image:`${API}${i.image}`}));
    return { props: { pressItems: items } };
  } catch { return { props: { pressItems: [] } }; }
}

export default function PressPage({ pressItems }) {
  return (
    <>
      <Head><title>News & Media | AND Hitech</title></Head>
      <Header />
      <PageBanner title="News & Media" backgroundImage="/images/page-header-bg.jpg" currentPage="News & Media" />

      <section className="py-24 md:py-32 bg-[#07080C] relative">
        <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mb-16">
            <span className="eyebrow mb-5 block">Press & Coverage</span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="display-md max-w-xl">Press Release &<br/><span style={{color:'#E3510F'}}>Media</span></h2>
              <p className="text-[#9BA5B4] text-sm max-w-sm leading-relaxed">Latest news, features, and mentions about AND Hitech Industries.</p>
            </div>
          </motion.div>

          {!pressItems.length
            ? <div className="text-center py-20 text-[#4A5568]">No press releases found.</div>
            : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pressItems.map((item, idx) => (
                  <motion.div key={item.id} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                    transition={{ delay:(idx%6)*0.08 }}
                    className="product-card flex flex-col h-full group">
                    <div className="relative aspect-video overflow-hidden flex-shrink-0">
                      <Image src={item.image||'/images/page-header-bg.jpg'} alt={item.title} fill
                        className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07080C]/60 to-transparent" />
                    </div>
                    <div className="p-7 flex flex-col flex-grow">
                      <h3 className="text-[#F0F2F5] font-semibold text-base mb-3 group-hover:text-[#E3510F] transition-colors line-clamp-2 leading-snug" style={{fontFamily:'DM Sans, sans-serif'}}>{item.title}</h3>
                      <p className="text-sm leading-relaxed mb-6 line-clamp-3 flex-grow" style={{color:'#AAB4C3'}}>
                        {item.excerpt||item.content?.replace(/<[^>]*>/g,'').slice(0,140)}
                      </p>
                      <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[#4A5568] text-xs" style={{fontFamily:'var(--font-mono)'}}>
                          <Calendar size={11} />{item.date||'Recent'}
                        </span>
                        <a href={item.link||'#'} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[#E3510F] text-[10px] uppercase tracking-wider font-medium hover:underline"
                          style={{fontFamily:'var(--font-mono)'}}>
                          Read <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
          }
        </div>
      </section>
      <Footer />
    </>
  );
}
