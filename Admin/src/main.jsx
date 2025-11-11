import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Error Boundary Component for FMS
class FMSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FMS Admin Error:', error, errorInfo);
  } //lifecycle method logs error details to console

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900">
          <div className="p-8 text-center text-white">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-pink-600">
              <span className="text-2xl font-bold">!</span>
            </div>
            <h1 className="mb-2 text-2xl font-bold">FMS System Error</h1>
            <p className="mb-4 text-red-200">Something went wrong with the Freights Management System.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

FMSErrorBoundary.propTypes = {
  children: (props, propName) => {
    if (!props[propName]) return null;
    return undefined;
  },
};

// Initialize FMS Admin Application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FMSErrorBoundary>
      <App />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </FMSErrorBoundary>
  </React.StrictMode>
);
//wraps everything