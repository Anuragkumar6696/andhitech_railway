import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PageBanner from '@/components/PageBanner'
import PostLists from '@/components/PostLists'
import Head from 'next/head'

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/`)
    const data = await res.json()

    return {
      props: {
        posts: data.results || [],
      },
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return {
      props: {
        posts: [],
      },
    }
  }
}

export default function BlogIndex({ posts }) {
  return (
    <>
    <Head>
  <title>Blog</title>
  <meta name="description" content="Latest blog posts" />
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
