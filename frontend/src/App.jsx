import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";

import AddSubject from "./pages/AddSubject";
import AddStaff from "./pages/AddStaff";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/admin/add-subject" element={<AddSubject />} />
          <Route path="/admin/add-staff" element={<AddStaff />} />
         

<Route path="/staff/add-students" element={<h2>Add Students Page</h2>} />
<Route path="/staff/enter-marks" element={<h2>Enter Marks Page</h2>} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
