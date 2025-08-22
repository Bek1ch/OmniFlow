import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { LoginPage } from "./pages/AuthBlock/Login";
import { authDisabled, getSidebarOpen, setSidebarOpenStorage } from "./config";
import Header from "./components/Header";
import { Stack, styled } from "@mui/material";

export const Container = styled(Stack)({
  margin: 0,
  flexGrow: 1,
  flexShrink: 1,
  height: "100vh",
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(getSidebarOpen());
  const [isAuthenticated, setIsAuthenticated] = useState(authDisabled); // Состояние авторизации, временно true
  const navigate = useNavigate();
  const location = useLocation();

  // Если пользователь не авторизован, показываем страницу входа
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const getCurrentView = () => {
    const path = location.pathname;
    if (path.includes("/processes")) return "processes";
    if (path.includes("/messages")) return "messages";
    return "tasks";
  };

  const handleMenuClick = (view: string) => {
    switch (view) {
      case "tasks":
        navigate("/");
        break;
      case "processes":
        navigate("/processes");
        break;
      case "messages":
        navigate("/messages");
        break;
    }
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    setSidebarOpenStorage(!sidebarOpen);
  };

  return (
    <Container>
      <Layout
        currentView={getCurrentView()}
        onMenuClick={handleMenuClick}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={handleSidebarToggle}
      >
        <Header onSidebarToggle={handleSidebarToggle} />
        <Outlet />
      </Layout>
      <Header onSidebarToggle={handleSidebarToggle} />
      <Outlet />
    </Container>
  );

  return (
    <Layout
      currentView={getCurrentView()}
      onMenuClick={handleMenuClick}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={handleSidebarToggle}
    >
      <Header onSidebarToggle={handleSidebarToggle} />
      <Outlet />
    </Layout>
  );
}

export default App;
