'use client';

import Image from 'next/image';

const HowWeDoItSection = () => {
  return (
    <div className="service-what-we-do">
      <div className="container-fluid">
        <div className="row no-gutters">
          {/* Image */}
          <div className="col-lg-6">
            <div className="what-we-do-image">
              <figure className="image-anime">
              <div style={{ position: 'relative', width: '100%', height: 'auto', aspectRatio: '7/6' }}>
  <Image
    src="/images/whatwedoimg2.jpg"
    alt="Track Maintenance Tamping"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>


              </figure>
            </div>
          </div>

          {/* Content */}
          <div className="col-lg-6">
            <div className="what-we-do-content">
              <div className="section-title">
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  How we <span>do it</span>
                </h2>
              </div>

              <div className="service-what-we-item-content">
                <p>
                  We have a dedicated R&D center, with access to the best design software
                </p>
                <div className="mission-vision-content-list">
                  <ul>
                    <li>SolidWorks,</li>
                    <li>Ansys,</li>
                    <li>AutoCAD</li>
                    <li>Unilab</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeDoItSection;
