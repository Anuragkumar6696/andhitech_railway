'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ProductServicesSection = ({ products = [], categories = [] }) => {
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    if (categories.length > 0) {
      setActiveTab(categories[0].slug)
    }
  }, [categories])

  const filteredProducts = products.filter(
  (p) => p.category?.slug === activeTab
)

  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mission-vision-box1">
              {/* Tabs */}
              <div className="mission-vision-nav">
                <ul className="nav">
                  {categories
                    .filter(cat => cat.name?.toUpperCase() !== 'HVAC')
                    .map((cat) => (
                    <li key={cat.slug} className="nav-item">
                      <button
                        className={`nav-link ${activeTab === cat.slug ? 'active' : ''}`}
                        onClick={() => setActiveTab(cat.slug)}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tab content */}
              <div className="mission-vision-item">
                <div className="row">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div key={product.id} className="col-lg-3 col-md-6">
                        <div className="service-item">
                          <div className="icon-box">
                            <Image
                              src={product.icon}
                              alt={product.title}
                              width={60}
                              height={60}
                            />
                          </div>
                          <div className="service-body">
                            <h3 style={{fontFamily:'Inter, sans-serif'}}>{product.title}</h3>
                          </div>
                          <div className="service-footer">
                            <Link
                              href={`/products/${product.slug}`}
                              className="service-btn"
                            >
                              <Image
                                src="/images/arrow-dark.svg"
                                alt="arrow"
                                width={20}
                                height={20}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center">
                      <p>No products available for this category.</p>
                    </div>
                  )}
                </div>
              </div>
              {/* End Tab Content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductServicesSection
