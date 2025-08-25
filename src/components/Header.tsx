import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useState } from "react";

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between",
});

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  flex: 1,
  maxWidth: 500,
  [theme.breakpoints.down("sm")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.down("xs")]: {
    maxWidth: "100%",
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  fontSize: theme.typography.body1.fontSize,
}));

const ActionsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <StyledToolbar disableGutters>
        <SearchBox>
          <SearchIcon sx={{ color: "rgba(73,73,73,0.5)" }} />
          <SearchInput placeholder="Поиск" />
        </SearchBox>

        <ActionsBox>
          <IconButton>
            <EditOutlinedIcon />
          </IconButton>

          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>

          <IconButton>
            <LanguageOutlinedIcon />
          </IconButton>

          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ width: 32, height: 32 }}>D</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
            <MenuItem onClick={handleMenuClose}>Настройки</MenuItem>
            <MenuItem onClick={handleMenuClose}>Выйти</MenuItem>
          </Menu>
        </ActionsBox>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
