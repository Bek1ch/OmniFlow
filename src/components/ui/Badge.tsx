import React from "react";
import "./Badge.css";
import { cn } from "../../utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  rounded = false,
  className = "",
}) => {
  const badgeClasses = cn(
    "badge",
    `badge--${variant}`,
    `badge--${size}`,
    rounded && "badge--rounded",
    className,
  );

  return <span className={badgeClasses}>{children}</span>;
};

export default Badge;
