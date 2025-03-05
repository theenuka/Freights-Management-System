import { useEffect, useState } from "react";
import { FaArrowLeft, FaBox, FaMapMarkerAlt, FaTruckLoading, FaCheckCircle, FaWeightHanging, FaCalendarAlt, FaUser, FaPhone } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Parcel.css";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getParcel = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        // const res = await publicRequest.get(`/parcels/${parcelId}`);
        // setParcel(res.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          setParcel({
            id: parcelId,
            trackingNumber: "FMS8372651",
            status: "In Transit",
            origin: "New York City, NY",
            destination: "Los Angeles, CA",
            weight: "5.2 kg",
            dimensions: "30cm × 20cm × 15cm",
            estimatedDelivery: "2023-07-25",
            createdAt: "2023-07-15",
            sender: {
              name: "John Smith",
              phone: "(212) 555-1234",
              email: "john.smith@example.com"
            },
            receiver: {
              name: "Jane Doe",
              phone: "(310) 555-5678",
              email: "jane.doe@example.com"
            },
            trackingHistory: [
              {
                id: 1,
                status: "Order Placed",
                location: "New York City, NY",
                timestamp: "2023-07-15 09:23:15",
                description: "Package has been registered in our system."
              },
              {
                id: 2,
                status: "Package Received",
                location: "New York City Warehouse, NY",
                timestamp: "2023-07-16 14:05:32",
                description: "Package has been received at our facility."
              },
              {
                id: 3,
                status: "In Transit",
                location: "Chicago Sorting Center, IL",
                timestamp: "2023-07-18 07:45:21",
                description: "Package is in transit to the destination."
              }
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getParcel();
  }, [parcelId]);

  // Helper function to determine the step status
  const getStepStatus = (stepNumber, currentStatus) => {
    const statusMap = {
      "Order Placed": 1,
      "Package Received": 2,
      "In Transit": 3,
      "Out for Delivery": 4,
      "Delivered": 5
    };
    
    const currentStep = statusMap[currentStatus] || 3;
    
    if (stepNumber < currentStep) return "completed";
    if (stepNumber === currentStep) return "active";
    return "pending";
  };

  return (
    <div className="parcel-page">
      <Navbar />
      
      <div className="parcel-container">
        <Link to="/myparcels" className="back-button">
          <FaArrowLeft /> Back to My Parcels
        </Link>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading parcel details...</p>
          </div>
        ) : (
          <div className="parcel-content">
            <div className="parcel-header">
              <div className="header-left">
                <h1>Parcel Details</h1>
                <div className="tracking-info">
                  <span className="tracking-label">Tracking Number:</span>
                  <span className="tracking-number">{parcel.trackingNumber}</span>
                </div>
              </div>
              <div className="header-right">
                <span className={`status-badge ${parcel.status?.toLowerCase().replace(" ", "-")}`}>
                  {parcel.status}
                </span>
              </div>
            </div>
            
            <div className="tracking-timeline">
              <div className="timeline-title">Shipping Progress</div>
              <div className="timeline-steps">
                <div className={`timeline-step ${getStepStatus(1, parcel.status)}`}>
                  <div className="step-icon">
                    <FaBox />
                  </div>
                  <div className="step-label">Order Placed</div>
                </div>
                <div className="step-connector"></div>
                <div className={`timeline-step ${getStepStatus(2, parcel.status)}`}>
                  <div className="step-icon">
                    <FaTruckLoading />
                  </div>
                  <div className="step-label">Package Received</div>
                </div>
                <div className="step-connector"></div>
                <div className={`timeline-step ${getStepStatus(3, parcel.status)}`}>
                  <div className="step-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="step-label">In Transit</div>
                </div>
                <div className="step-connector"></div>
                <div className={`timeline-step ${getStepStatus(4, parcel.status)}`}>
                  <div className="step-icon">
                    <FaTruckLoading />
                  </div>
                  <div className="step-label">Out for Delivery</div>
                </div>
                <div className="step-connector"></div>
                <div className={`timeline-step ${getStepStatus(5, parcel.status)}`}>
                  <div className="step-icon">
                    <FaCheckCircle />
                  </div>
                  <div className="step-label">Delivered</div>
                </div>
              </div>
            </div>
            
            <div className="parcel-details-grid">
              <div className="details-card shipment-details">
                <h2><FaBox /> Shipment Details</h2>
                <div className="detail-rows">
                  <div className="detail-row">
                    <span className="detail-label">Origin:</span>
                    <span className="detail-value">{parcel.origin}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Destination:</span>
                    <span className="detail-value">{parcel.destination}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Weight:</span>
                    <span className="detail-value"><FaWeightHanging /> {parcel.weight}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Dimensions:</span>
                    <span className="detail-value">{parcel.dimensions}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Est. Delivery:</span>
                    <span className="detail-value"><FaCalendarAlt /> {parcel.estimatedDelivery}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Order Date:</span>
                    <span className="detail-value">{parcel.createdAt}</span>
                  </div>
                </div>
              </div>
              
              <div className="details-card contact-details">
                <h2><FaUser /> Contact Information</h2>
                <div className="contact-section">
                  <h3>Sender</h3>
                  <div className="detail-rows">
                    <div className="detail-row">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{parcel.sender?.name}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value"><FaPhone /> {parcel.sender?.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{parcel.sender?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="contact-section">
                  <h3>Receiver</h3>
                  <div className="detail-rows">
                    <div className="detail-row">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{parcel.receiver?.name}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value"><FaPhone /> {parcel.receiver?.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{parcel.receiver?.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tracking-history">
              <h2>Tracking History</h2>
              <div className="history-timeline">
                {parcel.trackingHistory?.map((event) => (
                  <div className="history-event" key={event.id}>
                    <div className="event-dot"></div>
                    <div className="event-content">
                      <div className="event-header">
                        <span className="event-status">{event.status}</span>
                        <span className="event-timestamp">{event.timestamp}</span>
                      </div>
                      <div className="event-location">{event.location}</div>
                      <div className="event-description">{event.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Parcel;