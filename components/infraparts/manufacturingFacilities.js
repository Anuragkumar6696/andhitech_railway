"use client";

import Image from "next/image";

export default function ManufacturingFacilities({
  subTitle,
  title,
  description,
  buttonLink,
  buttontext,
  facilitieslists,
}) {
  return (
    <div className="about-us">
      <div className="container">
        <div className="row align-items-center">
          {/* Intro Content */}
          <div className="col-lg-4">
            <div className="about-content mb-3">
              <div className="section-title">
                <h3 className="wow fadeInUp">{subTitle}</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  {title}
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.25s">
                  {description}
                </p>
              </div>
            </div>
            <a href={buttonLink} className="btn-default">
              <span>{buttontext}</span>
            </a>
          </div>

          {/* Facilities List */}
          {facilitieslists?.map((facility, index) => (
            <div className="col-lg-4" key={facility.id || index}>
              <div className="service-inner">
                <div className="service-thumbnail">
                  <Image
                    src={facility.image}
                    width={370}
                    height={200}
                    className="img-fluid"
                    alt={facility.title || "Facility Image"}
                  />
                </div>
                <div className="service-summary">
                  <span className="service-icon service-icon-1">
                    <Image
                      src={facility.icon}
                      width={50}
                      height={50}
                      className="img-fluid"
                      alt=""
                    />
                  </span>
                  <span className="service-icon service-icon-2">
                    <Image
                      src={facility.icon}
                      width={50}
                      height={50}
                      className="img-fluid"
                      alt=""
                    />
                  </span>
                  <div className="service-content">
                    <h2 className="service-title">
                      <a href="#">{facility.title}</a>
                    </h2>
                    <div className="service-excerpt">
                      <p>{facility.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
