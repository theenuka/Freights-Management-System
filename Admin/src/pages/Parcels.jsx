import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status) => {
    if (status === 1) {
      return "🚛 In Transit";
    } else if (status === 2) {
      return "✅ Delivered";
    } else {
      return "❌ Cancelled";
    }
  };

  const getStatusColor = (status) => {
    if (status === 1) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else if (status === 2) {
      return "bg-green-100 text-green-800 border-green-200";
    } else {
      return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const columns = [
    { 
      field: "from", 
      headerName: "Origin", 
      width: 140,
      headerClassName: "font-semibold text-gray-700 bg-gray-50"
    },
    { 
      field: "to", 
      headerName: "Destination", 
      width: 140,
      headerClassName: "font-semibold text-gray-700 bg-gray-50"
    },
    { 
      field: "sendername", 
      headerName: "Sender", 
      width: 130,
      headerClassName: "font-semibold text-gray-700 bg-gray-50"
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      width: 130,
      headerClassName: "font-semibold text-gray-700 bg-gray-50"
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 80,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <span className="text-gray-600">{params.value ? `${params.value}kg` : "N/A"}</span>
      ),
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 80,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <span className="font-medium text-gray-600">{params.value ? `$${params.value}` : "N/A"}</span>
      ),
    },
    {
      field: "date",
      headerName: "Ship Date",
      width: 100,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <span className="text-sm text-gray-600">{formatDate(params.value)}</span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getStatusColor(params.value)}`}>
          {getStatusBadge(params.value)}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <Link to={`/parcel/${params.row._id}`}>
            <button className="px-3 py-1 text-xs font-medium text-white transition-colors duration-200 bg-blue-500 rounded-md hover:bg-blue-600">
              View
            </button>
          </Link>
          <button 
            onClick={() => handleDelete(params.row._id)}
            disabled={deleteLoading === params.row._id}
            className="px-3 py-1 text-xs font-medium text-white transition-colors duration-200 bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50"
          >
            {deleteLoading === params.row._id ? "..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getParcels = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/parcels");
        setParcels(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load freights");
      } finally {
        setLoading(false);
      }
    };
    getParcels();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this freight? This action cannot be undone.")) {
      return;
    }

    try {
      setDeleteLoading(id);
      await publicRequest.delete(`/parcels/${id}`);
      setParcels(parcels.filter(parcel => parcel._id !== id));
      toast.success("Freight deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete freight");
    } finally {
      setDeleteLoading(null);
    }
  };

  const getFilteredParcels = () => {
    if (filterStatus === "all") return parcels;
    return parcels.filter(parcel => {
      if (filterStatus === "pending") return parcel.status === 1;
      if (filterStatus === "delivered") return parcel.status === 2;
      if (filterStatus === "cancelled") return parcel.status === 0;
      return true;
    });
  };

  const getStatsCards = () => {
    const total = parcels.length;
    const pending = parcels.filter(p => p.status === 1).length;
    const delivered = parcels.filter(p => p.status === 2).length;
    const cancelled = parcels.filter(p => p.status === 0).length;

    return [
      { label: "Total Freights", value: total, color: "from-blue-500 to-blue-600", bg: "from-blue-50 to-blue-100" },
      { label: "In Transit", value: pending, color: "from-yellow-500 to-yellow-600", bg: "from-yellow-50 to-yellow-100" },
      { label: "Delivered", value: delivered, color: "from-green-500 to-green-600", bg: "from-green-50 to-green-100" },
      { label: "Cancelled", value: cancelled, color: "from-red-500 to-red-600", bg: "from-red-50 to-red-100" },
    ];
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
          <div className="flex items-center mb-4 space-x-3 sm:mb-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <span className="text-sm font-bold text-white">📦</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Freight Management
              </h1>
              <p className="text-gray-600">Manage all freight shipments in the FMS system</p>
            </div>
          </div>
          
          <Link to="/newparcel">
            <button className="fms-button-primary">
              + Create New Freight
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
          {getStatsCards().map((stat, index) => (
            <div key={index} className="p-4 fms-card">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.bg} flex items-center justify-center mb-3`}>
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${stat.color}`}></div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="p-4 mb-6 fms-card">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <div className="flex space-x-2">
              {[
                { key: "all", label: "All Freights" },
                { key: "pending", label: "In Transit" },
                { key: "delivered", label: "Delivered" },
                { key: "cancelled", label: "Cancelled" }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setFilterStatus(filter.key)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                    filterStatus === filter.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="p-6 fms-card">
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Freight List ({getFilteredParcels().length} items)
          </h2>
          <p className="text-gray-600">Click on any freight to view detailed information</p>
        </div>
        
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid 
            rows={getFilteredParcels()}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f1f5f9',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8fafc',
                borderBottom: '2px solid #e2e8f0',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f8fafc',
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#fefefe',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '2px solid #e2e8f0',
                backgroundColor: '#f8fafc',
              }
            }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 mt-8 fms-card">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link to="/newparcel">
            <button className="w-full fms-button-secondary">
              Create Freight
            </button>
          </Link>
          <button className="fms-button-secondary">
            Export Data
          </button>
          <button className="fms-button-secondary">
            Import Freights
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

export default Parcels;
