import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

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

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await login(dispatch, { email, password });
      toast.success("Welcome to FMS!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  if (user.currentUser) {
    return <Navigate to="/myparcels" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Hero Image */}
            <div className="hidden lg:block relative">
              <div className="relative z-10">
                <img 
                  src="/hero.png" 
                  alt="FMS Login" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Secure Access</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="fms-card-glass p-8 lg:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">F</span>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold fms-gradient-text">FMS</h1>
                      <p className="text-blue-200 text-xs">Freights Management</p>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                  <p className="text-blue-200">Sign in to access your freight dashboard</p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="fms-input-glass"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-semibold text-blue-200 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="fms-input-glass pr-12"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                      />
                      <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors duration-300"
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-xl p-4">
                      <p className="text-red-200 text-sm">
                        Please ensure that your credentials are entered correctly before attempting to log in. 
                        Double-check your email and password and try again.
                      </p>
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Sign In</span>
                        <span>→</span>
                      </div>
                    )}
                  </button>

                  {/* Additional Links */}
                  <div className="space-y-4 text-center">
                    <Link 
                      to="/forgot-password" 
                      className="text-blue-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      Forgot your password?
                    </Link>
                    
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <span className="text-blue-200">Don't have an account?</span>
                      <Link 
                        to="/register" 
                        className="text-blue-300 hover:text-white font-semibold transition-colors duration-300"
                      >
                        Contact Admin
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-green-100/80 backdrop-blur-md text-green-700 px-4 py-2 rounded-full text-sm">
                  <span>🔒</span>
                  <span>Secured with 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
