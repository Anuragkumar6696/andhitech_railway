"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import PageBanner from "@/components/PageBanner";
import OurHistorySection from "@/components/aboutparts/OurHistorySection";
import MDMessage from "@/components/aboutparts/MDMessage";
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
      <MDMessage />
      <AboutImages />
      <OurMissionVision />
      <OurFeatures />
      <Footer />
    </>
  );
}
