import React from "react";
import Header from "../components/Header";
import PageBanner from "../components/PageBanner";
import ContactInfo from "../components/Contact/ContactInfo";
import ContactForm from "../components/Contact/ContactForm";
import Footer from "../components/Footer";
import Head from "next/head";
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="page-bg min-h-screen">
      <Head>
        <title>Contact Us | AND Hitech</title>
        <meta name="description" content="Get in touch with AND HITECH INDUSTRIES LTD for premium industrial solutions." />
      </Head>

      <Header />
      
      <PageBanner
        title="Contact Us"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Contact"
      />

      <section className="py-24 relative overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B88746]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B88746]/3 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Info */}
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-[#0D1117] grayscale hover:grayscale-0 transition-all duration-1000 border-t border-white/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.884523321583!2d77.17572847585258!3d28.64433557565814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03c1ac2a06ed%3A0x9fd61c4eea0cef69!2sAND%20Hitech%20Industries%20Limited.%20(Corporate%20Office)!5e0!3m2!1sen!2sin!4v1717056000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
