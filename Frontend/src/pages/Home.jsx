import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              SIMPLE, FAST AND RELIABLE PARCEL DELIVERY SYSTEM
            </h1>
            <p className="hero-subtitle">
              Track your packages in real-time and ensure safe delivery with our advanced logistics solution.
            </p>
            <div className="hero-buttons">
              <a href="/tracking" className="hero-button primary">Track Package</a>
              <a href="/services" className="hero-button secondary">Our Services</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/hero.png" alt="Parcel Delivery Illustration" />
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose FMS</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3>Express Delivery</h3>
              <p>Get your packages delivered in record time with our express options.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3>Real-time Tracking</h3>
              <p>Follow your shipment's journey with accurate GPS tracking.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Handling</h3>
              <p>Your valuables are protected with our secure packaging solutions.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-globe-americas"></i>
              </div>
              <h3>Global Network</h3>
              <p>Reach over 200 countries with our international delivery service.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;