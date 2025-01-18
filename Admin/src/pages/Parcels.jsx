import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaTrash, FaEdit, FaPlus, FaBox, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState("2025-01-18 17:06:09");
  const currentUser = "Theek237";

  // Update UTC time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utcString = now.toISOString()
        .replace('T', ' ')
        .slice(0, 19);
      setCurrentTime(utcString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this parcel?")) return;

    try {
      await publicRequest.delete(`/parcels/${id}`);
      toast.success("Parcel deleted successfully!", { theme: "dark" });
      setParcels(parcels.filter(parcel => parcel._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete parcel", { theme: "dark" });
    }
  };

  const columns = [
    { 
      field: "from", 
      headerName: "From", 
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center">
          <FaBox className="mr-2 text-gray-400" />
          {params.value || "N/A"}
        </div>
      )
    },
    { 
      field: "to", 
      headerName: "To", 
      width: 150,
      renderCell: (params) => (
        <div className="text-gray-300">{params.value || "N/A"}</div>
      )
    },
    { 
      field: "sendername", 
      headerName: "Sender", 
      width: 150,
      renderCell: (params) => (
        <div className="font-medium text-blue-400">{params.value || "N/A"}</div>
      )
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      width: 150,
      renderCell: (params) => (
        <div className="font-medium text-purple-400">{params.value || "N/A"}</div>
      )
    },
    { 
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <div className={`px-3 py-1 rounded-full text-sm ${
          params.row.status === 1
            ? "bg-yellow-500/20 text-yellow-400"
            : "bg-green-500/20 text-green-400"
        }`}>
          {params.row.status === 1 ? "Pending" : "Delivered"}
        </div>
      )
    },
    { 
      field: "note", 
      headerName: "Note", 
      width: 200,
      renderCell: (params) => (
        <div className="text-gray-300">{params.value || "No note"}</div>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center space-x-3">
          <Link to={"/parcel/" + params.row._id}>
            <button className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 
              text-blue-400 transition-colors duration-200">
              <FaEdit />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(params.row._id)}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 
              text-red-400 transition-colors duration-200"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getParcels = async () => {
      try {
        const res = await publicRequest.get("/parcels");
        setParcels(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch parcels", { theme: "dark" });
      } finally {
        setLoading(false);
      }
    };
    getParcels();
  }, []);

  const filteredParcels = parcels.filter(parcel => 
    (parcel.sendername || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (parcel.recipientname || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (parcel.from || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (parcel.to || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Parcels Overview</h1>
        <div className="text-gray-400 text-sm">
          {currentTime} UTC | User: {currentUser}
        </div>
      </div>

      {/* Button and Stats Row */}
      <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400">
              Total: {parcels.length}
            </div>
            <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400">
              Pending: {parcels.filter(p => p.status === 1).length}
            </div>
            <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400">
              Delivered: {parcels.filter(p => p.status === 2).length}
            </div>
          </div>

          {/* New Parcel Button */}
          <Link to="/newparcel">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg
              bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white
              transform transition-all duration-300 hover:scale-[1.02]">
              <FaPlus />
              <span>New Parcel</span>
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search parcels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* DataGrid */}
      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <DataGrid
          rows={filteredParcels}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          loading={loading}
          autoHeight
          className="border-0 text-white"
          sx={{
            '& .MuiDataGrid-cell': { borderColor: 'rgba(255, 255, 255, 0.1)' },
            '& .MuiDataGrid-columnHeaders': { borderColor: 'rgba(255, 255, 255, 0.1)' },
            '& .MuiDataGrid-footerContainer': { borderColor: 'rgba(255, 255, 255, 0.1)' },
            '& .MuiCheckbox-root': { color: 'rgba(255, 255, 255, 0.5)' },
            '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
            backgroundColor: 'transparent',
            color: 'white',
          }}
        />
      </div>

      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

export default Parcels;