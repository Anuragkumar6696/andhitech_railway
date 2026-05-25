import Image from 'next/image'
import Link from 'next/link'

export default function TeamCard({ member }) {
  return (
    <div className="col-lg-3 col-md-6">
      <div className="team-member-item wow fadeInUp">
        <div className="team-image">
          <Link href={`/team/${member.slug}`} data-cursor-text="View">
            <figure className="image-anime">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={500}
                className="img-fluid"
              />
            </figure>
          </Link>

          <div className="team-social-icon">
            <ul>
  {member.social?.twitter && (
    <li>
      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-x-twitter"></i>
      </a>
    </li>
  )}
  {member.social?.facebook && (
    <li>
      <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-facebook-f"></i>
      </a>
    </li>
  )}
  {member.social?.instagram && (
    <li>
      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-instagram"></i>
      </a>
    </li>
  )}
  {member.social?.pinterest && (
    <li>
      <a href={member.social.pinterest} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-pinterest-p"></i>
      </a>
    </li>
  )}
</ul>

          </div>
        </div>

        <div className="team-content">
          <h3><Link href={`/team/${member.slug}`}>{member.name}</Link></h3>
          <p>{member.position}</p>
        </div>
      </div>
    </div>
  )
}
