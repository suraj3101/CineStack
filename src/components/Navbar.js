import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar_container">
      <div className="container navbar_content">
        <Link to="/" className="navbar-logo">
          CineStack
        </Link>
        <ul className="navbar_links">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/watchlist">My Watchlist</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
