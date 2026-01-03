import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function Home(){
 const nav = useNavigate();

 return(
  <>
   <Navbar/>

   <div className="home-center">
     
     {/* Welcome text above the login box */}
     <h1 className="welcome-top">WELCOME TO STUDENTS MARKS PORTAL</h1>

     {/* Login buttons container */}
     <div className="center-box">
       <button onClick={()=>nav("/staff-login")}>STAFF LOGIN</button>
       <button onClick={()=>nav("/admin-login")}>ADMIN LOGIN</button>
     </div>

   </div>

   <Footer/>
  </>
 );
}
