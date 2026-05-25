'use client'

import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'

const InteractiveGallery = ({ images }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$) {
      $('.popup-image1').magnificPopup('destroy').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
      })
    }
  }, [images])

  return (
    <section className="pt-5 pb-5">
      <div className="container">
        <div className="section-title text-center mb-4">
          <h2 className="text-anime-style-2" data-cursor="-opaque">
            Interactive <span>Gallery</span>
          </h2>
          <p>Explore our factory in action — images open in lightbox for a closer view.</p>
        </div>
      
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 }
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <a href={img.href} className="popup-image1">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="img-fluid"
                  unoptimized
                />
              </a>
            </SwiperSlide>
          ))}

          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>
    </section>
  )
}

export default InteractiveGallery
