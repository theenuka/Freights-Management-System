import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaBirthdayCake, FaGlobe, FaMapMarkedAlt, FaUserPlus } from "react-icons/fa";
import '../pages/newusers.css';

const NewUsers = () => {
  const navigate = useNavigate();
  
  // State management code remains the same
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // generatePassword function remains the same
  const generatePassword = (length) => {
    // ... existing generatePassword code ...
  };

  // handleSubmit function remains the same
  const handleSubmit = async (e) => {
    // ... existing handleSubmit code ...
  };

  return (
    <div className="new-user">
      {/* Header */}
      <div className="new-user-header">
        <h1 className="new-user-title">Create New User</h1>
        <div className="new-user-meta">
          2025-02-24 10:00:02 UTC | User: Theek237
        </div>
      </div>

      {/* Form Container */}
      <div className="new-user-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left Column */}
            <div>
              {/* Full Name Input */}
              <div className="form-field">
                <label className="field-label">
                  <FaUser className="label-icon" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="James Doe"
                  required
                  className="form-input"
                />
              </div>

              {/* Email Input */}
              <div className="form-field">
                <label className="field-label">
                  <FaEnvelope className="label-icon" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jamesdoe@gmail.com"
                  required
                  className="form-input"
                />
              </div>

              {/* Age Input */}
              <div className="form-field">
                <label className="field-label">
                  <FaBirthdayCake className="label-icon" />
                  <span>Age</span>
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="30"
                  min="18"
                  max="100"
                  className="form-input"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Country Input */}
              <div className="form-field">
                <label className="field-label">
                  <FaGlobe className="label-icon" />
                  <span>Country</span>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Australia"
                  className="form-input"
                />
              </div>

              {/* Address Input */}
              <div className="form-field">
                <label className="field-label">
                  <FaMapMarkedAlt className="label-icon" />
                  <span>Address</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Laura Avenue, Sydney, Australia"
                  className="form-input"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                <FaUserPlus className="submit-button-icon" />
                <span>{isSubmitting ? 'Creating...' : 'Create User'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Information Note */}
        <div className="info-note">
          <p className="info-note-text">
            <span className="info-note-label">Note:</span> A secure password will be automatically generated
            and sent to the user's email address along with their login credentials.
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default NewUsers;