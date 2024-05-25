"use client";

import { useAtomValue } from "jotai";
import LoggedInHome from "../../components/LoggedInHome";
import { idTokenAtom } from "../../store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UserHomePage = () => {
  const idToken = useAtomValue(idTokenAtom);
  const router = useRouter();

  useEffect(() => {
    if (!idToken) {
      router.push("/");
    }
  }, [idToken]);

  return <LoggedInHome />;
};

export default UserHomePage;
