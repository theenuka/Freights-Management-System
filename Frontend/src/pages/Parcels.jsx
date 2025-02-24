import { useState, useEffect } from "react";
import { FaArrowLeft, FaSpinner, FaDownload, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import "./Parcels.css";

const Parcels = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
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
  }, [user.currentUser.email]);

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting selected rows:", selectedRows);
  };

  const columns = [
    { 
      field: "from", 
      headerName: "From", 
      width: 150,
      renderCell: (params) => (
        <div className="cell-content">
          {params.value}
        </div>
      )
    },
    { 
      field: "date", 
      headerName: "Date", 
      width: 120,
      renderCell: (params) => (
        <div className="cell-content date-cell">
          {params.value}
        </div>
      )
    },
    { 
      field: "recipientname", 
      headerName: "Recipient", 
      width: 150,
      renderCell: (params) => (
        <div className="cell-content">
          {params.value}
        </div>
      )
    },
    { 
      field: "to", 
      headerName: "To", 
      width: 150,
      renderCell: (params) => (
        <div className="cell-content">
          {params.value}
        </div>
      )
    },
    { 
      field: "note", 
      headerName: "Note", 
      width: 300,
      renderCell: (params) => (
        <div className="cell-content note-cell">
          {params.value}
        </div>
      )
    },
  ];

  return (
    <div className="parcels-page">
      <div className="parcels-container">
        <div className="header-section">
          <Link to="/myparcels" className="back-button">
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </Link>

          <div className="header-content">
            <div className="title-section">
              <h1>All Parcels</h1>
              <span className="user-name">Alok Mondala</span>
            </div>

            <div className="action-buttons">
              <button 
                className="filter-button"
                onClick={() => console.log("Filter")}
              >
                <FaFilter />
                <span>Filter</span>
              </button>
              
              <button 
                className={`export-button ${selectedRows.length === 0 ? 'disabled' : ''}`}
                onClick={handleExport}
                disabled={selectedRows.length === 0}
              >
                <FaDownload />
                <span>Export Selected</span>
              </button>
            </div>
          </div>
        </div>

        <div className="data-grid-container">
          {loading ? (
            <div className="loading-state">
              <FaSpinner className="spinner" />
              <p>Loading parcels...</p>
            </div>
          ) : (
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(newSelection) => {
                setSelectedRows(newSelection);
              }}
              className="custom-data-grid"
              autoHeight
              components={{
                NoRowsOverlay: () => (
                  <div className="no-rows-overlay">
                    <p>No parcels found</p>
                  </div>
                ),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Parcels;