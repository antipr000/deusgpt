import React from "react";
import Image from "next/image";
import UserAvatar from "../UserAvatar";
import Link from "next/link";

const Sidebar = ({ user }) => {
  return (
    <div className="h-full flex flex-col">
      <Link className="mt-[12px]" href="/">
        <Image src="/logo.png" width={60} height={60} />
      </Link>
      <div
        className="bottom-0 mx-3 md:mx-6 pb-4 w-full flex border-none outline-none
        items-center gap-[5px] fixed"
      >
        <UserAvatar onlyIcon placement="top-start" user={user} />
      </div>
    </div>
  );
};

export default Sidebar;
