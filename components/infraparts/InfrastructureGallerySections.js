'use client'

import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'

const InfrastructureGallerySections = ({ sections = [] }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$) {
      try {
        // re-init magnific-popup if present
        window.$('.popup-image1').magnificPopup('destroy').magnificPopup({
          type: 'image',
          gallery: { enabled: true }
        })
      } catch (e) {
        // silently ignore if magnificPopup isn't available
      }
    }
  }, [sections])

  return (
    <>
      {sections.map((section) => {
        const title = (section?.title || '').trim()
        const words = title.split(' ').filter(Boolean)
        const lastWord = words.pop() || ''
        const firstPart = words.join(' ')

        const imgs = Array.isArray(section?.images) ? section.images : []

        return (
          <section key={section.id} className="pt-5 pb-5">
            <div className="container">
              <div className="section-title text-center mb-4">
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  {section.title}
                </h2>
                {!!section.description && <p>{section.description}</p>}
              </div>

              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                navigation={{
                  nextEl: `.swiper-button-next-${section.id}`,
                  prevEl: `.swiper-button-prev-${section.id}`
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  576: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  992: { slidesPerView: 4 }
                }}
              >
                {imgs.map((img, index) => (
                  <SwiperSlide key={index}>
                    <a href={img.image} className="popup-image1">
                      <Image
                        src={img.image}
                        alt={img.alt_text || 'Gallery Image'}
                        width={600}
                        height={400}
                        className="img-fluid"
                        unoptimized
                      />
                    </a>
                  </SwiperSlide>
                ))}

                <div className={`swiper-button-next swiper-button-next-${section.id}`}></div>
                <div className={`swiper-button-prev swiper-button-prev-${section.id}`}></div>
              </Swiper>
            </div>
          </section>
        )
      })}
    </>
  )
}

export default InfrastructureGallerySections
