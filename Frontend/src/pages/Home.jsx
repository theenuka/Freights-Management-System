import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

const Home = () => {
  const [currentTime, setCurrentTime] = useState("2025-01-18 08:46:17");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utcString = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentTime(utcString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-secondary-900 to-secondary-800">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
            {/* Left Column - Text Content */}
            <div className="w-full md:w-1/2 space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                SIMPLE, FAST AND RELIABLE
                <span className="bg-gradient-to-r from-primary-400 to-accent-500 text-transparent bg-clip-text">
                  {" "}FREIGHTS MANAGEMENT SYSTEM
                </span>
              </h1>
              
              {/* Feature Points */}
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                  <p>Real-time tracking and monitoring</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                  <p>Secure and reliable delivery network</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                  <p>24/7 customer support</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex space-x-4 pt-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg 
                                 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
                  Track Parcel
                </button>
                <button className="bg-secondary-700 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg 
                                 transition-all duration-300 ease-in-out border border-primary-500/30">
                  Learn More
                </button>
              </div>

              {/* System Info */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>System Online</span>
                </div>
                <div className="utc-time">
                  {currentTime}
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="w-full md:w-1/2 mt-12 md:mt-0 animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-3xl"></div>
                <img 
                  src="/hero.png" 
                  alt="Freight Management System" 
                  className="relative z-10 w-full h-auto max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 animate-fade-in">
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-primary-400">10K+</div>
              <div className="text-gray-400 mt-2">Deliveries Completed</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-primary-400">99.9%</div>
              <div className="text-gray-400 mt-2">On-Time Delivery</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-primary-400">24/7</div>
              <div className="text-gray-400 mt-2">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;