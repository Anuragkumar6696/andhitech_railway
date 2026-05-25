'use client'

import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import Image from 'next/image';

export default function PressPage() {
  const [pressItems, setPressItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPress = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news-media/`);
        if (!res.ok) throw new Error('Failed to fetch press data');
        const data = await res.json();
        setPressItems(data.results || []);
      } catch (err) {
        console.error('Error loading press releases:', err);
        setPressItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPress();
  }, []);

  return (
    <>
      <Header />
      <PageBanner title="News & Media" backgroundImage="/images/page-header-bg.jpg" currentPage="News & Media" />

      <div className="section-title text-center mt-4">
        <h2 className="text-anime-style-2" data-cursor="-opaque">
          Press Release & <span>Media</span>
        </h2>
        <p>Latest News, Features, and Mentions</p>
      </div>

      <section className="press-release-section container py-5">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : pressItems.length === 0 ? (
          <div className="text-center">No press releases found.</div>
        ) : (
          pressItems.map((item) => (
            <div className="press-item" key={item.id}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="responsive"
                  width={500}
                  height={300}
                />
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </a>
              <a href={item.link} className="readmorebtn" target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))
        )}
      </section>

      <Footer />
    </>
  );
}
