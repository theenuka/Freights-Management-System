const Footer = () => {
  return (
    <div className="relative h-[300px] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 flex flex-col md:flex-row items-center justify-between p-[30px] text-white transition-all duration-300 hover:shadow-lg">
      {/* Left Section */}
      <div className="flex flex-col items-center md:items-start space-y-4 transform transition-all duration-500 hover:scale-105">
        <img 
          src="/logo.png" 
          height="200px" 
          width="200px" 
          alt="FMS Logo" 
          className="animate-fade-in"
        />
        <span className="w-[90%] md:w-[70%] text-center md:text-left leading-relaxed hover:text-blue-100 transition-colors duration-300">
          We understand that your parcels carry more than just items— they carry
          your trust. Committed to excellence in freight management solutions.
        </span>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center md:items-end space-y-2 mt-4 md:mt-0">
        <div className="space-y-2 text-right">
          <h3 className="font-semibold text-lg">Contact Us</h3>
          <p className="hover:text-blue-100 transition-colors duration-300">
            📧 theenukabandara@gmail.com
          </p>
          <p className="hover:text-blue-100 transition-colors duration-300">
            📞 +94 76 273 9681
          </p>
          <p className="hover:text-blue-100 transition-colors duration-300">
            📍 Kadawata, Sri Lanka
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end mt-4 text-sm opacity-90">
          <span className="hover:text-blue-100 transition-colors duration-300">
            Designed by Theenuka Bandara
          </span>
          <span>&copy; {new Date().getFullYear()} FMS - All rights reserved</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300"></div>
    </div>
  );
};

export default Footer;