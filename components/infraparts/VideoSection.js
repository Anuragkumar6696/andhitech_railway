'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const VideoSection = ({ videos }) => {
  const [showModal, setShowModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  const videoData = videos?.[0]; // Use first video from array

  const openModal = () => {
    if (videoData?.video_url) {
      const urlWithAutoplay = `${videoData.video_url}?autoplay=1`;
      setVideoSrc(urlWithAutoplay);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setVideoSrc('');
    setShowModal(false);
  };

  if (!videoData) return null;

  return (
    <>
      <section className="py-24 bg-brand-dark overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden group">
            {/* Thumbnail */}
            <Image
              src={videoData.thumbnail || "/images/video-thumb-placeholder.jpg"}
              alt={videoData.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
            />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <button 
                  onClick={openModal}
                  className="w-24 h-24 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-2xl shadow-brand-orange/40 hover:scale-110 transition-transform duration-300 group/play"
                >
                  <Play size={32} className="fill-current ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl"
              >
                {videoData.title}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed"
              >
                {videoData.description}
              </motion.p>
            </div>

            {/* Glassmorphism Badge */}
            <div className="absolute bottom-10 left-10 z-20 hidden md:block">
              <div className="glass-dark px-6 py-4 rounded-2xl flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                  <Play size={18} />
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-sm">Watch Our Facility</div>
                  <div className="text-gray-400 text-xs">Engineering in motion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          >
            <button
              onClick={closeModal}
              className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-brand-orange transition-colors duration-300"
            >
              <X size={24} />
            </button>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <iframe
                src={videoSrc}
                title={videoData.title}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="autoplay"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoSection;
