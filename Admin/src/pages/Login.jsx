import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const currentTime = "2025-01-18 16:28:21"; // Using the provided UTC time

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-6xl mx-auto gap-8">
          {/* Left Section - Branding */}
          <div className="hidden lg:flex flex-col justify-center flex-1 p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                  FMS Admin Portal
                </h1>
                <p className="text-gray-400 text-lg">
                  Freight Management System
                </p>
              </div>
              
              <div className="space-y-4 text-gray-400">
                <p className="text-sm">
                  Current UTC Time: {currentTime}
                </p>
                <p className="text-sm opacity-75">
                  Designed by Theenuka Bandara
                </p>
              </div>

              {/* System Features */}
              <div className="space-y-3 mt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-gray-300">Real-time Tracking System</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <p className="text-gray-300">Advanced Analytics Dashboard</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <p className="text-gray-300">Secure Management Portal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full max-w-md">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-400">
                  Please sign in to continue
                </p>
              </div>

              <form className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg
                        bg-gray-700/50 text-white placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-lg
                        bg-gray-700/50 text-white placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Link to="/">
                  <button className="w-full py-3 px-4 rounded-lg
                    bg-gradient-to-r from-[#1e3c72] to-[#2a5298]
                    text-white font-semibold text-[16px]
                    transform transition-all duration-300 hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                    Sign In
                  </button>
                </Link>
              </form>
            </div>

            {/* Additional Info */}
            <p className="mt-4 text-center text-sm text-gray-400">
              Having trouble logging in? Contact system administrator
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;