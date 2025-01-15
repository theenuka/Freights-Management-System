import { useEffect, useState } from "react";
import { FaArrowLeft, FaBox, FaTruck, FaMapMarkerAlt, FaUser, FaEnvelope, FaWeight, FaCalendar, FaBarcode, FaStickyNote, FaPaperPlane } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getParcel = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
      } catch (error) {
        console.error("Error fetching parcel:", error);
      } finally {
        setLoading(false);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) return;
    
    setSubmitting(true);
    try {
      // Add your feedback submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setFeedback("");
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/myparcels" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Back to My Parcels</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/10">
          {/* Status Banner */}
          <div className={`p-4 ${parcel.status === 1 ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Parcel Details</h1>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                parcel.status === 1 
                  ? 'bg-yellow-500/30 text-yellow-300' 
                  : 'bg-green-500/30 text-green-300'
              }`}>
                {parcel.status === 1 ? 'Pending' : 'Delivered'}
              </span>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Parcel Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: <FaMapMarkerAlt />, label: "From", value: parcel.from },
                  { icon: <FaMapMarkerAlt />, label: "To", value: parcel.to },
                  { icon: <FaWeight />, label: "Weight", value: `${parcel.weight} kg` },
                  { icon: <FaCalendar />, label: "Date", value: new Date(parcel.date).toLocaleDateString() },
                  { icon: <FaUser />, label: "Sender", value: parcel.sendername },
                  { icon: <FaUser />, label: "Receiver", value: parcel.recipientname },
                  { icon: <FaBarcode />, label: "Track ID", value: parcel._id },
                  { icon: <FaTruck />, label: "Cost", value: `$${parcel.cost}` },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                    <div className="text-blue-400">{item.icon}</div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {parcel.note && (
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-blue-400 mb-2">
                    <FaStickyNote />
                    <span>Note</span>
                  </div>
                  <p className="text-white/80">{parcel.note}</p>
                </div>
              )}
            </div>

            {/* Right Column - Contact & Feedback */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
                {[
                  { icon: <FaEnvelope />, label: "Sender Email", value: parcel.senderemail },
                  { icon: <FaEnvelope />, label: "Recipient Email", value: parcel.recipientemail },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                    <div className="text-blue-400">{item.icon}</div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedback Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Leave Feedback</h2>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience with this delivery..."
                  className="w-full h-32 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all resize-none"
                />
                <button
                  onClick={handleSubmitFeedback}
                  disabled={submitting || !feedback.trim()}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
                    submitting || !feedback.trim()
                      ? 'bg-blue-500/50 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parcel;