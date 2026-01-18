import { useNavigate } from "react-router-dom";
import "../styles/admin.css"; // reuse same CSS

export default function StaffDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">



      <div className="admin-cards">

        {/* Add Students */}
        <div className="admin-card">
          <h3>Add Students</h3>
          <p>Add students under your subject</p>
          <button onClick={() => navigate("/staff/add-students")}>
            Add
          </button>
        </div>

        {/* Enter Marks */}
        <div className="admin-card">
          <h3>Enter Marks</h3>
          <p>Enter marks for students</p>
          <button onClick={() => navigate("/staff/enter-marks")}>
            Enter
          </button>
        </div>

      </div>
    </div>
  );
}
