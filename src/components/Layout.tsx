import React from "react";
import { Stack, styled } from "@mui/material";
import Header from "./Header/Header";
import DrawerCustom from "./DrawerCustom";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED } from "../config";

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onMenuClick: (view: string) => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

const Root = styled("div")({
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh",
  backgroundColor: "#f9fafb", // бывший var(--color-gray-50)
});

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})<{ sidebarOpen: boolean }>(({ sidebarOpen, theme }) => ({
  margin: theme.spacing(7.5, 3, 3, 10.5),
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  gap: 24,
  marginLeft: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED,
  transition: "margin-left 0.3s ease",
  height: "100vh",
  overflow: "hidden",
}));

const Layout: React.FC<LayoutProps> = ({
  children,
  currentView,
  onMenuClick,
  sidebarOpen,
  onSidebarToggle,
}) => {
  return (
    <Root>
      <DrawerCustom
        isOpen={sidebarOpen}
        onMenuClick={onMenuClick}
        onClose={onSidebarToggle}
        currentView={currentView}
      />
      <Main sidebarOpen={sidebarOpen}>
        <Header />
        <Stack flexGrow={1} overflow={"auto"}>
          {children}
        </Stack>
      </Main>
    </Root>
  );
};

export default Layout;
