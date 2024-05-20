import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const LoggedInHome = ({ user }) => {
  return (
    <div className="flex h-full">
      <Sidebar user={user} />
      <MainContent />
    </div>
  );
};

export default LoggedInHome;
