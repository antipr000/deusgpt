"use client";

import { useContext, memo } from "react";
import { SearchBar } from "@lobehub/ui";
import ChatContext from "../../contexts/ChatContext";

const SessionSearchBar = memo(() => {
  const { keywords, updateSearchKeywords } = useContext(ChatContext);

  return (
    <SearchBar
      allowClear
      enableShortKey
      onChange={(e) => {
        updateSearchKeywords(e.target.value);
      }}
      placeholder="Search agent and conversations..."
      shortKey={"k"}
      spotlight
      value={keywords}
    />
  );
});

export default SessionSearchBar;
