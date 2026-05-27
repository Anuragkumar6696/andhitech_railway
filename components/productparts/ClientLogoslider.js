"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

export default function ClientLogoslider({ logos = [] }) {
  return (
    <div className="client-logo-slider">
      <div className="container">
        <div className="row section-row align-items-center mt-5">
          <div className="col-lg-12 text-center">
            <div className="wow fadeInUp section-heading">
              <span>Our Customers</span>
            </div>

            <Swiper
              modules={[Autoplay]}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 2 },
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                992: { slidesPerView: 6 },
              }}
              className="customer-swiper"
            >
              {logos.map((logo) => (
                <SwiperSlide key={logo.id}>
                  <div className="company-logo flex items-center justify-center p-4 transition-all duration-500" title={logo.alt_text}>
                    <Image
                      src={logo.image}
                      alt={logo.alt_text || "Client Logo"}
                      width={140}
                      height={140}
                      className="opacity-70 brightness-110 contrast-125 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 scale-110"
                      unoptimized // Remove if using local/static images
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
