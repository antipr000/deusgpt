"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { getUser } from "../../api";
import { idTokenAtom, loaderAtom, userAtom } from "../../store";

const AdminPage = () => {
  const iframeRef = useRef(null);
  const user = useAtomValue(userAtom);
  const idToken = useAtomValue(idTokenAtom);
  const [_, setLoader] = useAtom(loaderAtom);
  const router = useRouter();

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
      getUser().then((userData) => {
        if (!userData?.isAdmin) {
          router.push("/");
        }
      });
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
        src={`http://localhost:3010/admin`}
        allow="microphone"
        className="h-full w-full"
      />
    </div>
  );
};

export default AdminPage;
