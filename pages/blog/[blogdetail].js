import React from 'react';
import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import PostContent from '@/components/Blog/PostContent';
import RelatedPosts from '@/components/Blog/RelatedPosts';
import Head from 'next/head';

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/`);
    const data = await res.json();
    const paths = (data.results || []).map((post) => ({
      params: { blogdetail: post.slug },
    }));
    return { paths, fallback: 'blocking' };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const { blogdetail } = params;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const resPost = await fetch(`${baseUrl}/blog/${blogdetail}/`);
    if (!resPost.ok) throw new Error('Post fetch failed');
    const post = await resPost.json();

    const resRelated = await fetch(`${baseUrl}/blog/${blogdetail}/related/`);
    const related = resRelated.ok ? await resRelated.json() : [];

    const formattedPost = {
      ...post,
      image: post.featured_image,
      content: post.content?.split('\r\n').filter(Boolean) || [],
      related,
    };

    return {
      props: { post: formattedPost },
      revalidate: 300,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { notFound: true };
  }
}

export default function BlogDetailPage({ post }) {
  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <>
      <Head>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        {post.meta_keywords && (
          <meta name="keywords" content={post.meta_keywords} />
        )}
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        <meta property="og:image" content={post.featured_image || post.image} />
        <meta property="og:type" content="article" />
      </Head>

      <Header />
      <PageBanner
        title={post.title}
        backgroundImage={post.image}
        currentPage={post.title}
      />

      <div className="page-single-post">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <PostContent post={post} />
            </div>
            <div className="col-lg-4">
              <RelatedPosts related={post.related} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
