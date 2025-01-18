import { DataGrid } from "@mui/x-data-grid";
import { FaTrash, FaUserPlus, FaSearch, FaUser, FaEnvelope, FaGlobe, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState("2025-01-18 17:08:33");
  const currentUser = "Theenuka Bandara";

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
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await publicRequest.delete(`/users/${id}`);
      toast.success("User deleted successfully!", { theme: "dark" });
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user", { theme: "dark" });
    }
  };

  const columns = [
    { 
      field: "fullname", 
      headerName: "Name", 
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 
            flex items-center justify-center text-white font-bold mr-2">
            {(params.value || "U").charAt(0)}
          </div>
          <span className="font-medium">{params.value || "Unknown"}</span>
        </div>
      )
    },
    { 
      field: "email", 
      headerName: "Email", 
      width: 250,
      renderCell: (params) => (
        <div className="flex items-center text-gray-300">
          <FaEnvelope className="mr-2 text-gray-400" />
          {params.value || "No email"}
        </div>
      )
    },
    { 
      field: "age", 
      headerName: "Age", 
      width: 100,
      renderCell: (params) => (
        <div className="text-gray-300">
          {params.value ? `${params.value} years` : "N/A"}
        </div>
      )
    },
    { 
      field: "country", 
      headerName: "Country", 
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center">
          <FaGlobe className="mr-2 text-gray-400" />
          <span className="text-gray-300">{params.value || "Not specified"}</span>
        </div>
      )
    },
    { 
      field: "role", 
      headerName: "Role", 
      width: 150,
      renderCell: (params) => (
        <div className={`px-3 py-1 rounded-full text-sm ${
          (params.value || "").toLowerCase() === "admin"
            ? "bg-purple-500/20 text-purple-400"
            : "bg-blue-500/20 text-blue-400"
        }`}>
          <FaUserShield className="inline mr-1" />
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
          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 
            text-red-400 transition-colors duration-200"
        >
          <FaTrash />
        </button>
      ),
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await publicRequest.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch users", { theme: "dark" });
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    (user.fullname || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.country || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.role || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Users Management</h1>
        <div className="text-gray-400 text-sm">
          {currentTime} UTC | User: {currentUser}
        </div>
      </div>

      {/* Button and Stats Row */}
      <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400">
              Total Users: {users.length}
            </div>
            <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400">
              Admins: {users.filter(u => (u.role || "").toLowerCase() === "admin").length}
            </div>
          </div>

          {/* New User Button */}
          <Link to="/newuser">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg
              bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white
              transform transition-all duration-300 hover:scale-[1.02]">
              <FaUserPlus />
              <span>New User</span>
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
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
          rows={filteredUsers}
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

export default Users;