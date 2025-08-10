import { HiArrowSmallUp, HiArrowLongDown, HiUsers, HiTruck, HiClock } from "react-icons/hi2";
import { PieChart } from "@mui/x-charts/PieChart";

const Home = () => {
  const stats = [
    {
      title: "Total Users",
      value: "200",
      change: "+12%",
      trending: "up",
      icon: HiUsers,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "Delivered Freights",
      value: "2,000",
      change: "+8%",
      trending: "up",
      icon: HiTruck,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      title: "Pending Freights",
      value: "100",
      change: "-5%",
      trending: "down",
      icon: HiClock,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100"
    }
  ];

  const recentUsers = [
    { id: 1, name: "John Smith", email: "john@company.com", status: "Active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@logistics.com", status: "Active" },
    { id: 3, name: "Mike Wilson", email: "mike@freight.com", status: "Pending" },
    { id: 4, name: "Lisa Brown", email: "lisa@transport.com", status: "Active" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          FMS Dashboard
        </h1>
        <p className="text-gray-600">Welcome to Freights Management System Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="fms-card p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.bgColor}`}>
                  <IconComponent className={`w-6 h-6 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`} style={{color: stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('green') ? '#10b981' : '#f59e0b'}} />
                </div>
                <div className={`flex items-center text-sm font-medium ${stat.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trending === 'up' ? (
                    <HiArrowSmallUp className="w-4 h-4 mr-1" />
                  ) : (
                    <HiArrowLongDown className="w-4 h-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="lg:col-span-2 fms-card p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Freight Distribution</h2>
          <div className="flex items-center justify-center">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 2000, label: "Delivered", color: "#10b981" },
                    { id: 1, value: 100, label: "Pending", color: "#f59e0b" },
                    { id: 2, value: 50, label: "Rejected", color: "#ef4444" },
                  ],
                  innerRadius: 60,
                  outerRadius: 120,
                  paddingAngle: 2,
                  cornerRadius: 8,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 200,
                  cy: 150,
                },
              ]}
              width={400}
              height={300}
            />
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Delivered (93%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Pending (5%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Rejected (2%)</span>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="fms-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  user.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 fms-card p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="fms-button-primary text-center">
            Add New Freight
          </button>
          <button className="fms-button-secondary text-center">
            Manage Users
          </button>
          <button className="fms-button-secondary text-center">
            View Reports
          </button>
          <button className="fms-button-secondary text-center">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
