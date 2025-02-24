import {
  FaHome,
  FaUsers,
  FaUser,
  FaBox,
  FaClipboardList,
  FaElementor,
  FaCog,
  FaHdd,
  FaChartBar,
  FaClipboard,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import '../components/menu.css';

const Menu = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState("");

  // Update UTC time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="menu">
      {/* User Info Section */}
      <div className="menu-header">
        <div className="menu-user-info">
          <span className="menu-username">Theeuka Bandara</span>
          <span className="menu-role">Administrator</span>
        </div>
        <div className="menu-time">
          <FaClock className="menu-time-icon" />
          {currentTime} UTC
        </div>
      </div>

      {/* Menu Items */}
      <ul className="menu-items">
        <Link to="/">
          <li className={`menu-item ${location.pathname === "/" ? "active" : ""}`}>
            <FaHome className="menu-item-icon" />
            Home
          </li>
        </Link>

        <li className="menu-item">
          <FaUser className="menu-item-icon" />
          Profile
        </li>

        <div className="menu-divider" />

        <Link to="/parcels">
          <li className={`menu-item ${location.pathname === "/parcels" ? "active" : ""}`}>
            <FaBox className="menu-item-icon" />
            Parcels
          </li>
        </Link>

        <Link to="/users">
          <li className={`menu-item ${location.pathname === "/users" ? "active" : ""}`}>
            <FaUsers className="menu-item-icon" />
            Users
          </li>
        </Link>

        <li className="menu-item">
          <FaClipboardList className="menu-item-icon" />
          Orders
        </li>

        <div className="menu-divider" />

        <li className="menu-item">
          <FaElementor className="menu-item-icon" />
          Elements
        </li>

        <li className="menu-item">
          <FaCog className="menu-item-icon" />
          Settings
        </li>

        <li className="menu-item">
          <FaHdd className="menu-item-icon" />
          Backups
        </li>

        <div className="menu-divider" />

        <li className="menu-item">
          <FaChartBar className="menu-item-icon" />
          Charts
        </li>

        <li className="menu-item">
          <FaClipboard className="menu-item-icon" />
          All Logs
        </li>

        <li className="menu-item">
          <FaCalendarAlt className="menu-item-icon" />
          Calendar
        </li>
      </ul>

      {/* Status Bar */}
      <div className="menu-status">
        <div className="menu-status-content">
          <span>System Status</span>
          <div className="menu-status-indicator">
            <div className="menu-status-dot"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;