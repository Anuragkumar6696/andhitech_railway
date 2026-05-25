'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fname: '', lname: '', email: '', phone: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormData({ fname: '', lname: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('An error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75 }}
      className="bg-white rounded-2xl p-8 md:p-12 shadow-xl shadow-[#0e0e0e]/6 border border-[#ede9e4]"
    >
      {/* Top accent */}
      <div className="h-[3px] bg-brand-orange rounded-full w-12 mb-7" />
      <h3
        className="text-2xl font-bold text-[#1a1a1a] mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Send Us a Message
      </h3>
      <p className="text-[#888] text-sm mb-9">Fill in the form below and our team will get back to you promptly.</p>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-100 p-10 rounded-xl text-center"
        >
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-5">
            <CheckCircle size={30} />
          </div>
          <h4 className="text-xl font-bold text-emerald-800 mb-2"
            style={{ fontFamily: 'var(--font-display)' }}>
            Message Sent!
          </h4>
          <p className="text-emerald-600 text-sm">Thank you for reaching out. We'll get back to you shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888]"
                style={{ fontFamily: 'var(--font-label)' }}>
                First Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bbb]" />
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  className="input-premium pl-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888]"
                style={{ fontFamily: 'var(--font-label)' }}>
                Last Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bbb]" />
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  placeholder="Smith"
                  className="input-premium pl-11"
                />
              </div>
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888]"
                style={{ fontFamily: 'var(--font-label)' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bbb]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@company.com"
                  className="input-premium pl-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888]"
                style={{ fontFamily: 'var(--font-label)' }}>
                Phone Number
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bbb]" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="input-premium pl-11"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888]"
              style={{ fontFamily: 'var(--font-label)' }}>
              Your Message
            </label>
            <div className="relative">
              <MessageSquare size={15} className="absolute left-4 top-5 text-[#bbb]" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe your project or inquiry..."
                className="input-premium pl-11 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-premium w-full justify-center flex items-center gap-3 py-4"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending…</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}
