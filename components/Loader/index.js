"use client";

import React from "react";
import { CircularProgress } from "@mui/material";
import { useAtomValue } from "jotai";
import { loaderAtom } from "../../store";

const Loader = () => {
  const isLoading = useAtomValue(loaderAtom);

  return (
    isLoading && (
      <div
        className="fixed h-[100vh] w-[100vw] top-0 left-0 z-[10000] flex
      justify-center items-center bg-[rgba(255,255,255,0.5)]"
      >
        <CircularProgress color="error" style={{ width: 80, height: 80 }} />
      </div>
    )
  );
};

export default Loader;
