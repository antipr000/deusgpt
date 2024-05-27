"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { getUser } from "../../api";
import { idTokenAtom, loaderAtom, userAtom } from "../../store";
import { store } from "../../store/store";
import { firebaseSignOut } from "../../firebase/utils";

const handleEvent = ({ data }) => {
  const { type, payload } = data;
  const idToken = store.get(idTokenAtom);
  const user = store.get(userAtom);
  const iframeRef = document.getElementById("lobechat");
  switch (type) {
    case "chat-load":
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
  }
};

const ChatPage = () => {
  const iframeRef = useRef(null);
  const user = useAtomValue(userAtom);
  const idToken = useAtomValue(idTokenAtom);
  const [_, setLoader] = useAtom(loaderAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const agent = searchParams.get("agent");

  useEffect(() => {
    window.addEventListener("message", handleEvent);
  }, []);

  useEffect(() => {
    if (!idToken) {
      console.log("id token is null");
      router.push("/");
    } else if (!user) {
      setLoader({
        show: true,
        message: "Please wait while we load your data.",
      });
      getUser().then((userData) => {
        if (!userData) {
          router.push("/");
        }
      });
    } else {
      setLoader({
        show: true,
        message: "Please wait while we load your data.",
      });
    }
  }, [idToken, user]);

  useEffect(() => {
    if (!agent) {
      console.log("agent is null");
      router.push(`/chat?agent=gpt`);
    } else {
      router.push(`/chat?agent=${agent}`);
    }
  }, [agent]);

  console.log("User is", user);

  if (!user || !agent) {
    return <></>;
  }

  return (
    <div className="h-full w-full flex">
      <iframe
        id="lobechat"
        ref={iframeRef}
        src={`${process.env.NEXT_PUBLIC_LOBECHAT_URL}?agent=${agent}`}
        allow="microphone"
        className="h-full w-full"
      />
    </div>
  );
};

export default ChatPage;
