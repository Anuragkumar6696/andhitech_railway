'use client';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

/* ─── Lightbox Component ─────────────────────────────────────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0); // -1 prev | 1 next
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const total = images.length;

  /* Prevent background scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  /* Swipe support */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(3,4,5,0.97)', backdropFilter: 'blur(12px)' }}
      /* data-lenis-prevent stops Lenis from capturing scroll inside this overlay */
      data-lenis-prevent
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        aria-label="Close lightbox"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-[#E3510F] hover:text-[#E3510F] transition-all duration-200"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full text-sm font-mono text-white/50 border border-white/8"
        style={{ background: 'rgba(0,0,0,0.5)', letterSpacing: '0.08em' }}
      >
        {current + 1} / {total}
      </div>

      {/* Prev arrow */}
      <button
        aria-label="Previous image"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-4 md:left-8 z-10 flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-white/60 hover:text-[#E3510F] hover:border-[#E3510F] transition-all duration-200"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next arrow */}
      <button
        aria-label="Next image"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-4 md:right-8 z-10 flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-white/60 hover:text-[#E3510F] hover:border-[#E3510F] transition-all duration-200"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Image container */}
      <div
        className="relative w-full h-full flex items-center justify-center px-20"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1400px', margin: '0 auto' }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
            style={{ height: 'calc(100vh - 120px)' }}
          >
            <Image
              src={images[current].image}
              alt={images[current].caption || `Gallery image ${current + 1}`}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption removed as per request */}
      </div>

      {/* Dot indicators */}
      {total <= 16 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to image ${i + 1}`}
              onClick={(e) => { e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: i === current ? 3 : '50%',
                background: i === current ? '#E3510F' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Gallery Component ─────────────────────────────────────────── */
export default function InfrastructureGallerySections({ sections = [] }) {
  const [lightbox, setLightbox] = useState(null); // { images, index }

  if (!sections?.length) return null;

  const openLightbox = (images, index) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);

  /* Override images per section based on title */
  const enhancedSections = sections.map((section) => {
    const t = section.title?.toLowerCase() || '';
    const isBrakeProduction = t.includes('brake pads') || t.includes('brake blocks');
    const isRMPUDevelopment = t.includes('rmpu') && (t.includes('development') || t.includes('testing'));
    const isAssemblyQC = t.includes('assembly') || t.includes('qc') || t.includes('testing');
    const isProductionUnits = t.includes('production units');
    const isPrecisionMachining = t.includes('precision machining');

    if (isBrakeProduction) {
      return {
        ...section,
        images: Array.from({ length: 8 }, (_, i) => ({
          image: `/images/infra/brake/image${i + 1}.jpg`,
          caption: `Brake Production ${i + 1}`,
        })),
      };
    }
    if (isRMPUDevelopment) {
      return {
        ...section,
        images: Array.from({ length: 8 }, (_, i) => ({
          image: `/images/infra/rmpu-testing/image${i + 1}.jpg`,
          caption: `RMPU Testing ${i + 1}`,
        })),
      };
    }
    if (isAssemblyQC) {
      return {
        ...section,
        images: Array.from({ length: 9 }, (_, i) => ({
          image: `/images/infra/assembly/image${i + 1}.jpg`,
          caption: `Assembly & QC ${i + 1}`,
        })),
      };
    }
    if (isProductionUnits) {
      return {
        ...section,
        images: [
          ...Array.from({ length: 3 }, (_, i) => ({ image: `/images/infra/production/image${i + 1}.jpg`, caption: `Production Unit ${i + 1}` })),
          { image: '/images/infra/production/image4.png', caption: 'Production Unit 4' },
          ...Array.from({ length: 4 }, (_, i) => ({ image: `/images/infra/production/image${i + 5}.jpg`, caption: `Production Unit ${i + 5}` })),
        ],
      };
    }
    if (isPrecisionMachining) {
      return {
        ...section,
        images: Array.from({ length: 7 }, (_, i) => ({
          image: `/images/infra/precision-machining/image${i + 1}.jpg`,
          caption: `Machining Center ${i + 1}`,
        })),
      };
    }
    return section;
  });

  return (
    <section className="py-20 bg-[#07080C] relative">
      <div className="absolute inset-0 bg-grid-eng opacity-30 pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="eyebrow mb-5 block">Facility Gallery</span>
          <h2 className="display-md max-w-xl">
            Our <span style={{ color: '#E3510F' }}>Manufacturing Facilities</span>
          </h2>
        </motion.div>

        <div className="space-y-16">
          {enhancedSections.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {section.title && (
                <h3 className="text-[#F0F2F5] font-semibold text-lg mb-7 flex items-center gap-3">
                  <span className="accent-line" />
                  {section.title}
                </h3>
              )}

              {section.images?.length > 0 && (
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{ delay: 4000, disableOnInteraction: true }}
                  pagination={{ clickable: true }}
                  navigation={false}
                  spaceBetween={16}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="!pb-10"
                >
                  {section.images.map((img, ii) => (
                    <SwiperSlide key={ii}>
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label={`View ${img.caption || `image ${ii + 1}`} in lightbox`}
                        className="relative h-56 rounded-xl overflow-hidden border border-white/6 group cursor-pointer hover:scale-[1.03] transition-all duration-500"
                        onClick={() => openLightbox(section.images, ii)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') openLightbox(section.images, ii);
                        }}
                      >
                        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                          <Image
                            src={img.image}
                            alt={img.caption || `Gallery ${ii + 1}`}
                            fill
                            className="object-cover opacity-80"
                            unoptimized
                          />
                        </div>
                        {/* Hover overlay hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.35)' }}>
                          <div className="flex items-center gap-2 text-white text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20" style={{ background: 'rgba(0,0,0,0.6)' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                            Expand
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Portal */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.index}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
