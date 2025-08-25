import React from "react";
import { Stack, styled } from "@mui/material";
import Header from "./Header/Header";
import DrawerCustom from "./DrawerCustom";

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onMenuClick: (view: string) => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

const SIDEBAR_WIDTH = 300;
const SIDEBAR_WIDTH_COLLAPSED = 140;
const HEADER_HEIGHT = 64;

const Root = styled("div")({
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh",
  backgroundColor: "#f9fafb", // бывший var(--color-gray-50)
});

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})<{ sidebarOpen: boolean }>(({ sidebarOpen }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  gap: 24,
  marginLeft: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_COLLAPSED,
  transition: "margin-left 0.3s ease",
  minHeight: "100vh",
}));

const HeaderWrapper = styled("header")({
  height: HEADER_HEIGHT,
  flexShrink: 0,
});

const Content = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: 16,
  margin: 16,
  marginTop: 0,
  borderRadius: "12px 12px 0 0",
  backgroundColor: "#fff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  // overflow: "auto",
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
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <Content>{children}</Content>
      </Main>
      {/* <Stack>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, libero officiis! Dolorem ad voluptates esse incidunt in totam ratione perspiciatis distinctio maiores. Dolorum mollitia odit tempore perspiciatis. Dolorum, magnam dolores!
      </Stack> */}
    </Root>
  );
};

export default Layout;
