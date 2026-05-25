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
    <div className="bg-white min-h-screen">
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

      <section className="py-24 relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
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
      <section className="h-[500px] w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.442751483861!2d77.17646277631338!3d28.646452583447144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02996d933e4f%3A0xc66579626359005!2sKirti%20Mahal%2C%2019%2C%20Rajendra%20Place%2C%20New%20Delhi%2C%20Delhi%20110008!5e0!3m2!1sen!2sin!4v1709456789012!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
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
