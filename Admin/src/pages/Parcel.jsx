import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Parcel = () => {
  const location = useLocation();
  const parcelId = location.pathname.split("/")[2];
  const [parcel, setParcel] = useState({});
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const getParcel = async () => {
      try {
        const res = await publicRequest.get("/parcels/find/" + parcelId);
        setParcel(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load freight details");
      }
    };
    getParcel();
  }, [parcelId]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (Object.keys(inputs).length > 0) {
        await publicRequest.put(`/parcels/${parcel._id}`, inputs);
        toast.success("Freight details updated successfully!");
      } else {
        await publicRequest.put(`/parcels/${parcel._id}`, {
          status: 2,
        });
        toast.success("Freight status updated to delivered!");
      }
      
      // Refresh parcel data
      const res = await publicRequest.get("/parcels/find/" + parcelId);
      setParcel(res.data);
      setInputs({});
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update freight details");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDelivered = async () => {
    setLoading(true);
    try {
      await publicRequest.put(`/parcels/${parcel._id}`, { status: 2 });
      toast.success("Freight marked as delivered!");
      
      // Refresh parcel data
      const res = await publicRequest.get("/parcels/find/" + parcelId);
      setParcel(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update freight status");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 1) {
      return (
        <span className="fms-badge fms-badge-warning">
          🚛 In Transit
        </span>
      );
    } else if (status === 2) {
      return (
        <span className="fms-badge fms-badge-success">
          ✅ Delivered
        </span>
      );
    } else {
      return (
        <span className="fms-badge fms-badge-error">
          ❌ Cancelled
        </span>
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formSections = [
    {
      title: "Route Information",
      fields: [
        { name: "from", label: "Origin", current: parcel.from },
        { name: "to", label: "Destination", current: parcel.to },
      ]
    },
    {
      title: "Sender Details",
      fields: [
        { name: "sendername", label: "Sender Name", current: parcel.sendername },
        { name: "senderemail", label: "Sender Email", current: parcel.senderemail, type: "email" },
      ]
    },
    {
      title: "Recipient Details",
      fields: [
        { name: "recipientname", label: "Recipient Name", current: parcel.recipientname },
        { name: "recipientemail", label: "Recipient Email", current: parcel.recipientemail, type: "email" },
      ]
    },
    {
      title: "Freight Specifications",
      fields: [
        { name: "weight", label: "Weight (kg)", current: parcel.weight, type: "number" },
        { name: "cost", label: "Cost ($)", current: parcel.cost, type: "number" },
        { name: "date", label: "Shipping Date", current: parcel.date, type: "date" },
        { name: "note", label: "Special Instructions", current: parcel.note, type: "textarea" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">📦</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Freight Details
              </h1>
              <p className="text-gray-600">ID: {parcelId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(parcel.status)}
          </div>
        </div>
      </div>

      {/* Status & Actions Card */}
      <div className="mb-8 fms-card p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Freight Status</h2>
            <p className="text-gray-600">
              {parcel.status === 1 
                ? "This freight is currently in transit to its destination" 
                : parcel.status === 2 
                ? "This freight has been successfully delivered"
                : "This freight has been cancelled"
              }
            </p>
          </div>
          <div className="flex space-x-3">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="fms-button-secondary"
                  disabled={loading}
                >
                  Edit Details
                </button>
                {parcel.status === 1 && (
                  <button
                    onClick={handleMarkAsDelivered}
                    disabled={loading}
                    className="fms-button-primary"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="fms-spinner"></div>
                        <span>Updating...</span>
                      </div>
                    ) : (
                      'Mark as Delivered'
                    )}
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setInputs({});
                  }}
                  className="fms-button-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="fms-button-primary"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="fms-spinner"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {formSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="fms-card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
              {section.title}
            </h2>
            
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  
                  {isEditing ? (
                    field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={inputs[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.current || `Enter ${field.label.toLowerCase()}`}
                        rows={3}
                        className="fms-input resize-none"
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={inputs[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.current || `Enter ${field.label.toLowerCase()}`}
                        step={field.type === "number" ? "0.01" : undefined}
                        className="fms-input"
                      />
                    )
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-800">
                        {field.type === "date" 
                          ? formatDate(field.current)
                          : field.current || "Not specified"
                        }
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Section */}
      <div className="fms-card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-3"></div>
          Delivery Feedback
        </h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">💬</span>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-1">Customer Feedback</h4>
              <p className="text-green-700">
                {parcel.status === 2 
                  ? "Goods received in good condition. Thank you for the excellent service!"
                  : "Awaiting delivery confirmation from recipient."
                }
              </p>
              <p className="text-sm text-green-600 mt-2">
                Status: {parcel.status === 1 ? "Pending Delivery" : "Delivered Successfully"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Parcel;
