"use client";

import { useState, useEffect } from "react";
import { GridBackground } from "@lobehub/ui";
import AgentCard from "./AgentCard";
import AgentSearchBar from "./AgentSearchBar";

const recentSubmits = [
  {
    avatar: "🍌",
    title: "GPT",
    description: "Ask any question to ChatGPT",
    link: "/chat?agent=gpt",
  },
  {
    avatar: "🐧",
    title: "Translate",
    description: "Translate to your language",
    link: "/chat?agent=translate",
  },
  {
    avatar: "📷",
    title: "Search",
    description:
      "Specializes in detailed analysis of photographic works, including themes, composition, technical quality, use of light, creativity, and originality.",
    link: "/chat?agent=search",
  },
];

const MainContent = () => {
  const [keyword, setKeyword] = useState("");
  const [filteredCards, setFilteredCards] = useState(recentSubmits);

  useEffect(() => {
    if (!keyword) {
      setFilteredCards(recentSubmits);
    } else {
      const newCards = recentSubmits.filter((item) => {
        const checkMeta = [item.title, item.description]
          .filter(Boolean)
          .join("");

        return checkMeta.toLowerCase().includes(keyword.toLowerCase());
      });
      setFilteredCards(newCards);
    }
  }, [keyword]);

  return (
    <div className="p-[16px] flex-1">
      <div className="flex flex-col items-center">
        <h1 className="mt-[24px] text-[56px] font-[500]">
          Find & Use The Best Agents
        </h1>
        <GridBackground className="mt-[-5px]" animation random />
      </div>

      <div className="my-[15px]">
        <AgentSearchBar keyword={keyword} setKeyword={setKeyword} />
      </div>
      <h2 className="mt-[40px] text-[24px]">Recent Submits</h2>
      <div className="mt-[25px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((item, index) => (
            <AgentCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
