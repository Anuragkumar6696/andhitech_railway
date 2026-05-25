'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-brand-dark/5 border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-brand-dark mb-8">Send Us a Message</h3>
      
      {isSuccess ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-100 p-8 rounded-2xl text-center"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h4 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h4>
          <p className="text-green-600">Thank you for reaching out. We'll get back to you shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">First Name</label>
              <input 
                type="text" 
                name="fname" 
                value={formData.fname} 
                onChange={handleChange} 
                className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/5 outline-none transition-all"
                placeholder="John" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Last Name</label>
              <input 
                type="text" 
                name="lname" 
                value={formData.lname} 
                onChange={handleChange} 
                className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/5 outline-none transition-all"
                placeholder="Doe" 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/5 outline-none transition-all"
                placeholder="john@example.com" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/5 outline-none transition-all"
                placeholder="+91 00000 00000" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Your Message</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              rows="4" 
              className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/5 outline-none transition-all resize-none"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-premium w-full py-5 text-lg flex items-center justify-center space-x-3"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={20} />
              </>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}
