"use client";
import Head from "next/head";
import Header from "../components/Header";
import PageBanner from "@/components/PageBanner";
import OurHistorySection from "@/components/aboutparts/OurHistorySection";
import MDMessage from "@/components/aboutparts/MDMessage";
import OurMissionVision from "@/components/aboutparts/OurMissionVision";
import OurFeatures from "@/components/aboutparts/OurFeatures";
import AboutImages from "@/components/aboutparts/AboutImages";
import Footer from "@/components/Footer";
import WhyAndHitech from "@/components/WhyAndHitech";
import IndustryPresence from "@/components/IndustryPresence";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us | AND Hitech Industries — Railway Engineering & Manufacturing</title>
        <meta name="description" content="AND Hitech Industries — established 2013, precision railway component manufacturer. RDSO approved, ISO 9001:2015 certified, supplying Indian Railways and Metro networks." />
      </Head>
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
      <IndustryPresence />
      <WhyAndHitech />
      <Footer />
    </>
  );
}
