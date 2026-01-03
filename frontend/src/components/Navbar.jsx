import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.jpg";

export default function Navbar(){
 return(
  <nav className="navbar">
    <div className="nav-left">
      <img src={logo} className="nav-logo"/>
      <span className="nav-title">NATIONAL ENGINEERING COLLEGE</span>
    </div>

    <div className="nav-right">
     
      <Link to="/">Home</Link>
      <Link to="/staff-login">Staff</Link>
      <Link to="/admin-login">Admin</Link>
    </div>
  </nav>
 );
}
