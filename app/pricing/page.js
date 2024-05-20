"use client";
import React from "react";
import LandingPageNavbar from "../../components/Navbar/landing.navbar";
import Footer from "../../components/Footer/footer";
import PriceCard from "../../components/PriceCard/PriceCard";
import { useAtomValue } from "jotai";
import { idTokenAtom } from "../../store";
import { pricingOptions } from "../../utils";

const Pricing = () => {
  const idToken = useAtomValue(idTokenAtom);

  console.log("Received new id token value", idToken);
  return (
    <div className="!inset-0 d-flex flex-col font-montserrat selection:bg-selection bg-background text-foreground">
      <LandingPageNavbar shortIcon={true} />
      <main
        style={{
          gap: "30px",
          marginTop: "30px",
        }}
        className="d-flex grow overflow-visible grid justify-center align-center justify-items-stretch mb-5 md:grid-cols-3 md:justify-center md:items-start md:justify-items-center"
      >
        {pricingOptions.map(
          (
            {
              heading,
              description,
              planId,
              originalPrice,
              discountedPrice,
              popular,
              features,
            },
            index
          ) => (
            <PriceCard
              heading={heading}
              description={description}
              planId={planId}
              originalPrice={originalPrice}
              discountedPrice={discountedPrice}
              popular={popular}
              features={features}
              index={index}
              key={index}
            />
          )
        )}
      </main>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Pricing;
