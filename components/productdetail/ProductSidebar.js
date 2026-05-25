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
      <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center">
          <span className="w-1.5 h-6 bg-brand-orange rounded-full mr-3"></span>
          Product Categories
        </h3>
        <ul className="space-y-3">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat.id || cat.slug}>
                <Link 
                  href={`/products`}
                  className="flex items-center justify-between group p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300"
                >
                  <span className="text-gray-600 font-medium group-hover:text-brand-orange transition-colors">{cat.name}</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-orange transition-colors" />
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400 italic p-3 text-sm">No categories available</li>
          )}
        </ul>
      </div>

      {/* Brochure Download Widget */}
      {product?.brochure && (
        <div className="bg-brand-dark rounded-[2rem] p-8 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
          <h3 className="text-xl font-bold mb-4 relative z-10">Product Resources</h3>
          <p className="text-gray-400 text-sm mb-6 relative z-10">Get detailed technical specifications and data sheets for this product.</p>
          <a
            href={product.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-brand-orange/90 transition-all relative z-10"
          >
            <FileText size={20} />
            <span>Download PDF Brochure</span>
          </a>
        </div>
      )}

      {/* Enquiry Form Widget */}
      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-brand-dark/5">
        <h3 className="text-xl font-bold text-brand-dark mb-2">Quick Enquiry</h3>
        <p className="text-gray-500 text-sm mb-8">Interested in this product? Request a quote or more information.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="yourname" 
            value={formData.yourname} 
            onChange={handleChange} 
            placeholder="Your Name" 
            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:bg-white outline-none transition-all text-sm"
            required 
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email Address" 
            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:bg-white outline-none transition-all text-sm"
            required 
          />
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Phone Number" 
            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:bg-white outline-none transition-all text-sm"
            required 
          />
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="How can we help?" 
            rows="3"
            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-orange focus:bg-white outline-none transition-all text-sm resize-none"
          ></textarea>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full btn-premium flex items-center justify-center space-x-2 py-4"
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
      <div className="p-8 rounded-[2rem] bg-brand-orange/5 border border-brand-orange/10">
        <h4 className="text-brand-dark font-bold mb-4">Need Help?</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-orange shadow-sm">
              <Phone size={14} />
            </div>
            <a href="tel:011-25710064" className="text-gray-600 font-medium hover:text-brand-orange transition-colors">011-25710064</a>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-orange shadow-sm">
              <Mail size={14} />
            </div>
            <a href="mailto:Info@andhitech.in" className="text-gray-600 font-medium hover:text-brand-orange transition-colors">Info@andhitech.in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
