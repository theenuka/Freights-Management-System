import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaBox, FaMapMarkerAlt, FaUser, FaEnvelope, FaWeight, FaDollarSign, FaCalendar, FaStickyNote } from "react-icons/fa";

const NewParcel = () => {
  const navigate = useNavigate();
  
  // Individual state for each field
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!from || !to || !senderName || !recipientName || !senderEmail || !recipientEmail) {
      toast.error("Please fill in all required fields", { theme: "dark" });
      return;
    }

    setIsSubmitting(true);
    try {
      const parcelData = {
        from,
        to,
        sendername: senderName,
        recipientname: recipientName,
        senderemail: senderEmail,
        recipientemail: recipientEmail,
        weight: weight ? Number(weight) : undefined,
        cost: cost ? Number(cost) : undefined,
        date,
        note,
        status: 1
      };

      await publicRequest.post("/parcels", parcelData);
      toast.success("Parcel created successfully!", { theme: "dark" });
      setTimeout(() => navigate("/parcels"), 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create parcel", { theme: "dark" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Create New Parcel</h1>
        <div className="text-gray-400 text-sm">
          2025-01-18 17:43:11 UTC | User: Theek237
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800 rounded-xl shadow-xl p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* From Location */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>From Location*</span>
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Antorio, USA"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* To Location */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>To Location*</span>
                </label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Saint Mary, USA"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Sender Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaUser className="text-gray-400" />
                  <span>Sender Name*</span>
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="James Doe"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Sender Email */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaEnvelope className="text-gray-400" />
                  <span>Sender Email*</span>
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="jamesdoe@gmail.com"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Recipient Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaUser className="text-gray-400" />
                  <span>Recipient Name*</span>
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="John Smith"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Recipient Email */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaEnvelope className="text-gray-400" />
                  <span>Recipient Email*</span>
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="johnsmith@gmail.com"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Weight */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaWeight className="text-gray-400" />
                  <span>Weight (g)</span>
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="20"
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Cost */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaDollarSign className="text-gray-400" />
                  <span>Cost ($)</span>
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="50"
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaCalendar className="text-gray-400" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Note */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                  <FaStickyNote className="text-gray-400" />
                  <span>Note</span>
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Perishable goods"
                  rows="4"
                  className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-6 w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2
                  bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white font-medium
                  transform transition-all duration-300 hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <FaBox className="text-lg" />
                <span>{isSubmitting ? 'Creating...' : 'Create Parcel'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

export default NewParcel;