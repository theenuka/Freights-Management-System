import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../components/navbar.css';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* Logo and Company Name */}
        <div className="navbar-brand">
          <div className="navbar-logo">
            <span className="navbar-logo-highlight">F</span>
            <span>MS</span>
          </div>
          <div className="navbar-designer">
            Designed by Theenuka Bandara
          </div>
        </div>

        {/* Center Section - DateTime */}
        <div className="navbar-datetime">
          <div className="navbar-date">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <div className="navbar-time">{currentTime}</div>
        </div>

        {/* Right Section */}
        <Link to="/login">
          <button className="navbar-logout">
            <span className="navbar-logout-text">Logout</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="navbar-logout-icon" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;