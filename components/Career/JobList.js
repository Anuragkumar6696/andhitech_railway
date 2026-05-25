import React from "react";
import Link from "next/link";

const JobList = ({ jobs }) => {
  return (
    <div className="page-contact-us cus-jobs">
      <div className="container">
        <div className="row">
          {jobs.map((job) => (
            <div className="col-md-4" key={job.slug}>
              <div className="col-md-12 col-12">
                <div className="team-box">
                  <div className="team-text">
                    <i className="fa-solid fa-file-invoice"></i>
                    <h5>{job.title}</h5>
                    <p>
                      <span>Experience</span> – {job.experience}
                    </p>
                    <p>
                      <span>Qualification</span> – {job.qualification}
                    </p>
                    <p>
                      <span>Location</span> {job.location}
                    </p>
                    <Link href={`/career/${job.slug}`} className="btn-default">
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
