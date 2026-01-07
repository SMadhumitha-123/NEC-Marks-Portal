import { Link } from "react-router-dom";
import "../styles/navcar.css";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="College Logo" className="nav-logo" />
        <span className="nav-title">
          NATIONAL ENGINEERING COLLEGE
        </span>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
