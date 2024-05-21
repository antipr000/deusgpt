"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import ChatContext from "../../contexts/ChatContext";
import LeftPanel from "./LeftPanel";
import MainContent from "./MainContent";

const Chat = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState("320px");
  const [keywords, updateSearchKeywords] = useState("");

  const value = {
    leftPanelWidth,
    setLeftPanelWidth,
    keywords,
    updateSearchKeywords,
  };

  return (
    <ChatContext.Provider value={value}>
      <LeftPanel />
      <Box flex={1} style={{ overflow: "hidden", position: "relative" }}>
        <MainContent />
      </Box>
    </ChatContext.Provider>
  );
};

export default Chat;
