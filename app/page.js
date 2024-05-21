"use client";

import React, { useEffect } from "react";
import LandingPageNavbar from "../components/Navbar/landing.navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer/footer";
import { useAtomValue } from "jotai";
import { idTokenAtom, userAtom } from "../store";
import LoggedInHome from "../components/LoggedInHome";
import { getUser } from "../api";

const Home = () => {
  const idToken = useAtomValue(idTokenAtom);

  console.log("Received new id token value", idToken);

  return !!idToken ? (
    <LoggedInHome />
  ) : (
    <div className="!inset-0 min-h-[100vh] flex flex-col font-montserrat selection:bg-selection bg-background text-foreground">
      <LandingPageNavbar />
      <Hero />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
