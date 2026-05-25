'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

const ease = [.22,1,.36,1];

export default function Hero({ initialData }) {
  const [banner, setBanner] = useState(initialData || null);
  const [ready, setReady] = useState(false);
  const vidRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset:['start start','end start'] });
  const yContent  = useTransform(scrollYProgress, [0,1], ['0%','18%']);
  const opacity   = useTransform(scrollYProgress, [0,.7], [1, 0]);
  const yBg       = useTransform(scrollYProgress, [0,1], ['0%','25%']);

  useEffect(() => {
    const v = vidRef.current;
    if (v) { v.load(); v.play().catch(()=>{}); }
    const t = setTimeout(()=> setReady(true), 1800);
    return ()=> clearTimeout(t);
  }, [banner]);

  useEffect(() => {
    if (initialData) return;
    fetch('/api/proxy/home-banner').then(r=>r.json())
      .then(d => { if (d.results?.[0]) setBanner(d.results[0]); })
      .catch(()=>{});
  }, []);

  const headline = banner?.title || 'AND<br/>HITECH<br/><em>INDUSTRIES</em>';
  const subline  = banner?.content || 'Premium Railway Rolling Stock components and advanced HVAC engineering solutions — built for safety, precision and the future of transit.';
  const btnText  = banner?.button_text || 'Explore Solutions';
  const btnLink  = banner?.button_link || '/products';

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#07080C]">

      {/* ── Background layer ── */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <video ref={vidRef} autoPlay muted loop playsInline preload="auto"
          poster="/images/hero-bg.jpg"
          onCanPlay={()=>setReady(true)} onPlaying={()=>setReady(true)}
          className={`w-full h-full object-cover transition-opacity duration-[2s] ${ready?'opacity-35':'opacity-0'}`}>
          <source src={banner?.video ? getAbsoluteURL(banner.video) : '/images/andhitechvideo.mp4'} type="video/mp4" />
        </video>
        {/* Cinematic gradients */}
        <div className="absolute inset-0" style={{background:'linear-gradient(105deg,#07080C 0%,rgba(7,8,12,.82) 45%,rgba(7,8,12,.3) 100%)'}}/>
        <div className="absolute inset-0" style={{background:'linear-gradient(to top,#07080C 0%,transparent 40%,rgba(7,8,12,.35) 100%)'}}/>
      </motion.div>

      {/* ── Engineering grid ── */}
      <div className="absolute inset-0 z-[1] bg-grid pointer-events-none opacity-70"/>

      {/* ── Vertical accent lines ── */}
      <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-white/[.07] to-transparent z-[2] hidden xl:block" style={{left:'62%'}}/>
      <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-[#E3510F]/15 to-transparent z-[2] hidden xl:block" style={{left:'75%'}}/>

      {/* ── Flame glow ── */}
      <div className="absolute bottom-0 left-0 z-[1] w-[55vw] h-[45vh] pointer-events-none"
        style={{background:'radial-gradient(ellipse at bottom left,rgba(227,81,15,.11) 0%,transparent 70%)'}}/>

      {/* ── Scan line decoration ── */}
      <div className="absolute inset-y-0 right-[24%] w-px z-[3] hidden xl:block overflow-hidden">
        <motion.div animate={{y:['−100%','100vh']}} transition={{duration:4,repeat:Infinity,repeatDelay:3,ease:'linear'}}
          className="w-full h-16 bg-gradient-to-b from-transparent via-[#E3510F]/40 to-transparent"/>
      </div>

      {/* ── Main content ── */}
      <motion.div style={{ y: yContent, opacity }} className="relative z-10 max-w-screen-xl mx-auto px-5 md:px-10 pt-40 pb-36 w-full">

        {/* Stagger entrance */}
        <motion.div initial="hidden" animate="show"
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:.14, delayChildren:.2 } } }}
          className="max-w-[860px]">

          {/* Eyebrow */}
          <motion.div variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.8,ease}} }}>
            <span className="eyebrow mb-7 block">Engineering the Future of Rail</span>
          </motion.div>

          {/* Display headline */}
          <motion.h1
            variants={{ hidden:{opacity:0,y:40,skewX:'2deg'}, show:{opacity:1,y:0,skewX:'0deg',transition:{duration:.95,ease}} }}
            className="display-xl mb-8"
            style={{lineHeight:.9}}
            dangerouslySetInnerHTML={{ __html: headline.replace('<em>','<span style="color:#E3510F;font-style:normal">').replace('</em>','</span>') }} />

          {/* Subline */}
          <motion.p
            variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.85,ease}} }}
            className="text-[#9BA5B4] text-[1.05rem] md:text-lg leading-relaxed max-w-[540px] mb-12">
            {subline.replace(/<[^>]*>/g,'')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{duration:.8,ease}} }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link href={btnLink} className="btn-flame group">
              <span>{btnText}</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link href="/about-us" className="btn-wire group">
              <span>Our Story</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Floating status panel ── */}
        <motion.div
          initial={{ opacity:0, x:40 }}
          animate={{ opacity:1, x:0 }}
          transition={{ delay:1.3, duration:.9, ease }}
          className="absolute right-10 bottom-28 hidden xl:block">
          <div className="glass p-7 w-[272px]" style={{borderTopColor:'rgba(227,81,15,.35)',borderTopWidth:'1px',borderColor:'rgba(255,255,255,.06)'}}>
            <p className="text-[#3A4457] text-[.6rem] tracking-[.28em] uppercase font-mono mb-6">AHIL · System Status</p>
            {[
              {l:'Quality Certified', v:'ISO 9001:2015', ok:true },
              {l:'RDSO Approved',     v:'Certified',     ok:true },
              {l:'R&D Active',        v:'Running',       ok:true },
            ].map(({l,v,ok})=>(
              <div key={l} className="flex items-center justify-between mb-3.5">
                <span className="text-[#5A6478] text-[.72rem]">{l}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${ok?'bg-emerald-400':'bg-red-500'}`}/>
                  <span className="text-[#F0F2F5] text-[.72rem] font-mono">{v}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Bottom stats strip ── */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.7, duration:1 }}
        className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[.05]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-3 divide-x divide-white/[.05]">
          {[['10+','Years of Innovation'],['500+','Projects Delivered'],['100%','Client Satisfaction']].map(([n,l],i)=>(
            <div key={i} className="px-10 py-6 hidden md:block text-center group">
              <div className="text-[2rem] font-bold text-[#F0F2F5] mb-0.5 group-hover:text-[#E3510F] transition-colors" style={{fontFamily:'var(--font-display)'}}>{n}</div>
              <div className="text-[.6rem] text-[#3A4457] uppercase tracking-[.22em] font-mono">{l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2}}
        className="absolute bottom-[76px] left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 hidden md:flex">
        <motion.div animate={{y:[0,7,0]}} transition={{duration:1.8,repeat:Infinity,ease:'easeInOut'}}>
          <ChevronDown size={16} className="text-[#E3510F]"/>
        </motion.div>
        <span className="text-[.58rem] text-[#3A4457] uppercase tracking-[.3em] font-mono">Scroll</span>
      </motion.div>
    </section>
  );
}
