import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function RelatedPosts({ related }) {
  return (
    <div className="service-sidebar relatedblog mt-4 mt-lg-0">
         <div className="service-catagery-list wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
      <h3 className="mb-3">Related Blogs</h3>
      <ul className="list-unstyled">
        {related.map((post, index) => (
          <li key={index} className="mb-4">
            {post.featured_image && (
  <Link href={`/blog/${post.slug}`}>
    <Image
      src={post.featured_image}
      alt={post.title}
      width={350}
      height={200}
      className="img-fluid mb-2"
      style={{ width: '100%', height: 'auto' }}
    />
  </Link>
)}
            <div className="post-meta d-flex align-items-center gap-3 mb-2">
              <span><i className="fa fa-user"></i> {post.author}</span>
              <span><i className="fa fa-calendar"></i> {post.date_published}</span>
            </div>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}
