import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewUsers = () => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const generatePassword = (length = 12) => {
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*";

    const allChars = lowerCaseChars + upperCaseChars + numberChars + specialChars;

    let password = "";

    // Ensure the password contains at least one of each required type
    password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
    password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    password += numberChars[Math.floor(Math.random() * numberChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest of the password length with random characters from all types
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the characters to ensure a random order
    password = password.split("").sort(() => 0.5 - Math.random()).join("");

    return password;
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(12);
    setGeneratedPassword(newPassword);
    toast.info("Secure password generated! This will be sent to the user via email.", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const password = generatedPassword || generatePassword(12);

      await publicRequest.post("/auth/register", { ...inputs, password });

      // Clear the input fields
      setInputs({});
      setGeneratedPassword("");

      // Show success toast
      toast.success(
        "User has been successfully registered and credentials have been sent via email!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

    } catch (error) {
      console.log(error);
      toast.error("Failed to register the user. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const formSections = [
    {
      title: "Personal Information",
      fields: [
        { name: "fullname", label: "Full Name", type: "text", placeholder: "e.g., John Smith", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "user@company.com", required: true },
        { name: "age", label: "Age", type: "number", placeholder: "e.g., 28", required: true, min: 18, max: 100 },
      ]
    },
    {
      title: "Location Details",
      fields: [
        { name: "country", label: "Country", type: "text", placeholder: "e.g., United States", required: true },
        { name: "address", label: "Full Address", type: "textarea", placeholder: "Complete address including street, city, state/province, postal code", required: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4 space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-blue-600">
            <span className="text-sm font-bold text-white">+</span>
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
            Create New User
          </h1>
        </div>
        <p className="text-gray-600">Add a new user to the FMS system with automatic credential generation</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form Sections */}
          {formSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="p-6 fms-card">
              <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-800">
                <div className="w-2 h-6 mr-3 rounded-full bg-gradient-to-b from-green-500 to-blue-600"></div>
                {section.title}
              </h2>
              
              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                    
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={inputs[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={3}
                        className="resize-none fms-input"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={inputs[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        min={field.min}
                        max={field.max}
                        className="fms-input"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Password Generation Section */}
        <div className="p-6 mt-8 fms-card">
          <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-800">
            <div className="w-2 h-6 mr-3 rounded-full bg-gradient-to-b from-purple-500 to-pink-600"></div>
            Security Credentials
          </h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Generated Password
              </label>
              <div className="flex space-x-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={generatedPassword}
                  readOnly
                  placeholder="Click 'Generate Password' to create secure credentials"
                  className="flex-1 fms-input bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-2 text-white transition-colors duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="w-full px-4 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:scale-105"
              >
                Generate Secure Password
              </button>
            </div>
          </div>

          <div className="p-4 mt-4 border border-blue-200 rounded-lg bg-blue-50">
            <h4 className="mb-2 text-sm font-medium text-blue-800">🔐 Security Information:</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Password is automatically generated with 12 characters</li>
              <li>• Contains uppercase, lowercase, numbers, and special characters</li>
              <li>• User will receive login credentials via email</li>
              <li>• User can change password after first login</li>
            </ul>
          </div>
        </div>

        {/* Submit Section */}
        <div className="p-6 mt-8 fms-card">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-800">Ready to Create User?</h3>
              <p className="text-gray-600">Review all information and generate password before submitting</p>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  setInputs({});
                  setGeneratedPassword("");
                }}
                className="px-6 py-3 font-semibold text-white transition-all duration-300 transform bg-gray-500 rounded-lg hover:bg-gray-600 hover:scale-105"
                disabled={loading}
              >
                Clear Form
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'fms-button-primary'
                }`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="fms-spinner"></div>
                    <span>Creating User...</span>
                  </div>
                ) : (
                  'Create User Account'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Quick Actions */}
      <div className="max-w-4xl p-6 mx-auto mt-8 fms-card">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button className="fms-button-secondary">
            View All Users
          </button>
          <button className="fms-button-secondary">
            User Templates
          </button>
          <button className="fms-button-secondary">
            Bulk Import Users
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default NewUsers;
