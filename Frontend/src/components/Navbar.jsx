import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "h-[80px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 shadow-lg" 
          : "h-[100px] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="transform transition-transform duration-300 hover:scale-105"
        >
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              height="80px" 
              width="80px" 
              alt="FMS Logo" 
              className="rounded-lg shadow-md"
            />
            <div className="hidden md:flex flex-col text-white">
              <span className="text-xl font-bold">FMS</span>
              <span className="text-sm opacity-90">Freight Management System</span>
            </div>
          </div>
        </Link>

        {/* Center Section - Time */}
        <div className="hidden md:flex flex-col items-center text-white">
          <span className="text-sm opacity-80">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <span className="text-xs opacity-70">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-white mr-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/tracking" className="nav-link">Track</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Login Button */}
          <Link to="/login">
            <button className="relative overflow-hidden group bg-white text-blue-600 px-6 py-2 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                Login
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Add these styles to your CSS file
const styles = `
.nav-link {
  position: relative;
  opacity: 0.9;
  transition: all 0.3s;
}

.nav-link:hover {
  opacity: 1;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: white;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
`;

export default Navbar;