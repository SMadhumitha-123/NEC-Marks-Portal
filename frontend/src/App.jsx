import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StaffLogin from "./pages/StaffLogin";
import AdminLogin from "./pages/AdminLogin";
import StaffSignup from "./pages/StaffSignup";
import AdminSignup from "./pages/AdminSignup";
import StaffDashboard from "./pages/StaffDashboard";


export default function App() {
 return (
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/staff-login" element={<StaffLogin/>}/>
    <Route path="/admin-login" element={<AdminLogin/>}/>
    <Route path="/staff-signup" element={<StaffSignup/>}/>
    <Route path="/admin-signup" element={<AdminSignup/>}/>
    <Route path="/staff-dashboard" element={<StaffDashboard />} />

  </Routes>
 );
}
