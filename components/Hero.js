'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

const ease = [.22, 1, .36, 1];

/* ─── INLINE TRAIN SVG (JSX) ──────────────────────────────── */
function TrainSVG({ isMoving }) {
  return (
    <svg
      className={`train-svg${isMoving ? ' moving' : ''}`}
      viewBox="0 0 1200 140"
      width="1200"
      height="140"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      style={{ filter: 'drop-shadow(0 20px 55px rgba(0,0,0,.75)) drop-shadow(0 0 30px rgba(227,81,15,.12))' }}
    >
      <defs>
        <linearGradient id="hBodyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#8892A0"/>
          <stop offset="18%"  stopColor="#C4CED8"/>
          <stop offset="50%"  stopColor="#9BA5B0"/>
          <stop offset="80%"  stopColor="#6B7588"/>
          <stop offset="100%" stopColor="#4B5568"/>
        </linearGradient>
        <linearGradient id="hWinG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7BAED4" stopOpacity="0.9"/>
          <stop offset="40%"  stopColor="#4A7EA0" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#1E3F5A" stopOpacity="0.8"/>
        </linearGradient>
        <linearGradient id="hStripeG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#FF6B35"/>
          <stop offset="30%"  stopColor="#E3510F"/>
          <stop offset="70%"  stopColor="#E3510F"/>
          <stop offset="100%" stopColor="#FF6B35"/>
        </linearGradient>
        <linearGradient id="hWheelG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#4B5568"/>
          <stop offset="100%" stopColor="#111827"/>
        </linearGradient>
        <linearGradient id="hCabG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#6CA8D4" stopOpacity="0.7"/>
          <stop offset="60%"  stopColor="#2A5A7C" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#0D2C3E" stopOpacity="0.9"/>
        </linearGradient>
        <radialGradient id="hHeadG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFF9D6" stopOpacity="1"/>
          <stop offset="60%"  stopColor="#FFD980" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#FFB340" stopOpacity="0"/>
        </radialGradient>
        <filter id="hGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* ── ROOF EQUIPMENT ── */}
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

      {/* ── LOCOMOTIVE NOSE (faces LEFT = direction of travel) ── */}
      <path
        d="M 148,18 L 90,18 C 65,18 42,28 24,50 C 13,63 12,75 17,82 C 22,89 36,92 58,92 L 148,92 Z"
        fill="url(#hBodyG)"
      />
      {/* Cab window */}
      <path
        d="M 142,24 L 84,24 C 62,24 44,33 28,52 L 34,52 C 48,38 64,30 84,30 L 142,28 Z"
        fill="url(#hCabG)"
      />
      <path
        d="M 142,24 L 84,24 C 62,24 44,33 28,52 L 34,52 C 48,38 64,30 84,30 L 142,28 Z"
        fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1"
      />
      <path d="M 142,52 L 34,52 L 36,58 L 142,58 Z" fill="rgba(0,0,0,0.4)"/>

      {/* ── MAIN CAR BODY ── */}
      <rect x="148" y="18" width="910" height="74" fill="url(#hBodyG)"/>

      {/* ── TAIL SECTION ── */}
      <path
        d="M 1058,18 L 1140,18 C 1170,18 1184,30 1186,52 C 1188,68 1178,82 1162,88 C 1152,91 1140,92 1125,92 L 1058,92 Z"
        fill="url(#hBodyG)"
      />
      <path d="M 1162,88 C 1152,91 1140,92 1125,92"
        stroke="#E3510F" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7"/>
      <circle cx="1178" cy="72" r="5"  fill="#E3510F" opacity="0.65" filter="url(#hGlow)"/>
      <circle cx="1178" cy="72" r="9"  fill="none" stroke="#E3510F" strokeWidth="1" opacity="0.25"/>

      {/* ── ORANGE ACCENT STRIPE ── */}
      <rect x="30" y="60" width="1150" height="14" fill="url(#hStripeG)"/>
      <path d="M 30,60 L 24,62 L 24,74 L 30,74 Z" fill="url(#hStripeG)"/>
      <rect x="30" y="60" width="1150" height="2" fill="rgba(255,255,255,0.14)"/>

      {/* ── WINDOWS ── */}
      {/* Locomotive window */}
      <rect x="155" y="24" width="44" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      {/* Car 1 */}
      <rect x="212" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="264" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="316" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="368" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="420" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      {/* Car divider 1 */}
      <rect x="472" y="18" width="5" height="74" fill="#07080C" rx="1"/>
      <rect x="460" y="88" width="30" height="6" fill="#1F2937" rx="2"/>
      {/* Car 2 */}
      <rect x="490" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="542" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="594" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="646" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="698" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      {/* Car divider 2 */}
      <rect x="752" y="18" width="5" height="74" fill="#07080C" rx="1"/>
      <rect x="740" y="88" width="30" height="6" fill="#1F2937" rx="2"/>
      {/* Car 3 */}
      <rect x="770" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="822" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="874" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="926" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="978" y="24" width="42" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>
      <rect x="1030" y="24" width="40" height="30" rx="3" fill="url(#hWinG)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/>

      {/* ── UNDERFRAME ── */}
      <rect x="30"  y="92"  width="1152" height="8"  fill="#1F2937" rx="2"/>
      <rect x="148" y="90"  width="908"  height="10" fill="#111827"/>

      {/* ── BOGIE 1 (x=220) ── */}
      <g transform="translate(220,102)">
        <rect x="-52" y="0"  width="104" height="8"  fill="#374151" rx="2"/>
        <rect x="-42" y="-4" width="84"  height="6"  fill="#2D3748" rx="1"/>
        <circle className="wheel-inner" cx="-30" cy="22" r="17" fill="url(#hWheelG)"/>
        <circle cx="-30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
        <circle cx="-30" cy="22" r="10" fill="#1F2937"/>
        <circle cx="-30" cy="22" r="5"  fill="#374151"/>
        <circle cx="-30" cy="22" r="2.5" fill="#6B7280"/>
        <line x1="-30" y1="12" x2="-30" y2="16" stroke="#4B5568" strokeWidth="1.5"/>
        <line x1="-30" y1="28" x2="-30" y2="32" stroke="#4B5568" strokeWidth="1.5"/>
        <line x1="-40" y1="22" x2="-36" y2="22" stroke="#4B5568" strokeWidth="1.5"/>
        <line x1="-24" y1="22" x2="-20" y2="22" stroke="#4B5568" strokeWidth="1.5"/>
        <circle className="wheel-inner" cx="30" cy="22" r="17" fill="url(#hWheelG)"/>
        <circle cx="30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
        <circle cx="30" cy="22" r="10" fill="#1F2937"/>
        <circle cx="30" cy="22" r="5"  fill="#374151"/>
        <circle cx="30" cy="22" r="2.5" fill="#6B7280"/>
        <line x1="30" y1="12" x2="30" y2="16" stroke="#4B5568" strokeWidth="1.5"/>
        <line x1="30" y1="28" x2="30" y2="32" stroke="#4B5568" strokeWidth="1.5"/>
        <line x1="20" y1="22" x2="24" y2="22" stroke="#4B5568" strokeWidth="1.5"/>
        <line x1="36" y1="22" x2="40" y2="22" stroke="#4B5568" strokeWidth="1.5"/>
        <line x1="-14" y1="22" x2="14" y2="22" stroke="#4B5568" strokeWidth="2"/>
        <rect x="-36" y="12" width="8" height="6" fill="#2D3748" rx="1"/>
        <rect x="28"  y="12" width="8" height="6" fill="#2D3748" rx="1"/>
      </g>

      {/* ── BOGIE 2 (x=470) ── */}
      <g transform="translate(470,102)">
        <rect x="-52" y="0"  width="104" height="8" fill="#374151" rx="2"/>
        <rect x="-42" y="-4" width="84"  height="6" fill="#2D3748" rx="1"/>
        <circle className="wheel-inner" cx="-30" cy="22" r="17" fill="url(#hWheelG)"/>
        <circle cx="-30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
        <circle cx="-30" cy="22" r="10" fill="#1F2937"/>
        <circle cx="-30" cy="22" r="5"  fill="#374151"/>
        <circle cx="-30" cy="22" r="2.5" fill="#6B7280"/>
        <circle className="wheel-inner" cx="30" cy="22" r="17" fill="url(#hWheelG)"/>
        <circle cx="30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
        <circle cx="30" cy="22" r="10" fill="#1F2937"/>
        <circle cx="30" cy="22" r="5"  fill="#374151"/>
        <circle cx="30" cy="22" r="2.5" fill="#6B7280"/>
        <line x1="-14" y1="22" x2="14" y2="22" stroke="#4B5568" strokeWidth="2"/>
      </g>

      {/* ── BOGIE 3 (x=755) ── */}
      <g transform="translate(755,102)">
        <rect x="-52" y="0"  width="104" height="8" fill="#374151" rx="2"/>
        <rect x="-42" y="-4" width="84"  height="6" fill="#2D3748" rx="1"/>
        <circle className="wheel-inner" cx="-30" cy="22" r="17" fill="url(#hWheelG)"/>
        <circle cx="-30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
        <circle cx="-30" cy="22" r="10" fill="#1F2937"/>
        <circle cx="-30" cy="22" r="5"  fill="#374151"/>
        <circle cx="-30" cy="22" r="2.5" fill="#6B7280"/>
        <circle className="wheel-inner" cx="30" cy="22" r="17" fill="url(#hWheelG)"/>
        <circle cx="30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
        <circle cx="30" cy="22" r="10" fill="#1F2937"/>
        <circle cx="30" cy="22" r="5"  fill="#374151"/>
        <circle cx="30" cy="22" r="2.5" fill="#6B7280"/>
        <line x1="-14" y1="22" x2="14" y2="22" stroke="#4B5568" strokeWidth="2"/>
      </g>

      {/* ── BOGIE 4 (x=1020) ── */}
      <g transform="translate(1020,102)">
        <rect x="-52" y="0"  width="104" height="8" fill="#374151" rx="2"/>
        <rect x="-42" y="-4" width="84"  height="6" fill="#2D3748" rx="1"/>
        <circle className="wheel-inner" cx="-30" cy="22" r="17" fill="url(#hWheelG)"/>
        <circle cx="-30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
        <circle cx="-30" cy="22" r="10" fill="#1F2937"/>
        <circle cx="-30" cy="22" r="5"  fill="#374151"/>
        <circle cx="-30" cy="22" r="2.5" fill="#6B7280"/>
        <circle className="wheel-inner" cx="30" cy="22" r="17" fill="url(#hWheelG)"/>
        <circle cx="30" cy="22" r="17" fill="none" stroke="#4B5568" strokeWidth="1.5"/>
        <circle cx="30" cy="22" r="10" fill="#1F2937"/>
        <circle cx="30" cy="22" r="5"  fill="#374151"/>
        <circle cx="30" cy="22" r="2.5" fill="#6B7280"/>
        <line x1="-14" y1="22" x2="14" y2="22" stroke="#4B5568" strokeWidth="2"/>
      </g>

      {/* ── HEADLIGHTS ── */}
      <circle cx="17" cy="44" r="8" fill="url(#hHeadG)" filter="url(#hGlow)"/>
      <circle cx="17" cy="44" r="5" fill="#FFF8E0"/>
      <circle cx="17" cy="44" r="9" fill="none" stroke="rgba(255,200,80,0.3)" strokeWidth="2"/>
      <circle cx="20" cy="72" r="4" fill="#E3510F" opacity="0.8" filter="url(#hGlow)"/>

      {/* ── BODY SHEEN ── */}
      <rect x="30" y="19" width="1155" height="10" fill="rgba(255,255,255,0.04)" rx="2"/>
      <line x1="30" y1="55" x2="1188" y2="55" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
    </svg>
  );
}

