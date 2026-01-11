import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import AddStudent from "./pages/AddStudent";
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
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/admin/add-subject" element={<AddSubject />} />
          <Route path="/admin/add-staff" element={<AddStaff />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
