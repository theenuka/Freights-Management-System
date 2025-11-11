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
import PropTypes from "prop-types";


//menuItem Component
const MenuItem = ({ icon: Icon, label, path }) => (
  <Link to={path}>
    <li className="relative mx-3 mb-2 group">
      <div className="flex items-center px-4 py-3 rounded-xl bg-slate-700/30 text-white hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:scale-[1.02] cursor-pointer border border-slate-600/30 hover:border-blue-500/50">
        <Icon className="mr-4 text-lg text-blue-300 transition-transform duration-300 group-hover:scale-110" />
        <span className="font-medium text-white">{label}</span>
      </div>
    </li>
  </Link>
);

MenuItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

//menu items array
const Menu = () => {
  const menuItems = [
    { icon: FaHome, label: "Dashboard", path: "/app", group: "main" },
    { icon: FaUser, label: "Profile", path: "#", group: "main" },
    { icon: FaBox, label: "Freight Management", path: "/app/parcels", group: "freight" },
    { icon: FaUsers, label: "Users", path: "/app/users", group: "freight" },
    { icon: FaClipboardList, label: "Orders", path: "#", group: "freight" },
    { icon: FaElementor, label: "Elements", path: "#", group: "tools" },
    { icon: FaCog, label: "Settings", path: "#", group: "tools" },
    { icon: FaHdd, label: "Backups", path: "#", group: "tools" },
    { icon: FaChartBar, label: "Analytics", path: "#", group: "reports" },
    { icon: FaClipboard, label: "All Logs", path: "#", group: "reports" },
    { icon: FaCalendarAlt, label: "Calendar", path: "#", group: "reports" },
  ];

  //renderMenuGroup function
  const renderMenuGroup = (groupName, items) => (
    <div className="mb-8">
      <h3 className="px-4 mb-4 text-xs font-bold tracking-wider text-blue-300 uppercase border-l-2 border-blue-500">
        {groupName}
      </h3>
      {items.map((item, index) => (
        <MenuItem key={index} icon={item.icon} label={item.label} path={item.path} />
      ))}
    </div>
  );

  return (
    <div className="h-full border-r shadow-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      {/* FMS Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
            FMS
          </h2>
          <p className="mt-1 text-xs text-gray-300">Freights Management</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-6 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
        <ul className="space-y-1">
          {renderMenuGroup("MAIN", menuItems.filter(item => item.group === "main"))}
          {renderMenuGroup("FREIGHT", menuItems.filter(item => item.group === "freight"))}
          {renderMenuGroup("TOOLS", menuItems.filter(item => item.group === "tools"))}
          {renderMenuGroup("REPORTS", menuItems.filter(item => item.group === "reports"))}
        </ul>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
  );
};

export default Menu;
