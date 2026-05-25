"use client";
import Image from "next/image";

const reasons = [
  {
    icon: "/images/Group 4.svg",
    title: "Drive Innovation in Real-World Engineering Challenges",
    description: "At AND Hitech, we don't just solve problems—we engineer solutions that shape the future. When you join us, you become part of a team that is committed to building smarter, more sustainable, and efficient infrastructures, systems, and technologies. We encourage creative thinking and hands-on innovation, backed by state-of-the-art tools, advanced design software, and cutting-edge methodologies.",
  },
  {
    icon: "/images/Group 2.svg",
    title: "Collaborative and Inclusive Work Culture",
    description: "AND Hitech is all about collaborative team spirit and culture. Diversity & Equality are our strong pillars. We thrive on knowledge sharing and mutual respect. You'll find a supportive network where your contributions are valued, and your ideas can spark industry-leading innovations. Here, you're not just another employee code—you're a part of a community that supports your growth and celebrates your achievements."
  },
  {
    icon: "/images/Group 5.svg",
    title: "Long-Term Career Growth and Industry-Leading Benefits",
    description: "We understand that talented deserve more than just a paycheck—they deserve a future. That's why we offer competitive salaries, performance incentives, health benefits, and retirement plans designed with long-term security in mind. When you join our team, you're joining a company which is proud to be a part of  <strong>Make in India</strong> Initiative with excellence and innovation that you'll be proud to be a part of.",
  },
  
];

const JoinUs = () => {
  return (
    <div className="our-process joinus">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-6">
            <div className="section-title">
              <h3 className="wow fadeInUp">Why Join Us ?</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">
                Main Reasons Why You Should <span>Work Here</span>
              </h2>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="section-title-content wow fadeInUp"
              data-wow-delay="0.25s"
            >
              <p>If you are looking for a career where work meets ethics and ambition meets action, welcome to AND Hitech Industries. </p>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          {reasons.map((reason, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="service-item">
                <div className="icon-box" style={{ position: "relative", width: "80px", height: "80px", marginBottom: "15px", margin: "0 auto" }}>
                  <Image
                    src={reason.icon}
                    alt={reason.title}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="service-body">
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
