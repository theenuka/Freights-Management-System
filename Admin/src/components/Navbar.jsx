import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem('fms_admin');
    } catch (e) {
      console.warn('Failed to clear session', e);
    }
    navigate('/login');
  };
  return (
    <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 shadow-2xl border-b border-slate-700">
      <div className="flex items-center justify-between h-[70px] px-6">
        {/* FMS Branding Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                FMS Admin
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Freights Management System</p>
            </div>
          </div>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-6">
          {/* Admin Info */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">A</span>
            </div>
            <div className="text-gray-300">
              <p className="text-sm font-medium">Administrator</p>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>

          {/* Logout Button */}
            <button onClick={handleLogout} className="group relative px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
  );
};

export default Navbar;
