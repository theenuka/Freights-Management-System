import { useEffect, useState } from "react";
import { FaArrowLeft, FaBox, FaEnvelope, FaUser, FaCalendar, FaWeight, FaMapMarkerAlt, FaDollarSign, FaClipboard } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [feedback, setFeedback] = useState("");
  const [currentTime, setCurrentTime] = useState("2025-01-18 08:49:25");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utcString = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentTime(utcString);
    }, 1000);

    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getParcel();

    return () => clearInterval(timer);
  }, [parcelId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-900 to-secondary-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/myparcels" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <FaArrowLeft className="mr-2" />
            <span>Back to My Parcels</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl animate-fade-in">
          {/* Status Banner */}
          <div className="bg-gradient-to-r from-primary-600/20 to-primary-800/20 px-6 py-4 rounded-t-2xl border-b border-white/10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Parcel Details</h1>
              <div className="text-sm text-gray-400">
                System Time (UTC): {currentTime}
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Parcel Details */}
            <div className="space-y-6">
              <div className="grid gap-4">
                {/* Status Badge */}
                <div className={`inline-flex items-center px-4 py-2 rounded-lg w-fit
                  ${parcel.status === 1 
                    ? 'bg-yellow-500/20 text-yellow-400' 
                    : 'bg-green-500/20 text-green-400'
                  }`}>
                  <div className="flex items-center">
                    <FaBox className="mr-2" />
                    <span>{parcel.status === 1 ? "Pending" : "Delivered"}</span>
                  </div>
                </div>

                {/* Parcel Information Grid */}
                <div className="grid gap-4">
                  <InfoItem icon={<FaMapMarkerAlt />} label="From" value={parcel.from} />
                  <InfoItem icon={<FaWeight />} label="Weight" value={`${parcel.weight} kg`} />
                  <InfoItem icon={<FaCalendar />} label="Date" value={parcel.date} />
                  <InfoItem icon={<FaUser />} label="Sender" value={parcel.sendername} />
                  <InfoItem icon={<FaMapMarkerAlt />} label="To" value={parcel.to} />
                  <InfoItem icon={<FaDollarSign />} label="Cost" value={`$${parcel.cost}`} />
                  <InfoItem icon={<FaUser />} label="Receiver" value={parcel.recipientname} />
                  <InfoItem icon={<FaClipboard />} label="Track ID" value={parcel._id} />
                </div>

                {/* Note Section */}
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-gray-400 mb-2">Note</h3>
                  <p className="text-white">{parcel.note}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Feedback */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white/5 p-4 rounded-lg space-y-4">
                <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
                <InfoItem icon={<FaEnvelope />} label="Sender Email" value={parcel.senderemail} />
                <InfoItem icon={<FaEnvelope />} label="Recipient Email" value={parcel.recipientemail} />
              </div>

              {/* Feedback Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Leave Feedback</h3>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience with this delivery..."
                  className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                           text-white placeholder-gray-400 resize-none
                           focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium
                                 px-6 py-3 rounded-lg transition-all duration-200
                                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                                 focus:ring-offset-secondary-900">
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for consistent info display
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="text-primary-400">
      {icon}
    </div>
    <div>
      <span className="text-gray-400 text-sm">{label}:</span>
      <span className="text-white ml-2">{value}</span>
    </div>
  </div>
);

export default Parcel;