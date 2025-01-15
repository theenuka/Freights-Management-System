import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" height="60" width="60" alt="FMS Logo" className="animate-pulse" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                FMS
              </span>
            </div>
            <p className="text-blue-100 leading-relaxed hover:text-white transition-colors duration-300">
              We understand that your parcels carry more than just items—they carry
              your trust. Committed to excellence in freight management solutions.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:contact@fms.com" className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-300">
                <Mail size={18} />
                <span>contact@fms.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-300">
                <Phone size={18} />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center space-x-2 text-blue-200">
                <MapPin size={18} />
                <span>123 Logistics Ave, City</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:scale-110 transition-transform duration-300">
                <Linkedin className="text-blue-200 hover:text-white" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform duration-300">
                <Facebook className="text-blue-200 hover:text-white" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform duration-300">
                <Twitter className="text-blue-200 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-700">
          <div className="flex flex-col md:flex-row justify-between items-center text-blue-200 text-sm">
            <div>
              Designed by <span className="font-semibold">Theenuka Bandara</span>
            </div>
            <div>
              &copy; {new Date().getFullYear()} FMS. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;