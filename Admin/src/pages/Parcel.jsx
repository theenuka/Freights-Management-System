import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUser, FaEnvelope, FaWeight, FaDollarSign, FaCalendar, FaStickyNote, FaCheck, FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../pages/parcel.css';

const Parcel = () => {
  // ... existing state and functions remain the same ...

  const InputField = ({ icon: Icon, label, name, type = "text", placeholder, ...props }) => (
    <div className="form-field">
      <label className="field-label">
        <Icon className="label-icon" />
        <span>{label}</span>
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={inputs[name] || ""}
          onChange={handleChange}
          placeholder={placeholder}
          className="form-textarea"
          rows="4"
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={inputs[name] || ""}
          onChange={handleChange}
          placeholder={placeholder}
          className="form-input"
          {...props}
        />
      )}
    </div>
  );

  return (
    <div className="parcel-page">
      {/* Header */}
      <div className="parcel-header">
        <div className="parcel-header-top">
          <h1 className="parcel-title">Edit Parcel #{parcelId}</h1>
          <div>
            <span className={`parcel-status ${
              parcel.status === 1 ? "status-pending" : "status-delivered"
            }`}>
              {parcel.status === 1 ? (
                <><FaClock className="status-icon" /> Pending</>
              ) : (
                <><FaCheck className="status-icon" /> Delivered</>
              )}
            </span>
          </div>
        </div>
        <div className="parcel-meta">
          2025-02-24 10:01:58 UTC | User: Theek237
        </div>
      </div>

      {/* Form Container */}
      <div className="parcel-form">
        <div className="form-grid">
          {/* Left Column */}
          <div>
            <InputField icon={FaMapMarkerAlt} label="From" name="from" placeholder={parcel.from} />
            <InputField icon={FaMapMarkerAlt} label="To" name="to" placeholder={parcel.to} />
            <InputField icon={FaUser} label="Sender Name" name="sendername" placeholder={parcel.sendername} />
            <InputField icon={FaUser} label="Recipient Name" name="recipientname" placeholder={parcel.recipientname} />
          </div>

          {/* Middle Column */}
          <div>
            <InputField icon={FaEnvelope} label="Sender Email" name="senderemail" type="email" placeholder={parcel.senderemail} />
            <InputField icon={FaEnvelope} label="Recipient Email" name="recipientemail" type="email" placeholder={parcel.recipientemail} />
            <InputField icon={FaWeight} label="Weight (g)" name="weight" type="number" placeholder={parcel.weight} />
            <InputField icon={FaDollarSign} label="Cost ($)" name="cost" type="number" placeholder={parcel.cost} />
          </div>

          {/* Right Column */}
          <div>
            <InputField icon={FaCalendar} label="Date" name="date" type="date" value={parcel.date} />
            <InputField icon={FaStickyNote} label="Note" name="note" type="textarea" placeholder={parcel.note} />

            {/* Feedback Section */}
            <div className="feedback-section">
              <h3 className="feedback-title">Feedback</h3>
              <p className="feedback-text">Goods received in good condition.</p>
            </div>

            {parcel.status === 1 && (
              <button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className="update-button"
              >
                <FaCheck className="update-button-icon" />
                <span>{isSubmitting ? 'Updating...' : 'Update Parcel'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Parcel;