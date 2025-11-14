import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Parcels from "./pages/Parcels";
import Users from "./pages/Users";
import NewParcel from "./pages/NewParcel";
import NewUsers from "./pages/NewUsers";
import Parcel from "./pages/Parcel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

function App() {
  const isAuthed = () => {
    try {
      const raw = localStorage.getItem('fms_admin');
      if (!raw) return false;
      const obj = JSON.parse(raw);
      return !!obj?.accessToken && (obj?.role === 'admin' || obj?.role === 'superadmin');
    } catch { return false; }
  };

  const ProtectedLayout = () => {
    if (!isAuthed()) {
      return <Navigate to="/login" replace />;
    }
    return <Layout />;
  };
  const Layout = () => {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        {/* Header */}
        <Navbar />

        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-[280px] flex-shrink-0">
            <Menu />
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {/* Removed translucent + blur to avoid visual banding over gradient seams */}
            <div className="h-full bg-white border-l border-slate-200/50">
              <div className="p-6 h-full overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    // Public landing page
    {
      path: "/",
      element: <Landing />,
    },
    // Direct alias redirects (handle people typing /newuser or /newparcel directly)
    {
      path: "/newuser",
      element: <Navigate to="/app/newuser" replace />,
    },
    {
      path: "/newparcel",
      element: <Navigate to="/app/newparcel" replace />,
    },
    // Protected app section
    {
      path: "/app",
      element: <ProtectedLayout />,
      children: [
        {
          path: "/app",
          element: <Home />,
        },
        {
          path: "/app/parcels",
          element: <Parcels />,
        },
        {
          path: "/app/users",
          element: <Users />,
        },
        {
          path: "/app/newparcel",
          element: <NewParcel />,
        },
        {
          path: "/app/newuser",
          element: <NewUsers />,
        },
        {
          path: "/app/parcel/:id",
          element: <Parcel />,
        },
      ],
    },
    // Auth pages
    {
      path: "/login",
      element: (
        <div className="min-h-screen bg-white">
          <Login />
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div className="min-h-screen bg-white">
          <Signup />
        </div>
      ),
    },
    // Catch-all 404
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div className="font-inter antialiased">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
