"use client";

import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useAtom, useAtomValue } from "jotai";
import { loaderAtom, userAtom } from "../../store";
import { getUser } from "../../api";

const LoggedInHome = () => {
  const user = useAtomValue(userAtom);
  const [_, setLoader] = useAtom(loaderAtom);

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
    <div className="flex h-full">
      <Sidebar user={user} />
      <MainContent />
    </div>
  );
};

export default LoggedInHome;
