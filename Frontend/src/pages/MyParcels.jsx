import { useEffect, useState } from "react";
import { FaUser, FaBox, FaFileAlt, FaSignOutAlt, FaBoxOpen } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { logOut } from "../redux/userRedux";

const MyParcels = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("2025-01-18 08:48:07");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utcString = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentTime(utcString);
    }, 1000);

    const getParcels = async () => {
      try {
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getParcels();

    return () => clearInterval(timer);
  }, [user.currentUser.email]);

  const handleOpen = () => setOpen(!open);
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-900 to-secondary-800">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">My Parcels Dashboard</h1>
          
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={handleOpen}
              className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 
                       transition-all duration-200 rounded-lg px-4 py-2"
            >
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Theenuka Bandara</p>
                <p className="text-xs text-gray-400">{user.currentUser.email}</p>
              </div>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white/10 backdrop-blur-lg 
                            border border-white/20 shadow-xl animate-fade-in z-50">
                <ul className="py-2">
                  <Link to="/allparcels">
                    <li className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 cursor-pointer">
                      <FaBox className="mr-3" /> All Parcels
                    </li>
                  </Link>
                  <li className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 cursor-pointer">
                    <FaFileAlt className="mr-3" /> Statements
                  </li>
                  <li onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-white/10 cursor-pointer">
                    <FaSignOutAlt className="mr-3" /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* UTC Time Display */}
        <div className="mt-4 text-sm text-gray-400">
          System Time (UTC): {currentTime}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-6">
          {data.map((parcel, index) => (
            <Link key={index} to={`/parcel/${parcel._id}`}>
              <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 
                            rounded-lg transition-all duration-300 animate-fade-in">
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <FaBoxOpen className="text-2xl text-primary-500" />
                        <div>
                          <p className="text-sm text-gray-400">From</p>
                          <p className="text-lg font-medium text-white">{parcel.from}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Weight</p>
                          <p className="text-white">{parcel.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Date</p>
                          <p className="text-white">{parcel.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Sender</p>
                          <p className="text-white">{parcel.sendername}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">To</p>
                        <p className="text-lg font-medium text-white">{parcel.to}</p>
                      </div>
                      
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${parcel.status === 1 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-green-500/20 text-green-400'
                        }`}>
                        {parcel.status === 1 ? "Pending" : "Delivered"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyParcels;