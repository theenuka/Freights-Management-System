import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaTrash, FaSearch } from "react-icons/fa";
import { FiPackage, FiFilter, FiRefreshCw } from "react-icons/fi";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Parcels.css";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    shipping: 0,
    delivered: 0
  });

  // Fetch parcels data
  useEffect(() => {
    const getParcels = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/parcels");
        setParcels(res.data);
        calculateStats(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load parcels data");
        setLoading(false);
      }
    };
    getParcels();
  }, []);

  // Calculate stats for summary cards
  const calculateStats = (data) => {
    const newStats = {
      total: data.length,
      pending: data.filter(item => item.status === "pending" || !item.status).length,
      shipping: data.filter(item => item.status === "shipping").length,
      delivered: data.filter(item => item.status === "delivered").length
    };
    setStats(newStats);
  };

  // Delete parcel handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this parcel?")) {
      try {
        await publicRequest.delete(`/parcels/${id}`);
        setParcels(parcels.filter((item) => item._id !== id));
        toast.success("Parcel deleted successfully");
        calculateStats(parcels.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete parcel");
      }
    }
  };

  // Filter parcels based on search text
  const filteredParcels = parcels.filter((parcel) => {
    const matchesSearch = 
      searchText === "" || 
      parcel.sendername?.toLowerCase().includes(searchText.toLowerCase()) ||
      parcel.recipientname?.toLowerCase().includes(searchText.toLowerCase()) ||
      parcel.from?.toLowerCase().includes(searchText.toLowerCase()) ||
      parcel.to?.toLowerCase().includes(searchText.toLowerCase());
      
    const matchesStatus = 
      filterStatus === "" || 
      parcel.status === filterStatus || 
      (!parcel.status && filterStatus === "pending");
      
    return matchesSearch && matchesStatus;
  });

  // Refresh data handler
  const handleRefresh = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("/parcels");
      setParcels(res.data);
      calculateStats(res.data);
      setLoading(false);
      toast.success("Data refreshed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to refresh data");
      setLoading(false);
    }
  };

  const columns = [
    { 
      field: "_id", 
      headerName: "ID", 
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <Link to={`/parcel/${params.row._id}`} className="parcel-id-link">
            {params.row._id.substring(0, 8)}...
          </Link>
        );
      },
    },
    { 
      field: "from", 
      headerName: "From", 
      minWidth: 120,
      flex: 1,
    },
    { 
      field: "to", 
      headerName: "To", 
      minWidth: 120,
      flex: 1,
    },
    { 
      field: "sendername", 
      headerName: "Sender", 
      minWidth: 150,
      flex: 1,
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      minWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.8,
      renderCell: (params) => {
        const status = params.row.status || "pending";
        return (
          <div className={`status-cell status-${status}`}>
            {status}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="action-cell">
            <Link to={`/parcel/${params.row._id}`} className="view-button">
              View
            </Link>
            <button
              className="delete-button"
              onClick={() => handleDelete(params.row._id)}
            >
              <FaTrash />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="parcels-container">
      <div className="parcels-header">
        <div className="header-title">
          <h1><FiPackage /> Manage Parcels</h1>
          <p>View and manage all parcels in the system</p>
        </div>
        <Link to="/newparcel" className="new-parcel-button">
          + New Parcel
        </Link>
      </div>
      
      <div className="stats-summary">
        <div className="stat-card total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Parcels</div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        
        <div className="stat-card shipping">
          <div className="stat-value">{stats.shipping}</div>
          <div className="stat-label">In Transit</div>
        </div>
        
        <div className="stat-card delivered">
          <div className="stat-value">{stats.delivered}</div>
          <div className="stat-label">Delivered</div>
        </div>
      </div>
      
      <div className="controls-container">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by sender, recipient, origin or destination..." 
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        
        <div className="filter-container">
          <div className="filter-group">
            <FiFilter />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="shipping">Shipping</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          
          <button className="refresh-button" onClick={handleRefresh}>
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>
      
      <div className="datagrid-container">
        <DataGrid
          rows={filteredParcels}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          disableSelectionOnClick
          loading={loading}
          getRowId={(row) => row._id}
          className="parcels-datagrid"
          autoHeight
        />
      </div>
      
      <div className="parcels-footer">
        <p>Showing {filteredParcels.length} of {parcels.length} parcels</p>
      </div>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Parcels;