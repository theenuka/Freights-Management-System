import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { publicRequest } from "../requestMethods";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.fullname.trim()) newErrors.fullname = 'Full name required';
    if (!form.email.trim()) newErrors.email = 'Email required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password required';
    if (form.password && form.password.length < 6) newErrors.password = 'Minimum 6 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) {
      toast.error('Fix validation errors');
      return;
    }
    setLoading(true);
    try {
      const res = await publicRequest.post("/auth/register", {
        fullname: form.fullname.trim(),
        email: form.email.trim(),
        password: form.password,
        role: 'admin'
      });
      if (res.status === 201) {
        toast.success("Account created. You can sign in now.");
      } else {
        toast.info("Response received. Please try signing in.");
      }
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 409) {
        toast.error("Email already registered. Use another or login.");
      } else if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 bg-white">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
        <h2 className="mb-2 text-2xl font-semibold text-gray-900">Create Admin Account</h2>
        <p className="mb-8 text-sm text-gray-600">Set up your administrator access for FMS.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={`w-full px-4 py-3 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-gray-400 ${errors.fullname ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'}`}
            />
            {errors.fullname && <p className="mt-1 text-xs text-red-600">{errors.fullname}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@fms.com"
              className={`w-full px-4 py-3 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-gray-400 ${errors.email ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Choose a strong password"
                className={`w-full px-4 py-3 pr-12 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-gray-400 ${errors.password ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-semibold text-white transition-colors rounded-lg shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
          <p className="text-xs text-center text-gray-500">
            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
