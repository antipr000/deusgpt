"use client";

import React from "react";
import LandingPageNavbar from "../components/Navbar/landing.navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer/footer";
import { useAtomValue } from "jotai";
import { idTokenAtom } from "../store";

const Home = () => {
  const idToken = useAtomValue(idTokenAtom);

  console.log("Received new id token value", idToken);

  return (
    <div className="!inset-0 flex flex-col font-montserrat selection:bg-selection bg-background text-foreground">
      <LandingPageNavbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
