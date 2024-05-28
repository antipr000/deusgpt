"use client";

import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useAtom, useAtomValue } from "jotai";
import { loaderAtom, userAtom } from "../../store";
import { getUser } from "../../api";
import Navbar from "./Navbar";

const LoggedInHome = () => {
  const user = useAtomValue(userAtom);
  const [_, setLoader] = useAtom(loaderAtom);

  console.log("INSIDE LOGGED IN HOME");

  useEffect(() => {
    if (!user) {
      setLoader({
        show: true,
        message: "Please wait while we load your data.",
      });
      getUser();
    }
  }, [user]);

  if (!user) {
    return <></>;
  }

  return (
    <div
      className="flex h-full"
      style={{
        backgroundColor: "#F8F8F8",
      }}
    >
      <Sidebar user={user} />
      <div className="flex w-full flex-col h-full overflow-auto">
        <Navbar />
        <MainContent />
      </div>
    </div>
  );
};

export default LoggedInHome;
