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
  const user = useAtomValue(userAtom);

  console.log("Received new id token value", idToken);

  useEffect(() => {
    if (idToken) {
      getUser();
    }
  }, [idToken]);

  return !!idToken && !!user ? (
    <LoggedInHome user={user} />
  ) : (
    <div className="!inset-0 flex flex-col font-montserrat selection:bg-selection bg-background text-foreground">
      <LandingPageNavbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
