"use client";

import React from "react";
import { useAtomValue } from "jotai";
import { loaderAtom } from "../../store";
import { ThreeDots } from "react-loading-icons";
import { Typography } from "@lobehub/ui";

const Loader = () => {
  const { show, message } = useAtomValue(loaderAtom);

  return (
    show && (
      <div
        className="fixed h-[100vh] w-[100vw] top-0 left-0 z-[10000] flex flex-column
      justify-center items-center bg-[rgba(255,255,255,0.5)]"
      >
        <ThreeDots fill="black" style={{ width: 80, height: 80 }} />
        {message && <Typography>{message}</Typography>}
      </div>
    )
  );
};

export default Loader;
