import React, { useContext, useRef } from "react";
import { ActionIcon, ChatHeaderTitle, Avatar } from "@lobehub/ui";
import { Box } from "@mui/material";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import ChatContext from "../../../contexts/ChatContext";

const Header = () => {
  return (
    <div className="w-full relative p-2 flex justify-center border-b-[1.5px] border-gray-500">
      <ActionIcon
        icon={PanelLeftClose}
        onClick={() => {}}
        size={{ fontSize: 24 }}
        className="left-2 top-4"
        style={{ position: "absolute" }}
        title="Agents and Conversations"
      />
      <Box
        alignItems="center"
        gap="4px"
        display="flex"
        sx={{ position: "relative" }}
      >
        <Avatar avatar="🍌" size={50} />
        <ChatHeaderTitle title="GPT" />
      </Box>
    </div>
  );
};

export default Header;
