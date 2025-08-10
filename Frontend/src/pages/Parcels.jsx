import { FaArrowLeft, FaBox, FaFilter, FaDownload, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Parcels = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getParcels = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load shipments");
      } finally {
        setLoading(false);
      }
    };
    getParcels();
  }, [user.currentUser.email]);

  useEffect(() => {
    let filtered = data;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (parcel) =>
          parcel.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.recipientname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          parcel.sendername.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((parcel) => {
        if (statusFilter === "pending") return parcel.status === 1;
        if (statusFilter === "in-transit") return parcel.status === 2;
        if (statusFilter === "delivered") return parcel.status === 3;
        return true;
      });
    }

    setFilteredData(filtered);
  }, [data, searchTerm, statusFilter]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "#f59e0b";
      case 2:
        return "#8b5cf6";
      case 3:
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const columns = [
    { 
      field: "from", 
      headerName: "Origin", 
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span>{params.value}</span>
        </div>
      )
    },
    { 
      field: "to", 
      headerName: "Destination", 
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>{params.value}</span>
        </div>
      )
    },
    { 
      field: "date", 
      headerName: "Ship Date", 
      width: 120,
      renderCell: (params) => (
        <span>{new Date(params.value).toLocaleDateString()}</span>
      )
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      width: 150,
      renderCell: (params) => (
        <div className="font-medium text-gray-900">{params.value}</div>
      )
    },
    { 
      field: "weight", 
      headerName: "Weight", 
      width: 100,
      renderCell: (params) => (
        <span className="font-medium">{params.value} kg</span>
      )
    },
    { 
      field: "status", 
      headerName: "Status", 
      width: 130,
      renderCell: (params) => (
        <div 
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: `${getStatusColor(params.value)}20`,
            color: getStatusColor(params.value),
            border: `1px solid ${getStatusColor(params.value)}40`
          }}
        >
          {getStatusText(params.value)}
        </div>
      )
    },
    { 
      field: "note", 
      headerName: "Notes", 
      width: 250,
      renderCell: (params) => (
        <div className="text-gray-600 truncate">{params.value || "No notes"}</div>
      )
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="fms-card text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <h3 className="text-xl font-semibold fms-gradient-text mb-2">Loading shipments...</h3>
            <p className="text-gray-600">Please wait while we fetch your data</p>
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
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              to="/myparcels"
              className="flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-md hover:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
            >
              <FaArrowLeft className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Shipments</h1>
              <p className="text-gray-600">Comprehensive view of your freight shipments</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="fms-card text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaBox className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{data.length}</h3>
              <p className="text-gray-600">Total Shipments</p>
            </div>
            
            <div className="fms-card text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">⏳</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {data.filter(p => p.status === 1).length}
              </h3>
              <p className="text-gray-600">Pending</p>
            </div>
            
            <div className="fms-card text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🚛</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {data.filter(p => p.status === 2).length}
              </h3>
              <p className="text-gray-600">In Transit</p>
            </div>
            
            <div className="fms-card text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {data.filter(p => p.status === 3).length}
              </h3>
              <p className="text-gray-600">Delivered</p>
            </div>
          </div>

          {/* Filters */}
          <div className="fms-card mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search shipments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="fms-input pl-10 w-64"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <FaFilter className="text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="fms-input w-40"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Showing {filteredData.length} of {data.length} shipments
                </span>
                <button className="fms-button-secondary flex items-center space-x-2">
                  <FaDownload />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="fms-card p-0 overflow-hidden">
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              getRowId={(row) => row._id}
              disableSelectionOnClick
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableColumnMenu
              density="comfortable"
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  borderBottom: '2px solid rgba(59, 130, 246, 0.1)',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 600,
                  color: '#1e40af',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.02)',
                },
              }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Parcels;
