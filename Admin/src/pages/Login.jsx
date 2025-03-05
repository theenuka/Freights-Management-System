import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Footer from "../components/Footer";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="brand-section">
          <h2 className="brand-name">SendIT Admin</h2>
          <div className="brand-visual">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <img src="/hero.png" alt="SendIT Admin" className="hero-image" />
          </div>
          <p className="brand-tagline">Delivery Management Platform</p>
        </div>
        
        <div className="login-form-container">
          <div className="login-form">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Log in to your admin account</p>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-input" 
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            
            <Link to="/" className="login-button-link">
              <button className="login-button">
                <span>Login to Dashboard</span>
              </button>
            </Link>
            
            <div className="login-footer">
              <p>Need help? <a href="#" className="help-link">Contact Support</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;