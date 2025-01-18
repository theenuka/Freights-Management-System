import { HiArrowSmallUp, HiArrowLongDown } from "react-icons/hi2";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";

const Home = () => {
  const [currentTime, setCurrentTime] = useState("");
  
  // Update UTC time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const StatCard = ({ title, value, increase }) => (
    <div className="flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl 
      h-[250px] w-[350px] m-[20px] transform transition-all duration-300 hover:scale-105">
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-[22px] font-bold text-white mb-4">{title}</h1>
        <div className="flex items-center space-x-2 mb-4">
          {increase ? (
            <HiArrowSmallUp className="text-[28px] text-green-400" />
          ) : (
            <HiArrowLongDown className="text-[28px] text-red-400" />
          )}
          <span className="text-gray-400 text-sm">
            {increase ? '+12%' : '-5%'} from last month
          </span>
        </div>
        <span className="text-[32px] font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-blue-400 to-cyan-300">
          {value}
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
        <div className="flex items-center text-gray-400 text-sm">
          <span>Current UTC Time: {currentTime}</span>
          <span className="mx-2">•</span>
          <span>Welcome back, Theenuka Bandara</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap items-center justify-center lg:justify-between">
        <StatCard title="Total Users" value="200" increase={true} />
        <StatCard title="Delivered Parcels" value="2,000" increase={true} />
        <StatCard title="Pending Parcels" value="100" increase={false} />
      </div>

      {/* Charts Section */}
      <div className="flex flex-wrap items-stretch mt-8 gap-6">
        {/* Pie Chart */}
        <div className="flex-1 min-w-[500px] bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Parcel Status Distribution</h2>
          <div className="h-[400px]">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 2000, label: "Delivered", color: "#60A5FA" },
                    { id: 1, value: 100, label: "Pending", color: "#FBBF24" },
                    { id: 2, value: 50, label: "Rejected", color: "#EF4444" },
                  ],
                  innerRadius: 60,
                  outerRadius: 140,
                  paddingAngle: 3,
                  cornerRadius: 4,
                  startAngle: -90,
                  endAngle: 270,
                  cx: 150,
                  cy: 150,
                },
              ]}
            />
          </div>
        </div>

        {/* Recent Users Card */}
        <div className="flex-1 min-w-[300px] bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Users</h2>
          <div className="space-y-4">
            {[
              { name: "John Doe", time: "2 minutes ago", status: "Active" },
              { name: "Alex Doe", time: "5 minutes ago", status: "Idle" },
              { name: "Jane Doe", time: "15 minutes ago", status: "Active" },
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 
                bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 
                    flex items-center justify-center text-white font-bold">
                    {user.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-xs">{user.time}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs 
                  ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;