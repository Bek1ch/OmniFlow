import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  styled,
  useTheme,
} from "@mui/material";
import { type FC } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1),
}));

const ListItemCustom = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  textAlign: "right",
  flexGrow: 1,
  "&.isActive": {
    borderRight: `3px solid ${theme.palette.secondary.main}`,
    fontWeight: 600,
  },
}));

const iconMap = {
  tasks: ChecklistOutlinedIcon,
  processes: MemoryOutlinedIcon,
  messages: ChatOutlinedIcon,
};

interface MenuItem {
  id: number;
  label: string;
  icon: keyof typeof iconMap;
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
      icon: "tasks",
      href: "/tasks",
      isActive: currentView === "tasks" || currentView === "",
      view: "tasks",
      badge: 12,
    },
    {
      id: 2,
      label: "Процессы",
      icon: "processes",
      href: "/processes",
      isActive: currentView === "processes",
      view: "processes",
    },
    {
      id: 3,
      label: "Мессенджеры",
      icon: "messages",
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
        {menuItems.map((item) => {
          const IconComponent = iconMap[item.icon];
          return (
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
                    <IconComponent
                      sx={{
                        fontSize: 40,
                        padding: 1,
                        borderRadius: "50%",
                        border: item.isActive
                          ? `2px solid ${theme.palette.secondary.main}`
                          : "2px solid transparent",
                        color: item.isActive
                          ? theme.palette.secondary.main
                          : theme.palette.text.primary,
                      }}
                    />
                  </ListItemIcon>
                )}

                {isOpen && (
                  <ListItemCustom className={item.isActive ? "isActive" : ""}>
                    {item.label}
                  </ListItemCustom>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default DrawerCustom;
