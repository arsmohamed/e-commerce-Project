import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side: App name */}
        <h1 className="navbar-title">OMS Mini</h1>

        {/* Right side: Links */}
        <div className="navbar-links">
          <Link to="/products" className="navbar-link">
            Product
          </Link>
          <Link to="/orders" className="navbar-link">
            Order
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
