'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Send, ChevronRight, Phone, Mail } from 'lucide-react';

export default function ProductSidebar({ product, categories = [] }) {
  const [formData, setFormData] = useState({
    yourname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      product_name: product?.title || 'Unknown',
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product-enquiry/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert('Enquiry submitted successfully!');
        setFormData({ yourname: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to submit enquiry.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Categories Widget */}
      <div className="bg-[#0B1F3A] rounded-2xl p-8 border border-white/5 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="w-1.5 h-6 bg-[#B88746] rounded-full mr-3"></span>
          Product Categories
        </h3>
        <ul className="space-y-3">
          {categories.length > 0 ? (
            categories
              .filter(cat => cat.name?.toUpperCase() !== 'HVAC')
              .map((cat) => (
              <li key={cat.id || cat.slug}>
                <Link 
                  href={`/products`}
                  className="flex items-center justify-between group p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-[#6B7A8E] font-medium group-hover:text-[#B88746] transition-colors">{cat.name}</span>
                  <ChevronRight size={16} className="text-white/20 group-hover:text-[#B88746] transition-colors" />
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic p-3 text-sm">No categories available</li>
          )}
        </ul>
      </div>

      {/* Brochure Download Widget */}
      {product?.brochure && (
        <div className="bg-[#0B1F3A] rounded-2xl p-8 text-white relative overflow-hidden group border border-white/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B88746]/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
          <h3 className="text-xl font-bold mb-4 relative z-10">Product Resources</h3>
          <p className="text-[#6B7A8E] text-sm mb-6 relative z-10">Get detailed technical specifications and data sheets for this product.</p>
          <a
            href={product.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-[#B88746] text-white py-4 rounded-xl font-bold hover:bg-[#B88746]/90 transition-all relative z-10"
          >
            <FileText size={20} />
            <span>Download PDF Brochure</span>
          </a>
        </div>
      )}

      {/* Enquiry Form Widget */}
      <div className="bg-[#0B1F3A] rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine opacity-10 pointer-events-none" />
        <h3 className="text-xl font-bold text-white mb-2 relative z-10">Quick Enquiry</h3>
        <p className="text-[#6B7A8E] text-sm mb-8 relative z-10">Interested in this product? Request a quote or more information.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <input 
            type="text" 
            name="yourname" 
            value={formData.yourname} 
            onChange={handleChange} 
            placeholder="Your Name" 
            className="w-full bg-white/[.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-[#6B7A8E] focus:border-[#B88746]/50 outline-none transition-all text-sm"
            required 
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email Address" 
            className="w-full bg-white/[.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-[#6B7A8E] focus:border-[#B88746]/50 outline-none transition-all text-sm"
            required 
          />
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Phone Number" 
            className="w-full bg-white/[.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-[#6B7A8E] focus:border-[#B88746]/50 outline-none transition-all text-sm"
            required 
          />
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="How can we help?" 
            rows="3"
            className="w-full bg-white/[.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-[#6B7A8E] focus:border-[#B88746]/50 outline-none transition-all text-sm resize-none"
          ></textarea>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#B88746] text-white flex items-center justify-center space-x-2 py-4 rounded-xl font-bold hover:bg-[#B88746]/90 transition-all shadow-lg shadow-[#B88746]/20"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Send Request</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Direct Support Widget */}
      <div className="p-8 rounded-2xl bg-white/[.02] border border-white/5">
        <h4 className="text-white font-bold mb-4">Need Help?</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#B88746] shadow-sm">
              <Phone size={14} />
            </div>
            <a href="tel:011-25710064" className="text-[#6B7A8E] font-medium hover:text-[#B88746] transition-colors">011-25710064</a>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#B88746] shadow-sm">
              <Mail size={14} />
            </div>
            <a href="mailto:Info@andhitech.in" className="text-[#6B7A8E] font-medium hover:text-[#B88746] transition-colors">Info@andhitech.in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
