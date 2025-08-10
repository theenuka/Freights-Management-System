import {
  FaHome,
  FaUsers,
  FaUser,
  FaBox,
  FaClipboardList,
  FaElementor,
  FaCog,
  FaHdd,
  FaChartBar,
  FaClipboard,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  const menuItems = [
    { icon: FaHome, label: "Dashboard", path: "/", group: "main" },
    { icon: FaUser, label: "Profile", path: "#", group: "main" },
    { icon: FaBox, label: "Freight Management", path: "/parcels", group: "freight" },
    { icon: FaUsers, label: "Users", path: "/users", group: "freight" },
    { icon: FaClipboardList, label: "Orders", path: "#", group: "freight" },
    { icon: FaElementor, label: "Elements", path: "#", group: "tools" },
    { icon: FaCog, label: "Settings", path: "#", group: "tools" },
    { icon: FaHdd, label: "Backups", path: "#", group: "tools" },
    { icon: FaChartBar, label: "Analytics", path: "#", group: "reports" },
    { icon: FaClipboard, label: "All Logs", path: "#", group: "reports" },
    { icon: FaCalendarAlt, label: "Calendar", path: "#", group: "reports" },
  ];

  const renderMenuGroup = (groupName, items) => (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
        {groupName}
      </h3>
      {items.map((item, index) => (
        <MenuItem key={index} icon={item.icon} label={item.label} path={item.path} />
      ))}
    </div>
  );

  const MenuItem = ({ icon: Icon, label, path }) => (
    <Link to={path}>
      <li className="group relative mx-3 mb-2">
        <div className="flex items-center px-4 py-3 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:scale-105 cursor-pointer">
          <Icon className="mr-4 text-lg group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium">{label}</span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      </li>
    </Link>
  );

  return (
    <div className="h-[90vh] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-r border-slate-700">
      {/* FMS Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            FMS
          </h2>
          <p className="text-xs text-gray-400 mt-1">Freights Management</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-6 overflow-y-auto">
        <ul className="space-y-1">
          {renderMenuGroup("Main", menuItems.filter(item => item.group === "main"))}
          {renderMenuGroup("Freight", menuItems.filter(item => item.group === "freight"))}
          {renderMenuGroup("Tools", menuItems.filter(item => item.group === "tools"))}
          {renderMenuGroup("Reports", menuItems.filter(item => item.group === "reports"))}
        </ul>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
  );
};

export default Menu;
