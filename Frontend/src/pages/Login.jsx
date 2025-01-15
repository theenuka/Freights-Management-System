import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../redux/apiCalls";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (email && password) {
      try {
        setLoading(true);
        await login(dispatch, { email, password });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  if (user.currentUser) {
    return <Navigate to="/myparcels" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900">
      <Navbar />
      <div className="container mx-auto min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full max-w-6xl">
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 transform transition-all duration-500 hover:scale-105">
            <div className="relative">
              <img
                src="/hero.png"
                alt="Login Hero"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-700/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 max-w-md">
            <form 
              onSubmit={handleLogin}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-blue-500/20"
            >
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Welcome Back
              </h2>
              <p className="text-blue-300 text-center mb-8">
                Login to FMS - Freight Management System
              </p>

              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-blue-300 text-sm font-medium mb-2">
                  Staff Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-blue-500/20 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label className="block text-blue-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-blue-500/20 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? "👁️" : "🔒"}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-sm text-center">
                    Please ensure that your staff ID and password are entered correctly.
                  </p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 
                  ${loading 
                    ? 'bg-blue-600/50 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:shadow-lg transform hover:scale-[1.02]'
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>

              {/* Additional Links */}
              <div className="mt-6 text-center">
                <a href="#" className="text-sm text-blue-300 hover:text-blue-400 transition-colors duration-300">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;