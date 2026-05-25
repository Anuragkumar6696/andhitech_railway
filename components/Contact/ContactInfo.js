'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const contactDetails = [
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['Info@andhitech.in'],
    href: 'mailto:Info@andhitech.in',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['011-25710064'],
    href: 'tel:01125710064',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['509, 5th floor, Kirti Mahal Building 19,', 'Rajendra Place, New Delhi – 110008, India.'],
    href: 'https://maps.google.com/?q=Kirti+Mahal+Rajendra+Place+New+Delhi',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Monday – Saturday: 9:00 AM – 6:00 PM', 'Sunday: Closed'],
    href: null,
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75 }}
      className="space-y-8"
    >
      <div>
        <div className="section-label mb-5">
          <span>Reach Out</span>
        </div>
        <h2 className="section-heading mb-4">
          Let's Start a <span>Conversation</span>
        </h2>
        <p className="text-[#666] text-[15px] leading-relaxed">
          Whether you have a project inquiry, need technical information, or simply want to learn more about our products, our team is here to help.
        </p>
      </div>

      <div className="space-y-4">
        {contactDetails.map(({ icon: Icon, title, lines, href }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            {href ? (
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex gap-4 p-5 rounded-xl bg-[#f9f8f6] border border-[#ede9e4] hover:border-brand-orange/25 hover:shadow-md transition-all duration-350 group"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange transition-colors duration-350">
                  <Icon size={18} className="text-brand-orange group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-orange mb-1"
                    style={{ fontFamily: 'var(--font-label)' }}>
                    {title}
                  </div>
                  {lines.map((line, i) => (
                    <div key={i} className="text-[#3a3a3a] text-[14px] font-medium">{line}</div>
                  ))}
                </div>
              </a>
            ) : (
              <div className="flex gap-4 p-5 rounded-xl bg-[#f9f8f6] border border-[#ede9e4]">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <Icon size={18} className="text-brand-orange" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-orange mb-1"
                    style={{ fontFamily: 'var(--font-label)' }}>
                    {title}
                  </div>
                  {lines.map((line, i) => (
                    <div key={i} className="text-[#3a3a3a] text-[14px] font-medium">{line}</div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick CTA */}
      <div className="pt-4">
        <Link href="/products" className="btn-outline inline-flex items-center gap-2">
          <MessageCircle size={16} />
          <span>View Our Products</span>
        </Link>
      </div>
    </motion.div>
  );
}
