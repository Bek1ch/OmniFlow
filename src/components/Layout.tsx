import React from "react";
// import "./Layout.css";
import Header from "./Header";
// import Sidebar from "./Sidebar/Sidebar";
import { cn } from "../utils";
import DrawerCustom from "./Sidebar/DrawerCustom";
import { Box, Stack, Typography } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onMenuClick: (view: string) => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentView,
  onMenuClick,
  sidebarOpen,
  onSidebarToggle,
}) => {
  return (
    <Box flexGrow={1}>
      <DrawerCustom
        isOpen={sidebarOpen}
        onMenuClick={onMenuClick}
        onClose={onSidebarToggle}
        currentView={currentView}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
