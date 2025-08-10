import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="relative bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* FMS Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FMS
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Freights Management</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/parcels" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              Track Freight
            </Link>
            <Link 
              to="/myparcels" 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              My Shipments
            </Link>
          </div>

          {/* Login Button */}
          <Link to="/login">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center space-x-2">
                <span>Login</span>
                <span>→</span>
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </nav>
  );
};

export default Navbar;
