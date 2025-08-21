import React from "react";
import "./Layout.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "../utils";

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
  onSidebarToggle
}) => {
  return (
    <div className="layout">
      <Sidebar
        isOpen={sidebarOpen}
        onMenuClick={onMenuClick}
        currentView={currentView}
      />

      <div
        className={cn(
          "layout__main",
          sidebarOpen && "layout__main--sidebar-open"
        )}>
        <Header onSidebarToggle={onSidebarToggle} />

        <main className="layout__content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
