"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function JobDetail({ job }) {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    message: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }
    payload.append('job_title', job.title);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job-application/`, {
        method: "POST",
        body: payload,
      });

      if (res.ok) {
        alert("Application submitted successfully!");
        closePopup();
      } else {
        const errorData = await res.json();
        console.error("Server error:", errorData);
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Submission failed.");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div className="job-single-post">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="job-detail">
  <div className="job-detail-text">
    <h2>{job.title}</h2>
    <div className="job-metas-detail">
      <div className="category-job">
        <p><i className="fa-solid fa-file-invoice"></i> {job.category?.name}</p>
      </div>
      <div className="category-job">
        <p><i className="fa-solid fa-location-dot"></i> {job.location}</p>
      </div>
      <div className="category-job">
        <p><i className="fa-solid fa-clock"></i> {job.date_posted}</p>
      </div>
    </div>

    {/* ✅ Mobile button (shows only below details) */}
    <div className="apply-time mt-3 d-block d-lg-none">
      <button type="button" className="btn-default" onClick={openPopup}>
        <span>Apply Now</span>
      </button>
    </div>
  </div>

  {/* ✅ Desktop button (shows only on right side) */}
  <div className="apply-time text-right d-none d-lg-block">
    <button type="button" className="btn-default" onClick={openPopup}>
      <span>Apply Now</span>
    </button>
  </div>
</div>


            <hr />
          </div>

          <div className="col-lg-8">
            <div className="post-image">
              <figure className="image-anime">
                <Image
                  src={job.featured_image}
                  alt={job.title}
                  width={800}
                  height={500}
                  className="img-fluid"
                />
              </figure>
            </div>

            <div className="post-content">
              <div className="post-entry">
                <h4>Job Description</h4>
                <p>{job.description}</p>

                <h2>Key Responsibilities</h2>
                <p>{job.responsibility_intro}</p>
                <ul>
                  {job.key_responsibilities.map((item) => (
                    <li key={item.id}>{item.responsibility}</li>
                  ))}
                </ul>

                <button type="button" className="btn-default" onClick={openPopup}>
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="service-sidebar relatedblog">
              <div className="service-catagery-list">
                <h3>Highlights</h3>
                <div className="latest-post">
                  <div className="job-post-box">
                    <div className="post-icon"><i className="fa-solid fa-calendar-days"></i></div>
                    <div className="post-text">
                      <h6>Date Posted</h6>
                      <p>{job.date_posted}</p>
                    </div>
                  </div>
                  <div className="job-post-box">
                    <div className="post-icon"><i className="fa-solid fa-location-dot"></i></div>
                    <div className="post-text">
                      <h6>Location</h6>
                      <p>{job.location}</p>
                    </div>
                  </div>
                  <div className="job-post-box">
                    <div className="post-icon"><i className="fa-solid fa-business-time"></i></div>
                    <div className="post-text">
                      <h6>Experience</h6>
                      <p>{job.experience}</p>
                    </div>
                  </div>
                  <div className="job-post-box">
                    <div className="post-icon"><i className="fa-solid fa-coins"></i></div>
                    <div className="post-text">
                      <h6>Qualification</h6>
                      <p>{job.qualification}</p>
                    </div>
                  </div>
                  <div className="job-post-box">
                    <div className="post-icon"><i className="fa-solid fa-file-invoice"></i></div>
                    <div className="post-text">
                      <h6>Job Title</h6>
                      <p>{job.job_title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>&times;</span>
            <div className="contact-us-form1">
              <h2>Apply Now</h2>
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="row mt-4">
                  <div className="form-group col-md-6 mb-4">
                    <input type="text" name="fname" className="form-control" placeholder="Enter first name" required onChange={handleChange} />
                  </div>
                  <div className="form-group col-md-6 mb-4">
                    <input type="text" name="lname" className="form-control" placeholder="Enter last name" required onChange={handleChange} />
                  </div>
                  <div className="form-group col-md-6 mb-4">
                    <input type="email" name="email" className="form-control" placeholder="Enter your e-mail" required onChange={handleChange} />
                  </div>
                  <div className="form-group col-md-6 mb-4">
                    <input type="text" name="phone" className="form-control" placeholder="Enter your phone no." required onChange={handleChange} />
                  </div>
                  <div className="form-group col-md-12 mb-2">
                    <textarea name="message" className="form-control" rows="4" placeholder="Write Message" onChange={handleChange}></textarea>
                  </div>
                  <div className="form-group col-md-12 mb-2">
                    <input type="file" name="resume" className="form-control" required onChange={handleChange} />
                  </div>
                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn-default"><span>Send</span></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