/* ─── TRACK SVG ──────────────────────────────────────────── */
function TrackSVG() {
  const ties = Array.from({ length: 25 }, (_, i) => i * 56);
  return (
    <svg
      style={{ position: 'absolute', bottom: 0, left: '-20%', width: '140%', height: '42px' }}
      viewBox="0 0 1400 42"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="hRailG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1A2133" stopOpacity="0"/>
          <stop offset="15%"  stopColor="#2D3748" stopOpacity="1"/>
          <stop offset="85%"  stopColor="#2D3748" stopOpacity="1"/>
          <stop offset="100%" stopColor="#1A2133" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Rail ties */}
      <g fill="#374151" opacity="0.7">
        {ties.map(x => <rect key={x} x={x} y="10" width="28" height="7" rx="1"/>)}
      </g>
      {/* Rails */}
      <rect x="0" y="8"  width="1400" height="4" rx="1" fill="url(#hRailG)"/>
      <rect x="0" y="26" width="1400" height="4" rx="1" fill="url(#hRailG)"/>
      {/* Sheen */}
      <rect x="0" y="8"  width="1400" height="1.5" rx="1" fill="rgba(200,220,255,0.12)"/>
      <rect x="0" y="26" width="1400" height="1.5" rx="1" fill="rgba(200,220,255,0.12)"/>
    </svg>
  );
}

