import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageBanner from '@/components/PageBanner'
import InfraSection from '@/components/infraparts/InfraSection'
import CallToAction from '@/components/infraparts/CallToAction'
import InfrastructureGallerySections from '@/components/infraparts/InfrastructureGallerySections'
import VideoSection from '@/components/infraparts/VideoSection'
import BrochuresSection from '@/components/infraparts/BrochuresSection'

export async function getServerSideProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const API = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '')

  const abs = (url) => {
    if (!url) return url
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `${API}${url.startsWith('/') ? '' : '/'}${url}`
  }

  try {
    const res = await fetch(`${API}/infrastructure/`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const payload = await res.json()
    const page = Array.isArray(payload?.results) ? payload.results[0] : payload

    if (!page) {
      return { props: { data: null, gallerySections: [] } }
    }

    const welcome = Array.isArray(page.sections)
      ? page.sections.map((w) => ({ ...w, icon: abs(w.icon) }))
      : []

    const videos = Array.isArray(page.Video_section)
      ? page.Video_section.map((v) => ({ ...v, thumbnail: abs(v.thumbnail) }))
      : []

    const brochures = Array.isArray(page.Brochure)
      ? page.Brochure.map((b) => ({ ...b, pdf_file: abs(b.pdf_file) }))
      : []

    const sections = Array.isArray(page.gallery_sections) ? page.gallery_sections : []
    const gallerySections = sections.map((s) => ({
      ...s,
      images: Array.isArray(s.images)
        ? s.images.map((img) => ({ ...img, image: abs(img.image) }))
        : []
    }))

    return {
      props: {
        data: {
          ...page,
          sections: welcome,
          Video_section: videos,
          Brochure: brochures
        },
        gallerySections
      }
    }
  } catch (err) {
    console.error('Failed to load infrastructure:', err)
    return { props: { data: null, gallerySections: [] } }
  }
}

export default function Infrastructure({ data, gallerySections }) {
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
