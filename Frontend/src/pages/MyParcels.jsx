import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { logOut } from "../redux/userRedux";
import { Package, LogOut, List, User, FileText, ChevronDown, MapPin, Weight, Calendar, User as UserIcon } from 'lucide-react';

const ParcelCard = ({ parcel }) => (
  <Link to={`/parcel/${parcel._id}`}>
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-all duration-300 
      transform hover:-translate-y-1 hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <MapPin className="text-blue-300" size={20} />
            <div>
              <p className="text-sm text-blue-200">From</p>
              <p className="text-white font-medium">{parcel.from}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Weight className="text-blue-300" size={16} />
              <div>
                <p className="text-sm text-blue-200">Weight</p>
                <p className="text-white">{parcel.weight} kg</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-300" size={16} />
              <div>
                <p className="text-sm text-blue-200">Date</p>
                <p className="text-white">{parcel.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <UserIcon className="text-blue-300" size={16} />
              <div>
                <p className="text-sm text-blue-200">Sender</p>
                <p className="text-white">{parcel.sendername}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-3">
          <div className="flex items-center space-x-2">
            <MapPin className="text-blue-300" size={16} />
            <div>
              <p className="text-sm text-blue-200">To</p>
              <p className="text-white font-medium">{parcel.to}</p>
            </div>
          </div>
          
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            parcel.status === 1 
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-green-500/20 text-green-300"
          }`}>
            {parcel.status === 1 ? "Pending" : "Delivered"}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const MyParcels = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getParcels = async () => {
      try {
        const res = await publicRequest.post("/parcels/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getParcels();
  }, [user.currentUser.email]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Header with User Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-end">
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 text-white bg-white/10 px-4 py-2 rounded-lg
                hover:bg-white/20 transition-all duration-300"
            >
              <User size={18} />
              <span>{user.currentUser?.name || 'User'}</span>
              <ChevronDown size={18} className={`transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg 
                shadow-lg py-2 animate-fadeIn">
                <Link to="/allparcels">
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-white hover:bg-white/10 transition-colors duration-300">
                    <List size={18} />
                    <span>All Parcels</span>
                  </button>
                </Link>
                <button className="flex items-center space-x-2 w-full px-4 py-2 text-white hover:bg-white/10 transition-colors duration-300">
                  <FileText size={18} />
                  <span>Statements</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-red-300 hover:bg-white/10 transition-colors duration-300"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <Package className="text-white" size={24} />
            <h1 className="text-2xl font-bold text-white">My Parcels</h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto text-blue-300 mb-4" size={48} />
              <p className="text-white text-lg">No parcels found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {data.map((parcel, index) => (
                <ParcelCard key={index} parcel={parcel} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MyParcels;