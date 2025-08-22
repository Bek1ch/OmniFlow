import React from "react";
import "./Sidebar.css";
import { Button } from "./ui";
import { cn } from "../utils";

interface SidebarProps {
  isOpen: boolean;
  onMenuClick: (view: string) => void;
  currentView: string;
}

interface MenuItem {
  id: number;
  label: string;
  icon: string;
  href: string;
  isActive: boolean;
  view: string;
  badge?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onMenuClick,
  currentView,
}) => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: "Задачи",
      icon: "📋",
      href: "/tasks",
      isActive: currentView === "tasks" || currentView === "",
      view: "tasks",
      badge: 12,
    },
    {
      id: 2,
      label: "Процессы",
      icon: "⚙️",
      href: "/processes",
      isActive: currentView === "processes",
      view: "processes",
    },
    {
      id: 3,
      label: "Мессенджеры",
      icon: "💬",
      href: "/messages",
      isActive: currentView === "messages",
      view: "messages",
      badge: 3,
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className={cn("sidebar", isOpen && "sidebar--open")}>
        <nav className="sidebar__nav">
          <ul className="sidebar__menu">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar__menu-item">
                <button
                  onClick={() => onMenuClick(item.view)}
                  className={cn(
                    "sidebar__link",
                    item.isActive && "sidebar__link--active",
                  )}
                  data-tooltip={item.label}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  <span className="sidebar__label">{item.label}</span>
                  {item.badge && (
                    <span className="sidebar__badge">{item.badge}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="sidebar__divider" />

          <div className="sidebar__section">
            <div className="sidebar__section-title">Недавние</div>
            <ul className="sidebar__submenu">
              <li>
                <button
                  className="sidebar__sublink"
                  data-tooltip="Отчет за неделю"
                >
                  <span className="sidebar__icon">📄</span>
                  <span className="sidebar__label">Отчет за неделю</span>
                </button>
              </li>
              <li>
                <button className="sidebar__sublink" data-tooltip="Аналитика">
                  <span className="sidebar__icon">📊</span>
                  <span className="sidebar__label">Аналитика</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="sidebar__footer">
          <Button
            variant="ghost"
            size="sm"
            className="sidebar__settings"
            aria-label="Настройки"
          >
            ⚙️
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
