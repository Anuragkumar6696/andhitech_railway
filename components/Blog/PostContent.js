import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PostContent({ post }) {
  // Construct blog URL safely with fallbacks
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const blogUrl = post?.slug 
    ? `${siteUrl}/blog/${post.slug}` 
    : (typeof window !== "undefined" ? window.location.href : "");

  return (
    <div className="post-content">
      {/* Featured Image */}
      <div className="post-image">
        <figure className="image-anime">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={500}
            layout="responsive"
          />
        </figure>
      </div>

      {/* Author Info */}
      <div className="post-meta my-3">
        <p className="text-muted">
          <strong>Author:</strong> {post.author}
        </p>
      </div>

      {/* Content */}
      <div className="post-entry">
        {post.content.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* Tags and Social Sharing */}
      <div className="post-tag-links mt-4">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="post-tags">
              <span className="tag-links">
                Tags:
                {post.tags.map((tag, i) => (
                  <Link href="#" key={i} className="me-2">
                    {tag}
                  </Link>
                ))}
              </span>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="post-social-sharing">
              <ul className="d-flex gap-2 list-unstyled">
                <li>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.instagram.com/?url=${encodeURIComponent(blogUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
