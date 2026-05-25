'use client'

import { useId } from 'react'

export default function FAQSection({ faqs }) {
  const accordionId = useId()

  if (!faqs || faqs.length === 0) return null

  return (
    <div className="our-faq-section">
      {/* Section Title */}
      <div className="section-title">
        <h2 className="text-anime-style-3" data-cursor="-opaque">
          Frequently asked <span>questions</span>
        </h2>
      </div>

      {/* FAQ Accordion */}
      <div className="faq-accordion" id={accordionId}>
        {faqs.map((faq, index) => {
          const headingId = `${accordionId}-heading-${index}`
          const collapseId = `${accordionId}-collapse-${index}`
          const delay = `${index * 0.2}s`
          const isFirst = index === 0

          return (
            <div
              className="accordion-item wow fadeInUp"
              data-wow-delay={delay}
              key={index}
            >
              <h2 className="accordion-header" id={headingId}>
                <button
                  className={`accordion-button ${!isFirst ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded={isFirst ? 'true' : 'false'}
                  aria-controls={collapseId}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={collapseId}
                className={`accordion-collapse collapse ${isFirst ? 'show' : ''}`}
                aria-labelledby={headingId}
                data-bs-parent={`#${accordionId}`}
              >
                <div className="accordion-body">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
