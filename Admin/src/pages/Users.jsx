import { DataGrid } from "@mui/x-data-grid";
import { FaTrash, FaUserPlus, FaSearch, FaEnvelope, FaGlobe, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../pages/users.css';

const Users = () => {
  // ... existing state and functions remain the same ...

  const columns = [
    { 
      field: "fullname", 
      headerName: "Name", 
      width: 200,
      renderCell: (params) => (
        <div className="cell-name">
          <div className="user-avatar">
            {(params.value || "U").charAt(0)}
          </div>
          <span className="cell-name-text">{params.value || "Unknown"}</span>
        </div>
      )
    },
    { 
      field: "email", 
      headerName: "Email", 
      width: 250,
      renderCell: (params) => (
        <div className="cell-email">
          <FaEnvelope className="cell-icon" />
          {params.value || "No email"}
        </div>
      )
    },
    { 
      field: "age", 
      headerName: "Age", 
      width: 100,
      renderCell: (params) => (
        <div className="cell-age">
          {params.value ? `${params.value} years` : "N/A"}
        </div>
      )
    },
    { 
      field: "country", 
      headerName: "Country", 
      width: 150,
      renderCell: (params) => (
        <div className="cell-country">
          <FaGlobe className="cell-icon" />
          <span className="country-text">{params.value || "Not specified"}</span>
        </div>
      )
    },
    { 
      field: "role", 
      headerName: "Role", 
      width: 150,
      renderCell: (params) => (
        <div className={`role-badge ${
          (params.value || "").toLowerCase() === "admin" ? "role-admin" : "role-user"
        }`}>
          <FaUserShield />
          {params.value || "user"}
        </div>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.row._id)}
          className="delete-button"
        >
          <FaTrash />
        </button>
      ),
    },
  ];

  return (
    <div className="users-page">
      {/* Header */}
      <div className="users-header">
        <h1 className="users-title">Users Management</h1>
        <div className="users-meta">
          {currentTime} UTC | User: {currentUser}
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-container">
        <div className="controls-row">
          {/* Stats */}
          <div className="stats-group">
            <div className="stat-badge stat-users">
              Total Users: {users.length}
            </div>
            <div className="stat-badge stat-admins">
              Admins: {users.filter(u => (u.role || "").toLowerCase() === "admin").length}
            </div>
          </div>

          {/* New User Button */}
          <Link to="/newuser">
            <button className="new-user-button">
              <FaUserPlus />
              <span>New User</span>
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* DataGrid */}
      <div className="grid-container">
        <DataGrid
          rows={filteredUsers}
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

export default Users;