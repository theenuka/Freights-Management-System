import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">FMS</span>
          <span className="logo-dot"></span>
        </Link>
        
        <div className="navbar-menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={menuOpen ? "hamburger active" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <ul className={menuOpen ? "navbar-menu active" : "navbar-menu"}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/services" className="navbar-link">Services</Link>
          </li>
          <li className="navbar-item">
            <Link to="/tracking" className="navbar-link">Tracking</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">About Us</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">Contact</Link>
          </li>
        </ul>
        
        <div className="navbar-actions">
          <Link to="/login" className="navbar-button login-button">
            Login
          </Link>
          <Link to="/register" className="navbar-button register-button">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;