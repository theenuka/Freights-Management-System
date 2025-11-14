import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-slate-800 text-white p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-7xl font-extrabold tracking-tight mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-sm text-indigo-100 mb-8 leading-relaxed">
          The URL you entered doesn&apos;t match any resource. It may have moved, been removed, or never existed. Use the console navigation or return home.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl font-semibold bg-white text-slate-900 shadow hover:shadow-lg transition"
          >
            Landing
          </Link>
          <Link
            to="/app"
            className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 shadow hover:shadow-lg transition"
          >
            Admin Console
          </Link>
        </div>
        <p className="mt-8 text-[11px] tracking-wider uppercase text-indigo-200">
          FMS · Freights Management System
        </p>
      </div>
    </div>
  );
};

export default NotFound;
