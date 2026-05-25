'use client';

import Image from 'next/image';

const WhatWeDoSection = () => {
  return (
    <div className="service-what-we-do">
      <div className="container-fluid">
        <div className="row no-gutters">
          {/* Content */}
          <div className="col-lg-6">
            <div className="what-we-do-content">
              <div className="section-title">
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  AND Hitech has 25+ <span>professional in R&D department.</span>
                </h2>
              </div>

              <div className="service-what-we-item-content">
                <p>
                  Our design team comprises of employees with:
                </p>
                <div className="mission-vision-content-list">
                  <ul>
                    <li>25+ years of experience in friction materials,</li>
                    <li>20+ years of experience in HVAC industry,</li>
                    <li>20+ years in precision manufacturing,</li>
                    <li>12+ years in shock absorbers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="col-lg-6">
            <div className="what-we-do-image">
              <figure className="image-anime">
                <div style={{ position: 'relative', width: '100%', height: 'auto', aspectRatio: '7/6' }}>
  <Image
    src="/images/whatwedoimg1.jpg"
    alt="Brake Disc Product"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>

                
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoSection;
