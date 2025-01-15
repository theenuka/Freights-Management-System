import { useEffect, useState } from "react";
import { FaUser, FaBox, FaSignOutAlt, FaFileAlt, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { logOut } from "../redux/userRedux";

const MyParcels = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getParcels = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching parcels:", error);
      } finally {
        setLoading(false);
      }
    };
    getParcels();
  }, [user.currentUser.email]);

  const filteredParcels = data
    .filter(parcel => 
      (parcel.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.sendername.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || 
       (filterStatus === "pending" && parcel.status === 1) ||
       (filterStatus === "delivered" && parcel.status === 2))
    );

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">FMS Dashboard</h1>
          
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 px-4 py-2 rounded-lg transition-all duration-300"
            >
              <FaUser />
              <span>{user.currentUser?.name || "User"}</span>
            </button>
            
            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 overflow-hidden z-50">
                <div className="p-4 border-b border-white/10">
                  <p className="text-sm opacity-70">Logged in as</p>
                  <p className="font-medium">{user.currentUser?.email}</p>
                </div>
                <ul>
                  <Link to="/allparcels">
                    <li className="flex items-center space-x-2 px-4 py-3 hover:bg-blue-600/20 cursor-pointer transition-colors">
                      <FaBox />
                      <span>All Parcels</span>
                    </li>
                  </Link>
                  <li className="flex items-center space-x-2 px-4 py-3 hover:bg-blue-600/20 cursor-pointer transition-colors">
                    <FaFileAlt />
                    <span>Statements</span>
                  </li>
                  <li 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-3 hover:bg-red-600/20 cursor-pointer transition-colors text-red-400"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search parcels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
            />
          </div>
          
          <div className="flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Parcels Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredParcels.length === 0 ? (
          <div className="text-center py-12">
            <FaBox className="mx-auto text-6xl opacity-20 mb-4" />
            <h3 className="text-xl font-medium">No parcels found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredParcels.map((parcel) => (
              <Link key={parcel._id} to={`/parcel/${parcel._id}`}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium mb-1">From: {parcel.from}</h3>
                        <p className="text-sm opacity-70">To: {parcel.to}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        parcel.status === 1 
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        {parcel.status === 1 ? 'Pending' : 'Delivered'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="opacity-70">Weight</p>
                        <p className="font-medium">{parcel.weight} kg</p>
                      </div>
                      <div>
                        <p className="opacity-70">Date</p>
                        <p className="font-medium">{new Date(parcel.date).toLocaleDateString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="opacity-70">Sender</p>
                        <p className="font-medium">{parcel.sendername}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyParcels;