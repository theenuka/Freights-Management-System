import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-message">
          <p>
            We understand that your parcels carry more than just items— they carry
            your trust. Committed to excellence.
          </p>
        </div>
        <div className="footer-copyright">
          <span>&copy; FMS {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;