import React from "react";
import LandingPageNavbar from "../../components/Navbar/landing.navbar";
import Footer from "../../components/Footer/footer";
import PriceCard from "../../components/PriceCard/PriceCard";

const pricingOptions = [
  {
    heading: "Standard",
    description: "Free trial of DeusGPT",
    discountedPrice: 0,
    originalPrice: 0,
    popular: false,
    features: ["ChatGPT 3.5", "15k tokens per day"],
  },
  {
    heading: "Premium",
    description: "Get access to exclusive features.",
    discountedPrice: 9.99,
    originalPrice: 15,
    popular: true,
    features: [
      "ChatGPT 4.0 access",
      "15k tokens per day",
      "Translate available",
    ],
  },
];

const Pricing = () => {
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
                        originalPrice={originalPrice}
                        discountedPrice={discountedPrice}
                        popular={popular}
                        features={features}
                        index={index}
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
