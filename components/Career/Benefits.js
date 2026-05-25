import React from "react";
import Image from "next/image";

const benefitsData = [
  {
    id: 1,
    title: "Drive Innovation in Real-World Engineering Challenges",
    content:
      "At AND Hitech, we don't just solve problems—we engineer solutions that shape the future. When you join us, you become part of a team that is committed to building smarter, more sustainable, and efficient infrastructures, systems, and technologies. We encourage creative thinking and hands-on innovation, backed by state-of-the-art tools, advanced design software, and cutting-edge methodologies.",
  },
  {
    id: 2,
    title: "Collaborative and Inclusive Work Culture",
    content:
      "AND Hitech is all about collaborative team spirit and culture. Diversity & Equality are our strong pillars. We thrive on knowledge sharing and mutual respect. You'll find a supportive network where your contributions are valued, and your ideas can spark industry-leading innovations. Here, you're not just another employee code—you’re a part of a community that supports your growth and celebrates your achievements.",
  },
  {
    id: 3,
    title: "Long-Term Career Growth and Industry-Leading Benefits",
    content:
      "We understand that talented deserve more than just a paycheck—they deserve a future. That's why we offer competitive salaries, performance incentives, health benefits, and retirement plans designed with long-term security in mind. When you join our team, you’re joining a company which is proud to be a part of “ Make in India” Initiative with excellence and innovation that you’ll be proud to be a part of.",
  },
  
];

const Benefits = () => {
  return (
    <div className="what-we-do benifits">
      <div className="container-fluid">
        <div className="row no-gutters">
          {/* Content Section */}
          <div className="col-lg-6">
            <div className="what-we-do-content">
              <div className="section-title dark-section">
                <h3>Why Join Us ?</h3>
                <h2 className="text-anime-style-2">Become a Part of <span>Our Team</span></h2>
                <h5>Outer Web offers a stimulating work environment.</h5>
                <p>
                  If you are looking for a career where work meets ethics and ambition meets action, welcome to AND Hitech Industries. We at AND Hitech Industries believe in:
                </p>
              </div>

              <div className="our-faq-section">
                <div className="faq-accordion" id="faqaccordion">
                  {benefitsData.map((item, index) => (
                    <div className="accordion-item" key={item.id}>
                      <h2 className="accordion-header" id={`heading${item.id}`}>
                        <button
                          className={`accordion-button ${index !== 1 ? "collapsed" : ""}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${item.id}`}
                          aria-expanded={index === 1 ? "true" : "false"}
                          aria-controls={`collapse${item.id}`}
                        >
                          {item.title}
                        </button>
                      </h2>
                      <div
                        id={`collapse${item.id}`}
                        className={`accordion-collapse collapse ${index === 1 ? "show" : ""}`}
                        aria-labelledby={`heading${item.id}`}
                        data-bs-parent="#faqaccordion"
                      >
                        <div className="accordion-body">
                          <p>{item.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-lg-6">
            <div className="what-we-do-image">
              <figure className="image-anime" style={{ position: 'relative', width: '100%', height: '700px' }}>
                    <Image
                    src="/images/careerimg.webp"
                    alt="Career"
                    fill
                    style={{ objectFit: 'cover' }}
                    />
                </figure>
              <div className="contact-now-circle">
                <Image
                  src="/images/contact-now-circle.svg"
                  alt="Contact Now"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
