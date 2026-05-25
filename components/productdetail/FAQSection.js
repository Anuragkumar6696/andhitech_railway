'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQSection({ faqs }) {
  const [openIdx, setOpenIdx] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="section-label mb-6"><span>FAQ</span></div>
      <h2
        className="text-2xl font-bold text-[#1a1a1a] mb-8"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Frequently Asked <span className="text-brand-orange">Questions</span>
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-[#ede9e4] overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-[#f9f8f6] transition-colors"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span
                className={`font-bold text-[15px] leading-snug transition-colors ${openIdx === idx ? 'text-brand-orange' : 'text-[#1a1a1a] group-hover:text-brand-orange'}`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {faq.question}
              </span>
              <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${openIdx === idx ? 'bg-brand-orange text-white' : 'bg-[#f0ece8] text-[#888]'}`}>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-6 pb-6 border-t border-[#ede9e4]">
                    <p className="text-[#666] text-sm leading-relaxed pt-4">{faq.answer}</p>
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
