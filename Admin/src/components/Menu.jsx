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
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>FMS</h2>
        <p>Admin</p>
      </div>
      
      <div className="menu-section">
        <h3 className="menu-title">Main Menu</h3>
        <ul className="menu-list">
          <li className={currentPath === "/" ? "active" : ""}>
            <Link to="/">
              <FaHome className="menu-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          
          <li className={currentPath === "/profile" ? "active" : ""}>
            <Link to="/profile">
              <FaUser className="menu-icon" />
              <span>Profile</span>
            </Link>
          </li>
          
          <li className={currentPath.includes("/user") ? "active" : ""}>
            <Link to="/users">
              <FaUsers className="menu-icon" />
              <span>Users</span>
            </Link>
          </li>
          
          <li className={currentPath.includes("/parcel") ? "active" : ""}>
            <Link to="/parcels">
              <FaBox className="menu-icon" />
              <span>Parcels</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="menu-section">
        <h3 className="menu-title">Management</h3>
        <ul className="menu-list">
          <li className={currentPath.includes("/reports") ? "active" : ""}>
            <Link to="/reports">
              <FaChartBar className="menu-icon" />
              <span>Reports</span>
            </Link>
          </li>
          
          <li className={currentPath.includes("/schedule") ? "active" : ""}>
            <Link to="/schedule">
              <FaCalendarAlt className="menu-icon" />
              <span>Schedule</span>
            </Link>
          </li>
          
          <li className={currentPath.includes("/inventory") ? "active" : ""}>
            <Link to="/inventory">
              <FaHdd className="menu-icon" />
              <span>Inventory</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="menu-section">
        <h3 className="menu-title">System</h3>
        <ul className="menu-list">
          <li className={currentPath.includes("/settings") ? "active" : ""}>
            <Link to="/settings">
              <FaCog className="menu-icon" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;