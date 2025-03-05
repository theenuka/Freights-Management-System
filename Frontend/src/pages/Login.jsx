import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Navigate } from "react-router-dom";
import { useState } from "react";
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
        setLoading(false); // Navigate on successful login
      } catch (error) {
        setLoading(false);
        // Handle login error (e.g., display an error message)
      }
    }
  };
  
  return (
    <div className="login-page">
      <Navbar />
      
      <div className="login-container">
        <div className="login-image">
          <img src="/hero.png" alt="Login" />
        </div>
        
        <div className="login-form-wrapper">
          <div className="login-form">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your account</p>
            
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                />
                <button className="toggle-password" onClick={handleTogglePassword}>
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>
            
            <button className="login-button" onClick={handleLogin} disabled={loading}>
              {loading ? "Loading..." : "Login"}
              {user.currentUser ? <Navigate to="/myparcels" /> : ""}
            </button>
            
            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                <span>Please ensure that your staff ID and password are entered correctly before attempting to log in. Double-check your credentials and try again.</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;