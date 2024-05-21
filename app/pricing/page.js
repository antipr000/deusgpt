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
    <div className="!inset-0 flex flex-col font-montserrat selection:bg-selection bg-background text-foreground min-h-[100vh]">
      <LandingPageNavbar shortIcon={true} />
      <main
        style={{
          gap: "30px",
          marginTop: "30px",
        }}
        className="flex justify-center items-center mb-5 gap-5 flex-wrap
        md:items-start md:justify-items-center"
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
              btnText,
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
              btnText={btnText}
              index={index}
              key={index}
            />
          )
        )}
      </main>
      <div className="mt-auto" style={{ width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Pricing;
