'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

const ease = [.22, 1, .36, 1];

/* ─── TRAIN SVG ────────────────────────────────────────────
   Detailed side-view, nose faces LEFT (direction of travel).
   Wheels use className="wheel-inner" — CSS animates them via
   .train-svg.moving .wheel-inner  { animation: wheelSpin ... }
   defined in tailwind.css
─────────────────────────────────────────────────────────── */
function TrainSVG({ isMoving }) {
  return (
    <svg
      className={`train-svg${isMoving ? ' moving' : ''}`}
      viewBox="0 0 1200 140"
      width="1200"
      height="140"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      style={{
        filter: 'drop-shadow(0 20px 55px rgba(0,0,0,.8)) drop-shadow(0 0 28px rgba(227,81,15,.14))',
        flexShrink: 0,
      }}
    >
      <defs>
        <linearGradient id="tBodyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#8892A0"/>
          <stop offset="18%"  stopColor="#C4CED8"/>
          <stop offset="50%"  stopColor="#9BA5B0"/>
          <stop offset="80%"  stopColor="#6B7588"/>
          <stop offset="100%" stopColor="#4B5568"/>
        </linearGradient>
        <linearGradient id="tWinG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7BAED4" stopOpacity="0.9"/>
          <stop offset="40%"  stopColor="#4A7EA0" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#1E3F5A" stopOpacity="0.8"/>
        </linearGradient>
        <linearGradient id="tStripeG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#FF6B35"/>
          <stop offset="30%"  stopColor="#E3510F"/>
          <stop offset="70%"  stopColor="#E3510F"/>
          <stop offset="100%" stopColor="#FF6B35"/>
        </linearGradient>
        <linearGradient id="tWheelG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#4B5568"/>
          <stop offset="100%" stopColor="#111827"/>
        </linearGradient>
        <linearGradient id="tCabG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#6CA8D4" stopOpacity="0.7"/>
          <stop offset="60%"  stopColor="#2A5A7C" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#0D2C3E" stopOpacity="0.9"/>
        </linearGradient>
        <radialGradient id="tHeadG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFF9D6"/>
          <stop offset="60%"  stopColor="#FFD980" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#FFB340" stopOpacity="0"/>
        </radialGradient>
        <filter id="tGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* Roof strip + equipment pods */}
      <rect x="130" y="8"  width="930" height="9"  fill="#1F2937" rx="3"/>
      <rect x="280" y="4"  width="70"  height="8"  fill="#111827" rx="3"/>
      <rect x="540" y="4"  width="70"  height="8"  fill="#111827" rx="3"/>
      <rect x="800" y="4"  width="70"  height="8"  fill="#111827" rx="3"/>
      {/* Pantograph */}
      <g stroke="#9BA5B4" strokeLinecap="round" fill="none">
        <line x1="400" y1="8"   x2="375" y2="-14" strokeWidth="2"/>
        <line x1="400" y1="8"   x2="425" y2="-14" strokeWidth="2"/>
        <line x1="375" y1="-14" x2="425" y2="-14" strokeWidth="2"/>
        <line x1="382" y1="-14" x2="379" y2="-22" strokeWidth="1.5"/>
        <line x1="418" y1="-14" x2="421" y2="-22" strokeWidth="1.5"/>
        <line x1="379" y1="-22" x2="421" y2="-22" strokeWidth="2.5"/>
      </g>

      {/* Locomotive nose (faces LEFT) */}
      <path d="M 148,18 L 90,18 C 65,18 42,28 24,50 C 13,63 12,75 17,82 C 22,89 36,92 58,92 L 148,92 Z" fill="url(#tBodyG)"/>
      <path d="M 142,24 L 84,24 C 62,24 44,33 28,52 L 34,52 C 48,38 64,30 84,30 L 142,28 Z" fill="url(#tCabG)"/>
      <path d="M 142,24 L 84,24 C 62,24 44,33 28,52 L 34,52 C 48,38 64,30 84,30 L 142,28 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <path d="M 142,52 L 34,52 L 36,58 L 142,58 Z" fill="rgba(0,0,0,0.4)"/>

      {/* Main car body */}
      <rect x="148" y="18" width="910" height="74" fill="url(#tBodyG)"/>

      {/* Tail */}
      <path d="M 1058,18 L 1140,18 C 1170,18 1184,30 1186,52 C 1188,68 1178,82 1162,88 C 1152,91 1140,92 1125,92 L 1058,92 Z" fill="url(#tBodyG)"/>
      <path d="M 1162,88 C 1152,91 1140,92 1125,92" stroke="#E3510F" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7"/>
      <circle cx="1178" cy="72" r="5"  fill="#E3510F" opacity="0.65" filter="url(#tGlow)"/>
      <circle cx="1178" cy="72" r="9"  fill="none" stroke="#E3510F" strokeWidth="1" opacity="0.25"/>

      {/* Orange stripe */}
      <rect x="30"  y="60" width="1150" height="14" fill="url(#tStripeG)"/>
      <path d="M 30,60 L 24,62 L 24,74 L 30,74 Z" fill="url(#tStripeG)"/>
      <rect x="30"  y="60" width="1150" height="2"  fill="rgba(255,255,255,0.14)"/>

      {/* Windows */}
      <rect x="155" y="24" width="44" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="212" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="264" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="316" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="368" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="420" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="472" y="18" width="5"  height="74" fill="#07080C" rx="1"/>
      <rect x="460" y="88" width="30" height="6"  fill="#1F2937" rx="2"/>
      <rect x="490" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="542" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="594" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="646" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="698" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="752" y="18" width="5"  height="74" fill="#07080C" rx="1"/>
      <rect x="740" y="88" width="30" height="6"  fill="#1F2937" rx="2"/>
      <rect x="770" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="822" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="874" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="926" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="978" y="24" width="42" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="1030" y="24" width="40" height="30" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>

      {/* Underframe */}
      <rect x="30"  y="92"  width="1152" height="8"  fill="#1F2937" rx="2"/>
      <rect x="148" y="90"  width="908"  height="10" fill="#111827"/>

      {/* Bogies — 4x with spoke detail */}
      {[220, 470, 755, 1020].map((cx) => (
        <g key={cx} transform={`translate(${cx},102)`}>
          <rect x="-52" y="0"  width="104" height="8"  fill="#374151" rx="2"/>
          <rect x="-42" y="-4" width="84"  height="6"  fill="#2D3748" rx="1"/>
          {/* Left wheel */}
          <circle className="wheel-inner" cx="-30" cy="22" r="17" fill="url(#tWheelG)"/>
          <circle cx="-30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
          <circle cx="-30" cy="22" r="10" fill="#1F2937"/>
          <circle cx="-30" cy="22" r="5"  fill="#374151"/>
          <circle cx="-30" cy="22" r="2.5" fill="#6B7280"/>
          <line x1="-30" y1="12" x2="-30" y2="16" stroke="#4B5568" strokeWidth="1.5"/>
          <line x1="-30" y1="28" x2="-30" y2="32" stroke="#4B5568" strokeWidth="1.5"/>
          <line x1="-40" y1="22" x2="-36" y2="22" stroke="#4B5568" strokeWidth="1.5"/>
          <line x1="-24" y1="22" x2="-20" y2="22" stroke="#4B5568" strokeWidth="1.5"/>
          {/* Right wheel */}
          <circle className="wheel-inner" cx="30" cy="22" r="17" fill="url(#tWheelG)"/>
          <circle cx="30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
          <circle cx="30" cy="22" r="10" fill="#1F2937"/>
          <circle cx="30" cy="22" r="5"  fill="#374151"/>
          <circle cx="30" cy="22" r="2.5" fill="#6B7280"/>
          <line x1="30" y1="12" x2="30" y2="16" stroke="#4B5568" strokeWidth="1.5"/>
          <line x1="30" y1="28" x2="30" y2="32" stroke="#4B5568" strokeWidth="1.5"/>
          <line x1="20" y1="22" x2="24" y2="22" stroke="#4B5568" strokeWidth="1.5"/>
          <line x1="36" y1="22" x2="40" y2="22" stroke="#4B5568" strokeWidth="1.5"/>
          {/* Axle */}
          <line x1="-14" y1="22" x2="14" y2="22" stroke="#4B5568" strokeWidth="2"/>
          {/* Brake calipers */}
          <rect x="-36" y="12" width="8" height="6" fill="#2D3748" rx="1"/>
          <rect x="28"  y="12" width="8" height="6" fill="#2D3748" rx="1"/>
        </g>
      ))}

      {/* Headlights */}
      <circle cx="17" cy="44" r="8" fill="url(#tHeadG)" filter="url(#tGlow)"/>
      <circle cx="17" cy="44" r="5" fill="#FFF8E0"/>
      <circle cx="17" cy="44" r="9" fill="none" stroke="rgba(255,200,80,0.3)" strokeWidth="2"/>
      <circle cx="20" cy="72" r="4" fill="#E3510F" opacity="0.8" filter="url(#tGlow)"/>

      {/* Body sheen */}
      <rect x="30" y="19" width="1155" height="10" fill="rgba(255,255,255,0.04)" rx="2"/>
    </svg>
  );
}

