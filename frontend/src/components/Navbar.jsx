import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navcar.css";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/staff");

  const handleLogout = () => {
    // clear login data (later you can add token/session)
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Back icon only on dashboard */}
        {isDashboard && (
          <button
            className="nav-icon-btn"
            title="Go Back"
            onClick={() => navigate(-1)}
          >
            ←
          </button>
        )}

        <img src={logo} alt="College Logo" className="nav-logo" />
        <span className="nav-title">NATIONAL ENGINEERING COLLEGE</span>
      </div>

      <div className="nav-right">
        {/* Logout only on dashboard */}
        {isDashboard ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
