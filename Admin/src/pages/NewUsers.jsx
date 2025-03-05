import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiShield, FiCheck } from "react-icons/fi";
import 'react-toastify/dist/ReactToastify.css';
import "./NewUsers.css";

const NewUsers = () => {
  const [inputs, setInputs] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Form submission logic
      await publicRequest.post("/auth/register", inputs);
      toast.success("User created successfully!");
      e.target.reset();
      setInputs({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      console.log(err);
    }
  };

  return (
    <div className="new-user-container">
      <div className="new-user-header">
        <h1 className="new-user-title">Create New User</h1>
        <p className="new-user-subtitle">Add a new user to the system</p>
      </div>

      <div className="new-user-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title"><FiUser /> Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Enter first name"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Last Name</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Enter last name"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <FiPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <div className="input-wrapper">
                <FiMapPin className="input-icon" />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter full address"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title"><FiShield /> Account Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Username</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper password-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    onChange={handleChange}
                    required
                  />
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="password-requirements">
                  <p>Password must be at least 8 characters</p>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>User Role</label>
                <div className="input-wrapper">
                  <FiShield className="input-icon" />
                  <select 
                    name="role" 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="user">Customer</option>
                    <option value="admin">Administrator</option>
                    <option value="driver">Delivery Driver</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>User Status</label>
                <div className="input-wrapper">
                  <FiCheck className="input-icon" />
                  <select 
                    name="status" 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending Verification</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="checkbox-group">
              <label className="checkbox-container">
                <input type="checkbox" name="newsletter" onChange={handleChange} />
                <span className="checkmark"></span>
                <span>Send welcome email to user</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="reset" className="btn cancel-btn">
              Cancel
            </button>
            <button type="submit" className="btn submit-btn">
              Create User
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default NewUsers;