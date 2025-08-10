import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getRoleBadge = (role) => {
    if (role === "admin") {
      return "👑 Admin";
    } else if (role === "manager") {
      return "👔 Manager";
    } else {
      return "👤 User";
    }
  };

  const getRoleColor = (role) => {
    if (role === "admin") {
      return "bg-purple-100 text-purple-800 border-purple-200";
    } else if (role === "manager") {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else {
      return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 80,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      sortable: false,
      renderCell: (params) => (
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {getInitials(params.row.fullname)}
        </div>
      ),
    },
    { 
      field: "fullname", 
      headerName: "Full Name", 
      width: 180,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{params.value || "N/A"}</span>
          <span className="text-xs text-gray-500">ID: {params.row._id?.slice(-6)}</span>
        </div>
      ),
    },
    { 
      field: "email", 
      headerName: "Email Address", 
      width: 220,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{params.value}</span>
        </div>
      ),
    },
    { 
      field: "age", 
      headerName: "Age", 
      width: 80,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <span className="text-gray-600">{params.value || "N/A"}</span>
      ),
    },
    { 
      field: "country", 
      headerName: "Country", 
      width: 140,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <span className="text-gray-600">{params.value || "N/A"}</span>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getRoleColor(params.value)}`}>
          {getRoleBadge(params.value)}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Joined",
      width: 100,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      renderCell: (params) => (
        <span className="text-gray-600 text-sm">
          {params.value ? new Date(params.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }) : "N/A"}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      headerClassName: "font-semibold text-gray-700 bg-gray-50",
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDelete(params.row._id)}
            disabled={deleteLoading === params.row._id}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md transition-colors duration-200 font-medium disabled:opacity-50"
          >
            {deleteLoading === params.row._id ? "..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      setDeleteLoading(id);
      await publicRequest.delete(`/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    } finally {
      setDeleteLoading(null);
    }
  };

  const getFilteredUsers = () => {
    let filtered = users;
    
    // Filter by role
    if (filterRole !== "all") {
      filtered = filtered.filter(user => user.role === filterRole);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.country?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStatsCards = () => {
    const total = users.length;
    const admins = users.filter(u => u.role === "admin").length;
    const managers = users.filter(u => u.role === "manager").length;
    const regularUsers = users.filter(u => u.role === "user" || !u.role).length;

    return [
      { label: "Total Users", value: total, color: "from-blue-500 to-blue-600", bg: "from-blue-50 to-blue-100", icon: "👥" },
      { label: "Administrators", value: admins, color: "from-purple-500 to-purple-600", bg: "from-purple-50 to-purple-100", icon: "👑" },
      { label: "Managers", value: managers, color: "from-indigo-500 to-indigo-600", bg: "from-indigo-50 to-indigo-100", icon: "👔" },
      { label: "Regular Users", value: regularUsers, color: "from-green-500 to-green-600", bg: "from-green-50 to-green-100", icon: "👤" },
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">👥</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-gray-600">Manage all users in the FMS system</p>
            </div>
          </div>
          
          <Link to="/newuser">
            <button className="fms-button-primary">
              + Create New User
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {getStatsCards().map((stat, index) => (
            <div key={index} className="fms-card p-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.bg} flex items-center justify-center mb-3`}>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="fms-card p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users by name, email, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="fms-input"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Filter by role:</span>
              <div className="flex space-x-2">
                {[
                  { key: "all", label: "All Users" },
                  { key: "admin", label: "Admins" },
                  { key: "manager", label: "Managers" },
                  { key: "user", label: "Users" }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterRole(filter.key)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                      filterRole === filter.key
                        ? 'bg-green-500 text-white'
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
      </div>

      {/* Data Grid */}
      <div className="fms-card p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            User List ({getFilteredUsers().length} users)
          </h2>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={getFilteredUsers()}
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
      <div className="mt-8 fms-card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/newuser">
            <button className="w-full fms-button-secondary">
              Create User
            </button>
          </Link>
          <button className="fms-button-secondary">
            Export Users
          </button>
          <button className="fms-button-secondary">
            Import Users
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

export default Users;
