"use client";

import { generateStripeSessionToken } from "../../api";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./PriceCard.module.css";

const Feature = ({ description, index }) => {
  return (
    <li className={styles.feature} key={index}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        className={styles.tick_icon}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.1242 1.27115L5.38112 11.6391L2.53032 8.5932C2.00517 8.09806 1.17994 8.06806 0.579775 8.48818C-0.0053927 8.9233 -0.17044 9.6885 0.189661 10.3036L3.56561 15.7952C3.8957 16.3054 4.46586 16.6204 5.11104 16.6204C5.72621 16.6204 6.31138 16.3054 6.64147 15.7952C7.18163 15.09 17.4895 2.80158 17.4895 2.80158C18.8399 1.42119 17.2045 0.205847 16.1242 1.25614V1.27115Z"
          fill="#006AFF"
        ></path>
      </svg>

      <p className={styles.feature_description}>{description}</p>
    </li>
  );
};

const PriceCard = ({
  heading,
  description,
  discountedPrice,
  originalPrice,
  popular,
  features,
  index,
}) => {
  const handleClick = async () => {
    const sessionId = await generateStripeSessionToken(9.99);
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripe = await loadStripe(publishableKey);
    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });
    console.log("Stripe result", result);
  };

  return (
    <div className={`${styles.container}`} key={index}>
      <div>
        {popular && <span className={styles.popular_pack}>Most Popular</span>}
        <h3 className={styles.heading_title}> {heading} </h3>
        <p className={styles.heading_description}>{description}</p>
        <span>
          <h1 className={styles.price}>
            {discountedPrice}
            <span className={styles.price_actual_container}>
              <del className={styles.price_actual_del}>${originalPrice}</del>
              <span>/month</span>
            </span>
          </h1>
        </span>
        <p className={styles.key_points_container}>
          <span className={styles.key_point}>
            <b>80000</b>
            words{" "}
          </span>
          <span>
            <b>6000</b> images
          </span>
        </p>
      </div>
      <button className={styles.upgrade_btn} onClick={handleClick}>
        Purchase now
      </button>
      <div>
        <ul className={styles.feature_list}>
          {features.map((description, index) => (
            <Feature key={index} description={description} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PriceCard;
