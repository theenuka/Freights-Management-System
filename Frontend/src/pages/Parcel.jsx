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
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="p-8 text-center bg-white border border-gray-200 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full shadow bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse">
              <span className="text-xl font-bold text-white">F</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Loading shipment details...</h3>
            <p className="text-gray-600">Please wait while we fetch the information.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="px-6 py-8 mx-auto max-w-7xl lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8 space-x-4">
          <Link 
            to="/myparcels"
            className="flex items-center justify-center w-12 h-12 transition-all duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow"
          >
            <FaArrowLeft className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shipment Details</h1>
            <p className="text-gray-600">Tracking ID: #{parcel._id?.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Status Card */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Shipment Status</h2>
                <span className={`fms-badge ${getStatusColor(parcel.status)}`}>
                  {getStatusText(parcel.status)}
                </span>
              </div>
              {/* Progress */}
              <div className="mt-2 mb-6">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${parcel.status >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}>1</div>
                  <div className={`flex-1 h-1 mx-2 ${parcel.status >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${parcel.status >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}>2</div>
                  <div className={`flex-1 h-1 mx-2 ${parcel.status >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${parcel.status >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}>3</div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Pending</span>
                  <span>In transit</span>
                  <span>Delivered</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-xl">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Origin</p>
                      <p className="font-semibold text-gray-900">{parcel.from}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl">
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
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-xl">
                      <FaWeight className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-semibold text-gray-900">{parcel.weight} kg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-xl">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Sender Info */}
              <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
                <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                  <FaUserTie className="mr-2 text-blue-600" />
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
              <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
                <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                  <FaUser className="mr-2 text-green-600" />
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
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Additional Information</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl">
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
                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-xl">
                      <FaIdCard className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tracking ID</p>
                      <p className="text-sm font-semibold text-gray-900">{parcel._id}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {parcel.note && (
                <div className="mt-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 mt-1 bg-yellow-100 rounded-xl">
                      <FaStickyNote className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm text-gray-500">Special Notes</p>
                      <p className="p-3 text-gray-900 rounded-lg bg-gray-50">{parcel.note}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                <FaEnvelope className="mr-2 text-purple-600" />
                Leave Feedback
              </h3>
              <div className="space-y-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  placeholder="Share your experience with this shipment..."
                  className="w-full px-4 py-3 transition-all duration-300 bg-white border border-gray-300 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={submittingFeedback}
                  className="w-full px-6 py-3 font-semibold text-white transition-all duration-200 shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl hover:shadow"
                >
                  {submittingFeedback ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-6 py-3 font-semibold text-gray-700 transition bg-white border border-gray-300 rounded-xl hover:bg-gray-50">
                  📧 Contact Support
                </button>
                <button className="w-full px-6 py-3 font-semibold text-gray-700 transition bg-white border border-gray-300 rounded-xl hover:bg-gray-50">
                  📄 Download Receipt
                </button>
                <button className="w-full px-6 py-3 font-semibold text-gray-700 transition bg-white border border-gray-300 rounded-xl hover:bg-gray-50">
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
