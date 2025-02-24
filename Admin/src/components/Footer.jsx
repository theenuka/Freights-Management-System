import '../components/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left section - FMS branding */}
          <div className="footer-brand">
            <div className="footer-brand-text">
              <span className="footer-brand-logo">FMS</span>
              <span className="footer-brand-subtitle">
                Freight Management System
              </span>
            </div>
          </div>

          {/* Center section - Copyright and Credits */}
          <div className="footer-center">
            <p className="footer-copyright">Designed by Theenuka Bandara</p>
            <p className="footer-copyright-year">
              &copy; {currentYear} All rights reserved
            </p>
          </div>

          {/* Right section - User Info */}
          <div className="footer-user">
            <div className="footer-user-info">
              <span className="footer-username">
                Theenuka Bandara
              </span>
              <span className="footer-role">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;