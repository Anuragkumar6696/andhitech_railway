import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PageBanner from '@/components/PageBanner'
import PostLists from '@/components/PostLists'
import Head from 'next/head'

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/`)
    const data = await res.json()
    return {
      props: { posts: data.results || [] },
      revalidate: 120,
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return { props: { posts: [] }, revalidate: 60 }
  }
}

export default function BlogIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Blog | AND Hitech Industries</title>
        <meta name="description" content="Latest blog posts from AND Hitech Industries." />
      </Head>
      <Header />
      <PageBanner
        title="Blog"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Blog"
      />
      <PostLists posts={posts} />
      <Footer />
    </>
  )
}
