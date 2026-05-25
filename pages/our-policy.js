'use client';

import React from 'react';
import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';

export default function OurPolicy() {
  return (
    <>
      <Header />
      <PageBanner
        title="Our Policy"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Our Policy"
      />

      <section className="py-20 bg-gray-50 text-gray-800">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
         
          {/* Quality Policy */}
          <div className="mt-4">
            <h4 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4 border-l-4 border-blue-600 pl-4">
               Quality Policy
            </h4>
            
            <p className="mb-4 leading-relaxed">
              <strong>AND HITECH INDUSTRIES PVT. LTD</strong> is committed to strive for market leadership through customer satisfaction in the field of professional grade Rail Equipment System using state of art technology, maintaining international standards of quality at competitive cost by continual improvement in the quality management system with the help of highly educated and dedicated professionals competent work force.
            </p>
            <p className="mb-6 leading-relaxed">
              Everyone is responsible for upholding quality within the company and for maintaining the highest possible standards.
            </p>
          </div>

          {/* Quality Objectives */}
          <div className="mb-12">
            <h4 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4 border-l-4 border-blue-600 pl-4">
              Quality Objectives
            </h4>
            <ul className="space-y-4 list-none pl-4">
              {[
                "Total customer satisfaction by providing high level of Quality on our products and services at competitive costs.",
                "100% reduction in every reported case of “Zero Hour” failure at customer’s end.",
                "To achieve timely delivery for 100% orders, subject to agreed terms and conditions.",
                "To provide customer support and service within 24-48 Hours of the complaint.",
                "Continual upgradation of Technology to enhance product life and reliability through systemized manufacturing and installation process.",
                "Product Quality enhancement through quality raw materials, strict adherence to drawings and specifications, minimizing of rejections, quality assurance through testing and measurement, and through inspection at all levels of production and before dispatch.",
                "Continuous in-house and external training of all employees to upgrade their knowledge and improve their skills.",
                "Provide facilities and work environment that is Safe, Healthy and Clean.",
                "Generation and dissemination of knowledge to generate and sustain efforts of conservation, development and efficient management of energy and resources for environmental protection.",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                  <CheckCircle className="text-blue-600 mt-1 w-5 h-5" />
                  <span> {item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Safety Policy */}
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4 border-l-4 border-blue-600 pl-4">
              Product Safety Policy
            </h4>
            <p className="mb-4 leading-relaxed">
              And Hitech Industries Pvt Ltd. is committed to ensure 'Trusted to deliver excellence' as our brand promise and our commitment to product safety is the critical part of this. Whether delivered separately or integrated into systems We adhere to five principles which govern our approach to product safety.
            </p>

            <ol className="list-decimal list-inside space-y-4 pl-2 text-gray-700 leading-relaxed">
              <li>
                <strong>Leadership commitment and accountability:</strong> Our leaders champion product safety and prioritise it, so that safety-related tasks get the right attention, time and resources. We make accountability for product safety and ensure people understand what they are accountable for.
              </li>
              <li>
                <strong>Level of product safety:</strong> We design our process to manufacture the products to achieve a high level of safety, consistent with their application, always ensuring that we meet or better the relevant company’s legal, regulatory and industry requirements. We assess what could go wrong and put controls in place to meet the required safety levels and reduce the safety risks so far as is reasonably practicable.
              </li>
              <li>
                <strong>Maintaining and improving product safety:</strong> We are committed to the continual improvement of product safety and actively engage in meeting the industry standards and good practice. We measure our performance and rigorously investigate and resolve safety related issues, systematically and embedding the learning from these, back into our practices and processes. Everyone is encouraged to report any product safety concerns.
              </li>
              <li>
                <strong>Conforming product:</strong> Robust quality is an essential building block of product safety and by following our processes we ensure that our products and those of our suppliers conform to their specifications.
              </li>
              <li>
                <strong>Safety awareness and competence:</strong> Everyone who works in And Hitech Industries Pvt Ltd shares responsibility for product safety and is mindful of the safety implications of our actions. Training is provided so that our people understand our Product Safety Policy and processes and can fulfil their collective and personal responsibility.
                </li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </> 
  );
}
