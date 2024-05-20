import React from "react";
import { Avatar } from "@lobehub/ui";

const AgentCard = ({ avatar, title, description }) => {
  return (
    <div className="h-[300px] cursor-pointer overflow-hidden bg-white shadow-md rounded-lg">
      <div
        className="overflow-hidden h-[64px] flex justify-center items-center 
      relative bg-[rgba(0,0,0,0.06)]"
      >
        <Avatar
          alt={"banner"}
          avatar={avatar}
          className="absolute blur-2xl saturate-150"
          shape={"square"}
          size={600}
        />
      </div>
      <div
        className="relative ml-auto mr-[14px] h-[64px] w-[64px] rounded-[50%]
       bg-white z-10 overflow-hidden mt-[-32px] flex justify-center items-center"
      >
        <Avatar alt={title} avatar={avatar} size={56} title={title} />
      </div>
      <div className="p-[16px]">
        <h3 className="text-[18px] font-[600] text-[#080808]">{title}</h3>
        <div className="mt-[12px] text-[#999999] mh-[44px] text-[14px]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
