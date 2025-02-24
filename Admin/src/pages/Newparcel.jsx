import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaBox, FaMapMarkerAlt, FaUser, FaEnvelope, FaWeight, FaDollarSign, FaCalendar, FaStickyNote } from "react-icons/fa";
import '../pages/newparcel.css';

const NewParcel = () => {
  const navigate = useNavigate();
  
  // State management code remains the same
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handleSubmit function remains the same
  const handleSubmit = async (e) => {
    // ... existing handleSubmit code ...
  };

  return (
    <div className="new-parcel">
      {/* Header */}
      <div className="new-parcel-header">
        <h1 className="new-parcel-title">Create New Parcel</h1>
        <div className="new-parcel-meta">
          2025-01-18 17:43:11 UTC | User: Theek237
        </div>
      </div>

      {/* Form Container */}
      <div className="new-parcel-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-column">
              {/* From Location */}
              <div className="form-field">
                <label className="field-label">
                  <FaMapMarkerAlt className="label-icon" />
                  <span>From Location*</span>
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Antorio, USA"
                  required
                  className="form-input"
                />
              </div>

              {/* To Location */}
              <div className="form-field">
                <label className="field-label">
                  <FaMapMarkerAlt className="label-icon" />
                  <span>To Location*</span>
                </label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Saint Mary, USA"
                  required
                  className="form-input"
                />
              </div>

              {/* Sender Name */}
              <div className="form-field">
                <label className="field-label">
                  <FaUser className="label-icon" />
                  <span>Sender Name*</span>
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="James Doe"
                  required
                  className="form-input"
                />
              </div>

              {/* Sender Email */}
              <div className="form-field">
                <label className="field-label">
                  <FaEnvelope className="label-icon" />
                  <span>Sender Email*</span>
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="jamesdoe@gmail.com"
                  required
                  className="form-input"
                />
              </div>

              {/* Recipient Name */}
              <div className="form-field">
                <label className="field-label">
                  <FaUser className="label-icon" />
                  <span>Recipient Name*</span>
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="John Smith"
                  required
                  className="form-input"
                />
              </div>

              {/* Recipient Email */}
              <div className="form-field">
                <label className="field-label">
                  <FaEnvelope className="label-icon" />
                  <span>Recipient Email*</span>
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="johnsmith@gmail.com"
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="form-column">
              {/* Weight */}
              <div className="form-field">
                <label className="field-label">
                  <FaWeight className="label-icon" />
                  <span>Weight (g)</span>
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="20"
                  className="form-input"
                />
              </div>

              {/* Cost */}
              <div className="form-field">
                <label className="field-label">
                  <FaDollarSign className="label-icon" />
                  <span>Cost ($)</span>
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="50"
                  className="form-input"
                />
              </div>

              {/* Date */}
              <div className="form-field">
                <label className="field-label">
                  <FaCalendar className="label-icon" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Note */}
              <div className="form-field">
                <label className="field-label">
                  <FaStickyNote className="label-icon" />
                  <span>Note</span>
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Perishable goods"
                  rows="4"
                  className="form-textarea"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                <FaBox className="submit-button-icon" />
                <span>{isSubmitting ? 'Creating...' : 'Create Parcel'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default NewParcel;