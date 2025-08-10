import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewParcel = () => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await publicRequest.post("/parcels", inputs);

      // Clear the input fields
      setInputs({});

      // Show success toast
      toast.success(
        "Freight has been successfully created and emails have been sent to the Sender and Recipient!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to create the freight. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      section: "Origin & Destination",
      fields: [
        { name: "from", label: "From Location", type: "text", placeholder: "e.g., Los Angeles, CA", required: true },
        { name: "to", label: "To Location", type: "text", placeholder: "e.g., New York, NY", required: true },
      ]
    },
    {
      section: "Sender Information",
      fields: [
        { name: "sendername", label: "Sender Name", type: "text", placeholder: "Full name of sender", required: true },
        { name: "senderemail", label: "Sender Email", type: "email", placeholder: "sender@company.com", required: true },
      ]
    },
    {
      section: "Recipient Information", 
      fields: [
        { name: "recipientname", label: "Recipient Name", type: "text", placeholder: "Full name of recipient", required: true },
        { name: "recipientemail", label: "Recipient Email", type: "email", placeholder: "recipient@company.com", required: true },
      ]
    },
    {
      section: "Freight Details",
      fields: [
        { name: "weight", label: "Weight (kg)", type: "number", placeholder: "e.g., 25.5", required: true },
        { name: "cost", label: "Cost ($)", type: "number", placeholder: "e.g., 150", required: true },
        { name: "date", label: "Shipping Date", type: "date", placeholder: "", required: true },
        { name: "note", label: "Special Instructions", type: "textarea", placeholder: "Any special handling instructions...", required: false },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">+</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Freight
          </h1>
        </div>
        <p className="text-gray-600">Add a new freight shipment to the FMS system</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {inputFields.map((section, sectionIndex) => (
            <div key={sectionIndex} className="fms-card p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                {section.section}
              </h2>
              
              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={inputs[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={4}
                        className="fms-input resize-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={inputs[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        step={field.type === "number" ? "0.01" : undefined}
                        min={field.type === "number" ? "0" : undefined}
                        className="fms-input"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Section */}
        <div className="mt-8 fms-card p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-800">Ready to Create Freight?</h3>
              <p className="text-gray-600">Review all information before submitting</p>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setInputs({})}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                disabled={loading}
              >
                Clear Form
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'fms-button-primary'
                }`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="fms-spinner"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  'Create Freight'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Quick Actions */}
      <div className="mt-8 fms-card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="fms-button-secondary">
            View All Freights
          </button>
          <button className="fms-button-secondary">
            Freight Templates
          </button>
          <button className="fms-button-secondary">
            Bulk Import
          </button>
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

export default NewParcel;
