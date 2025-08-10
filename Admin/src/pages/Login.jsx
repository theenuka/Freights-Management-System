import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="relative z-10 grid items-center w-full max-w-6xl grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 lg:justify-start">
              <div className="flex items-center justify-center w-12 h-12 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <span className="text-xl font-bold text-white">F</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-transparent lg:text-5xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  FMS Admin
                </h1>
                <p className="text-lg text-blue-200">Freights Management System</p>
              </div>
            </div>
            
            <p className="max-w-md mx-auto text-lg text-blue-100 lg:text-xl lg:mx-0">
              Manage your freight operations with our comprehensive administration platform
            </p>
          </div>

          {/* Features */}
          <div className="max-w-md mx-auto space-y-4 lg:mx-0">
            <div className="flex items-center space-x-3 text-blue-200">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Real-time freight tracking</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-200">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Advanced analytics dashboard</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-200">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Comprehensive user management</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden lg:block">
            <img 
              src="/hero.png" 
              alt="FMS Hero" 
              className="max-w-md mx-auto transition-opacity duration-300 opacity-90 hover:opacity-100"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="p-8 border shadow-2xl bg-white/10 backdrop-blur-lg rounded-2xl border-white/20">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-white">Welcome Back</h2>
                <p className="text-blue-200">Sign in to your admin account</p>
              </div>

              <form className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-blue-200">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 px-4 text-white placeholder-blue-300 transition-all duration-300 border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="admin@fms.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-blue-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 px-4 pr-12 text-white placeholder-blue-300 transition-all duration-300 border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-300 hover:text-blue-200"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-white/20 bg-white/10"
                    />
                    <label htmlFor="remember-me" className="block ml-2 text-sm text-blue-200">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <button type="button" className="text-blue-300 transition-colors duration-300 hover:text-blue-200">
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Link to="/">
                  <button
                    type="button"
                    className="w-full px-4 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign In to FMS Admin
                  </button>
                </Link>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-blue-300">
                  Need help? Contact{" "}
                  <button type="button" className="text-blue-200 transition-colors duration-300 hover:text-white">
                    FMS Support
                  </button>
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-blue-300">
                🔒 Secured with enterprise-grade encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
