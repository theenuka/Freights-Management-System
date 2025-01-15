import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyParcels from "./pages/MyParcels";
import Parcels from "./pages/Parcels";
import Parcel from "./pages/Parcel";

// Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
    <div className="glass p-8 rounded-2xl flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-white/80">Loading...</p>
    </div>
  </div>
);

// Error Boundary Component
const ErrorFallback = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
    <div className="glass p-8 rounded-2xl text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
      <p className="text-white/80 mb-6">Please try refreshing the page</p>
      <button 
        onClick={() => window.location.reload()} 
        className="btn-primary"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

function App() {
  const user = useSelector((state) => state.user);
  const isAuthenticated = Boolean(user.currentUser);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Router Configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <Home />
        </Suspense>
      ),
      errorElement: <ErrorFallback />,
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoadingScreen />}>
          {isAuthenticated ? <Navigate to="/myparcels" replace /> : <Login />}
        </Suspense>
      ),
    },
    {
      path: "/myparcels",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingScreen />}>
            <MyParcels />
          </Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: "/allparcels",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingScreen />}>
            <Parcels />
          </Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: "/parcel/:id",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingScreen />}>
            <Parcel />
          </Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
          <div className="glass p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">404 - Page Not Found</h2>
            <p className="text-white/80 mb-6">The page you're looking for doesn't exist.</p>
            <button 
              onClick={() => window.history.back()} 
              className="btn-primary"
            >
              Go Back
            </button>
          </div>
        </div>
      ),
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900">
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;