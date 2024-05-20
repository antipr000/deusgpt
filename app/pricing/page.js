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
      <main className="d-flex grow overflow-visible grid justify-items-stretch mb-5 md:grid-cols-3 md:justify-center md:items-start md:justify-items-center">
        <div className="d-flex flex-row items-center mb-16 md:mb-0 z-10 justify-center overflow-hidden">
          <div className="d-flex flex-row md:flex-row md:relative bg-background z-10 gap-6">
            <div
              className="relative z-10 px-6 md:px-0 font-inter"
              role="region"
              aria-roledescription="carousel"
            >
              <div className="overflow-hidden">
                <div className="d-flex justify-between flex-row">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Pricing;
