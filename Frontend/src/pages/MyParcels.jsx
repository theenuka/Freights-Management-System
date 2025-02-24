import { useEffect, useState } from "react";
import { FaUser, FaBox, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { logOut } from "../redux/userRedux";
import "./MyParcels.css";

const MyParcels = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getParcels = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getParcels();
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="my-parcels-page">
      <header className="user-header">
        <div className="user-profile" onClick={handleOpen}>
          <FaUser className="user-icon" />
          <span className="user-name">Alok Mondala</span>
        </div>

        {open && (
          <div className="dropdown-menu">
            <ul>
              <li>
                <Link to="/allparcels" className="dropdown-item">
                  <FaBox className="dropdown-icon" />
                  All parcels
                </Link>
              </li>
              <li className="dropdown-item">
                <FaFileAlt className="dropdown-icon" />
                Statements
              </li>
              <li className="dropdown-item" onClick={handleLogout}>
                <FaSignOutAlt className="dropdown-icon" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </header>

      <main className="parcels-container">
        <h2 className="section-title">My Parcels</h2>
        
        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading your parcels...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="empty-state">
            <FaBox className="empty-icon" />
            <p>No parcels found</p>
          </div>
        ) : (
          <div className="parcels-list">
            {data.map((parcel, index) => (
              <Link 
                key={index} 
                to={`/parcel/${parcel._id}`}
                className="parcel-card-link"
              >
                <div className="parcel-card">
                  <div className="parcel-info">
                    <ul>
                      <li>
                        <span className="info-label">From:</span> 
                        {parcel.from}
                      </li>
                      <li>
                        <span className="info-label">Weight:</span> 
                        {parcel.weight} kg
                      </li>
                      <li>
                        <span className="info-label">Date:</span> 
                        {parcel.date}
                      </li>
                      <li>
                        <span className="info-label">Sender:</span> 
                        {parcel.sendername}
                      </li>
                    </ul>
                  </div>

                  <div className="parcel-status">
                    <span className="destination">
                      <span className="info-label">To:</span> 
                      {parcel.to}
                    </span>
                    <button
                      className={`status-badge ${
                        parcel.status === 1 ? "pending" : "delivered"
                      }`}
                    >
                      {parcel.status === 1 ? "Pending" : "Delivered"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyParcels;