import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { FiPackage, FiUser, FiMapPin, FiPhone, FiDollarSign, FiTruck, FiCalendar, FiEdit, FiInfo } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Parcel.css";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Status colors mapping
  const statusColors = {
    pending: "status-pending",
    shipping: "status-shipping",
    delivered: "status-delivered",
    cancelled: "status-cancelled"
  };
  
  useEffect(() => {
    const getParcel = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get(`/parcels/${parcelId}`);
        setParcel(res.data);
        setInputs(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load parcel details");
        setLoading(false);
      }
    };
    getParcel();
  }, [parcelId]);
  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Update API call
      await publicRequest.put(`/parcels/${parcelId}`, inputs);
      setParcel(inputs);
      setEditing(false);
      toast.success("Parcel updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update parcel");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading parcel details...</p>
      </div>
    );
  }

  return (
    <div className="parcel-detail-container">
      <div className="parcel-header">
        <div>
          <h1 className="parcel-title">
            <FiPackage className="title-icon" />
            Parcel #{parcel._id}
          </h1>
          <p className="parcel-subtitle">Created on {new Date(parcel.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="parcel-actions">
          <button 
            className="edit-button"
            onClick={() => setEditing(!editing)}
          >
            <FiEdit /> {editing ? "Cancel" : "Edit Parcel"}
          </button>
          <div className={`status-badge ${statusColors[parcel.status] || "status-pending"}`}>
            {parcel.status || "pending"}
          </div>
        </div>
      </div>

      {editing ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="parcel-card">
            <h2 className="card-title">Edit Parcel Details</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Status</label>
                <select 
                  name="status" 
                  value={inputs.status || ""}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="shipping">Shipping</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Estimated Delivery</label>
                <input 
                  type="date" 
                  name="estimatedDelivery" 
                  value={inputs.estimatedDelivery?.split('T')[0] || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Weight (kg)</label>
                <input 
                  type="number" 
                  name="weight" 
                  value={inputs.weight || ""}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Price</label>
                <input 
                  type="number" 
                  name="price" 
                  value={inputs.price || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="parcel-content">
          <div className="parcel-grid">
            <div className="parcel-card">
              <h2 className="card-title"><FiUser /> Sender Information</h2>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <span className="info-value">{parcel.senderName || "N/A"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{parcel.senderPhone || "N/A"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Address</span>
                  <span className="info-value">{parcel.senderAddress || "N/A"}</span>
                </div>
              </div>
            </div>
            
            <div className="parcel-card">
              <h2 className="card-title"><FiUser /> Recipient Information</h2>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <span className="info-value">{parcel.recipientName || "N/A"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{parcel.recipientPhone || "N/A"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Address</span>
                  <span className="info-value">{parcel.deliveryAddress || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="parcel-card">
            <h2 className="card-title"><FiInfo /> Parcel Details</h2>
            <div className="parcel-info-grid">
              <div className="info-tile">
                <FiDollarSign className="tile-icon" />
                <div className="tile-content">
                  <span className="tile-label">Price</span>
                  <span className="tile-value">${parcel.price || "0.00"}</span>
                </div>
              </div>
              
              <div className="info-tile">
                <FiPackage className="tile-icon" />
                <div className="tile-content">
                  <span className="tile-label">Weight</span>
                  <span className="tile-value">{parcel.weight || "0"} kg</span>
                </div>
              </div>
              
              <div className="info-tile">
                <FiTruck className="tile-icon" />
                <div className="tile-content">
                  <span className="tile-label">Delivery Type</span>
                  <span className="tile-value">{parcel.deliveryType || "Standard"}</span>
                </div>
              </div>
              
              <div className="info-tile">
                <FiCalendar className="tile-icon" />
                <div className="tile-content">
                  <span className="tile-label">Estimated Delivery</span>
                  <span className="tile-value">
                    {parcel.estimatedDelivery ? new Date(parcel.estimatedDelivery).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="parcel-card">
            <h2 className="card-title"><FiTruck /> Tracking</h2>
            <div className="tracking-timeline">
              <div className={`timeline-step ${parcel.status === 'pending' || parcel.status === 'shipping' || parcel.status === 'delivered' ? 'completed' : ''}`}>
                <div className="step-marker"></div>
                <div className="step-content">
                  <h3>Order Placed</h3>
                  <p>{new Date(parcel.createdAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div className={`timeline-step ${parcel.status === 'shipping' || parcel.status === 'delivered' ? 'completed' : ''}`}>
                <div className="step-marker"></div>
                <div className="step-content">
                  <h3>In Transit</h3>
                  <p>{parcel.shippingDate ? new Date(parcel.shippingDate).toLocaleString() : 'Pending'}</p>
                </div>
              </div>
              
              <div className={`timeline-step ${parcel.status === 'delivered' ? 'completed' : ''}`}>
                <div className="step-marker"></div>
                <div className="step-content">
                  <h3>Delivered</h3>
                  <p>{parcel.deliveryDate ? new Date(parcel.deliveryDate).toLocaleString() : 'Pending'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Parcel;