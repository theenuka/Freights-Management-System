import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logOut } from "../redux/userRedux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyParcels.css";

const MyParcels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Example parcel data - replace with your actual API call
  useEffect(() => {
    setLoading(true);
    // Replace with your actual API call
    setTimeout(() => {
      const mockParcels = [
        {
          id: "P12345",
          origin: "New York",
          destination: "Los Angeles",
          status: 1, // Pending
          weight: "5.2 kg",
          estimatedDelivery: "2023-07-25",
          trackingNumber: "FMS8372651"
        },
        {
          id: "P12346",
          origin: "Chicago",
          destination: "Miami",
          status: 2, // Delivered
          weight: "3.7 kg",
          estimatedDelivery: "2023-07-18",
          trackingNumber: "FMS9273456"
        },
        {
          id: "P12347",
          origin: "Seattle",
          destination: "Boston",
          status: 1, // Pending
          weight: "8.1 kg",
          estimatedDelivery: "2023-07-29",
          trackingNumber: "FMS6234987"
        },
        {
          id: "P12348",
          origin: "Denver",
          destination: "Philadelphia",
          status: 2, // Delivered
          weight: "1.3 kg",
          estimatedDelivery: "2023-07-15",
          trackingNumber: "FMS7345621"
        }
      ];
      setParcels(mockParcels);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="my-parcels-page">
      <Navbar />
      
      <div className="my-parcels-container">
        <div className="page-header">
          <h1>My Parcels</h1>
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your parcels...</p>
          </div>
        ) : parcels.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-box-open"></i>
            <h2>No Parcels Found</h2>
            <p>You don't have any parcels at the moment.</p>
          </div>
        ) : (
          <div className="parcels-grid">
            {parcels.map((parcel) => (
              <Link to={`/parcel/${parcel.id}`} className="parcel-card-link" key={parcel.id}>
                <div className="parcel-card">
                  <div className="parcel-header">
                    <h3 className="tracking-number">{parcel.trackingNumber}</h3>
                    <button
                      className={parcel.status === 1 ? "status-badge pending" : "status-badge delivered"}
                    >
                      {parcel.status === 1 ? "Pending" : "Delivered"}
                    </button>
                  </div>
                  
                  <div className="parcel-details">
                    <div className="detail-group">
                      <span className="label">From:</span>
                      <span className="value">{parcel.origin}</span>
                    </div>
                    <div className="detail-group">
                      <span className="label">To:</span>
                      <span className="value">{parcel.destination}</span>
                    </div>
                    <div className="detail-group">
                      <span className="label">Weight:</span>
                      <span className="value">{parcel.weight}</span>
                    </div>
                    <div className="detail-group">
                      <span className="label">Delivery:</span>
                      <span className="value">{parcel.estimatedDelivery}</span>
                    </div>
                  </div>
                  
                  <div className="parcel-actions">
                    <button className="action-button">
                      <i className="fas fa-info-circle"></i> Details
                    </button>
                    <button className="action-button track">
                      <i className="fas fa-map-marker-alt"></i> Track
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MyParcels;