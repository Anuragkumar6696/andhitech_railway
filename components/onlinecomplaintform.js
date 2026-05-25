'use client';
import { useState } from 'react';

export default function OnlineComplaintForm() {
  const [formData, setFormData] = useState({
    date: '',
    railway: '',
    depot: '',
    coachno: '',
    productunit: '',
    letterno: '',
    letterdate: '',
    complaintno: '',
    product: '',
    failuer: '',
    failuerdate: '',
    contactperson: '',
    designation: '',
    contactno: '',
    emailid: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/complaint/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    alert("Complaint submitted successfully.");
    setFormData({
      date: '',
      railway: '',
      depot: '',
      coachno: '',
      productunit: '',
      letterno: '',
      letterdate: '',
      complaintno: '',
      product: '',
      failuer: '',
      failuerdate: '',
      contactperson: '',
      designation: '',
      contactno: '',
      emailid: '',
    });
  } else {
    alert("Submission failed.");
  }
};

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="mb-4">Customer Online Service</h2>

      {/* Basic Information */}
      <div className="form-section">
        <h4>Basic Information</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Date *</label>
            <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Customer / Railway *</label>
            <select className="form-select" name="railway" value={formData.railway} onChange={handleChange} required>
              <option value="">Please Select</option>
              <option value="1">CENTRAL RAILWAY</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Depot</label>
            <input type="text" className="form-control" name="depot" value={formData.depot} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Coach No</label>
            <input type="text" className="form-control" name="coachno" value={formData.coachno} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Complaint Details */}
      <div className="form-section">
        <h4>Complaint Details</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Production Unit</label>
            <input type="text" className="form-control" name="productunit" value={formData.productunit} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Letter No *</label>
            <input type="text" className="form-control" name="letterno" value={formData.letterno} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Letter Date *</label>
            <input type="date" className="form-control" name="letterdate" value={formData.letterdate} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Portal Complaint No *</label>
            <input type="text" className="form-control" name="complaintno" value={formData.complaintno} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Product *</label>
            <input type="text" className="form-control" name="product" value={formData.product} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Failure Description *</label>
            <textarea className="form-control" name="failuer" rows="2" value={formData.failuer} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Failure Date *</label>
            <input type="date" className="form-control" name="failuerdate" value={formData.failuerdate} onChange={handleChange} required />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="form-section">
        <h4>Contact Information</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Contact Person Name *</label>
            <input type="text" className="form-control" name="contactperson" value={formData.contactperson} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Designation *</label>
            <input type="text" className="form-control" name="designation" value={formData.designation} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Contact No *</label>
            <input type="text" className="form-control" name="contactno" value={formData.contactno} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email Id *</label>
            <input type="email" className="form-control" name="emailid" value={formData.emailid} onChange={handleChange} required />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button type="submit" className="btn-default"><span>Submit</span></button>
      </div>
    </form>
  );
}
