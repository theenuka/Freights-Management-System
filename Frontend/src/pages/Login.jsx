import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../redux/apiCalls";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex items-center justify-between gap-12">
          {/* Left side - Hero Image */}
          <div className="hidden lg:block w-1/2 animate-float">
            <img
              src="/hero.png"
              alt="Login illustration"
              className="w-full h-auto max-w-lg mx-auto"
            />
          </div>

          {/* Right side - Login Form */}
          <div className="w-full lg:w-1/2 max-w-md">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl animate-fadeIn">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Welcome Back
              </h2>
              
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-100">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      className="w-full bg-white/5 border border-blue-200/20 rounded-lg py-3 pl-12 pr-4 
                        text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 
                        focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-100">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value.trim())}
                      className="w-full bg-white/5 border border-blue-200/20 rounded-lg py-3 pl-12 pr-12 
                        text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 
                        focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 
                        hover:text-white transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle size={20} />
                    <p className="text-sm">
                      Invalid credentials. Please check your email and password.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-blue-900 py-3 px-4 rounded-lg font-medium
                    transform transition-all duration-300 hover:bg-blue-50 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;