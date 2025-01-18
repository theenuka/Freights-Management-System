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
    <div className="h-[90vh] bg-gray-900 shadow-xl flex flex-col justify-between">
      {/* User Info Section */}
      <div className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Theeuka Bandara</span>
          <span className="text-xs opacity-75">Administrator</span>
        </div>
        <div className="flex items-center text-xs opacity-75">
          <FaClock className="mr-2" />
          {currentTime} UTC
        </div>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 overflow-y-auto px-2">
        <Link to="/">
          <li className={`flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2
            ${location.pathname === "/" 
              ? "bg-[#1e3c72] text-white" 
              : "text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white"}`}>
            <FaHome className="mr-[15px]" />
            Home
          </li>
        </Link>

        <li className="flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2 text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white">
          <FaUser className="mr-[15px]" />
          Profile
        </li>

        <div className="my-3 border-t border-gray-700 opacity-30" />

        <Link to="/parcels">
          <li className={`flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2
            ${location.pathname === "/parcels" 
              ? "bg-[#1e3c72] text-white" 
              : "text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white"}`}>
            <FaBox className="mr-[15px]" />
            Parcels
          </li>
        </Link>

        <Link to="/users">
          <li className={`flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2
            ${location.pathname === "/users" 
              ? "bg-[#1e3c72] text-white" 
              : "text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white"}`}>
            <FaUsers className="mr-[15px]" />
            Users
          </li>
        </Link>

        <li className="flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2 text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white">
          <FaClipboardList className="mr-[15px]" />
          Orders
        </li>

        <div className="my-3 border-t border-gray-700 opacity-30" />

        <li className="flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2 text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white">
          <FaElementor className="mr-[15px]" />
          Elements
        </li>

        <li className="flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2 text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white">
          <FaCog className="mr-[15px]" />
          Settings
        </li>

        <li className="flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2 text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white">
          <FaHdd className="mr-[15px]" />
          Backups
        </li>

        <div className="my-3 border-t border-gray-700 opacity-30" />

        <li className="flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2 text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white">
          <FaChartBar className="mr-[15px]" />
          Charts
        </li>

        <li className="flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2 text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white">
          <FaClipboard className="mr-[15px]" />
          All Logs
        </li>

        <li className="flex items-center text-[16px] cursor-pointer p-3 rounded-lg mt-2 text-[#D7D7D7] hover:bg-[#1e3c72] hover:text-white">
          <FaCalendarAlt className="mr-[15px]" />
          Calendar
        </li>
      </ul>

      {/* Status Bar */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>System Status</span>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;