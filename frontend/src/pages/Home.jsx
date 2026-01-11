import "../styles/home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-hero">
      <div className="hero-overlay">
       <h1 className="welcome-title">
  Welcome to <br />
  <span>National Engineering College</span>
</h1>

<p className="welcome-subtitle">
  Students Marks Management Portal
</p>

        <button onClick={() => navigate("/login")} className="fly-btn">
          Login to Portal
        </button>
      </div>
    </div>
  );
}
