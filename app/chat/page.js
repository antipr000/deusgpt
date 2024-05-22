"use client";

import React, { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { getUser } from "../../api";
import { loaderAtom, userAtom } from "../../store";
import Sidebar from "../../components/Chat/Sidebar";

const ChatPage = () => {
  const iframeRef = useRef(null);
  const user = useAtomValue(userAtom);
  const [_, setLoader] = useAtom(loaderAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const agent = searchParams.get("agent");

  useEffect(() => {
    if (!user) {
      setLoader({
        show: true,
        message: "Please wait while we load your data.",
      });
      getUser();
    }
  }, [user]);

  useEffect(() => {
    if (!agent) {
      router.push(`/chat?agent=gpt`);
    } else {
      router.push(`/chat?agent=${agent}`);
    }
  }, [agent]);

  const onIframeLoad = () => {};

  if (!user || !agent) {
    return <></>;
  }

  return (
    <div className="h-full w-full flex">
      <div className="w-[80px] flex flex-col items-center">
        <Sidebar user={user} />
      </div>
      <div className="h-full flex-1">
        <iframe
          ref={iframeRef}
          onLoad={onIframeLoad}
          src={`http://localhost:3010/chat?agent=${agent}`}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default ChatPage;