/* ─── HERO COMPONENT ─────────────────────────────────────── */
export default function Hero({ initialData }) {
  const [banner, setBanner] = useState(initialData || null);
  const [isMoving, setIsMoving] = useState(false);
  const heroRef = useRef(null);

  // Scroll progress over the full 200vh section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Train glides from far right to far left
  const trainX = useTransform(scrollYProgress, [0, 1], ['112vw', '-142vw']);

  // Content parallax + fade
  const contentY       = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45, 0.78], [1, 0.85, 0]);

  // Status panel drifts subtly
  const statusY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  // Toggle wheel CSS animation class
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIsMoving(v > 0.01 && v < 0.99);
  });

  // Fetch banner if not SSR-provided
  useEffect(() => {
    if (initialData) return;
    fetch('/api/proxy/home-banner')
      .then(r => r.json())
      .then(d => { if (d.results?.[0]) setBanner(d.results[0]); })
      .catch(() => {});
  }, []);

  const headline = banner?.title || 'AND<br/>HITECH<br/><em>INDUSTRIES</em>';
  const subline  = banner?.content || 'Premium Railway Rolling Stock components and advanced HVAC engineering solutions — built for safety, precision and the future of transit.';
  const btnText  = banner?.button_text || 'Explore Solutions';
  const btnLink  = banner?.button_link || '/products';

  return (
    /* 200vh scroll space — inner div is sticky */
    <div ref={heroRef} className="hero-scroll-space">
      <div className="hero-sticky-inner bg-[#07080C]">

        {/* ── BACKGROUND LAYERS ── */}
        {/* Atmospheric glow */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80vw 70vh at 15% 60%,rgba(227,81,15,.08) 0%,transparent 65%), radial-gradient(ellipse 60vw 80vh at 85% 20%,rgba(227,81,15,.04) 0%,transparent 70%)'
        }}/>
        {/* Engineering grid */}
        <div className="absolute inset-0 z-0 bg-grid opacity-40 pointer-events-none"/>
        {/* Perspective grid at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-0 h-[40%] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
          backgroundSize: '80px 40px',
          WebkitMaskImage: 'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.55) 100%)',
          maskImage: 'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.55) 100%)',
        }}/>
        {/* Vertical accent lines */}
        <div className="absolute inset-y-0 w-px hidden xl:block z-[2] pointer-events-none" style={{ left:'62%', background:'linear-gradient(to bottom,transparent,rgba(255,255,255,.07),transparent)' }}/>
        <div className="absolute inset-y-0 w-px hidden xl:block z-[2] pointer-events-none" style={{ left:'75%', background:'linear-gradient(to bottom,transparent,rgba(227,81,15,.12),transparent)' }}/>
        {/* Animated scan line */}
        <div className="absolute inset-y-0 right-[24%] w-px z-[3] hidden xl:block overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: ['-100%', '100vh'] }}
            transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 3.5, ease: 'linear' }}
            className="w-full h-16"
            style={{ background: 'linear-gradient(to bottom,transparent,rgba(227,81,15,.4),transparent)' }}
          />
        </div>
        {/* Bottom flame edge glow */}
        <div className="absolute bottom-0 left-0 z-[1] w-[55vw] h-[40vh] pointer-events-none" style={{
          background: 'radial-gradient(ellipse at bottom left,rgba(227,81,15,.1) 0%,transparent 70%)'
        }}/>

        {/* ── TRAIN SCENE ── */}
        <div className="absolute bottom-[58px] left-0 right-0 z-[5] pointer-events-none overflow-visible" style={{ height: '172px' }}>
          <TrackSVG/>
          <motion.div
            className="absolute w-full flex items-end"
            style={{ x: trainX, bottom: 0 }}
          >
            <TrainSVG isMoving={isMoving}/>
          </motion.div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 max-w-screen-xl mx-auto px-5 md:px-10 pt-40 pb-32 h-full flex flex-col justify-center w-full"
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: .13, delayChildren: .18 } } }}
            className="max-w-[860px]"
          >
            {/* Eyebrow */}
            <motion.div variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.8,ease}} }}>
              <span className="eyebrow mb-7 block">Engineering the Future of Rail</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={{ hidden:{opacity:0,y:44,skewX:'2deg'}, show:{opacity:1,y:0,skewX:'0deg',transition:{duration:.95,ease}} }}
              className="display-xl mb-8"
              style={{ lineHeight: .88 }}
              dangerouslySetInnerHTML={{
                __html: headline
                  .replace('<em>', '<span style="color:#E3510F;font-style:normal">')
                  .replace('</em>', '</span>')
              }}
            />

            {/* Subline */}
            <motion.p
              variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.85,ease}} }}
              className="text-[#9BA5B4] text-[1.02rem] md:text-lg leading-relaxed max-w-[540px] mb-12"
            >
              {subline.replace(/<[^>]*>/g, '')}
            </motion.p>

            {/* CTAs */}
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
        </motion.div>

        {/* ── FLOATING STATUS PANEL ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: .9, ease }}
          style={{ y: statusY }}
          className="absolute right-10 bottom-24 hidden xl:block z-10"
        >
          <div className="glass p-7 w-[268px]" style={{ borderTopColor:'rgba(227,81,15,.35)', borderTopWidth:'1px' }}>
            <p className="text-[#3A4457] text-[.58rem] tracking-[.28em] uppercase font-mono mb-6">AHIL · System Status</p>
            {[
              { l:'Quality Certified', v:'ISO 9001:2015' },
              { l:'RDSO Approved',     v:'Certified'     },
              { l:'R&D Active',        v:'Running'       },
            ].map(({ l, v }) => (
              <div key={l} className="flex items-center justify-between mb-3.5">
                <span className="text-[#5A6478] text-[.7rem]">{l}</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                  <span className="text-[#F0F2F5] text-[.7rem] font-mono">{v}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── BOTTOM STATS STRIP ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[.05]"
        >
          <div className="max-w-screen-xl mx-auto grid grid-cols-3 divide-x divide-white/[.05]">
            {[['10+','Years of Innovation'],['500+','Projects Delivered'],['100%','Client Satisfaction']].map(([n, l], i) => (
              <div key={i} className="px-10 py-6 hidden md:block text-center group cursor-default">
                <div className="text-[2rem] font-bold text-[#F0F2F5] mb-0.5 group-hover:text-[#E3510F] transition-colors duration-300" style={{ fontFamily:'var(--font-display)' }}>{n}</div>
                <div className="text-[.58rem] text-[#3A4457] uppercase tracking-[.22em] font-mono">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── SCROLL CUE ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
          className="absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 hidden md:flex"
          style={{ bottom: '76px' }}
        >
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={16} className="text-[#E3510F]"/>
          </motion.div>
          <span className="text-[.56rem] text-[#3A4457] uppercase tracking-[.3em] font-mono">Scroll</span>
        </motion.div>

      </div>{/* /hero-sticky-inner */}
    </div>/* /hero-scroll-space */
  );
}
