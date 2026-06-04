'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const ease = [.22, 1, .36, 1];

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#F7F5F0' }}>
      <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px divider-light" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: office image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .9, ease }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden relative" style={{ height: 420 }}>
              <Image src="/images/office.jpg" alt="AND Hitech Corporate Office" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,31,58,.4) 0%, transparent 60%)' }} />
              <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#B88746]/60 rounded-tl-2xl" />
            </div>
            {/* Reception badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .7, ease, delay: .3 }}
              className="absolute -bottom-6 -right-4 p-5 rounded-xl shadow-xl"
              style={{ background: '#0B1F3A', border: '1px solid rgba(184,135,70,.2)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#0F766E]" style={{ animation: 'pulse 2s infinite' }} />
                <div>
                  <div className="text-white text-[.8rem] font-medium">Available for Enquiries</div>
                  <div className="text-white/40 text-[.65rem]">Mon–Sat, 9AM–6PM IST</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: contact content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .9, ease }}
          >
            <div className="label-dark mb-4">Partner With Us</div>
            <h2 className="display-md-dark mb-4 leading-tight">
              Ready to Discuss Your<br />
              <span className="text-copper">Engineering Requirements?</span>
            </h2>
            <div className="accent mb-6" />
            <p className="text-[#4A5568] leading-relaxed mb-8 text-[.92rem]">
              Whether you need HVAC systems for your rolling stock, precision brake components, or custom engineering solutions, our team is ready to support your project from concept to certified delivery.
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              {[
                { Icon: Phone, label: '+91 141 123 4567', sub: 'Sales & Engineering Enquiries' },
                { Icon: Mail,  label: 'info@andhitech.com', sub: 'General & Technical Correspondence' },
                { Icon: MapPin, label: 'Jaipur, Rajasthan', sub: 'Head Office & Manufacturing' },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(11,31,58,.06)', border: '1px solid rgba(184,135,70,.2)' }}>
                    <Icon size={16} className="text-[#B88746]" />
                  </div>
                  <div>
                    <div className="text-[#0B1F3A] font-semibold text-[.88rem]">{label}</div>
                    <div className="text-[#6B7A8E] text-[.74rem]">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link href="/contact" className="btn-primary group inline-flex items-center gap-2">
                <span>Get a Quote</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/products" className="btn-copper inline-flex items-center gap-2">
                View Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
