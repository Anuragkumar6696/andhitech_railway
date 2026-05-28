'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

const ease = [.22, 1, .36, 1];

/* ─── TRAIN SVG ─────────────────────────────────────────── */
function TrainSVG({ isMoving }) {
  return (
    <svg
      className={`train-svg${isMoving ? ' moving' : ''}`}
      viewBox="0 0 1200 140"
      width="1200" height="140"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      style={{
        filter: 'drop-shadow(0 24px 60px rgba(0,0,0,.9)) drop-shadow(0 0 40px rgba(227,81,15,.15))',
        flexShrink: 0,
      }}
    >
      <defs>
        <linearGradient id="tBodyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#9AA5B4"/>
          <stop offset="18%"  stopColor="#C8D4E0"/>
          <stop offset="50%"  stopColor="#9BA5B2"/>
          <stop offset="82%"  stopColor="#6A7588"/>
          <stop offset="100%" stopColor="#48536A"/>
        </linearGradient>
        <linearGradient id="tWinG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#82B8D8" stopOpacity="0.88"/>
          <stop offset="40%"  stopColor="#4A82A8" stopOpacity="0.82"/>
          <stop offset="100%" stopColor="#1C3E5C" stopOpacity="0.78"/>
        </linearGradient>
        <linearGradient id="tStripeG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#FF6835"/>
          <stop offset="25%"  stopColor="#E3510F"/>
          <stop offset="75%"  stopColor="#E3510F"/>
          <stop offset="100%" stopColor="#FF6835"/>
        </linearGradient>
        <linearGradient id="tWheelG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#4B5568"/>
          <stop offset="100%" stopColor="#0D1117"/>
        </linearGradient>
        <linearGradient id="tCabG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#72B0D4" stopOpacity="0.65"/>
          <stop offset="60%"  stopColor="#285A7A" stopOpacity="0.78"/>
          <stop offset="100%" stopColor="#0C2C3E" stopOpacity="0.88"/>
        </linearGradient>
        <radialGradient id="tHeadG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFFAD0"/>
          <stop offset="55%"  stopColor="#FFE080" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#FFC040" stopOpacity="0"/>
        </radialGradient>
        <filter id="tGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* Roof equipment */}
      <rect x="130" y="7"  width="935" height="10" fill="#1A2235" rx="3"/>
      <rect x="285" y="3"  width="72"  height="9"  fill="#0F1420" rx="3"/>
      <rect x="545" y="3"  width="72"  height="9"  fill="#0F1420" rx="3"/>
      <rect x="805" y="3"  width="72"  height="9"  fill="#0F1420" rx="3"/>

      {/* Pantograph */}
      <g stroke="#8C98AA" strokeLinecap="round" fill="none">
        <line x1="405" y1="7"  x2="378" y2="-16" strokeWidth="1.8"/>
        <line x1="405" y1="7"  x2="432" y2="-16" strokeWidth="1.8"/>
        <line x1="378" y1="-16" x2="432" y2="-16" strokeWidth="1.8"/>
        <line x1="385" y1="-16" x2="382" y2="-25" strokeWidth="1.4"/>
        <line x1="425" y1="-16" x2="428" y2="-25" strokeWidth="1.4"/>
        <line x1="382" y1="-25" x2="428" y2="-25" strokeWidth="2.2"/>
      </g>

      {/* Locomotive nose */}
      <path d="M 148,18 L 90,18 C 64,18 40,28 22,52 C 11,65 10,77 15,84 C 20,91 34,94 56,94 L 148,94 Z" fill="url(#tBodyG)"/>
      <path d="M 142,24 L 84,24 C 60,24 42,34 26,54 L 32,54 C 46,38 62,30 82,30 L 142,28 Z" fill="url(#tCabG)"/>
      <path d="M 142,52 L 32,52 L 34,59 L 142,59 Z" fill="rgba(0,0,0,.42)"/>

      {/* Body */}
      <rect x="148" y="18" width="912" height="76" fill="url(#tBodyG)"/>

      {/* Tail */}
      <path d="M 1060,18 L 1145,18 C 1175,18 1188,30 1190,54 C 1192,70 1180,84 1163,90 C 1152,93 1140,94 1124,94 L 1060,94 Z" fill="url(#tBodyG)"/>
      <path d="M 1163,90 C 1152,93 1140,94 1124,94" stroke="#E3510F" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.6"/>
      <circle cx="1180" cy="73" r="5.5" fill="#E3510F" opacity="0.6" filter="url(#tGlow)"/>
      <circle cx="1180" cy="73" r="10"  fill="none" stroke="#E3510F" strokeWidth="1" opacity="0.2"/>

      {/* Orange stripe */}
      <rect x="28"  y="62" width="1155" height="15" fill="url(#tStripeG)"/>
      <path d="M 28,62 L 22,64 L 22,77 L 28,77 Z" fill="url(#tStripeG)"/>
      <rect x="28"  y="62" width="1155" height="2"  fill="rgba(255,255,255,.16)"/>

      {/* Windows */}
      {[155,212,264,316,368,420].map(x => (
        <rect key={x} x={x} y="24" width="44" height="32" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,.1)" strokeWidth="0.5"/>
      ))}
      <rect x="475" y="18" width="5"  height="76" fill="#06080E" rx="1"/>
      <rect x="462" y="90" width="32" height="6"  fill="#1C2538" rx="2"/>
      {[492,544,596,648,700].map(x => (
        <rect key={x} x={x} y="24" width="44" height="32" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,.1)" strokeWidth="0.5"/>
      ))}
      <rect x="756" y="18" width="5"  height="76" fill="#06080E" rx="1"/>
      <rect x="743" y="90" width="32" height="6"  fill="#1C2538" rx="2"/>
      {[774,826,878,930,982,1034].map(x => (
        <rect key={x} x={x} y="24" width="42" height="32" rx="3" fill="url(#tWinG)" stroke="rgba(255,255,255,.1)" strokeWidth="0.5"/>
      ))}

      {/* Underframe */}
      <rect x="28"  y="94"  width="1155" height="9"  fill="#1C2538" rx="2"/>
      <rect x="148" y="92"  width="910"  height="11" fill="#0F1420"/>

      {/* Bogies */}
      {[222, 472, 757, 1022].map(cx => (
        <g key={cx} transform={`translate(${cx},103)`}>
          <rect x="-54" y="0"  width="108" height="9"  fill="#2E3A4E" rx="2"/>
          <rect x="-44" y="-5" width="88"  height="7"  fill="#253040" rx="1"/>
          {[-32, 32].map(wx => (
            <g key={wx}>
              <circle className="wheel-inner" cx={wx} cy="23" r="17" fill="url(#tWheelG)"/>
              <circle cx={wx} cy="23" r="17" fill="none" stroke="#3D4A5C" strokeWidth="1.5"/>
              <circle cx={wx} cy="23" r="10" fill="#1C2538"/>
              <circle cx={wx} cy="23" r="5"  fill="#2E3A4E"/>
              <circle cx={wx} cy="23" r="2.5" fill="#5A6A7C"/>
              <line x1={wx} y1="13" x2={wx} y2="17" stroke="#3D4A5C" strokeWidth="1.5"/>
              <line x1={wx} y1="29" x2={wx} y2="33" stroke="#3D4A5C" strokeWidth="1.5"/>
              <line x1={wx-10} y1="23" x2={wx-6} y2="23" stroke="#3D4A5C" strokeWidth="1.5"/>
              <line x1={wx+6}  y1="23" x2={wx+10} y2="23" stroke="#3D4A5C" strokeWidth="1.5"/>
              <rect x={wx-5} y="12" width="10" height="7" fill="#253040" rx="1"/>
            </g>
          ))}
          <line x1="-16" y1="23" x2="16" y2="23" stroke="#3D4A5C" strokeWidth="2.2"/>
        </g>
      ))}

      {/* Headlights */}
      <circle cx="15" cy="44" r="9"  fill="url(#tHeadG)" filter="url(#tGlow)"/>
      <circle cx="15" cy="44" r="5.5" fill="#FFFCE0"/>
      <circle cx="15" cy="44" r="11" fill="none" stroke="rgba(255,210,80,.28)" strokeWidth="2.5"/>
      <circle cx="18" cy="73" r="4.5" fill="#E3510F" opacity="0.75" filter="url(#tGlow)"/>

      {/* Sheen */}
      <rect x="28" y="19" width="1158" height="12" fill="rgba(255,255,255,.036)" rx="2"/>
    </svg>
  );
}

