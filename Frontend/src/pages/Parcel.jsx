import { useEffect, useState } from "react";
import { FaArrowLeft, FaBox, FaSpinner } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import "./Parcel.css";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const getParcel = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleFeedbackSubmit = () => {
    // Implement feedback submission logic
    console.log("Feedback submitted:", feedback);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="loading-spinner" />
        <p>Loading parcel details...</p>
      </div>
    );
  }

  return (
    <div className="parcel-detail-page">
      <div className="parcel-detail-card">
        <Link to="/myparcels" className="back-button">
          <FaArrowLeft /> <span>Back to Parcels</span>
        </Link>

        <div className="parcel-content">
          <div className="parcel-info-section">
            <div className="parcel-header">
              <FaBox className="parcel-icon" />
              <h2>Parcel Details</h2>
            </div>

            <ul className="detail-list">
              <li><span>From:</span> {parcel.from}</li>
              <li><span>Weight:</span> {parcel.weight} kg</li>
              <li><span>Date:</span> {parcel.date}</li>
              <li><span>Sender:</span> {parcel.sendername}</li>
              <li><span>To:</span> {parcel.to}</li>
              <li><span>Cost:</span> ${parcel.cost}</li>
              <li><span>Receiver:</span> {parcel.recipientname}</li>
              <li><span>Track ID:</span> {parcel._id}</li>
              <li><span>Note:</span> {parcel.note}</li>
            </ul>

            <button
              className={`status-button ${
                parcel.status === 1 ? "pending" : "delivered"
              }`}
            >
              {parcel.status === 1 ? "Pending" : "Delivered"}
            </button>
          </div>

          <div className="feedback-section">
            <div className="email-info">
              <h3>Contact Information</h3>
              <ul className="email-list">
                <li><span>Sender Email:</span> {parcel.senderemail}</li>
                <li><span>Recipient Email:</span> {parcel.recipientemail}</li>
              </ul>
            </div>

            <div className="feedback-form">
              <h3>Leave Feedback</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience with this delivery..."
                className="feedback-input"
              />
              <button 
                className="submit-button"
                onClick={handleFeedbackSubmit}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parcel;