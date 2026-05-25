'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactInfo() {
  const infoItems = [
    {
      icon: <Phone className="text-brand-orange" size={24} />,
      title: "Call Us",
      content: "+91 11-25710064",
      link: "tel:+911125710064"
    },
    {
      icon: <Mail className="text-brand-orange" size={24} />,
      title: "Email Us",
      content: "Info@andhitech.in",
      link: "mailto:Info@andhitech.in"
    },
    {
      icon: <MapPin className="text-brand-orange" size={24} />,
      title: "Our Address",
      content: "509, 5th floor, Kirti Mahal Building 19, Rajendra Place, New Delhi – 110008, India.",
      link: "https://maps.google.com"
    },
    {
      icon: <Clock className="text-brand-orange" size={24} />,
      title: "Working Hours",
      content: "Mon - Sat: 9:00 AM - 6:00 PM",
      link: "#"
    }
  ];

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center mb-4">
          <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">Get In Touch</span>
        </div>
        <h2 className="text-4xl font-extrabold text-brand-dark leading-tight mb-6">
          Ready to Start Your <span className="text-brand-orange">Next Project?</span>
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Reach out for any inquiries, support, or to discuss how we can meet your industrial needs with precision and excellence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {infoItems.map((item, idx) => (
          <motion.a
            key={idx}
            href={item.link}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start space-x-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-brand-dark/5 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">{item.title}</h3>
              <p className="text-brand-dark font-bold text-lg leading-snug">{item.content}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
