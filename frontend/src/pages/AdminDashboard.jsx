import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-cards">
        <div className="admin-card">
          <h3>Add Subject</h3>
          <p>Add subjects with course code</p>
          <button onClick={() => navigate("/admin/add-subject")}>
            Add
          </button>
        </div>
        <div className="admin-card">
          <h3>Add Staff</h3>
          <p>Create staff login access</p>
          <button onClick={() => navigate("/admin/add-staff")}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
