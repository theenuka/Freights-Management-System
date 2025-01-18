const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between h-[100px]">
          {/* Left section - FMS branding */}
          <div className="flex items-center space-x-3">
            <div className="font-bold text-xl">
              <span className="bg-white text-[#1e3c72] px-2 py-1 rounded">FMS</span>
              <span className="text-xs ml-2 text-gray-300">
                Freight Management System
              </span>
            </div>
          </div>

          {/* Center section - Copyright and Credits */}
          <div className="text-center text-sm">
            <p className="text-gray-300">Designed by Theenuka Bandara</p>
            <p className="text-gray-400 text-xs mt-1">
              &copy; {currentYear} All rights reserved
            </p>
          </div>

          {/* Right section - User Info */}
          <div className="text-right text-sm">
            <div className="flex flex-col items-end">
              <span className="text-white font-medium">
                {/* Username */}
                Theenuka Bandara
              </span>
              <span className="text-gray-300 text-xs">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;