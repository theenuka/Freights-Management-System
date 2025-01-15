import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser] = useState("Theek237");
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative min-h-screen pt-[100px] px-4 md:px-[50px]">
        {/* Welcome Message */}
        <div className={`absolute top-4 right-4 text-blue-300 transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          Welcome, {currentUser}
        </div>

        {/* Main Content */}
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-12">
          {/* Left Section - Text Content */}
          <div className={`w-full md:w-1/2 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                SIMPLE, FAST AND RELIABLE
              </span>
              <br />
              <span className="text-white">
                FREIGHT MANAGEMENT SYSTEM
              </span>
            </h1>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: "🚚", text: "Fast Delivery" },
                { icon: "🌍", text: "Global Reach" },
                { icon: "📱", text: "Real-time Tracking" },
                { icon: "🔒", text: "Secure Shipping" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-blue-900/30 p-4 rounded-lg backdrop-blur-sm transition-all duration-500 transform hover:scale-105 hover:bg-blue-800/40 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <p className="text-white mt-2">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-blue-800">
              Get Started Now
            </button>
          </div>

          {/* Right Section - Image */}
          <div className={`w-full md:w-1/2 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="relative">
              <img 
                src="/hero.png" 
                alt="Freight Management System" 
                className="w-full h-auto rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-700/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-700/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;