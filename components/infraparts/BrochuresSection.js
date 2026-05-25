'use client'

import React from 'react'
import Link from 'next/link'

const BrochuresSection = ({ brochures }) => {
  return (
    <section className="pt-5 pb-5 bg-light">
      <div className="container">
        <div className="section-title text-center mb-4">
          <h2 className="text-anime-style-2" data-cursor="-opaque">
            Downloadable <span>Brochures & Plant Capabilities</span>
          </h2>
          <p>Discover our company brochures, plant capabilities, and other resources in PDF format.</p>
        </div>

        <div className="row">
          {brochures?.map((brochure, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="brochure-box p-4 text-center bg-white rounded shadow-sm">
                <div className="mb-3">
                  <i className="fa-solid fa-file-pdf fa-3x"></i>
                </div>
                <h5>{brochure.title}</h5>

                {brochure.pdf_file ? (
                  <Link
                    href={brochure.pdf_file}
                    target="_blank"
                    download
                    className="pdf-btn mt-3 d-inline-block"
                  >
                    <i className="fa-solid fa-download me-2"></i>Download PDF
                  </Link>
                ) : (
                  <p className="text-muted">File not available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrochuresSection
