import { useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import "../styles/navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/staff");

  const name = localStorage.getItem("name");

  const handleProfile = () => {
    alert("Profile clicked (will add later)");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>National Engineering College</h2>
      </div>

      {isDashboard && (
        <div className="nav-right">
          <span className="welcome-text">
            Hi, {name} 👋
          </span>

          <button className="icon-btn" onClick={handleProfile}>
            <CgProfile size={22} />
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            <AiOutlineLogout size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
