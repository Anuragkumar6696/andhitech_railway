'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

/*
 * ContactCTA — Final CTA section
 * Layout: 2 columns — office image | contact details + CTAs
 * Background: ivory
 */

const ease = [.22, 1, .36, 1];

const contacts = [
  { Icon: Phone,  label: 'Sales & Engineering Enquiries', sub: 'Call or WhatsApp during business hours' },
  { Icon: Mail,   label: 'info@andhitech.com',            sub: 'General & Technical Correspondence' },
  { Icon: MapPin, label: 'Jaipur, Rajasthan, India',      sub: 'Head Office & Manufacturing Facility' },
];

export default function ContactCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#F7F5F0' }}
      aria-label="Contact AND Hitech Industries"
    >
      <div className="absolute inset-0 bg-dots opacity-55 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px divider-light pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: office image ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .9, ease }}
            className="relative"
          >
            <div
              className="overflow-hidden relative"
              style={{ height: 440, borderRadius: '4px', background: '#0F2847' }}
            >
              <Image
                src="/images/office.jpg"
                alt="AND Hitech Industries corporate office"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={e => { e.currentTarget.src = '/images/about-img-1.jpg'; }}
              />
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(11,31,58,.38) 0%, transparent 60%)',
                }}
              />
              {/* Copper corner frame */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '32px', height: '32px',
                borderLeft: '2px solid rgba(184,135,70,.55)',
                borderTop: '2px solid rgba(184,135,70,.55)',
                borderRadius: '4px 0 0 0',
              }} />
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: .7, ease, delay: .3 }}
              style={{
                position: 'absolute', bottom: -16, right: -8,
                padding: '14px 18px', borderRadius: '4px',
                background: '#0B1F3A', border: '1px solid rgba(184,135,70,.2)',
                boxShadow: '0 20px 48px rgba(0,0,0,.2)',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#0F766E',
                animation: 'pulse-anim 2s infinite',
              }} />
              <div>
                <div style={{ color: '#fff', fontSize: '.78rem', fontWeight: 600 }}>Available for Enquiries</div>
                <div style={{ color: 'rgba(255,255,255,.35)', fontSize: '.62rem' }}>Mon–Sat, 9AM–6PM IST</div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: contact content ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: .9, ease }}
          >
            <div className="label-dark mb-4">Partner With Us</div>
            <h2 className="display-md-dark leading-tight mb-4">
              Ready to Discuss Your<br />
              <span className="text-copper">Engineering Requirements?</span>
            </h2>
            <div className="accent mb-6" />
            <p style={{ color: '#4A5568', lineHeight: 1.8, marginBottom: '28px', fontSize: '.9rem' }}>
              Whether you need HVAC systems for rolling stock, precision brake components, or a custom engineering solution — our team supports your project from concept through to certified delivery.
            </p>

            {/* Contact items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {contacts.map(({ Icon, label, sub }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '6px', flexShrink: 0,
                    background: 'rgba(11,31,58,.06)', border: '1px solid rgba(184,135,70,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={16} color="#B88746" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '.88rem', color: '#0B1F3A' }}>{label}</div>
                    <div style={{ fontSize: '.73rem', color: '#6B7A8E' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link href="/contact" className="btn-primary group inline-flex items-center gap-2">
                <span>Get a Quote</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/products" className="btn-copper inline-flex items-center gap-2">
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
