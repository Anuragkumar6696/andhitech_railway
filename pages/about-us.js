"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import PageBanner from "@/components/PageBanner";
import OurHistorySection from "@/components/aboutparts/OurHistorySection";
import OurMissionVision from "@/components/aboutparts/OurMissionVision";
import OurFeatures from "@/components/aboutparts/OurFeatures";
import AboutImages from "@/components/aboutparts/AboutImages";
import Footer from "@/components/Footer";
export default function AboutUs() {
  return (
    <>
      <Header />
      <PageBanner
        title="About Us"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="About Us"
      />
      <OurHistorySection />
      <AboutImages />
      <OurMissionVision />
      <OurFeatures />
      <Footer />
    </>
  );
}
