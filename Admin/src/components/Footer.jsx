import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand-section">
          <div className="footer-brand">FMS</div>
          <p className="brand-tagline">Freights Management System</p>
        </div>
        
        <div className="footer-links-section">
          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Parcels</a></li>
              <li><a href="#">Users</a></li>
              <li><a href="#">Reports</a></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="social-links">
          <a href="#" className="social-icon"><FiGithub /></a>
          <a href="#" className="social-icon"><FiTwitter /></a>
          <a href="#" className="social-icon"><FiLinkedin /></a>
          <a href="#" className="social-icon"><FiMail /></a>
        </div>
        
        <div className="copyright">
          <p>Admin <span>&copy; 2025</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;