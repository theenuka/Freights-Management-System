const Footer = () => {
  return (
    <div className="relative px-6 py-6 mt-auto text-white bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
      <div className="flex items-center justify-between mx-auto max-w-7xl"> 
        {/* FMS Branding */}
        <div className="flex items-center space-x-3">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text">
              FMS
            </h3>
            <p className="text-xs font-medium text-blue-200">Freights Management System</p>
          </div>
        </div>

        {/* Simple Copyright */}
        <div className="flex items-center space-x-2 text-blue-200">
          <span className="text-sm">&copy; 2025 FMS. All rights reserved.</span>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
    </div>
  );
};

export default Footer;
