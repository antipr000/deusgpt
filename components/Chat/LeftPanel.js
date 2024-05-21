"use client";

import React, { useContext } from "react";
import LeftPanelContent from "./LeftPanelContent";
import { DraggablePanel, DraggablePanelContainer } from "@lobehub/ui";
import ChatContext from "../../contexts/ChatContext";

const LeftPanel = () => {
  const { leftPanelWidth, setLeftPanelWidth } = useContext(ChatContext);

  const handleSizeChange = (_, size) => {
    if (!size) return;
    const nextWidth = size.width;
    setLeftPanelWidth(nextWidth);
  };

  return (
    <DraggablePanel
      className="h-full bg-white"
      defaultSize={{ width: leftPanelWidth }}
      maxWidth={400}
      minWidth={270}
      onSizeChange={handleSizeChange}
      placement="left"
      size={{ height: "100%", width: leftPanelWidth }}
    >
      <DraggablePanelContainer
        style={{ flex: "none", height: "100%", minWidth: 270 }}
      >
        <LeftPanelContent />
      </DraggablePanelContainer>
    </DraggablePanel>
  );
};

export default LeftPanel;