/* ─── TRACK SVG ─────────────────────────────────────────── */
function TrackSVG() {
  return (
    <svg
      style={{ position:'absolute', bottom:0, left:'-20%', width:'140%', height:'44px' }}
      viewBox="0 0 1400 44"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="tRailG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1A2133" stopOpacity="0"/>
          <stop offset="12%"  stopColor="#2D3748" stopOpacity="1"/>
          <stop offset="88%"  stopColor="#2D3748" stopOpacity="1"/>
          <stop offset="100%" stopColor="#1A2133" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <g fill="#374151" opacity="0.65">
        {Array.from({ length: 26 }, (_, i) => i * 56).map(x => (
          <rect key={x} x={x} y="12" width="28" height="7" rx="1"/>
        ))}
      </g>
      <rect x="0" y="8"  width="1400" height="4" rx="1" fill="url(#tRailG)"/>
      <rect x="0" y="28" width="1400" height="4" rx="1" fill="url(#tRailG)"/>
      <rect x="0" y="8"  width="1400" height="1.5" rx="1" fill="rgba(200,220,255,0.12)"/>
      <rect x="0" y="28" width="1400" height="1.5" rx="1" fill="rgba(200,220,255,0.12)"/>
    </svg>
  );
}

/* ─── HERO COMPONENT ─────────────────────────────────────── */
export default function Hero({ initialData }) {
  const [banner,   setBanner]   = useState(initialData || null);
  const [ready,    setReady]    = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const vidRef   = useRef(null); // <video> DOM ref
  const videoRef = useRef(null); // video section ref (for its own parallax)
  const trainRef = useRef(null); // train section ref (scroll-linked animation)

  /* ── Video section parallax (original behaviour, unchanged) ── */
  const { scrollYProgress: videoProgress } = useScroll({
    target: videoRef,
    offset: ['start start', 'end start'],
  });
  const yContent = useTransform(videoProgress, [0, 1],   ['0%', '18%']);
  const opacity  = useTransform(videoProgress, [0, 0.7], [1,    0]);
  const yBg      = useTransform(videoProgress, [0, 1],   ['0%', '25%']);

  /* ── Train section scroll-link ── */
  const { scrollYProgress: trainProgress } = useScroll({
    target: trainRef,
    offset: ['start start', 'end end'],
  });
  // Enters from far right, exits to far left
  const trainX = useTransform(trainProgress, [0, 1], ['112vw', '-142vw']);

  // Story text: fades in as train arrives, holds centre, fades out as it leaves
  const storyOpacity = useTransform(trainProgress, [0, 0.18, 0.48, 0.72, 0.9], [0, 1, 1, 1, 0]);
  const storyY       = useTransform(trainProgress, [0, 0.18], [28, 0]);

  // Toggle CSS wheel-spin class
  useMotionValueEvent(trainProgress, 'change', (v) => {
    setIsMoving(v > 0.01 && v < 0.99);
  });

  /* ── Video autoplay ── */
  useEffect(() => {
    const v = vidRef.current;
    if (v) { v.load(); v.play().catch(() => {}); }
    const t = setTimeout(() => setReady(true), 1800);
    return () => clearTimeout(t);
  }, [banner]);

  /* ── API fetch (if not SSR-provided) ── */
  useEffect(() => {
    if (initialData) return;
    fetch('/api/proxy/home-banner')
      .then(r => r.json())
      .then(d => { if (d.results?.[0]) setBanner(d.results[0]); })
      .catch(() => {});
  }, []);

  const headline = banner?.title      || 'AND<br/>HITECH<br/><em>INDUSTRIES</em>';
  const subline  = banner?.content    || 'Premium Railway Rolling Stock components and advanced HVAC engineering solutions — built for safety, precision and the future of transit.';
  const btnText  = banner?.button_text || 'Explore Solutions';
  const btnLink  = banner?.button_link || '/products';

  return (
    <>
      {/* ════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — ORIGINAL VIDEO HERO  (100vh, unchanged) */}
      {/* ════════════════════════════════════════════════════ */}
      <section
        ref={videoRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#07080C]"
      >
        {/* Background: video + gradients (parallaxes upward as user scrolls) */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <video
            ref={vidRef}
            autoPlay muted loop playsInline preload="auto"
            poster="/images/hero-bg.jpg"
            onCanPlay={() => setReady(true)}
            onPlaying={() => setReady(true)}
            className={`w-full h-full object-cover transition-opacity duration-[2s] ${ready ? 'opacity-35' : 'opacity-0'}`}
          >
            <source
              src={banner?.video ? getAbsoluteURL(banner.video) : '/images/andhitechvideo.mp4'}
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0" style={{ background:'linear-gradient(105deg,#07080C 0%,rgba(7,8,12,.82) 45%,rgba(7,8,12,.3) 100%)' }}/>
          <div className="absolute inset-0" style={{ background:'linear-gradient(to top,#07080C 0%,transparent 40%,rgba(7,8,12,.35) 100%)' }}/>
        </motion.div>

        {/* Engineering grid overlay */}
        <div className="absolute inset-0 z-[1] bg-grid pointer-events-none opacity-70"/>

        {/* Vertical accent lines */}
        <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-white/[.07] to-transparent z-[2] hidden xl:block" style={{ left:'62%' }}/>
        <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-[#E3510F]/15 to-transparent z-[2] hidden xl:block" style={{ left:'75%' }}/>

        {/* Flame glow at bottom-left */}
        <div
          className="absolute bottom-0 left-0 z-[1] w-[55vw] h-[45vh] pointer-events-none"
          style={{ background:'radial-gradient(ellipse at bottom left,rgba(227,81,15,.11) 0%,transparent 70%)' }}
        />

        {/* Animated scan line */}
        <div className="absolute inset-y-0 right-[24%] w-px z-[3] hidden xl:block overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100vh'] }}
            transition={{ duration:4, repeat:Infinity, repeatDelay:3, ease:'linear' }}
            className="w-full h-16 bg-gradient-to-b from-transparent via-[#E3510F]/40 to-transparent"
          />
        </div>

        {/* Main content — parallaxes upward on scroll */}
        <motion.div
          style={{ y: yContent, opacity }}
          className="relative z-10 max-w-screen-xl mx-auto px-5 md:px-10 pt-40 pb-36 w-full"
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:.14, delayChildren:.2 } } }}
            className="max-w-[860px]"
          >
            <motion.div variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.8,ease}} }}>
              <span className="eyebrow mb-7 block">Engineering the Future of Rail</span>
            </motion.div>

            <motion.h1
              variants={{ hidden:{opacity:0,y:40,skewX:'2deg'}, show:{opacity:1,y:0,skewX:'0deg',transition:{duration:.95,ease}} }}
              className="display-xl mb-8"
              style={{ lineHeight:.9 }}
              dangerouslySetInnerHTML={{
                __html: headline
                  .replace('<em>', '<span style="color:#E3510F;font-style:normal">')
                  .replace('</em>', '</span>')
              }}
            />

            <motion.p
              variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.85,ease}} }}
              className="text-[#9BA5B4] text-[1.05rem] md:text-lg leading-relaxed max-w-[540px] mb-12"
            >
              {subline.replace(/<[^>]*>/g, '')}
            </motion.p>

            <motion.div
              variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{duration:.8,ease}} }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <Link href={btnLink} className="btn-flame group">
                <span>{btnText}</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link href="/about-us" className="btn-wire group">
                <span>Our Story</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating status panel */}
          <motion.div
            initial={{ opacity:0, x:40 }}
            animate={{ opacity:1, x:0 }}
            transition={{ delay:1.3, duration:.9, ease }}
            className="absolute right-10 bottom-28 hidden xl:block"
          >
            <div className="glass p-7 w-[272px]" style={{ borderTopColor:'rgba(227,81,15,.35)', borderTopWidth:'1px', borderColor:'rgba(255,255,255,.06)' }}>
              <p className="text-[#3A4457] text-[.6rem] tracking-[.28em] uppercase font-mono mb-6">AHIL · System Status</p>
              {[
                { l:'Quality Certified', v:'ISO 9001:2015' },
                { l:'RDSO Approved',     v:'Certified'     },
                { l:'R&D Active',        v:'Running'       },
              ].map(({ l, v }) => (
                <div key={l} className="flex items-center justify-between mb-3.5">
                  <span className="text-[#5A6478] text-[.72rem]">{l}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                    <span className="text-[#F0F2F5] text-[.72rem] font-mono">{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.7, duration:1 }}
          className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[.05]"
        >
          <div className="max-w-screen-xl mx-auto grid grid-cols-3 divide-x divide-white/[.05]">
            {[['10+','Years of Innovation'],['500+','Projects Delivered'],['100%','Client Satisfaction']].map(([n, l], i) => (
              <div key={i} className="px-10 py-6 hidden md:block text-center group">
                <div className="text-[2rem] font-bold text-[#F0F2F5] mb-0.5 group-hover:text-[#E3510F] transition-colors" style={{ fontFamily:'var(--font-display)' }}>{n}</div>
                <div className="text-[.6rem] text-[#3A4457] uppercase tracking-[.22em] font-mono">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.2 }}
          className="absolute bottom-[76px] left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 hidden md:flex"
        >
          <motion.div animate={{ y:[0,7,0] }} transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}>
            <ChevronDown size={16} className="text-[#E3510F]"/>
          </motion.div>
          <span className="text-[.58rem] text-[#3A4457] uppercase tracking-[.3em] font-mono">Scroll</span>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — CINEMATIC TRAIN SCROLL STORYTELLING    */}
      {/*  200vh tall · inner panel is sticky at 100vh        */}
      {/* ════════════════════════════════════════════════════ */}
      <div ref={trainRef} style={{ height:'200vh', position:'relative' }}>
        <div
          style={{
            position: 'sticky', top: 0,
            height: '100vh', overflow: 'hidden',
            background: '#07080C',
          }}
        >
          {/* Engineering grid */}
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"/>

          {/* Atmospheric orange glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background:'radial-gradient(ellipse 80vw 60vh at 50% 58%,rgba(227,81,15,.07),transparent 68%)' }}
          />

          {/* Perspective floor grid */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height:'42%',
              backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
              backgroundSize: '80px 40px',
              WebkitMaskImage: 'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.65) 100%)',
              maskImage: 'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.65) 100%)',
            }}
          />

          {/* Subtle vertical rules */}
          <div className="absolute inset-y-0 w-px hidden xl:block pointer-events-none" style={{ left:'18%', background:'linear-gradient(to bottom,transparent,rgba(255,255,255,.045),transparent)' }}/>
          <div className="absolute inset-y-0 w-px hidden xl:block pointer-events-none" style={{ left:'82%', background:'linear-gradient(to bottom,transparent,rgba(255,255,255,.045),transparent)' }}/>

          {/* Section borders */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E3510F]/28 to-transparent"/>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[.04] to-transparent"/>

          {/* ── TRACK + TRAIN ── */}
          <div
            className="absolute pointer-events-none"
            style={{ bottom:'70px', left:0, right:0, height:'178px', overflow:'visible' }}
          >
            <TrackSVG/>
            <motion.div
              style={{ x: trainX, position:'absolute', bottom:0, display:'flex', alignItems:'flex-end' }}
            >
              <TrainSVG isMoving={isMoving}/>
            </motion.div>
          </div>

          {/* ── STORY TEXT (scroll-synced fade) ── */}
          <motion.div
            style={{ opacity: storyOpacity, y: storyY }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
            style={{
              opacity: storyOpacity,
              y: storyY,
              paddingBottom: '210px',
            }}
          >
            <p
              className="font-mono mb-5"
              style={{ fontSize:'.6rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(227,81,15,.65)' }}
            >
              AND Hitech Industries · Since 2013
            </p>

            <h2
              className="text-center px-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.6rem,8vw,6.8rem)',
                lineHeight: '.92',
                letterSpacing: '.035em',
                color: '#F0F2F5',
              }}
            >
              BUILT TO LAST.<br/>
              <span style={{ color:'#E3510F' }}>ENGINEERED</span> TO MOVE.
            </h2>

            <p
              className="mt-8 text-center max-w-md px-6 leading-relaxed"
              style={{ color:'#4A5568', fontSize:'clamp(.82rem,1.4vw,.96rem)' }}
            >
              Precision-manufactured railway components trusted by Indian Railways, Metro networks, and critical infrastructure across India.
            </p>

            <div className="mt-10 w-14 h-px" style={{ background:'rgba(227,81,15,.45)' }}/>
          </motion.div>

          {/* ── Corner coordinate markers ── */}
          <div className="absolute top-5 left-5 pointer-events-none hidden md:block">
            <div className="flex">
              <div className="w-px h-7 bg-[#E3510F]/35"/>
            </div>
            <div className="h-px w-7 bg-[#E3510F]/35"/>
            <p className="font-mono mt-2" style={{ fontSize:'.46rem', letterSpacing:'.2em', textTransform:'uppercase', color:'#3A4457' }}>28°38′N 77°12′E</p>
          </div>
          <div className="absolute top-5 right-5 pointer-events-none hidden md:flex flex-col items-end">
            <div className="w-px h-7 bg-[#E3510F]/35"/>
            <div className="h-px w-7 bg-[#E3510F]/35"/>
            <p className="font-mono mt-2" style={{ fontSize:'.46rem', letterSpacing:'.2em', textTransform:'uppercase', color:'#3A4457' }}>New Delhi, India</p>
          </div>

          {/* ── Keep-scrolling hint ── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none hidden md:flex flex-col items-center gap-1.5">
            <div style={{ width:'1px', height:'28px', background:'linear-gradient(to bottom,rgba(227,81,15,.45),transparent)' }}/>
            <span className="font-mono" style={{ fontSize:'.48rem', letterSpacing:'.26em', textTransform:'uppercase', color:'#3A4457' }}>Keep Scrolling</span>
          </div>

        </div>
      </div>
    </>
  );
}
