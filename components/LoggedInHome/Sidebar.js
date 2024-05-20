import Link from "next/link";
import React from "react";

const Sidebar = ({ user }) => {
  const getAvatarName = () => {
    if (user.firstName) {
      return `${user.firstName} ${user.lastName}`;
    } else {
      return user.email;
    }
  };

  return (
    <div className="flex flex-col h-full w-[200px]">
      <Link href="/" className="w-[80px] h-[80px] mt-4 ml-3 md:mt-7 md:ml-6">
        <img className="w-full h-full object-cover" src={"logo.png"} />
      </Link>

      <Link
        href="/profile"
        className="mt-auto mx-3 md:mx-6 pb-4 w-full flex 
        items-center gap-[5px] hover:no-underline"
      >
        <div
          className="min-w-[25px] h-[25px] rounded-[50%] bg-yellow-500
         text-white flex justify-center items-center"
        >
          {getAvatarName()[0]}
        </div>
        <div className="text-ellipsis whitespace-nowrap overflow-hidden">
          {getAvatarName()}
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
