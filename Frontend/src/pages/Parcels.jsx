import { useState, useEffect } from "react";
import { FaArrowLeft, FaSearch, FaFileExport, FaFilter, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Parcels = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.user);

  // Custom theme for DataGrid
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3b82f6',
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(8px)',
            '& .MuiDataGrid-cell': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderBottom: '2px solid rgba(59, 130, 246, 0.2)',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const getParcels = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        // Add formatted date and status text
        const formattedData = res.data.map(parcel => ({
          ...parcel,
          formattedDate: new Date(parcel.date).toLocaleString(),
          statusText: parcel.status === 1 ? "Pending" : "Delivered",
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      } finally {
        setLoading(false);
      }
    };
    getParcels();
  }, [user.currentUser.email]);

  const columns = [
    { 
      field: "from", 
      headerName: "From", 
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center">
          <span>{params.value}</span>
        </div>
      ),
    },
    { 
      field: "formattedDate", 
      headerName: "Date", 
      width: 180,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-blue-400" />
          <span>{params.value}</span>
        </div>
      ),
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      width: 150,
      renderCell: (params) => (
        <div className="font-medium">{params.value}</div>
      ),
    },
    { 
      field: "to", 
      headerName: "Destination", 
      width: 150,
    },
    { 
      field: "statusText", 
      headerName: "Status", 
      width: 120,
      renderCell: (params) => (
        <div className={`px-3 py-1 rounded-full text-sm ${
          params.row.status === 1
            ? 'bg-yellow-500/20 text-yellow-300'
            : 'bg-green-500/20 text-green-300'
        }`}>
          {params.value}
        </div>
      ),
    },
    { 
      field: "note", 
      headerName: "Note", 
      width: 300,
      renderCell: (params) => (
        <div className="truncate">{params.value}</div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/myparcels" className="text-blue-400 hover:text-blue-300 transition-colors">
              <FaArrowLeft className="text-xl" />
            </Link>
            <h1 className="text-2xl font-bold text-white">All Parcels</h1>
          </div>
          <div className="text-white opacity-80">
            Welcome, {user.currentUser?.name || "User"}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search parcels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* DataGrid */}
          <div className="h-[600px] w-full">
            <ThemeProvider theme={darkTheme}>
              <DataGrid
                rows={data.filter(row => 
                  Object.values(row).some(value => 
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                  )
                )}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20, 50]}
                checkboxSelection
                disableSelectionOnClick
                loading={loading}
                components={{
                  Toolbar: GridToolbar,
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                className="text-white"
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parcels;