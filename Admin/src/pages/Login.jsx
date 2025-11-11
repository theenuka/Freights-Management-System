import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await publicRequest.post("/auth/login", { email: email.trim(), password });
      // store token and user for route protection
      localStorage.setItem("fms_admin", JSON.stringify(res.data));
      toast.success("Welcome back");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-white">
      <div className="grid w-full max-w-6xl gap-12 lg:grid-cols-2">
        {/* Branding / Info */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <div className="flex items-center mb-6 space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm">
              <span className="text-xl font-bold text-white">F</span>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">FMS Admin</h1>
              <p className="text-sm font-medium text-blue-600">Freights Management System</p>
            </div>
          </div>
          <p className="max-w-md mb-8 text-lg leading-relaxed text-gray-600">Manage freight operations, users and analytics in a simple centralized dashboard.</p>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3 text-sm text-gray-700"><span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded bg-blue-600">1</span><span>Real-time shipment tracking</span></li>
            <li className="flex items-center space-x-3 text-sm text-gray-700"><span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded bg-indigo-600">2</span><span>Actionable analytics & KPIs</span></li>
            <li className="flex items-center space-x-3 text-sm text-gray-700"><span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded bg-purple-600">3</span><span>User & role management</span></li>
          </ul>
          <div className="hidden mt-10 lg:block">
            <img src="/hero.png" alt="FMS Illustration" className="w-full max-w-sm transition-shadow duration-200 rounded-xl shadow-sm hover:shadow-md" />
          </div>
        </div>

        {/* Login Form */}
        <div className="order-1 lg:order-2">
          <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
            <h2 className="mb-2 text-2xl font-semibold text-gray-900">Welcome Back</h2>
            <p className="mb-8 text-sm text-gray-600">Sign in to your administrator account.</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  placeholder="admin@fms.com"
                  className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-gray-600">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot password?</button>
              </div>
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-sm font-semibold text-white transition-colors rounded-lg shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70"
                >
                  {loading ? 'Signing in...' : 'Sign In to FMS Admin'}
                </button>
                <p className="text-xs text-center text-gray-500">
                  No account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">Create one</Link>
                </p>
              </div>
            </form>
            <div className="pt-6 mt-6 text-xs border-t border-gray-100 text-gray-500">
              🔒 Secured with enterprise-grade encryption
            </div>
            <div className="mt-4 text-xs text-gray-400">Need help? <button type="button" className="font-medium text-blue-600 hover:text-blue-700">Contact Support</button></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
