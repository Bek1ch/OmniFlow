import React from "react";
import { Stack, styled } from "@mui/material";
import Header from "./Header";
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
  height: "100vh",
  overflow: "hidden",
  backgroundColor: "#f9fafb",
});

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})<{ sidebarOpen: boolean }>(({ sidebarOpen, theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  height: "100vh",
  padding: theme.spacing(7.5, 3),
  marginLeft: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED,
  transition: "margin-left 0.3s ease",
  gap: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  overflow: "hidden",
}));

const Content = styled(Stack)({
  flex: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
});

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
        <Content>{children}</Content>
      </Main>
    </Root>
  );
};

export default Layout;
