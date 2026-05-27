'use client';

import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import ProductSidebar from '@/components/productdetail/ProductSidebar';
import ServiceContent from '@/components/productdetail/ServiceContent';
import FAQSection from '@/components/productdetail/FAQSection';
import Head from 'next/head';
import { getAbsoluteURL } from '@/utils/url';

export async function getServerSideProps({ params }) {
  const slug = params.slug;

  try {
    const [productRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/`),
    ]);

    if (!productRes.ok) {
      return { notFound: true };
    }

    const product = await productRes.json();
    const categoriesData = categoriesRes.ok ? await categoriesRes.json() : { results: [] };

    return {
      props: {
        product,
        categories: categoriesData.results || [],
      },
    };
  } catch (error) {
    console.error('Error fetching product or categories:', error);
    return { notFound: true };
  }
}

export default function ProductDetail({ product, categories }) {
  const title = product.meta_title || product.title || 'Product Detail';
  const description =
    product.meta_description ||
    product.excerpt ||
    product.description?.slice(0, 150) ||
    'View our product details and offerings.';
  const image = getAbsoluteURL(product.featured_image || product.image || '/default-og-image.jpg');

  return (
    <div className="bg-[#050608] min-h-screen">
      <Head>
        <title>{title} | AND Hitech</title>
        <meta name="description" content={description} />
        {product.meta_keywords && (
          <meta name="keywords" content={product.meta_keywords} />
        )}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="article" />
      </Head>

      <Header />
      <PageBanner
        title={product.title || 'Product Detail'}
        backgroundImage="/images/page-header-bg.jpg"
        currentPage={product.title || 'Product'}
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              <ServiceContent product={product} />
              
              {product.faqs?.length > 0 && (
                <div className="pt-12 border-t border-gray-100">
                  <FAQSection faqs={product.faqs} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32">
                <ProductSidebar product={product} categories={categories} />
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
