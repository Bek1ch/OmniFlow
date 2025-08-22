import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { LoginPage } from "./pages/AuthBlock/Login";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Состояние авторизации, временно true
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
  };

  return (
    <Layout
      currentView={getCurrentView()}
      onMenuClick={handleMenuClick}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={handleSidebarToggle}
    >
      <Outlet />
    </Layout>
  );
}

export default App;
