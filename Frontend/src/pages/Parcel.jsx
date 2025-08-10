import { useEffect, useState } from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaWeight, FaCalendarAlt, FaUserTie, FaDollarSign, FaUser, FaIdCard, FaStickyNote, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    const getParcel = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load shipment details");
      } finally {
        setLoading(false);
      }
    };
    getParcel();
  }, [parcelId]);

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
      month: 'long',
      day: 'numeric'
    });
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    try {
      setSubmittingFeedback(true);
      // API call would go here
      toast.success("Feedback submitted successfully!");
      setFeedback("");
    } catch (error) {
      toast.error("Failed to submit feedback");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="fms-card text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h3 className="text-xl font-semibold fms-gradient-text mb-2">Loading shipment details...</h3>
            <p className="text-gray-600">Please wait while we fetch the information</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            to="/myparcels"
            className="flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
          >
            <FaArrowLeft className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shipment Details</h1>
            <p className="text-gray-600">Tracking ID: #{parcel._id?.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="fms-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Shipment Status</h2>
                <span className={`fms-badge ${getStatusColor(parcel.status)}`}>
                  {getStatusText(parcel.status)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Origin</p>
                      <p className="font-semibold text-gray-900">{parcel.from}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaMapMarkerAlt className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-semibold text-gray-900">{parcel.to}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FaWeight className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-semibold text-gray-900">{parcel.weight} kg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <FaCalendarAlt className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ship Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(parcel.date)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sender & Recipient Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender Info */}
              <div className="fms-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUserTie className="text-blue-600 mr-2" />
                  Sender Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{parcel.sendername}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{parcel.senderemail}</p>
                  </div>
                </div>
              </div>

              {/* Recipient Info */}
              <div className="fms-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUser className="text-green-600 mr-2" />
                  Recipient Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{parcel.recipientname}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{parcel.recipientemail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="fms-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaDollarSign className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Shipping Cost</p>
                      <p className="font-semibold text-gray-900">${parcel.cost}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <FaIdCard className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tracking ID</p>
                      <p className="font-semibold text-gray-900 text-sm">{parcel._id}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {parcel.note && (
                <div className="mt-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mt-1">
                      <FaStickyNote className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Special Notes</p>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{parcel.note}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="space-y-6">
            <div className="fms-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaEnvelope className="text-purple-600 mr-2" />
                Leave Feedback
              </h3>
              <div className="space-y-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  placeholder="Share your experience with this shipment..."
                  className="fms-input resize-none"
                />
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={submittingFeedback}
                  className="fms-button-primary w-full"
                >
                  {submittingFeedback ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="fms-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="fms-button-secondary w-full">
                  📧 Contact Support
                </button>
                <button className="fms-button-secondary w-full">
                  📄 Download Receipt
                </button>
                <button className="fms-button-secondary w-full">
                  📋 Track History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Parcel;
