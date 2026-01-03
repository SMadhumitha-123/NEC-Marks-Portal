import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/auth.css";

export default function StaffLogin(){
 const nav = useNavigate();
 const [form,setForm] = useState({username:"", password:""});

 const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

 const handleLogin = async () => {
  try{
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    Swal.fire("Success", "Login Successful", "success");
    nav("/staff-dashboard");
  } catch {
    Swal.fire("Error","Invalid Credentials","error");
  }
 };

 return(
  <>
   <Navbar/>
   <div className="auth">
    <div className="auth-box">
      <h2>Staff Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange}/>
      <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
      <button onClick={handleLogin}>Login</button>
      <p onClick={()=>nav("/staff-signup")}>New user? Register</p>
    </div>
   </div>
   <Footer/>
  </>
 );
}
