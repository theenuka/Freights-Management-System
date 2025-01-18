import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div className="fixed top-0 w-full z-50">
      <div className="flex items-center justify-between h-[70px] px-6 bg-gradient-to-r from-[#1e3c72] to-[#2a5298] shadow-lg backdrop-blur-sm">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-2 fade-in">
          <div className="text-white font-bold text-2xl tracking-wider">
            <span className="text-sky-400">F</span>
            <span className="text-white">MS</span>
          </div>
          <div className="hidden md:block text-xs text-gray-300">
            Designed by Theenuka Bandara
          </div>
        </div>

        {/* Center Section - DateTime */}
        <div className="hidden md:flex flex-col items-center text-white">
          <div className="text-sm opacity-80">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <div className="text-lg font-medium">{currentTime}</div>
        </div>

        {/* Right Section */}
        <Link to="/login">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full 
            bg-white bg-opacity-10 hover:bg-opacity-20 
            transition-all duration-300 transform hover:scale-105
            text-white border border-white border-opacity-20">
            <span className="text-[15px]">Logout</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
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