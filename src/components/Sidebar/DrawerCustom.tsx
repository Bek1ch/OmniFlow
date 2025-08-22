import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from "@mui/material";
import { type FC } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MailIcon from "@mui/icons-material/Mail";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1),
}));

const ListItemCustom = styled(ListItemText)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  textAlign: "right",
  "&.isActive": {
    borderRight: `3px solid ${theme.palette.secondary.main}`,
    fontWeight: 600,
  },
}));

interface MenuItem {
  id: number;
  label: string;
  icon: string;
  href: string;
  isActive: boolean;
  view: string;
  badge?: number;
}

interface DrawerProps {
  isOpen: boolean;
  onMenuClick: (view: string) => void;
  currentView: string;
  onClose: () => void;
}

const DrawerCustom: FC<DrawerProps> = ({
  isOpen,
  currentView,
  onMenuClick,
  onClose,
}) => {
  const theme = useTheme();

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
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: isOpen ? 300 : 140,
          transition: "width 0.3s ease",
          overflowX: "hidden",
        },
      }}
      open={isOpen}
    >
      <DrawerHeader sx={{ justifyContent: isOpen ? "flex-end" : "center" }}>
        <IconButton onClick={onClose}>
          {isOpen ? <ChevronLeftIcon /> : <MenuOutlinedIcon />}
        </IconButton>
      </DrawerHeader>

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            onClick={() => onMenuClick(item.view)}
          >
            <ListItemButton
              sx={{
                px: isOpen ? 2 : 0,
                justifyContent: isOpen ? "flex-start" : "center",
              }}
            >
              {!isOpen && (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              )}

              {isOpen && (
                <ListItemCustom
                  className={item.isActive ? "isActive" : ""}
                  primary={item.label}
                  sx={{
                    flexGrow: 1,
                    pr: 2,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerCustom;
