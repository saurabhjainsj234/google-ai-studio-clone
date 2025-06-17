import React, { useState } from "react";
import RunSettings from "../components/RunSettings";
import TopBar from "../components/TopBar";
import ChatPrompt from "../components/Chat/ChatPrompt";
import SidebarDrawer from "../components/Sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRunSettingsOpen, setIsRunSettingsOpen] = useState(true);

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: "#dae2ff" }}
    >
      <TopBar />

      <div className="flex flex-row flex-1 overflow-hidden relative">
        <SidebarDrawer isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div
          style={{
            width: isSidebarOpen ? "16rem" : "4rem",
            transition: "width 0.3s ease-in-out",
          }}
        />

        <div
          className="flex-1 flex flex-col overflow-y-auto transition-all duration-300"
          style={{
            marginRight: isRunSettingsOpen ? "20rem" : "0rem",
            transition: "margin-right 0.3s ease-in-out",
          }}
        >
          <ChatPrompt />
        </div>

        <RunSettings
          isRunSettingsOpen={isRunSettingsOpen}
          setIsRunSettingsOpen={setIsRunSettingsOpen}
        />
      </div>
    </div>
  );
};

export default Dashboard;
