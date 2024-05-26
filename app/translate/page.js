"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { getUser } from "../../api";
import { idTokenAtom, loaderAtom, userAtom } from "../../store";
import { store } from "../../store/store";

const handleEvent = ({ data }) => {
  const { type, payload } = data;
  const idToken = store.get(idTokenAtom);
  const user = store.get(userAtom);
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
  const router = useRouter();

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
        show: false,
        message: null,
      });
    }
  }, [idToken, user]);

  if (!user) {
    return <></>;
  }

  return (
    <div className="h-full w-full flex">
      <iframe
        id="lobechat"
        ref={iframeRef}
        src={`http://localhost:3010/translate`}
        allow="microphone"
        className="h-full w-full"
      />
    </div>
  );
};

export default TranslatePage;
