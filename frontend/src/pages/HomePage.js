import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Packages from "../components/Packages";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/toaster";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Packages />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
};

export default HomePage;