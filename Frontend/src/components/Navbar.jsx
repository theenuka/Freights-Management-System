import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, Package, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/logo.png" 
              className="h-12 w-12 transform transition-transform duration-300 group-hover:scale-110" 
              alt="FMS Logo" 
            />
            <span className="text-2xl font-bold text-white hidden md:block">
              FMS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center space-x-1">
              <Package size={18} />
              <span>Services</span>
            </Link>
            <Link to="/contact" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center space-x-1">
              <Phone size={18} />
              <span>Contact</span>
            </Link>
            <Link to="/login">
              <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-medium 
                transform transition-all duration-300 hover:scale-105 hover:bg-blue-50 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                shadow-md hover:shadow-lg">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fadeIn">
            <Link to="/services" 
              className="block text-blue-100 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-blue-800"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Package size={18} />
                <span>Services</span>
              </div>
            </Link>
            <Link to="/contact" 
              className="block text-blue-100 hover:text-white transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-blue-800"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Phone size={18} />
                <span>Contact</span>
              </div>
            </Link>
            <Link to="/login" 
              className="block"
              onClick={() => setIsOpen(false)}
            >
              <button className="w-full bg-white text-blue-900 px-6 py-2 rounded-lg font-medium 
                transform transition-all duration-300 hover:bg-blue-50
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;