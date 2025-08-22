import React, { useState } from "react";
import "./LoginPage.css";
import { Input, Button, Card } from "../../../components/ui";
import axios from "axios";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Пробуем подключиться к серверу
      const response = await axios.post(
        "http://localhost:5001/api/v1/auth/login",
        {
          user_name: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000, // 5 секунд таймаут
        },
      );

      console.log("Login successful:", response.data);
      onLogin();
    } catch (err) {
      console.error("Login failed:", err);

      // Проверяем если это сетевая ошибка (сервер не запущен)
      if (
        err &&
        typeof err === "object" &&
        "code" in err &&
        (err as never)["code"] === "ERR_NETWORK"
      ) {
        // Если сервер недоступен, используем mock авторизацию
        console.log("Server not available, using mock login");
        if (email.trim()) {
          setTimeout(() => {
            onLogin();
          }, 1000); // Имитируем задержку сервера
          return;
        } else {
          setError("Введите логин для входа");
        }
      } else {
        let errorMessage = "Ошибка авторизации";
        if (err && typeof err === "object" && "response" in err) {
          const response = (err as never)["response"] as {
            data?: { message?: string };
          };
          if (response?.data?.message) {
            errorMessage = response.data.message;
          }
        }
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-content">
            <div className="login-form-section">
              <h1 className="login-title">Авторизация</h1>
              <p className="login-subtitle">Введите логин и пароль для входа</p>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <Input
                    type="text"
                    placeholder="Логин"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    className="login-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                    className="login-input"
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="remember-checkbox">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Запомнить меня
                  </label>
                </div>

                {error && <div className="error-message">{error}</div>}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="login-button"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? "Вход..." : "Войти"}
                </Button>

                <button type="button" className="forgot-password">
                  Забыли пароль?
                </button>
              </form>
            </div>

            <div className="login-divider">
              <span>или</span>
            </div>

            <div className="qr-section">
              <h3 className="qr-title">Войти</h3>
              <p className="qr-subtitle">
                Отсканируйте QR-код с помощью мобильного приложения
              </p>

              <div className="qr-code">
                <div className="qr-placeholder">
                  {/* QR код будет здесь */}
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                  >
                    <rect width="120" height="120" fill="#000000" />
                    <rect x="10" y="10" width="20" height="20" fill="#ffffff" />
                    <rect x="40" y="10" width="10" height="10" fill="#ffffff" />
                    <rect x="60" y="10" width="10" height="10" fill="#ffffff" />
                    <rect x="80" y="10" width="10" height="10" fill="#ffffff" />
                    <rect x="90" y="10" width="20" height="20" fill="#ffffff" />
                    <rect x="10" y="30" width="10" height="10" fill="#ffffff" />
                    <rect x="30" y="30" width="10" height="10" fill="#ffffff" />
                    <rect x="50" y="30" width="20" height="10" fill="#ffffff" />
                    <rect x="80" y="30" width="10" height="10" fill="#ffffff" />
                    <rect
                      x="100"
                      y="30"
                      width="10"
                      height="10"
                      fill="#ffffff"
                    />
                    <rect x="10" y="40" width="10" height="10" fill="#ffffff" />
                    <rect x="30" y="40" width="10" height="10" fill="#ffffff" />
                    <rect x="60" y="40" width="10" height="10" fill="#ffffff" />
                    <rect x="80" y="40" width="10" height="10" fill="#ffffff" />
                    <rect
                      x="100"
                      y="40"
                      width="10"
                      height="10"
                      fill="#ffffff"
                    />
                    <rect x="10" y="50" width="10" height="10" fill="#ffffff" />
                    <rect x="30" y="50" width="10" height="10" fill="#ffffff" />
                    <rect x="50" y="50" width="10" height="10" fill="#ffffff" />
                    <rect x="70" y="50" width="10" height="10" fill="#ffffff" />
                    <rect x="90" y="50" width="10" height="10" fill="#ffffff" />
                    <rect x="10" y="60" width="20" height="20" fill="#ffffff" />
                    <rect x="40" y="60" width="10" height="10" fill="#ffffff" />
                    <rect x="60" y="60" width="10" height="10" fill="#ffffff" />
                    <rect x="80" y="60" width="10" height="10" fill="#ffffff" />
                    <rect x="90" y="60" width="20" height="20" fill="#ffffff" />
                    <rect x="50" y="80" width="20" height="10" fill="#ffffff" />
                    <rect x="10" y="90" width="20" height="20" fill="#ffffff" />
                    <rect x="40" y="90" width="10" height="10" fill="#ffffff" />
                    <rect x="60" y="90" width="10" height="10" fill="#ffffff" />
                    <rect x="80" y="90" width="10" height="10" fill="#ffffff" />
                    <rect x="90" y="90" width="20" height="20" fill="#ffffff" />
                  </svg>
                </div>
              </div>

              <p className="qr-description">
                Наведите камеру вашего мобильного устройства на QR-код чтобы
                авторизоваться
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
