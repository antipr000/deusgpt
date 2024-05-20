import Link from "next/link";
import React from "react";
import UserAvatar from "../UserAvatar";

const Sidebar = ({ user }) => {
  return (
    <div className="flex flex-col h-full w-[200px]">
      <Link href="/" className="w-[80px] h-[80px] mt-4 ml-3 md:mt-7 md:ml-6">
        <img className="w-full h-full object-cover" src={"logo.png"} />
      </Link>

      <Link
        href="/pricing"
        className="p-2 w-[full] mx-4 flex justify-center
      rounded-md bg-black text-white mt-[45px] no-underline hover:no-underline"
      >
        Upgrade Plan
      </Link>

      <div
        className="bottom-0 mx-3 md:mx-6 pb-4 w-full flex border-none outline-none
        items-center gap-[5px] fixed"
      >
        <UserAvatar user={user} placement="top-start" className="mb-[10px]" />
      </div>
    </div>
  );
};

export default Sidebar;
