"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { getUser } from "../../api";
import { idTokenAtom, loaderAtom, userAtom } from "../../store";
import { store } from "../../store/store";

const handleEvent = ({ data }) => {
  const { type, payload } = data;
  const idToken = store.get(idTokenAtom);
  const user = store.get(userAtom);
  const iframeRef = document.getElementById("lobechat");
  if (type === "chat-load") {
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
        src={`http://localhost:3010?agent=${agent}`}
        className="h-full w-full"
      />
    </div>
  );
};

export default ChatPage;
