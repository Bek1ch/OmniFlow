import React from "react";
import "./Avatar.css";
import { cn } from "../../utils";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  shape?: "circle" | "square";
  className?: string;
  online?: boolean;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = "md",
  shape = "circle",
  className = "",
  online,
  onClick,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarClasses = cn(
    "avatar",
    `avatar--${size}`,
    `avatar--${shape}`,
    onClick && "avatar--clickable",
    className,
  );

  const content = src ? (
    <img src={src} alt={alt || name} className="avatar__image" />
  ) : name ? (
    <span className="avatar__initials">{getInitials(name)}</span>
  ) : (
    <span className="avatar__placeholder">👤</span>
  );

  return (
    <div className={avatarClasses} onClick={onClick}>
      {content}
      {online !== undefined && (
        <span
          className={`avatar__status ${online ? "avatar__status--online" : "avatar__status--offline"}`}
        />
      )}
    </div>
  );
};

export default Avatar;
