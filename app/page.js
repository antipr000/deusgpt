import React from "react";
import LandingPageNavbar from "../components/Navbar/landing.navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer/footer";

const Home = () => {
  return (
    <div className="!inset-0 flex flex-col font-montserrat selection:bg-selection bg-background text-foreground">
      <LandingPageNavbar />
      <Hero />
      <Footer />
    </div>
  )
};

export default Home;
