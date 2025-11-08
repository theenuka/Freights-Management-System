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
      const result = await login(dispatch, { email, password });
      setLoading(false);
      if (result.ok) {
        toast.success("Welcome to FMS!");
      } else if (result.status === 401) {
        toast.error("Incorrect email or password.");
      } else if (result.status === 404) {
        toast.error("User not found. Please contact Admin.");
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  if (user.currentUser) {
    return <Navigate to="/myparcels" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-6xl">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left: Hero card with badges */}
            <div className="relative hidden lg:block">
              <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-2xl">
                <img src="/hero.png" alt="FMS Login" className="w-full h-auto rounded-xl" />
              </div>
              <div className="absolute -top-5 -left-5">
                <div className="flex items-center px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl shadow-sm">
                  <span className="mr-2 inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-medium text-gray-700">Secure Access</span>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5">
                <div className="flex items-center px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl shadow-sm text-gray-600">
                  <span className="mr-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  24/7 Available
                </div>
              </div>
            </div>

            {/* Right: Login card */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="mb-8 text-center">
                  <div className="flex items-center justify-center mb-4 space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm">
                      <span className="text-xl font-bold text-white">F</span>
                    </div>
                    <div className="text-left">
                      <h1 className="text-2xl font-bold text-gray-900">FMS</h1>
                      <p className="text-xs font-medium text-blue-600">Freights Management</p>
                    </div>
                  </div>
                  <h2 className="mb-1 text-2xl font-semibold text-gray-900">Welcome Back</h2>
                  <p className="text-sm text-gray-600">Sign in to access your freight dashboard</p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-gray-400"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-4 py-3 pr-12 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-gray-400"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="p-4 border border-red-200 rounded-xl bg-red-50">
                      <p className="text-sm text-red-700">Please ensure your credentials are correct and try again.</p>
                    </div>
                  )}

                  {/* Sign in */}
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full py-3 font-semibold text-white transition-colors rounded-lg shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60"
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

                  {/* Links */}
                  <div className="space-y-4 text-center">
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                      Forgot your password?
                    </Link>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <span className="text-gray-600">Don&apos;t have an account?</span>
                      <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
                        Contact Admin
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security badge */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-4 py-2 text-sm text-green-700 bg-green-100 border border-green-200 rounded-full">
                  <span className="mr-2">🔒</span>
                  Secured with 256-bit SSL encryption
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
