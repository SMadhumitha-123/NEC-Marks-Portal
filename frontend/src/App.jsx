import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import AddSubject from "./pages/AddSubject";
import AddStudent from "./pages/AddStudent";
import AddStaff from "./pages/AddStaff";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITH layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* Login page WITHOUT layout */}
        <Route path="/login" element={<Login />} />

        <Route
  path="/admin"
  element={
    <Layout>
      <AdminDashboard />
    </Layout>
  }
/>


<Route
  path="/admin/add-subject"
  element={
    <Layout>
      <AddSubject />
    </Layout>
  }
/>

<Route
  path="/admin/add-student"
  element={
    <Layout>
      <AddStudent />
    </Layout>
  }
/>

<Route
  path="/admin/add-staff"
  element={
    <Layout>
      <AddStaff />
    </Layout>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
