"use client";

import Image from "next/image";
import Link from "next/link";

export default function WhatWeDo() {
  return (
    <div className="what-we-do">
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-lg-6">
            {/* What We Do Content Start */}
            <div className="what-we-do-content">
              {/* Section Title Start */}
              <div className="section-title dark-section">
                <h3 className="wow fadeInUp">what we do</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque" style={{ paddingBottom: "10px" }}>
                  Empowering Industry with {" "}
                  <span>Engineering Excellence</span>
                </h2>
              </div>
              {/* Section Title End */}

              {/* What We Do List Start */}
              <div className="what-we-do-list">
                <div className="what-we-do-list-box-1 pd-30">
                  {/* What We Do Item Start */}
                  <div className="what-we-do-item">
                    <div className="icon-box">
                      <Image
                        src="/images/icon-who-we-do-1.svg"
                        alt="Automation Solutions"
                        width={60}
                        height={60}
                        unoptimized
                      />
                    </div>
                    <div className="what-we-item-content">
                      <h3>Automation & Smart Manufacturing</h3>
                      <p>
                        Streamlining operations with integrated systems and modern technologies.
                      </p>
                    </div>
                  </div>
                  {/* What We Do Item End */}

                  {/* What We Do Item Start */}
                  <div className="what-we-do-item">
                    <div className="icon-box">
                      <Image
                        src="/images/icon-who-we-do-2.svg"
                        alt="Quality Control"
                        width={60}
                        height={60}
                        unoptimized
                      />
                    </div>
                    <div className="what-we-item-content">
                      <h3>Advanced Quality Control</h3>
                      <p>
                        Ensuring uncompromised product performance through rigorous testing and standards.
                      </p>
                    </div>
                  </div>
                  {/* What We Do Item End */}
                </div>

                <div className="what-we-do-list-box-2">
                  {/* What We Do Item Start */}
                  <div className="what-we-do-item">
                    <div className="icon-box">
                      <Image
                        src="/images/icon-who-we-do-3.svg"
                        alt="Process Engineering"
                        width={60}
                        height={60}
                        unoptimized
                      />
                    </div>
                    <div className="what-we-item-content">
                      <h3>Process Engineering & Optimization</h3>
                      <p>
                        Enhancing manufacturing workflows for greater speed, accuracy, and scalability.
                      </p>
                    </div>
                  </div>
                  {/* What We Do Item End */}

                  {/* What We Do Item Start */}
                  <div className="what-we-do-item">
                    <div className="icon-box">
                      <Image
                        src="/images/icon-who-we-do-4.svg"
                        alt="Product Development"
                        width={60}
                        height={60}
                        unoptimized
                      />
                    </div>
                    <div className="what-we-item-content">
                      <h3>Custom Product Development</h3>
                      <p>
                        Collaborating with clients to design and deliver components tailored to real-world demands
                      </p>
                    </div>
                  </div>
                  {/* What We Do Item End */}
                </div>
              </div>
              {/* What We Do List End */}

              {/* What We Do Footer Start */}
              <div className="what-we-do-footer">
                <p>
                  We deliver end-to-end manufacturing solutions that combine innovation, precision, and efficiency across every stage of production.
                </p>
              </div>
              {/* What We Do Footer End */}
            </div>
            {/* What We Do Content End */}
          </div>

          <div className="col-lg-6">
            {/* What We Do Image Start */}
            <div className="what-we-do-image">
             <figure className="image-anime responsive-image-container">
  <Image
    src="/images/whatwedorightimage.jpg"
    alt="What We Do"
    fill
    className="object-cover"
    unoptimized
    priority
  />
</figure>

              {/* Contact Now Circle Start */}
              <div className="contact-now-circle">
                <Link href="/contact">
    <Image
      src="/images/contact-now-circle.svg"
      alt="Contact Now"
      width={100}
      height={100}
      unoptimized
      className="cursor-pointer"
    />
  </Link>
              </div>
              {/* Contact Now Circle End */}
            </div>
            {/* What We Do Image End */}
          </div>
        </div>
      </div>
    </div>
  );
}
