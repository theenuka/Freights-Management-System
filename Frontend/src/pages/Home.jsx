import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            <span className="highlight">Simple</span>, 
            <span className="highlight">Fast</span> and 
            <span className="highlight">Reliable</span> 
            <br />
            Parcel Delivery System
          </h2>
          <div className="hero-image-container">
            <img src="/hero.png" alt="Parcel Delivery Illustration" className="hero-image" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;