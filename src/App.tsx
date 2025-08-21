import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import TaskList from "./components/TaskList";
import ProcessList from "./components/ProcessList";
import MessengerList from "./components/MessengerList";
import { LoginPage } from "./components/Auth";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние авторизации
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
      onSidebarToggle={handleSidebarToggle}>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/processes" element={<ProcessList />} />
        <Route path="/messages" element={<MessengerList />} />
      </Routes>
    </Layout>
  );
}

export default App;
