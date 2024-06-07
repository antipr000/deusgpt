"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { getAllChatSessions, getAllIntegrations, getUser } from "../../api";
import {
  idTokenAtom,
  integrationsAtom,
  loaderAtom,
  userAtom,
} from "../../store";
import { store } from "../../store/store";
import { firebaseSignOut } from "../../firebase/utils";
import { chatSessionsAtom } from "../../store/chatSessions.atom";

const handleEvent = ({ data }) => {
  const { type, payload } = data;
  const idToken = store.get(idTokenAtom);
  const user = store.get(userAtom);
  const integrations = store.get(integrationsAtom);
  const chatSessions = store.get(chatSessionsAtom);
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
              integrations,
              chatSessions,
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
  const [_1, setLoader] = useAtom(loaderAtom);
  const [_2, setIntegrations] = useAtom(integrationsAtom);
  const [_3, setChatSessions] = useAtom(chatSessionsAtom);
  const searchParams = useSearchParams();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const router = useRouter();
  const agent = searchParams.get("agent");

  const loadAllData = async (user) => {
    const promiseArr = [getAllIntegrations(), getAllChatSessions(user)];

    const [integrations, chatSessions] = await Promise.all(promiseArr);

    setIntegrations(integrations);
    setChatSessions(chatSessions);
    setIsDataFetched(true);
  };

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
      loadAllData(user);
    }
  }, [idToken, user]);

  console.log("User is", user);

  if (!isDataFetched) {
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
