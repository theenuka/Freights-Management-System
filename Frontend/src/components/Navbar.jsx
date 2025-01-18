import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("2025-01-18 08:44:46");

  // Update UTC time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utcString = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentTime(utcString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-slide-down">
      <div className="h-[100px] bg-gradient-to-r from-primary-600 to-primary-700 flex items-center justify-between px-10 shadow-md relative">
        {/* Logo and Company Name */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold">FMS</span>
            <span className="text-white/80 text-sm ml-2">Freight Management System</span>
          </div>
        </Link>

        {/* Center Section - UTC Time */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-white/80 text-sm">UTC Time</div>
          <div className="utc-time bg-black/20 px-4 py-1 rounded-full">
            {currentTime}
          </div>
        </div>

        {/* Right Section - Login Button and User Info */}
        <div className="flex items-center space-x-6">
          {/* User Info - if needed later */}
          <div className="text-white/80 text-sm hidden md:block">
            Designed by Theenuka Bandara
          </div>
          
          <Link to="/login">
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg
                             transition-all duration-300 ease-in-out
                             border border-white/20 hover:border-white/40
                             font-medium shadow-lg hover:shadow-xl
                             backdrop-blur-sm">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Gradient Line */}
      <div className="h-[2px] bg-gradient-to-r from-primary-400 via-accent-500 to-primary-600"></div>
    </div>
  );
};

export default Navbar;