import { HiArrowSmallUp, HiArrowLongDown } from "react-icons/hi2";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import '../pages/home.css';

const Home = () => {
  const [currentTime, setCurrentTime] = useState("");
  
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
    <div className="stat-card">
      <div className="stat-card-content">
        <h1 className="stat-card-title">{title}</h1>
        <div className="stat-card-trend">
          {increase ? (
            <HiArrowSmallUp className="trend-icon-up" />
          ) : (
            <HiArrowLongDown className="trend-icon-down" />
          )}
          <span className="trend-text">
            {increase ? '+12%' : '-5%'} from last month
          </span>
        </div>
        <span className="stat-card-value">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <h1 className="home-title">Dashboard Overview</h1>
        <div className="home-meta">
          <span>Current UTC Time: {currentTime}</span>
          <span className="home-meta-dot">•</span>
          <span>Welcome back, Theenuka Bandara</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <StatCard title="Total Users" value="200" increase={true} />
        <StatCard title="Delivered Parcels" value="2,000" increase={true} />
        <StatCard title="Pending Parcels" value="100" increase={false} />
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Pie Chart */}
        <div className="chart-card">
          <h2 className="chart-title">Parcel Status Distribution</h2>
          <div className="chart-content">
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
        <div className="users-card">
          <h2 className="chart-title">Recent Users</h2>
          <div className="user-list">
            {[
              { name: "John Doe", time: "2 minutes ago", status: "Active" },
              { name: "Alex Doe", time: "5 minutes ago", status: "Idle" },
              { name: "Jane Doe", time: "15 minutes ago", status: "Active" },
            ].map((user, index) => (
              <div key={index} className="user-item">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.name[0]}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-time">{user.time}</div>
                  </div>
                </div>
                <span className={`user-status ${user.status === 'Active' ? 'status-active' : 'status-idle'}`}>
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