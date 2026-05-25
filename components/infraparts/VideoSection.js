'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

export default function VideoSection({ videos }) {
  const [modal, setModal] = useState(false);
  const [src, setSrc] = useState('');
  const v = videos?.[0];
  const open = () => { if (v?.video_url) { setSrc(`${v.video_url}?autoplay=1`); setModal(true); } };
  const close = () => { setSrc(''); setModal(false); };
  if (!v) return null;

  return (
    <>
      <section className="py-24 bg-[#0D1117] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="relative rounded-2xl overflow-hidden border border-white/6 group cursor-pointer" onClick={open}>
            <div className="relative h-[400px] md:h-[520px]">
              <Image src={v.thumbnail||'/images/ourprocess.jpg'} alt={v.title||'Video'} fill
                className="object-cover opacity-40 group-hover:opacity-55 group-hover:scale-[1.02] transition-all duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 via-[#0D1117]/20 to-transparent flex flex-col items-center justify-center text-center px-6">
              <motion.div whileHover={{ scale:1.12 }} transition={{ type:'spring', stiffness:300 }}
                className="w-24 h-24 rounded-full bg-[#E3510F] flex items-center justify-center shadow-2xl shadow-[#E3510F]/30 mb-8">
                <Play size={30} className="text-white fill-white ml-1" />
              </motion.div>
              {v.title && <h2 className="text-[#F0F2F5] font-bold max-w-2xl leading-tight" style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,3vw,2.4rem)',textShadow:'0 2px 20px rgba(0,0,0,0.8)'}}>{v.title}</h2>}
              {v.description && <p className="text-[#9BA5B4] mt-3 text-sm max-w-lg">{v.description}</p>}
            </div>
            <div className="absolute bottom-5 right-5 bg-white/8 backdrop-blur-sm border border-white/12 rounded-full px-4 py-2">
              <span className="text-[#9BA5B4] text-[10px] font-medium uppercase tracking-wider" style={{fontFamily:'var(--font-mono)'}}>Click to Play</span>
            </div>
          </motion.div>
        </div>
      </section>
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-[9999] bg-[#07080C]/96 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={close}>
            <motion.div initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-white/8"
              onClick={e=>e.stopPropagation()}>
              <iframe src={src} className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen />
              <button onClick={close}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#07080C]/70 flex items-center justify-center text-[#9BA5B4] hover:bg-[#E3510F] hover:text-white transition-colors">
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