/* ─── TRACK ── */
function TrackSVG() {
  return (
    <svg style={{ position:'absolute', bottom:0, left:'-20%', width:'140%', height:'48px' }}
      viewBox="0 0 1400 48" preserveAspectRatio="none">
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#141B2D" stopOpacity="0"/>
          <stop offset="10%"  stopColor="#253040" stopOpacity="1"/>
          <stop offset="90%"  stopColor="#253040" stopOpacity="1"/>
          <stop offset="100%" stopColor="#141B2D" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <g fill="#2E3A4E" opacity="0.5">
        {Array.from({ length: 28 }, (_, i) => i * 52).map(x => (
          <rect key={x} x={x} y="14" width="28" height="8" rx="1.5"/>
        ))}
      </g>
      <rect x="0" y="9"  width="1400" height="4.5" rx="1.5" fill="url(#rg)"/>
      <rect x="0" y="30" width="1400" height="4.5" rx="1.5" fill="url(#rg)"/>
      <rect x="0" y="9"  width="1400" height="1.5" rx="1" fill="rgba(180,210,255,.08)"/>
      <rect x="0" y="30" width="1400" height="1.5" rx="1" fill="rgba(180,210,255,.08)"/>
    </svg>
  );
}

/* ─── HERO ── */
export default function Hero({ initialData }) {
  const [banner,   setBanner]   = useState(initialData || null);
  const [ready,    setReady]    = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const vidRef   = useRef(null);
  const videoRef = useRef(null);
  const trainRef = useRef(null);
  const scrollRef = useRef(null);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  /* Video section parallax */
  const { scrollYProgress: videoProgress } = useScroll({
    target: videoRef,
    offset: ['start start', 'end start'],
  });
  const yContent = useTransform(videoProgress, [0, 1], ['0%', '22%']);
  const opacity  = useTransform(videoProgress, [0, .72], [1, 0]);
  const yBg      = useTransform(videoProgress, [0, 1], ['0%', '30%']);
  const scale    = useTransform(videoProgress, [0, 1], [1, 1.1]);

  /* Train scroll section */
  const { scrollYProgress: trainProgress } = useScroll({
    target: trainRef,
    offset: ['start start', 'end end'],
  });
  const trainX       = useTransform(trainProgress, [0, 1], ['118vw', '-152vw']);
  const storyOpacity = useTransform(trainProgress, [0, .16, .46, .72, .92], [0, 1, 1, 1, 0]);
  const storyY       = useTransform(trainProgress, [0, .16], [40, 0]);
  const lightBeam    = useTransform(trainProgress, [0, .4, 1], [0, 1, 0]);

  useMotionValueEvent(trainProgress, 'change', (v) => {
    setIsMoving(v > 0.01 && v < 0.99);
  });

  useEffect(() => {
    const v = vidRef.current;
    if (v) { v.load(); v.play().catch(() => {}); }
    const t = setTimeout(() => setReady(true), 1600);
    return () => clearTimeout(t);
  }, [banner]);

  useEffect(() => {
    if (initialData) return;
    fetch('/api/proxy/home-banner')
      .then(r => r.json())
      .then(d => { if (d.results?.[0]) setBanner(d.results[0]); })
      .catch(() => {});
  }, []);

  const headline = banner?.title      || 'ENGINEERING<br/>MOTION FOR<br/><em>MODERN RAILWAYS</em>';
  const subline  = banner?.content    || 'Premium Railway Rolling Stock components and advanced HVAC engineering solutions — built for safety, precision and the future of transit.';
  const btnText  = banner?.button_text || 'Explore Solutions';
  const btnLink  = banner?.button_link || '/products';

  return (
    <>
      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 1 — FULLSCREEN CINEMATIC VIDEO HERO          */}
      {/* ══════════════════════════════════════════════════════ */}
      <section
        ref={videoRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: '#030405' }}
      >
        {/* Video + parallax bg */}
        <motion.div style={{ y: yBg, scale }} className="absolute inset-0 z-0">
          <video
            ref={vidRef}
            autoPlay muted loop playsInline preload="auto"
            poster="/images/hero-bg.jpg"
            onCanPlay={() => setReady(true)}
            onPlaying={() => setReady(true)}
            className={`w-full h-full object-cover transition-opacity duration-[2.5s] ${ready ? 'opacity-25' : 'opacity-0'}`}
          >
            <source
              src={banner?.video ? getAbsoluteURL(banner.video) : '/images/andhitechvideo.mp4'}
              type="video/mp4"
            />
          </video>
          {/* Multi-layer gradients */}
          <div className="absolute inset-0" style={{ background:'linear-gradient(110deg,#030405 0%,rgba(3,4,5,.88) 38%,rgba(3,4,5,.2) 100%)' }}/>
          <div className="absolute inset-0" style={{ background:'linear-gradient(to top,#030405 0%,transparent 40%,rgba(3,4,5,.3) 100%)' }}/>
          {/* Vignette */}
          <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse at center,transparent 38%,rgba(3,4,5,.7) 100%)' }}/>
        </motion.div>

        {/* Engineering grid */}
        <div className="absolute inset-0 z-[1] bg-grid pointer-events-none opacity-50"/>

        {/* Vertical accent rules */}
        <div className="absolute inset-y-0 w-px z-[2] hidden xl:block"
          style={{ left:'63%', background:'linear-gradient(to bottom,transparent,rgba(255,255,255,.05),transparent)' }}/>
        <div className="absolute inset-y-0 w-px z-[2] hidden xl:block"
          style={{ left:'77%', background:'linear-gradient(to bottom,transparent,rgba(227,81,15,.12),transparent)' }}/>

        {/* Atmospheric glow */}
        <div className="absolute bottom-0 left-0 z-[1] w-[65vw] h-[55vh] pointer-events-none"
          style={{ background:'radial-gradient(ellipse at bottom left,rgba(227,81,15,.1) 0%,transparent 65%)' }}/>

        {/* Animated scan line */}
        <div className="absolute inset-y-0 z-[3] hidden xl:block overflow-hidden" style={{ right:'23%', width:'1px' }}>
          <motion.div
            animate={{ y: ['-100%', '100vh'] }}
            transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
            className="w-full h-24"
            style={{ background:'linear-gradient(to bottom,transparent,rgba(227,81,15,.5),transparent)' }}
          />
        </div>

        {/* Main content */}
        <motion.div
          style={{ y: yContent, opacity }}
          className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 pt-36 pb-44 w-full"
        >
          <motion.div
            initial="hidden" animate="show"
            variants={{ hidden:{}, show:{ transition:{ staggerChildren:.12, delayChildren:.2 } } }}
            className="max-w-[960px]"
          >
            <motion.div variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{duration:.75,ease}} }}>
              <span className="eyebrow mb-8 block">Engineering the Future of Rail</span>
            </motion.div>

            <motion.h1
              variants={{ hidden:{opacity:0,y:56,filter:'blur(10px)'}, show:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:1.1,ease}} }}
              className="display-xl mb-10"
              style={{ lineHeight:.84 }}
              dangerouslySetInnerHTML={{
                __html: headline
                  .replace('<em>', '<span style="color:#E3510F;font-style:normal">')
                  .replace('</em>', '</span>')
              }}
            />

            <motion.p
              variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.85,ease}} }}
              className="text-[#8C98AA] text-[1rem] md:text-[1.08rem] leading-relaxed max-w-[580px] mb-14 font-light"
            >
              {subline.replace(/<[^>]*>/g, '')}
            </motion.p>

            <motion.div
              variants={{ hidden:{opacity:0,y:18}, show:{opacity:1,y:0,transition:{duration:.75,ease}} }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <Link href={btnLink} className="btn-flame group">
                <span>{btnText}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform"/>
              </Link>
              <Link href="/about-us" className="btn-wire group">
                <span>Our Story</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* System status panel */}
          <motion.div
            initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:1.4, duration:.9, ease }}
            className="absolute right-10 bottom-36 hidden xl:block"
          >
            <div className="glass p-7 w-[280px]" style={{ borderTopColor:'rgba(227,81,15,.3)', borderTopWidth:'1px' }}>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:'.52rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#1C2540' }} className="mb-6">
                AHIL · System Status
              </p>
              {[
                { l:'Quality Certified', v:'ISO 9001:2015' },
                { l:'RDSO Approved',     v:'Active'        },
                { l:'R&D Projects',      v:'Running'       },
              ].map(({ l, v }) => (
                <div key={l} className="flex items-center justify-between mb-4">
                  <span style={{ color:'#3D4A5C', fontSize:'.68rem', fontFamily:'var(--font-mono)' }}>{l}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                    <span style={{ color:'#EDF0F5', fontSize:'.68rem', fontFamily:'var(--font-mono)' }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8, duration:1.1 }}
          className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[.04]"
        >
          <div className="max-w-screen-xl mx-auto grid grid-cols-3 divide-x divide-white/[.04]">
            {[['10+','Years of Innovation'],['500+','Projects Delivered'],['100%','Client Satisfaction']].map(([n, l], i) => (
              <div key={i} className="px-10 py-6 hidden md:block text-center group cursor-default">
                <div className="text-[1.95rem] font-bold text-[#EDF0F5] mb-0.5 group-hover:text-[#E3510F] transition-colors duration-400" style={{ fontFamily:'var(--font-display)' }}>{n}</div>
                <div className="text-[.55rem] text-[#1C2540] uppercase tracking-[.25em]" style={{ fontFamily:'var(--font-mono)' }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.4 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 hidden md:flex"
        >
          <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}>
            <ChevronDown size={16} className="text-[#E3510F]"/>
          </motion.div>
          <div className="w-px h-10" style={{ background:'linear-gradient(to bottom,rgba(227,81,15,.45),transparent)' }}/>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SECTION 2 — CINEMATIC TRAIN SCROLL STORYTELLING      */}
      {/* ══════════════════════════════════════════════════════ */}
      <div ref={trainRef} style={{ height:'240vh', position:'relative' }}>
        <div style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden', background:'#030405' }}>

          {/* Backgrounds */}
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"/>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background:'radial-gradient(ellipse 90vw 65vh at 50% 58%,rgba(227,81,15,.055),transparent 65%)' }}/>

          {/* Perspective floor grid */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
            height:'42%',
            backgroundImage:'linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)',
            backgroundSize:'80px 44px',
            WebkitMaskImage:'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.7) 100%)',
            maskImage:'linear-gradient(to bottom,transparent 0%,rgba(0,0,0,.7) 100%)',
          }}/>

          {/* Vertical rules */}
          <div className="absolute inset-y-0 w-px hidden xl:block pointer-events-none"
            style={{ left:'16%', background:'linear-gradient(to bottom,transparent,rgba(255,255,255,.03),transparent)' }}/>
          <div className="absolute inset-y-0 w-px hidden xl:block pointer-events-none"
            style={{ left:'84%', background:'linear-gradient(to bottom,transparent,rgba(255,255,255,.03),transparent)' }}/>

          {/* Section rules */}
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background:'linear-gradient(90deg,transparent,rgba(227,81,15,.2),transparent)' }}/>
          <div className="absolute inset-x-0 bottom-0 h-px"
            style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)' }}/>

          {/* Light beam ahead of train */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              bottom:'68px',
              left:'calc(50vw - 820px)',
              width:'620px',
              height:'230px',
              background:'linear-gradient(180deg,rgba(255,230,80,.025) 0%,transparent 100%)',
              transformOrigin:'bottom left',
              transform:'rotate(-8deg)',
              opacity: lightBeam,
            }}
          />

          {/* Track + Train */}
          <div className="absolute pointer-events-none" style={{ bottom:'68px', left:0, right:0, height:'190px', overflow:'visible' }}>
            <TrackSVG/>
            <motion.div style={{ x: trainX, position:'absolute', bottom:0, display:'flex', alignItems:'flex-end' }}>
              <TrainSVG isMoving={isMoving}/>
            </motion.div>
          </div>

          {/* Story text */}
          <motion.div
            style={{ opacity: storyOpacity, y: storyY, paddingBottom:'230px' }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
          >
            <motion.p
              style={{ fontFamily:'var(--font-mono)', fontSize:'.55rem', letterSpacing:'.32em', textTransform:'uppercase', color:'rgba(227,81,15,.55)' }}
              className="mb-6"
            >
              AND Hitech Industries · Since 2013
            </motion.p>

            <h2
              className="text-center px-6"
              style={{
                fontFamily:'var(--font-display)',
                fontSize:'clamp(2.8rem,8.5vw,7.5rem)',
                lineHeight:.88,
                letterSpacing:'.03em',
                color:'#EDF0F5',
              }}
            >
              BUILT TO LAST.<br/>
              <span style={{ color:'#E3510F' }}>ENGINEERED</span> TO MOVE.
            </h2>

            <p
              className="mt-9 text-center max-w-[440px] px-6 leading-relaxed font-light"
              style={{ color:'#3D4A5C', fontSize:'clamp(.82rem,1.4vw,1rem)' }}
            >
              Precision-manufactured railway components trusted by Indian Railways, Metro networks, and critical infrastructure across India.
            </p>

            <div className="mt-12 w-16 h-px" style={{ background:'linear-gradient(90deg,rgba(227,81,15,.6),transparent)' }}/>
          </motion.div>

          {/* Corner markers */}
          <div className="absolute top-6 left-6 pointer-events-none hidden md:block">
            <div className="w-px h-8 bg-[#E3510F]/30"/>
            <div className="h-px w-8 bg-[#E3510F]/30"/>
            <p style={{ fontFamily:'var(--font-mono)', marginTop:8, fontSize:'.42rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#1C2540' }}>28°38′N 77°12′E</p>
          </div>
          <div className="absolute top-6 right-6 pointer-events-none hidden md:flex flex-col items-end">
            <div className="w-px h-8 bg-[#E3510F]/30 self-end"/>
            <div className="h-px w-8 bg-[#E3510F]/30 self-end"/>
            <p style={{ fontFamily:'var(--font-mono)', marginTop:8, fontSize:'.42rem', letterSpacing:'.22em', textTransform:'uppercase', color:'#1C2540' }}>New Delhi, India</p>
          </div>

          {/* Keep scrolling */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center gap-2 cursor-pointer group" onClick={scrollToContent}>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <div style={{ width:'1px', height:'32px', background:'linear-gradient(to bottom,rgba(227,81,15,.6),rgba(227,81,15,0))' }} className="group-hover:height-40 transition-all"/>
              <ChevronDown size={14} className="text-[#E3510F]/60 group-hover:text-[#E3510F] transition-colors" />
            </motion.div>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'.44rem', letterSpacing:'.28em', textTransform:'uppercase', color:'#1C2540' }} className="group-hover:text-[#E3510F]/60 transition-colors">Keep Scrolling</span>
          </div>
        </div>
      </div>
    </>
  );
}
