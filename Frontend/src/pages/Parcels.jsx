import { useEffect, useState } from "react";
import { FaArrowLeft, FaUser, FaDownload, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import { createTheme, ThemeProvider } from "@mui/material";

const Parcels = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const [currentTime, setCurrentTime] = useState("2025-01-18 08:50:49");

  // Custom theme for DataGrid
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#0ea5e9',
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            borderRadius: '0.5rem',
            '& .MuiDataGrid-cell': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0.5rem 0.5rem 0 0',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0 0 0.5rem 0.5rem',
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utcString = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentTime(utcString);
    }, 1000);

    const getParcels = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getParcels();

    return () => clearInterval(timer);
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
      field: "date", 
      headerName: "Date", 
      width: 120,
      renderCell: (params) => (
        <div className="text-gray-300">{params.value}</div>
      ),
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <FaUser className="text-primary-400 text-sm" />
          <span>{params.value}</span>
        </div>
      ),
    },
    { 
      field: "to", 
      headerName: "To", 
      width: 150 
    },
    { 
      field: "note", 
      headerName: "Note", 
      width: 300,
      renderCell: (params) => (
        <div className="truncate text-gray-300">{params.value}</div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-900 to-secondary-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/myparcels" className="text-gray-400 hover:text-white transition-colors">
              <FaArrowLeft className="text-xl" />
            </Link>
            <h1 className="text-2xl font-bold text-white">All Parcels</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-400">
              System Time (UTC): {currentTime}
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
              <FaUser className="text-primary-400" />
              <span className="text-white">Theek237</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg 
                           transition-all duration-200 flex items-center space-x-2">
              <FaFilter />
              <span>Filter</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg 
                           transition-all duration-200 flex items-center space-x-2">
              <FaDownload />
              <span>Export</span>
            </button>
          </div>
          
          <div className="text-gray-400 text-sm">
            Total Parcels: {data.length}
          </div>
        </div>

        {/* DataGrid */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl animate-fade-in">
          <ThemeProvider theme={darkTheme}>
            <div style={{ height: 600 }}>
              <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row._id}
                disableSelectionOnClick
                pageSize={10}
                checkboxSelection
                loading={loading}
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                  },
                }}
              />
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default Parcels;