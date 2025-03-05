import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import { FiPackage, FiUser, FiMapPin, FiPhone, FiDollarSign, FiClock, FiInfo } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./NewParcel.css";

const NewParcel = () => {
  const [inputs, setInputs] = useState({});
  const [activeStep, setActiveStep] = useState(1);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Form submission logic here
      toast.success("Parcel created successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="new-parcel-container">
      <div className="new-parcel-header">
        <h1 className="new-parcel-title">Create New Parcel</h1>
        <p className="new-parcel-subtitle">Enter parcel details to create a new shipment</p>
      </div>

      <div className="form-progress">
        <div className={`progress-step ${activeStep >= 1 ? 'active' : ''}`}>
          <div className="step-icon">1</div>
          <span>Sender Details</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${activeStep >= 2 ? 'active' : ''}`}>
          <div className="step-icon">2</div>
          <span>Recipient Details</span>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${activeStep >= 3 ? 'active' : ''}`}>
          <div className="step-icon">3</div>
          <span>Parcel Details</span>
        </div>
      </div>

      <div className="new-parcel-card">
        <form onSubmit={handleSubmit}>
          {activeStep === 1 && (
            <div className="form-step">
              <h2 className="step-title"><FiUser /> Sender Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Sender Name</label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      name="senderName"
                      placeholder="Enter sender's full name"
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
                      name="senderPhone"
                      placeholder="Enter sender's phone number"
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
                    name="senderAddress"
                    placeholder="Enter sender's complete address"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn next-btn" onClick={nextStep}>
                  Next Step
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            <div className="form-step">
              <h2 className="step-title"><FiUser /> Recipient Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Recipient Name</label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      name="recipientName"
                      placeholder="Enter recipient's full name"
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
                      name="recipientPhone"
                      placeholder="Enter recipient's phone number"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Delivery Address</label>
                <div className="input-wrapper">
                  <FiMapPin className="input-icon" />
                  <input
                    type="text"
                    name="deliveryAddress"
                    placeholder="Enter recipient's complete address"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn back-btn" onClick={prevStep}>
                  Previous
                </button>
                <button type="button" className="btn next-btn" onClick={nextStep}>
                  Next Step
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 3 && (
            <div className="form-step">
              <h2 className="step-title"><FiPackage /> Parcel Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Parcel Type</label>
                  <div className="input-wrapper">
                    <FiInfo className="input-icon" />
                    <select name="parcelType" onChange={handleChange} required>
                      <option value="">Select parcel type</option>
                      <option value="document">Document</option>
                      <option value="package">Package</option>
                      <option value="fragile">Fragile</option>
                      <option value="perishable">Perishable</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      name="weight"
                      placeholder="Enter weight in kg"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Estimated Delivery Time</label>
                  <div className="input-wrapper">
                    <FiClock className="input-icon" />
                    <select name="deliveryTime" onChange={handleChange} required>
                      <option value="">Select delivery time</option>
                      <option value="express">Express (1-2 days)</option>
                      <option value="standard">Standard (3-5 days)</option>
                      <option value="economy">Economy (5-7 days)</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Price ($)</label>
                  <div className="input-wrapper">
                    <FiDollarSign className="input-icon" />
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter delivery price"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Special Instructions</label>
                <textarea
                  name="instructions"
                  placeholder="Any special handling instructions (optional)"
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn back-btn" onClick={prevStep}>
                  Previous
                </button>
                <button type="submit" className="btn submit-btn">
                  Create Parcel
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default NewParcel;