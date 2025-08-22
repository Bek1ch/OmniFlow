import React from "react";
import { styled, Box, IconButton, Badge, Typography } from "@mui/material";
import { Input, Button, Avatar } from "../ui";
import SearchBar from "../Inputs/SearchBar";

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Root = styled("header")(({ theme }) => ({
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  backgroundColor: "#fff",
  borderBottom: "1px solid #e5e7eb", // gray-200
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  zIndex: 10,
}));

const Left = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const Right = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 16,
});

const SearchWrapper = styled("div")({
  width: 250,
});

const LanguageBtn = styled(Button)({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const Profile = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
});

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  return (
    <Root>
      {/* Левая часть */}
      <Left>
        <SearchBar />
        {/* <SearchWrapper>
          <Input
            placeholder="Поиск..."
            leftIcon="🔍"
            variant="filled"
            size="sm"
            fullWidth
          />
        </SearchWrapper> */}
      </Left>

      {/* Правая часть */}
      <Right>
        <Button variant="ghost" size="sm" aria-label="Создать">
          ✏️
        </Button>

        <IconButton aria-label="Уведомления">
          <Badge badgeContent={3} color="error">
            🔔
          </Badge>
        </IconButton>

        <LanguageBtn variant="ghost" size="sm">
          <span>🇰🇿</span>
          <Typography variant="body2">KZ</Typography>
          <span>▼</span>
        </LanguageBtn>

        <Profile>
          <Avatar name="Пользователь" size="sm" online />
          <Typography variant="body2">Профиль</Typography>
        </Profile>
      </Right>
    </Root>
  );
};

export default Header;
