import { useState, useEffect } from "react";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("2025-01-18 08:45:30");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utcString = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentTime(utcString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-primary-700 to-primary-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-white">FMS</h2>
              <span className="text-white/80 text-sm">Freight Management System</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We understand that your parcels carry more than just items— they carry
              your trust. Committed to excellence in every delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/tracking" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Track Shipment
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* System Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">System Information</h3>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                <span className="block">UTC Time:</span>
                <span className="font-mono text-primary-300">{currentTime}</span>
              </div>
              <div className="text-sm text-gray-300">
                <span className="block">System Status:</span>
                <span className="text-green-400">Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <span>&copy; {new Date().getFullYear()} FMS. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <span className="text-primary-400">Designed by Theenuka Bandara</span>
            </div>
            <div className="flex space-x-4">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Line */}
      <div className="h-[2px] bg-gradient-to-r from-primary-400 via-accent-500 to-primary-600"></div>
    </footer>
  );
};

export default Footer;