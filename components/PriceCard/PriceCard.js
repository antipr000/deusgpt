"use client";

import { generateStripeSessionToken } from "../../api";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./PriceCard.module.css";
import { useAtom, useAtomValue } from "jotai";
import { idTokenAtom, loaderAtom, userAtom } from "../../store";
import { useRouter } from "next/navigation";
import { initiatePayment } from "../../utils";

const PriceCard = ({
  heading,
  planId,
  description,
  discountedPrice,
  originalPrice,
  popular,
  features,
  btnText,
  index,
}) => {
  const router = useRouter();
  const idToken = useAtomValue(idTokenAtom);
  const [_, setLoader] = useAtom(loaderAtom);
  const user = useAtomValue(userAtom);
  console.log("Received btn text", btnText);

  const handleClick = async () => {
    if (planId === "standard") {
      router.push(`/login`);
      return;
    }
    if (!idToken) {
      router.push(`/login?mode=payment&planId=${planId}`);
      return;
    }
    setLoader({
      show: true,
      message: "Please wait while we process your request.",
    });
    await initiatePayment(idToken, discountedPrice, planId);
    setLoader({ show: false, message: null });
  };

  return (
    <div>
      <div
        className={`${styles.card} ${styles.price_card} ${
          popular && styles.popular
        }`}
      >
        <div className={styles.card_body}>
          <div
            className={`${styles.price_head} ${
              popular && styles.popular_price_head
            }`}
          >
            {popular && (
              <span className="badge f-12 bg-success mb-3"> Popular </span>
            )}
            <h5 className="mb-0">{heading}</h5>

            <div className={`${styles.price} mt-4`}>
              {`$${discountedPrice}`}
              <span className={styles.text_muted}>/month</span>
            </div>

            <div className={styles.d_grid}>
              <button
                onClick={handleClick}
                style={{
                  borderRadius: "20px",
                  textDecoration: "none",
                }}
                className="btn btn-primary mt-4"
                disabled={
                  user && (user.plan === planId || planId === "standard")
                }
              >
                {user && user.plan === planId ? "Current Plan" : btnText}
              </button>
            </div>
          </div>

          <ul className={`list-group ${styles.product_list}`}>
            {features.map((feature, index) => (
              <li key={index} className={styles.feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
