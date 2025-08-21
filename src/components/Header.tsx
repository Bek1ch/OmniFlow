import React from 'react';
import './Header.css';
import { Input, Button, Avatar, Badge } from './ui';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  return (
    <header className="header">
      <div className="header__left">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="header__sidebar-toggle"
          aria-label="Переключить боковую панель"
        >
          ☰
        </Button>
        
        <div className="header__search">
          <Input
            placeholder="Поиск..."
            leftIcon="🔍"
            variant="filled"
            size="sm"
            className="header__search-input"
          />
        </div>
      </div>
      
      <div className="header__actions">
        <Button
          variant="ghost"
          size="sm"
          className="header__action-btn"
          aria-label="Создать"
        >
          ✏️
        </Button>
        
        <div className="header__notifications">
          <Button
            variant="ghost"
            size="sm"
            className="header__action-btn"
            aria-label="Уведомления"
          >
            🔔
          </Button>
          <Badge variant="danger" size="sm" className="header__notification-badge">
            3
          </Badge>
        </div>
        
        <div className="header__language">
          <Button variant="ghost" size="sm" className="header__language-btn">
            <span className="header__language-flag">🇰🇿</span>
            <span className="header__language-text">KZ</span>
            <span className="header__language-arrow">▼</span>
          </Button>
        </div>
        
        <div className="header__profile">
          <Avatar
            name="Пользователь"
            size="sm"
            online={true}
            className="header__avatar"
          />
          <span className="header__profile-name">Профиль</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
