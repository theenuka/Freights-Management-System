import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">FMS</span>
        </Link>
        <Link to="/login" className="nav-login-link">
          <button className="login-button">
            Login
            <span className="button-highlight"></span>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;