import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Truck, Package, Clock, Shield } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
    <Icon className="text-blue-400 mb-4" size={32} />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-blue-100">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Hero */}
          <div className="py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6 animate-fadeIn">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                  Simple, Fast & Reliable
                </span>
                <br />
                Freight Management System
              </h1>
              <p className="text-xl text-blue-100">
                Streamline your logistics operations with our cutting-edge freight management solutions.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-medium 
                  transform transition-all duration-300 hover:scale-105 hover:bg-blue-50 
                  shadow-lg hover:shadow-xl">
                  Get Started
                </button>
                <button className="border border-white text-white px-8 py-3 rounded-lg font-medium 
                  transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
                  Learn More
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 animate-float">
              <img 
                src="/hero.png" 
                alt="Freight Management Illustration" 
                className="w-full h-auto max-w-lg mx-auto"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-16">
            <FeatureCard 
              icon={Truck}
              title="Global Shipping"
              description="Worldwide delivery services with real-time tracking capabilities"
            />
            <FeatureCard 
              icon={Package}
              title="Cargo Safety"
              description="Advanced security measures to protect your valuable shipments"
            />
            <FeatureCard 
              icon={Clock}
              title="Fast Delivery"
              description="Optimized routes for quick and efficient delivery times"
            />
            <FeatureCard 
              icon={Shield}
              title="Secure Platform"
              description="End-to-end encryption for all your shipping data"
            />
          </div>
        </div>
      </div>

      <Footer />

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;