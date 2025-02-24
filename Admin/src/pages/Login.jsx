import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import '../pages/login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const currentTime = "2025-01-18 16:28:21"; // Using the provided UTC time

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          {/* Left Section - Branding */}
          <div className="login-branding">
            <div>
              <h1 className="login-title">FMS Admin Portal</h1>
              <p className="login-subtitle">Freight Management System</p>
              
              <div className="login-meta">
                <p>Current UTC Time: {currentTime}</p>
                <p>Designed by Theenuka Bandara</p>
              </div>

              {/* System Features */}
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-dot dot-green"></div>
                  <p className="feature-text">Real-time Tracking System</p>
                </div>
                <div className="feature-item">
                  <div className="feature-dot dot-blue"></div>
                  <p className="feature-text">Advanced Analytics Dashboard</p>
                </div>
                <div className="feature-item">
                  <div className="feature-dot dot-purple"></div>
                  <p className="feature-text">Secure Management Portal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="login-form-container">
            <div className="login-form-box">
              <div className="login-form-header">
                <h2>Welcome Back</h2>
                <p>Please sign in to continue</p>
              </div>

              <form>
                {/* Email Input */}
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Link to="/">
                  <button className="login-button">
                    Sign In
                  </button>
                </Link>
              </form>
            </div>

            {/* Additional Info */}
            <p className="login-help">
              Having trouble logging in? Contact system administrator
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;