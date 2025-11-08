import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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

function App() {
  const Layout = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
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
            <div className="h-full bg-white/50 backdrop-blur-sm border-l border-slate-200/50">
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
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/parcels",
          element: <Parcels />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/newparcel",
          element: <NewParcel />,
        },
        {
          path: "/newuser",
          element: <NewUsers />,
        },
        {
          path: "/parcel/:id",
          element: <Parcel />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <div className="min-h-screen bg-white">
          <Login />
        </div>
      ),
    },
  ]);

  return (
    <div className="font-inter antialiased">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
