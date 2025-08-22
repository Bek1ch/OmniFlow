import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import { LoginPage } from "./pages/AuthBlock/Login";
import { authDisabled, getSidebarOpen, setSidebarOpenStorage } from "./config";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(getSidebarOpen());
  const [isAuthenticated, setIsAuthenticated] = useState(authDisabled);
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const getCurrentView = () => {
    if (location.pathname.includes("/processes")) return "processes";
    if (location.pathname.includes("/messages")) return "messages";
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
