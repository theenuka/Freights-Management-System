import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { ArrowLeft, Package, Calendar, Weight, MapPin, DollarSign, Mail, FileText, User, Truck } from 'lucide-react';

const ParcelDetails = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getParcel();
  }, [parcelId]);

  const handleSubmitFeedback = () => {
    // Handle feedback submission
    console.log("Feedback submitted:", feedback);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to="/myparcels" className="inline-flex items-center space-x-2 text-blue-200 hover:text-white 
          transition-colors duration-300 mb-6">
          <ArrowLeft size={20} />
          <span>Back to My Parcels</span>
        </Link>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl animate-fadeIn">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Parcel Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Package className="text-blue-300" size={24} />
                <h2 className="text-2xl font-bold text-white">Parcel Details</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem icon={MapPin} label="From" value={parcel.from} />
                  <DetailItem icon={MapPin} label="To" value={parcel.to} />
                  <DetailItem icon={Weight} label="Weight" value={`${parcel.weight} kg`} />
                  <DetailItem icon={Calendar} label="Date" value={parcel.date} />
                  <DetailItem icon={User} label="Sender" value={parcel.sendername} />
                  <DetailItem icon={User} label="Receiver" value={parcel.recipientname} />
                  <DetailItem icon={DollarSign} label="Cost" value={`$${parcel.cost}`} />
                  <DetailItem icon={FileText} label="Track ID" value={parcel._id} />
                </div>

                <div className="border-t border-white/10 pt-4">
                  <DetailItem icon={Mail} label="Sender Email" value={parcel.senderemail} />
                  <DetailItem icon={Mail} label="Recipient Email" value={parcel.recipientemail} />
                </div>

                {parcel.note && (
                  <div className="border-t border-white/10 pt-4">
                    <h3 className="text-lg font-medium text-white mb-2">Note</h3>
                    <p className="text-blue-100">{parcel.note}</p>
                  </div>
                )}

                <div className="pt-4">
                  <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                    parcel.status === 1 
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-green-500/20 text-green-300"
                  }`}>
                    <Truck size={16} />
                    <span>{parcel.status === 1 ? "Pending" : "Delivered"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="text-blue-300" size={24} />
                <h2 className="text-2xl font-bold text-white">Leave Feedback</h2>
              </div>

              <textarea
                rows={8}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience with this delivery..."
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 
                  text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 
                  focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              />

              <button
                onClick={handleSubmitFeedback}
                className="w-full bg-white text-blue-900 py-3 px-4 rounded-lg font-medium
                  transform transition-all duration-300 hover:bg-blue-50 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
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

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-2">
    <Icon className="text-blue-300 mt-1" size={16} />
    <div>
      <p className="text-sm text-blue-200">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  </div>
);

export default ParcelDetails;