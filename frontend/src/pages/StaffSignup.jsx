import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/auth.css";

export default function StaffSignup(){
 const nav = useNavigate();
 const [form,setForm] = useState({username:"", department:"", password:""});

 const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

 const handleSubmit = async () => {
  if(!form.username || !form.department || !form.password){
    Swal.fire("Warning","Fill all fields","warning"); 
    return;
  }
  await axios.post("http://localhost:5000/api/auth/register",{...form, role:"STAFF"});
  Swal.fire("Success","Registered Successfully","success");
  nav("/staff-login");
 };

 return(
  <>
   <Navbar/>
   <div className="auth">
    <div className="auth-box">
      <h2>Staff Registration</h2>
      <input name="username" placeholder="Username" onChange={handleChange}/>
      <input name="department" placeholder="Department" onChange={handleChange}/>
      <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
      <button onClick={handleSubmit}>Register</button>
      <p onClick={()=>nav("/staff-login")}>Already have login?</p>
    </div>
   </div>
   <Footer/>
  </>
 );
}
