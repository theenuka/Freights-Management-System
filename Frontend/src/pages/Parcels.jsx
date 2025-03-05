import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Parcels.css";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const parcelsPerPage = 10;

  useEffect(() => {
    const getParcels = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        // const res = await publicRequest.get("/parcels");
        // setParcels(res.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          const mockParcels = Array(25).fill().map((_, index) => ({
            id: `P${10000 + index}`,
            from: ["New York", "Chicago", "Seattle", "Miami", "Boston"][Math.floor(Math.random() * 5)],
            to: ["Los Angeles", "San Francisco", "Denver", "Portland", "Austin"][Math.floor(Math.random() * 5)],
            date: new Date(2023, 6, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
            recipientname: ["John Smith", "Jane Doe", "Robert Johnson", "Emily Wilson", "Michael Brown"][Math.floor(Math.random() * 5)],
            status: ["Pending", "In Transit", "Delivered", "Processing"][Math.floor(Math.random() * 4)],
            weight: (Math.random() * 10 + 1).toFixed(1) + " kg",
            trackingNumber: `FMS${Math.floor(Math.random() * 10000000)}`
          }));
          setParcels(mockParcels);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(error);
      }
    };
    getParcels();
  }, []);

  const columns = [
    { field: "from", headerName: "From", width: 150 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "recipientname", headerName: "Recipient", width: 150 },
    { field: "to", headerName: "To", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "weight", headerName: "Weight", width: 100 },
    { field: "trackingNumber", headerName: "Tracking #", width: 150 }
  ];

  // Filter parcels based on search term
  const filteredParcels = parcels.filter(parcel => {
    return (
      parcel.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.recipientname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort parcels
  const sortedParcels = [...filteredParcels].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Request sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get current parcels for pagination
  const indexOfLastParcel = currentPage * parcelsPerPage;
  const indexOfFirstParcel = indexOfLastParcel - parcelsPerPage;
  const currentParcels = sortedParcels.slice(indexOfFirstParcel, indexOfLastParcel);
  const totalPages = Math.ceil(filteredParcels.length / parcelsPerPage);

  return (
    <div className="parcels-page">
      <Navbar />
      
      <div className="parcels-container">
        <div className="parcels-header">
          <h1>All Parcels</h1>
          <div className="header-actions">
            <div className="search-container">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search parcels..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="add-parcel-button">
              <i className="fas fa-plus"></i> Add Parcel
            </button>
          </div>
        </div>

        <div className="parcels-content">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading parcels...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <i className="fas fa-exclamation-circle"></i>
              <p>Error loading parcels. Please try again later.</p>
            </div>
          ) : filteredParcels.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-box-open"></i>
              <h3>No parcels found</h3>
              <p>Try adjusting your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="parcels-table-container">
                <table className="parcels-table">
                  <thead>
                    <tr>
                      {columns.map((column) => (
                        <th 
                          key={column.field}
                          style={{ width: column.width }}
                          onClick={() => requestSort(column.field)}
                          className={sortConfig.key === column.field ? `sorted-${sortConfig.direction}` : ''}
                        >
                          {column.headerName}
                          {sortConfig.key === column.field && (
                            <span className="sort-icon">
                              {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                            </span>
                          )}
                        </th>
                      ))}
                      <th style={{ width: 100 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentParcels.map((parcel) => (
                      <tr key={parcel.id}>
                        <td>{parcel.from}</td>
                        <td>{parcel.date}</td>
                        <td>{parcel.recipientname}</td>
                        <td>{parcel.to}</td>
                        <td>
                          <span className={`status-badge ${parcel.status.toLowerCase().replace(" ", "-")}`}>
                            {parcel.status}
                          </span>
                        </td>
                        <td>{parcel.weight}</td>
                        <td>
                          <span className="tracking-number">{parcel.trackingNumber}</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <Link to={`/parcel/${parcel.id}`} className="view-button">
                              <i className="fas fa-eye"></i>
                            </Link>
                            <button className="edit-button">
                              <i className="fas fa-edit"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="pagination-container">
                <div className="pagination-info">
                  Showing {indexOfFirstParcel + 1} to {Math.min(indexOfLastParcel, filteredParcels.length)} of {filteredParcels.length} parcels
                </div>
                <div className="pagination-controls">
                  <button 
                    className="pagination-button" 
                    onClick={() => setCurrentPage(1)} 
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-angle-double-left"></i>
                  </button>
                  <button 
                    className="pagination-button" 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-angle-left"></i>
                  </button>
                  <span className="pagination-pages">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    className="pagination-button" 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                  >
                    <i className="fas fa-angle-right"></i>
                  </button>
                  <button 
                    className="pagination-button" 
                    onClick={() => setCurrentPage(totalPages)} 
                    disabled={currentPage === totalPages}
                  >
                    <i className="fas fa-angle-double-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Parcels;