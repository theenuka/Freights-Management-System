const Footer = () => {
  return (
    <div className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* FMS Branding */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  FMS
                </h3>
                <p className="text-blue-200 text-sm">Freights Management System</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md">
              We understand that your freight carries more than just cargo— it carries
              your trust. Committed to excellence in every shipment, ensuring your goods
              reach their destination safely and on time.
            </p>
            <div className="mt-6 flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300 cursor-pointer">
                <span className="text-white text-sm">📧</span>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors duration-300 cursor-pointer">
                <span className="text-white text-sm">📞</span>
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-300 cursor-pointer">
                <span className="text-white text-sm">🌍</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Track Freight</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">My Account</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Shipping Rates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <span className="text-blue-400">📍</span>
                <span className="text-gray-300">123 Freight Ave, Logistics City</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-blue-400">📞</span>
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-blue-400">📧</span>
                <span className="text-gray-300">info@fms.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-blue-400">🕒</span>
                <span className="text-gray-300">24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-gray-400">&copy; 2024 FMS. All rights reserved.</span>
              <div className="hidden md:flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm">Terms of Service</a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">🔒 Secured by Enterprise-grade Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
  );
};

export default Footer;
