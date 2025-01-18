import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUser, FaEnvelope, FaWeight, FaDollarSign, FaCalendar, FaStickyNote, FaCheck, FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [inputs, setInputs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch parcel details", { theme: "dark" });
      }
    };
    getParcel();
  }, [parcelId]);

  const handleUpdate = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await publicRequest.put(`/parcels/${parcel._id}`, inputs);
      toast.success("Parcel updated successfully!", { theme: "dark" });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update parcel", { theme: "dark" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ icon: Icon, label, name, type = "text", placeholder, ...props }) => (
    <div className="flex flex-col space-y-2 mb-6">
      <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
        <Icon className="text-gray-400" />
        <span>{label}</span>
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={inputs[name] || ""}
          onChange={handleChange}
          placeholder={placeholder}
          className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-transparent transition-all duration-300"
          rows="4"
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={inputs[name] || ""}
          onChange={handleChange}
          placeholder={placeholder}
          className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white 
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-transparent transition-all duration-300"
          {...props}
        />
      )}
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Edit Parcel #{parcelId}</h1>
          <div className="flex items-center space-x-2 text-sm">
            <span className={`px-3 py-1 rounded-full ${
              parcel.status === 1 
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-green-500/20 text-green-400"
            }`}>
              {parcel.status === 1 ? (
                <><FaClock className="inline mr-1" /> Pending</>
              ) : (
                <><FaCheck className="inline mr-1" /> Delivered</>
              )}
            </span>
          </div>
        </div>
        <div className="text-gray-400 text-sm mt-2">
          2025-01-18 16:31:15 UTC | User: Theenuka Bandara
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800 rounded-xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div>
            <InputField icon={FaMapMarkerAlt} label="From" name="from" placeholder={parcel.from} />
            <InputField icon={FaMapMarkerAlt} label="To" name="to" placeholder={parcel.to} />
            <InputField icon={FaUser} label="Sender Name" name="sendername" placeholder={parcel.sendername} />
            <InputField icon={FaUser} label="Recipient Name" name="recipientname" placeholder={parcel.recipientname} />
          </div>

          {/* Middle Column */}
          <div>
            <InputField icon={FaEnvelope} label="Sender Email" name="senderemail" type="email" placeholder={parcel.senderemail} />
            <InputField icon={FaEnvelope} label="Recipient Email" name="recipientemail" type="email" placeholder={parcel.recipientemail} />
            <InputField icon={FaWeight} label="Weight (g)" name="weight" type="number" placeholder={parcel.weight} />
            <InputField icon={FaDollarSign} label="Cost ($)" name="cost" type="number" placeholder={parcel.cost} />
          </div>

          {/* Right Column */}
          <div>
            <InputField icon={FaCalendar} label="Date" name="date" type="date" value={parcel.date} />
            <InputField icon={FaStickyNote} label="Note" name="note" type="textarea" placeholder={parcel.note} />

            {/* Feedback Section */}
            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
              <h3 className="text-white font-medium mb-2">Feedback</h3>
              <p className="text-gray-300 text-sm">Goods received in good condition.</p>
            </div>

            {parcel.status === 1 && (
              <button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className={`mt-6 w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2
                  bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white font-medium
                  transform transition-all duration-300 hover:scale-[1.02]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <FaCheck className="text-lg" />
                <span>{isSubmitting ? 'Updating...' : 'Update Parcel'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

export default Parcel;