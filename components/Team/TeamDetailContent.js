import React from 'react';
import Image from 'next/image';

export default function TeamDetailContent({ member }) {
  return (
    <div className="page-team-single py-5">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="team-member-sidebar">
              <div className="team-member-box">
                <div className="team-member-image mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={500}
                    className="rounded w-100 h-auto"
                  />
                </div>
                <div className="team-member-name text-center">
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>

                <div className="team-member-social-list mt-4">
                  <ul className="d-flex justify-content-center gap-3">
                    {member.twitter && (
                      <li>
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                          <i className="fa-brands fa-x-twitter"></i>
                        </a>
                      </li>
                    )}
                    {member.facebook && (
                      <li>
                        <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      </li>
                    )}
                    {member.instagram && (
                      <li>
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      </li>
                    )}
                    {member.pinterest && (
                      <li>
                        <a href={member.pinterest} target="_blank" rel="noopener noreferrer">
                          <i className="fa-brands fa-pinterest-p"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-8">
            <div className="team-member-content">
              <div className="team-member-info">
                <h2 className="mb-4">Personal <span>Info</span></h2>
                {member.bio_paragraphs?.map((paragraph, index) => (
                  paragraph.trim() && <p key={index} className="mb-3">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
