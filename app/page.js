"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Abilities from "@/components/Abilities";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import DesignProjects from "@/components/DesignProjects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    import("aos").then(({ default: AOS }) => {
      AOS.init({ duration: 280, once: true, offset: 40, easing: "ease-out" });
    });
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Abilities />
      <Services />
      <Experience />
      <Education />
      <Certifications />
      <Projects />
      <DesignProjects />
      <Contact />
      <Footer />
    </>
  );
}
