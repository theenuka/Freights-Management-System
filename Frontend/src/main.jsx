import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import App from './App.jsx';
import './index.css';

// Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
    <div className="glass p-8 rounded-2xl flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-white/80">Loading your application...</p>
    </div>
  </div>
);

// Error Boundary Component
const ErrorFallback = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
    <div className="glass p-8 rounded-2xl text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Application Error</h2>
      <p className="text-white/80 mb-6">There was a problem loading the application.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Reload Application
      </button>
    </div>
  </div>
);

// Root component with error handling
const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

// Mount application with error boundary
const mount = () => {
  try {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    
    root.render(
      <Root />
    );
  } catch (error) {
    // Fallback render in case of critical error
    const rootElement = document.getElementById('root');
    ReactDOM.createRoot(rootElement).render(<ErrorFallback />);
    
    // Log error to console or error tracking service
    console.error('Critical application error:', error);
  }
};

// Initialize application
mount();

// Add debug information in development
if (process.env.NODE_ENV === 'development') {
  console.log('Application Information:');
  console.log('Current Time (UTC):', '2025-01-15 08:58:43');
  console.log('Current User:', 'Theek237');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Redux Store Status:', store.getState());
}

// Hot Module Replacement (HMR) setup for development
if (import.meta.hot) {
  import.meta.hot.accept();
}