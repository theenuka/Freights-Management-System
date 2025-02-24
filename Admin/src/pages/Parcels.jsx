import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaTrash, FaEdit, FaPlus, FaBox, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../pages/parcels.css';

const Parcels = () => {
  // ... existing state and functions remain the same ...

  const columns = [
    { 
      field: "from", 
      headerName: "From", 
      width: 150,
      renderCell: (params) => (
        <div className="cell-from">
          <FaBox className="cell-icon" />
          {params.value || "N/A"}
        </div>
      )
    },
    { 
      field: "to", 
      headerName: "To", 
      width: 150,
      renderCell: (params) => (
        <div className="cell-to">{params.value || "N/A"}</div>
      )
    },
    { 
      field: "sendername", 
      headerName: "Sender", 
      width: 150,
      renderCell: (params) => (
        <div className="cell-sender">{params.value || "N/A"}</div>
      )
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      width: 150,
      renderCell: (params) => (
        <div className="cell-recipient">{params.value || "N/A"}</div>
      )
    },
    { 
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <div className={`status-badge ${
          params.row.status === 1 ? "status-pending" : "status-delivered"
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
        <div className="cell-note">{params.value || "No note"}</div>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="actions-container">
          <Link to={"/parcel/" + params.row._id}>
            <button className="action-button edit-button">
              <FaEdit />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(params.row._id)}
            className="action-button delete-button"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="parcels-page">
      {/* Header */}
      <div className="parcels-header">
        <h1 className="parcels-title">Parcels Overview</h1>
        <div className="parcels-meta">
          {currentTime} UTC | User: {currentUser}
        </div>
      </div>

      {/* Button and Stats Row */}
      <div className="controls-container">
        <div className="stats-row">
          {/* Stats */}
          <div className="stats-group">
            <div className="stat-badge stat-total">
              Total: {parcels.length}
            </div>
            <div className="stat-badge stat-pending">
              Pending: {parcels.filter(p => p.status === 1).length}
            </div>
            <div className="stat-badge stat-delivered">
              Delivered: {parcels.filter(p => p.status === 2).length}
            </div>
          </div>

          {/* New Parcel Button */}
          <Link to="/newparcel">
            <button className="new-parcel-button">
              <FaPlus />
              <span>New Parcel</span>
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search parcels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* DataGrid */}
      <div className="grid-container">
        <DataGrid
          rows={filteredParcels}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          loading={loading}
          autoHeight
          className="text-white border-0"
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

      <ToastContainer position="top-right" />
    </div>
  );
};

export default Parcels;