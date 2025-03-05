import React from 'react';
import './Footer.css'; // You'll need to update this file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-waves">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#5000ca" fillOpacity="0.2" d="M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,186.7C672,192,768,160,864,154.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#5000ca" fillOpacity="0.4" d="M0,256L48,229.3C96,203,192,149,288,133.3C384,117,480,139,576,170.7C672,203,768,245,864,234.7C960,224,1056,160,1152,144C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#5000ca" fillOpacity="0.6" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,186.7C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="footer-company">
          <div className="company-logo">
            <span className="logo-text">FMS</span>
            <span className="logo-dot"></span>
          </div>
          <p className="company-slogan">
            We understand that your parcels carry more than just items—
            they carry your trust. Committed to excellence.
          </p>
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-links-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h3>Services</h3>
            <ul>
              <li><a href="#">Express Delivery</a></li>
              <li><a href="#">International</a></li>
              <li><a href="#">Tracking</a></li>
              <li><a href="#">Scheduled Pickup</a></li>
            </ul>
          </div>
          
          <div className="footer-links-column">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Shipping Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-social">
          <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} FMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;