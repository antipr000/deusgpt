"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import UserAvatar from "../UserAvatar";
import { useSearchParams } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { idTokenAtom, loaderAtom } from "../../store";
import { initiatePayment, pricingOptions } from "../../utils";
import PremiumBadge from "./PremiumBadge";

const Sidebar = ({ user }) => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const planId = searchParams.get("planId");
  const idToken = useAtomValue(idTokenAtom);
  const [_, setLoader] = useAtom(loaderAtom);

  const handlePayment = async (planId) => {
    const { discountedPrice } = pricingOptions.find(
      (option) => option.planId === planId
    );
    if (user.plan === planId) {
      window.alert("Already subscribed to premium!");
      return;
    }
    setLoader({
      show: true,
      message: "Please wait while we process your request",
    });
    await initiatePayment(idToken, discountedPrice, planId);
    setLoader({ show: false, message: null });
  };

  if (mode === "payment" && planId) {
    handlePayment(planId);
  }

  return (
    <div className="flex flex-col h-full w-[200px]">
      <Link href="/" className="w-[80px] h-[80px] mt-4 ml-3 md:mt-7 md:ml-6">
        <img className="w-full h-full object-cover" src={"logo.png"} />
      </Link>

      {user.plan === "premium" ? (
        <PremiumBadge />
      ) : (
        <Link
          href="/pricing"
          className="p-2 w-[full] mx-4 flex justify-center
      rounded-md bg-black text-white mt-[45px] no-underline hover:no-underline"
        >
          Upgrade Plan
        </Link>
      )}

      <div
        className="bottom-0 mx-3 md:mx-6 pb-4 w-full flex border-none outline-none
        items-center gap-[5px] fixed"
      >
        <UserAvatar user={user} placement="top-start" className="mb-[10px]" />
      </div>
    </div>
  );
};

export default Sidebar;
