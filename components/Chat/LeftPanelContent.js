"use client";

import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { memo } from "react";
import Image from "next/image";
import SessionSearchBar from "./SessionSearchBar";
import { ActionIcon } from "@lobehub/ui";
import Link from "next/link";

const LeftPanelContent = memo(() => {
  return (
    <Box display="flex" flexDirection="column" gap={3} padding={3}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Link href="/">
            <Image src="/logo.png" height={60} width={60} />
          </Link>

          <ActionIcon
            icon={Add}
            loading={false}
            onClick={() => {}}
            size={{ fontSize: 24 }}
            style={{ flex: "none" }}
            title="New Agent"
          />
        </Box>
      </Box>
      <SessionSearchBar />

      <Box flexDirection="column">
        <button
          className="w-full flex justify-center gap-1 border-[1.5px] border-gray-400 outline-none 
          items-center hover:border-black p-[6px] rounded-md text-[14px]"
          onClick={() => {}}
        >
          <Add /> <span>New Agent</span>
        </button>
      </Box>
    </Box>
  );
});

export default LeftPanelContent;
