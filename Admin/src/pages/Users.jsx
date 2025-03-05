import { DataGrid } from "@mui/x-data-grid";
import { FaTrash, FaSearch } from "react-icons/fa";
import { FiUsers, FiFilter, FiRefreshCw, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    admin: 0,
    customer: 0,
    driver: 0
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/users");
        setUsers(res.data);
        calculateStats(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load users data");
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const calculateStats = (data) => {
    const newStats = {
      total: data.length,
      admin: data.filter(item => item.role === "admin").length,
      customer: data.filter(item => item.role === "user").length,
      driver: data.filter(item => item.role === "driver").length
    };
    setStats(newStats);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await publicRequest.delete(`/users/${id}`);
        setUsers(users.filter((item) => item._id !== id));
        toast.success("User deleted successfully");
        calculateStats(users.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete user");
      }
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("/users");
      setUsers(res.data);
      calculateStats(res.data);
      setLoading(false);
      toast.success("Data refreshed successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to refresh data");
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      searchText === "" || 
      user.fullname?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.country?.toLowerCase().includes(searchText.toLowerCase());
      
    const matchesRole = 
      filterRole === "" || 
      user.role === filterRole;
      
    return matchesSearch && matchesRole;
  });

  const columns = [
    { 
      field: "fullname", 
      headerName: "Name", 
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="user-name-cell">
            <div className="user-avatar">{params.row.fullname?.charAt(0) || "U"}</div>
            <span>{params.row.fullname}</span>
          </div>
        );
      }
    },
    { 
      field: "email", 
      headerName: "Email", 
      minWidth: 200,
      flex: 1.5 
    },
    { 
      field: "country", 
      headerName: "Country", 
      minWidth: 120,
      flex: 0.8 
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <div className={`role-badge role-${params.row.role || 'user'}`}>
            {params.row.role || "user"}
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
            <Link to={`/user/${params.row._id}`} className="edit-button">
              <FiEdit />
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
    <div className="users-container">
      <div className="users-header">
        <div className="header-title">
          <h1><FiUsers /> Manage Users</h1>
          <p>View and manage all users in the system</p>
        </div>
        <Link to="/newuser" className="new-user-button">
          + New User
        </Link>
      </div>
      
      <div className="stats-summary">
        <div className="stat-card total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Users</div>
        </div>
        
        <div className="stat-card admin">
          <div className="stat-value">{stats.admin}</div>
          <div className="stat-label">Administrators</div>
        </div>
        
        <div className="stat-card customer">
          <div className="stat-value">{stats.customer}</div>
          <div className="stat-label">Customers</div>
        </div>
        
        <div className="stat-card driver">
          <div className="stat-value">{stats.driver}</div>
          <div className="stat-label">Drivers</div>
        </div>
      </div>
      
      <div className="controls-container">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search users by name, email, or country..." 
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        
        <div className="filter-container">
          <div className="filter-group">
            <FiFilter />
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="filter-select"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">Customer</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          
          <button className="refresh-button" onClick={handleRefresh}>
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>
      
      <div className="datagrid-container">
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          disableSelectionOnClick
          loading={loading}
          getRowId={(row) => row._id}
          className="users-datagrid"
          autoHeight
        />
      </div>
      
      <div className="users-footer">
        <p>Showing {filteredUsers.length} of {users.length} users</p>
      </div>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Users;