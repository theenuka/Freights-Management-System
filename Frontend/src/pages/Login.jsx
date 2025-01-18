import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../redux/apiCalls";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-secondary-900 to-secondary-800">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex items-center justify-between">
          {/* Left Side - Hero Image */}
          <div className="hidden lg:block w-1/2 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-3xl"></div>
              <img
                src="/hero.png"
                alt="Login Hero"
                className="relative z-10 w-full h-auto max-w-lg mx-auto"
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 space-y-8 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                <p className="mt-2 text-gray-400">Please sign in to continue</p>
              </div>

              {/* Login Form */}
              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                             text-white placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setEmail(e.target.value.replace(/\s/g, ""))
                    }
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                               text-white placeholder-gray-400 transition-all duration-200"
                      placeholder="Enter your password"
                      onChange={(e) =>
                        setPassword(e.target.value.replace(/\s/g, ""))
                      }
                    />
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                               hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className={`w-full px-4 py-3 rounded-lg font-semibold text-white 
                            transition-all duration-300 ease-in-out
                            ${
                              loading
                                ? "bg-primary-600/50 cursor-not-allowed"
                                : "bg-primary-600 hover:bg-primary-700 active:bg-primary-800"
                            }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm text-center">
                      Please ensure that your staff ID and password are entered
                      correctly before attempting to log in. Double-check your
                      credentials and try again.
                    </p>
                  </div>
                )}
              </div>

              {/* System Time */}
              <div className="mt-6 text-center text-sm text-gray-400">
                System Time (UTC): 2025-01-18 08:47:05
              </div>
            </div>
          </div>
        </div>
      </div>

      {user.currentUser && <Navigate to="/myparcels" />}
      <Footer />
    </div>
  );
};

export default Login;
