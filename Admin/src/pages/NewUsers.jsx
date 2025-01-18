import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaBirthdayCake, FaGlobe, FaMapMarkedAlt, FaUserPlus } from "react-icons/fa";

const NewUsers = () => {
  const navigate = useNavigate();
  
  // Simple string state for each field
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generatePassword = (length) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    return Array(length)
      .fill(chars)
      .map(x => x[Math.floor(Math.random() * x.length)])
      .join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!fullname || !email) {
      toast.error("Name and email are required!", { theme: "dark" });
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = {
        fullname,
        email,
        age: age ? parseInt(age) : undefined,
        country,
        address,
        password: generatePassword(12),
        role: "user"
      };

      await publicRequest.post("/auth/register", userData);
      toast.success("User created successfully!", { theme: "dark" });
      setTimeout(() => navigate("/users"), 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create user", { theme: "dark" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Create New User</h1>
        <div className="text-gray-400 text-sm">
          2025-01-18 17:40:50 UTC | User: Theek237
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800 rounded-xl shadow-xl p-6 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              {/* Full Name Input */}
              <div className="flex flex-col space-y-2 mb-6">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaUser className="text-gray-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="James Doe"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col space-y-2 mb-6">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaEnvelope className="text-gray-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jamesdoe@gmail.com"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Age Input */}
              <div className="flex flex-col space-y-2 mb-6">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaBirthdayCake className="text-gray-400" />
                  <span>Age</span>
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="30"
                  min="18"
                  max="100"
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Country Input */}
              <div className="flex flex-col space-y-2 mb-6">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaGlobe className="text-gray-400" />
                  <span>Country</span>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Australia"
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Address Input */}
              <div className="flex flex-col space-y-2 mb-6">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaMapMarkedAlt className="text-gray-400" />
                  <span>Address</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Laura Avenue, Sydney, Australia"
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-8 w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2
                  bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white font-medium
                  transform transition-all duration-300 hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <FaUserPlus className="text-lg" />
                <span>{isSubmitting ? 'Creating...' : 'Create User'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Information Note */}
        <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-300">
            <span className="font-medium">Note:</span> A secure password will be automatically generated
            and sent to the user's email address along with their login credentials.
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

export default NewUsers;