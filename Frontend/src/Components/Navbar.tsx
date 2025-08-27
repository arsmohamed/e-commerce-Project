import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side: App name */}
        <h1 className="navbar-title">OMS Mini</h1>

        {/* Right side: Links */}
        <div className="navbar-links">
          <a href="/products" className="navbar-link">
            Product
          </a>
          <a href="/orders" className="navbar-link">
            Order
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
