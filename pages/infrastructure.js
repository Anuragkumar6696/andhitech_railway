'use client'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import InfraSection from '@/components/infraparts/InfraSection'
import CallToAction from '@/components/infraparts/CallToAction'
import InfrastructureGallerySections from '@/components/infraparts/InfrastructureGallerySections'
import VideoSection from '@/components/infraparts/VideoSection'
import BrochuresSection from '@/components/infraparts/BrochuresSection'

export default function Infrastructure() {
  const [data, setData] = useState(null)
  const [gallerySections, setGallerySections] = useState([])
  const [loading, setLoading] = useState(true)

  // Your API base MUST include /api/v1, e.g. http://127.0.0.1:8000/api/v1
  const API = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '')

  // Make relative media absolute (safe if already absolute)
  const abs = (url) => {
    if (!url) return url
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `${API}${url.startsWith('/') ? '' : '/'}${url}`
  }

  const fetchJSON = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      console.error('API error for', url, '\n', text)
      throw new Error(`HTTP ${res.status} @ ${url}`)
    }
    return res.json()
  }

  useEffect(() => {
    const load = async () => {
      try {
        // Your endpoint: GET /api/v1/infrastructure/ -> { count, results: [ { ...page } ] }
        const payload = await fetchJSON(`${API}/infrastructure/`)
        const page = Array.isArray(payload?.results) ? payload.results[0] : payload
        if (!page) throw new Error('No infrastructure page found')

        // Normalize welcome sections icons
        const welcome = Array.isArray(page.sections)
          ? page.sections.map((w) => ({ ...w, icon: abs(w.icon) }))
          : []

        // Normalize videos & thumbnails
        const videos = Array.isArray(page.Video_section)
          ? page.Video_section.map((v) => ({ ...v, thumbnail: abs(v.thumbnail) }))
          : []

        // Brochures (already absolute in your response, keep abs just in case)
        const brochures = Array.isArray(page.Brochure)
          ? page.Brochure.map((b) => ({ ...b, pdf_file: abs(b.pdf_file) }))
          : []

        // Gallery sections (already embedded)
        const sections = Array.isArray(page.gallery_sections) ? page.gallery_sections : []
        const normalizedSections = sections.map((s) => ({
          ...s,
          images: Array.isArray(s.images)
            ? s.images.map((img) => ({ ...img, image: abs(img.image) }))
            : []
        }))

        setData({
          ...page,
          sections: welcome,
          Video_section: videos,
          Brochure: brochures
        })
        setGallerySections(normalizedSections)
      } catch (err) {
        console.error('Failed to load infrastructure:', err)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [API])

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (!data) return <div className="text-center text-red-500 py-10">Failed to load data.</div>

  return (
    <>
     <Head>
  <title>{data.meta_title || 'Infrastructure - Andhitech'}</title>
  <meta
    name="description"
    content={
      data.meta_description ||
      (data.description ? String(data.description).slice(0, 160) : 'Explore our infrastructure.')
    }
  />
  <meta name="keywords" content={data.meta_keywords || ''} />
  <link
    rel="canonical"
    href={`${process.env.NEXT_PUBLIC_SITE_URL}/infrastructure`}
  />
</Head>


      <Header />
      <PageBanner
        title="Infrastructure"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Infrastructure"
      />

      <InfraSection
        title={data.title}
        description={data.description}
        sections={data.sections}
      />

      <CallToAction />

      <InfrastructureGallerySections sections={gallerySections} />

      <VideoSection videos={data.Video_section || []} />

      <BrochuresSection brochures={data.Brochure || []} />

      <Footer />
    </>
  )
}
