"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { getAllIntegrations, getUser } from "../../api";
import {
  idTokenAtom,
  integrationsAtom,
  loaderAtom,
  userAtom,
} from "../../store";
import { store } from "../../store/store";

const handleEvent = ({ data }) => {
  const { type, payload } = data;
  const idToken = store.get(idTokenAtom);
  const user = store.get(userAtom);
  const integrations = store.get(integrationsAtom);
  const iframeRef = document.getElementById("lobechat");
  console.log("Received event", type, payload);
  switch (type) {
    case "translate-load":
      store.set(loaderAtom, (_) => ({
        show: false,
        message: null,
      }));
      if (payload) {
        iframeRef.contentWindow.postMessage(
          {
            type: "id-token",
            payload: {
              idToken,
              user,
              integrations,
            },
          },
          "*"
        );
      }
      break;
    case "signout":
      if (payload) {
        firebaseSignOut();
      }
    case "open-link":
      if (payload) {
        window.open(payload, "_blank");
      }
  }
};

const TranslatePage = () => {
  const iframeRef = useRef(null);
  const user = useAtomValue(userAtom);
  const idToken = useAtomValue(idTokenAtom);
  const [_, setLoader] = useAtom(loaderAtom);
  const [integrations, setIntegrations] = useAtom(integrationsAtom);
  const router = useRouter();

  const loadAllData = async () => {
    const integrations = await getAllIntegrations();
    setIntegrations(integrations);
  };

  useEffect(() => {
    window.addEventListener("message", handleEvent);
  }, []);

  useEffect(() => {
    console.log("IDTOKEN", idToken);
    console.log("USER", user);
    if (!idToken) {
      router.push("/");
    } else if (!user) {
      setLoader({
        show: true,
        message: "Please wait while we load your data.",
      });
      getUser();
    } else {
      setLoader({
        show: true,
        message: "Please wait while we load your data.",
      });
      loadAllData();
    }
  }, [idToken, user]);

  if (!integrations?.length) {
    return <></>;
  }

  return (
    <div className="h-full w-full flex">
      <iframe
        id="lobechat"
        ref={iframeRef}
        src={`${process.env.NEXT_PUBLIC_LOBECHAT_URL}/translate`}
        allow="microphone"
        className="h-full w-full"
      />
    </div>
  );
};

export default TranslatePage;
