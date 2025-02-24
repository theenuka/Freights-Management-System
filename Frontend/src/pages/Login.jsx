import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../redux/apiCalls";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (email && password) {
      try {
        setLoading(true);
        await login(dispatch, { email, password });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <main className="login-container">
        <div className="login-content">
          <div className="login-image-container">
            <img src="/hero.png" alt="Login Illustration" className="login-image" />
          </div>
          
          <div className="login-form-container">
            <div className="login-form">
              <h2 className="login-title">Welcome Back</h2>
              
              <div className="input-group">
                <input
                  type="text"
                  className="login-input"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
                />
                <span className="input-focus-border"></span>
              </div>

              <div className="input-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                />
                <button 
                  className="password-toggle"
                  onClick={handleTogglePassword}
                  type="button"
                >
                  {showPassword ? "👁️" : "🔒"}
                </button>
                <span className="input-focus-border"></span>
              </div>

              <button 
                className={`login-button ${loading ? 'loading' : ''}`}
                onClick={handleLogin}
                disabled={loading}
              >
                <span className="button-text">
                  {loading ? "Logging in..." : "Login"}
                </span>
                {loading && <div className="spinner"></div>}
              </button>

              {error && (
                <div className="error-message">
                  Please ensure that your staff ID and password are entered correctly.
                </div>
              )}

              {user.currentUser && <Navigate to="/myparcels" />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;