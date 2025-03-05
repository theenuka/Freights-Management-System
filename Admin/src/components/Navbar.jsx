import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiSearch, FiBell, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-name">FMS</div>
      </div>
      
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>
      
      <div className="navbar-actions">
        <div className="notification-bell">
          <FiBell />
          {notifications > 0 && <span className="notification-badge">{notifications}</span>}
        </div>
        
        <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="avatar">
            <FiUser />
          </div>
          <span className="username">Admin</span>
          <FiChevronDown className={`dropdown-arrow ${showDropdown ? 'active' : ''}`} />
          
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">
                <FiUser className="dropdown-icon" />
                <span>My Profile</span>
              </Link>
              <Link to="/settings" className="dropdown-item">
                <FiSettings className="dropdown-icon" />
                <span>Settings</span>
              </Link>
              <hr className="dropdown-divider" />
              <Link to="/login" className="dropdown-item logout">
                <FiLogOut className="dropdown-icon" />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;