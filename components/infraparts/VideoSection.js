'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

export default function VideoSection({ videos }) {
  const [showModal, setShowModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const videoData = videos?.[0];

  const openModal = () => {
    if (videoData?.video_url) {
      setVideoSrc(`${videoData.video_url}?autoplay=1`);
      setShowModal(true);
    }
  };
  const closeModal = () => { setVideoSrc(''); setShowModal(false); };

  if (!videoData) return null;

  return (
    <>
      <section className="py-24 bg-[#0e0e0e] overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
            onClick={openModal}
          >
            {/* Thumbnail */}
            <div className="relative h-[420px] md:h-[540px]">
              <Image
                src={videoData.thumbnail || '/images/ourprocess.jpg'}
                alt={videoData.title || 'Video'}
                fill
                className="object-cover opacity-50 group-hover:opacity-60 group-hover:scale-[1.02] transition-all duration-700"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/70 via-[#0e0e0e]/20 to-transparent flex flex-col items-center justify-center text-center px-6">
              {/* Play button */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-24 h-24 rounded-full bg-brand-orange flex items-center justify-center shadow-2xl shadow-brand-orange/40 mb-8"
              >
                <Play size={32} className="text-white fill-white ml-1" />
              </motion.div>

              {videoData.title && (
                <h2
                  className="font-extrabold text-white max-w-2xl leading-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  {videoData.title}
                </h2>
              )}
              {videoData.description && (
                <p className="text-white/60 mt-4 text-sm max-w-lg">{videoData.description}</p>
              )}
            </div>

            {/* Click hint */}
            <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2">
              <span className="text-white/70 text-[11px] font-bold uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-label)' }}>
                Click to Play
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#0e0e0e]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={videoSrc}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0e0e0e]/70 flex items-center justify-center text-white hover:bg-brand-orange transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
