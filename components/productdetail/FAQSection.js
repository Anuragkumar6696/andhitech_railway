'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQSection({ faqs }) {
  const [open, setOpen] = useState(0);
  if (!faqs?.length) return null;
  return (
    <div className="space-y-4">
      <span className="eyebrow mb-6 block">FAQ</span>
      <h2 className="text-[#F0F2F5] text-2xl font-bold mb-8" style={{fontFamily:'var(--font-display)'}}>
        Frequently Asked <span style={{color:'#E3510F'}}>Questions</span>
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border border-white/6 overflow-hidden">
            <button onClick={() => setOpen(open===i?null:i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-white/[0.03] transition-colors">
              <span className={`font-semibold text-[15px] leading-snug transition-colors ${open===i?'text-[#E3510F]':'text-[#F0F2F5] group-hover:text-[#E3510F]'}`}>{faq.question}</span>
              <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${open===i?'bg-[#E3510F] text-white':'bg-white/5 text-[#5A6478]'}`}>
                <ChevronDown size={15} className={`transition-transform ${open===i?'rotate-180':''}`} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open===i && (
                <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.35 }}>
                  <div className="px-6 pb-6 border-t border-white/5">
                    <p className="text-[#9BA5B4] text-sm leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
