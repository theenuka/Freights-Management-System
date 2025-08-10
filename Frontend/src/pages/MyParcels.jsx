import { useEffect, useState } from "react";
import { FaUser, FaBox, FaWeight, FaCalendarAlt, FaUserTie, FaMapMarkerAlt, FaSignOutAlt, FaList } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        toast.error("Failed to load parcels");
      } finally {
        setLoading(false);
      }
    };
    getParcels();
  }, [user.currentUser.email]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "status-pending";
      case 2:
        return "status-in-transit";
      case 3:
        return "status-delivered";
      default:
        return "status-pending";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Pending";
      case 2:
        return "In Transit";
      case 3:
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="fms-card text-center p-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h3 className="text-xl font-semibold fms-gradient-text mb-2">Loading your shipments...</h3>
          <p className="text-gray-600">Please wait while we fetch your freight information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Shipments</h1>
            <p className="text-gray-600">Track and manage your freight shipments</p>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={handleOpen}
              className="flex items-center space-x-3 bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
            >
              <FaUser className="text-blue-600" />
              <span>{user.currentUser?.name || "User"}</span>
              <span className={`transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                ⌄
              </span>
            </button>

            {open && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/20 z-50 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <p className="font-semibold">{user.currentUser?.name || "User"}</p>
                  <p className="text-sm text-blue-100">{user.currentUser?.email}</p>
                </div>
                
                <div className="p-2">
                  <Link 
                    to="/parcels"
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                  >
                    <FaList className="text-blue-600" />
                    <span>All Shipments</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="fms-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaBox className="text-white text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{data.length}</h3>
            <p className="text-gray-600">Total Shipments</p>
          </div>
          
          <div className="fms-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🚛</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {data.filter(p => p.status === 1 || p.status === 2).length}
            </h3>
            <p className="text-gray-600">In Progress</p>
          </div>
          
          <div className="fms-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {data.filter(p => p.status === 3).length}
            </h3>
            <p className="text-gray-600">Delivered</p>
          </div>
        </div>

        {/* Parcels List */}
        <div className="space-y-6">
          {data.length === 0 ? (
            <div className="fms-card text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBox className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Shipments Found</h3>
              <p className="text-gray-600 mb-6">You don't have any freight shipments yet.</p>
              <Link 
                to="/"
                className="fms-button-primary inline-flex items-center"
              >
                <span>Create Shipment</span>
                <span className="ml-2">→</span>
              </Link>
            </div>
          ) : (
            data.map((parcel, index) => (
              <Link key={index} to={`/parcel/${parcel._id}`}>
                <div className="fms-card hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Left Section */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Shipment #{parcel._id.slice(-6).toUpperCase()}
                        </h3>
                        <span className={`fms-badge ${getStatusColor(parcel.status)}`}>
                          {getStatusText(parcel.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <FaMapMarkerAlt className="text-blue-500" />
                            <span className="font-medium">From:</span>
                            <span>{parcel.from}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-gray-600">
                            <FaWeight className="text-purple-500" />
                            <span className="font-medium">Weight:</span>
                            <span>{parcel.weight} kg</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <FaMapMarkerAlt className="text-green-500" />
                            <span className="font-medium">To:</span>
                            <span>{parcel.to}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-gray-600">
                            <FaCalendarAlt className="text-orange-500" />
                            <span className="font-medium">Date:</span>
                            <span>{formatDate(parcel.date)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaUserTie className="text-indigo-500" />
                        <span className="font-medium">Sender:</span>
                        <span>{parcel.sendername}</span>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Track Shipment</p>
                        <div className="flex items-center space-x-2 text-blue-600">
                          <span className="font-medium">View Details</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyParcels;
