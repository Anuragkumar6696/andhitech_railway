import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PageBanner from '@/components/PageBanner'
import OnlineComplaintForm from '@/components/onlinecomplaintform'
import React from 'react'
import Image from 'next/image'

export default function OnlineComplaint() {
  return (
    <>
      <Header />
      <PageBanner title="Online Complaint" backgroundImage="/images/page-header-bg.jpg" currentPage="Online Complaint" />
      <div className="about-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="mb-5">
                <h1>Complaint Form</h1>
                <h2 className="h4 mt-4">How to Submit a Complaint:</h2>

                <ol className="mt-3">
                  <li>Fill in your basic details (Date, Customer / Railway, Depot etc).</li>
                  <li>Write a clear description of Complaint Details.</li>
                  <li>Attach any relevant files (if applicable).</li>
                  <li>Fill your Contact Information (Name, Phone, Email)</li>
                  <li>Click on the <strong>Submit</strong> button.</li>
                  <li>You will receive a confirmation message.</li>
                </ol>
                <Image
                    src="/images/complaintimg.avif"
                    alt="complaint image"
                    width={250}
                    height={70}
                    style={{ height: 'auto', width: '100%' }}
                />

              </div>
            </div>
            <div className="col-lg-7">
              <div className="right-form position-relative">
                <OnlineComplaintForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
