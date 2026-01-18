import { useState } from "react";
import axios from "axios";
import StaffFilter from "../components/StaffFilter";
import "../styles/staffPages.css";

export default function StaffAddStudents() {
  const [file, setFile] = useState(null);
  const [filter, setFilter] = useState(null);

  const handleSearch = (f) => {
    setFilter(f);
  };

  const uploadExcel = async () => {
    if (!file || !filter) {
      alert("Select filters and upload file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dept_id", filter.dept_id);
    formData.append("year", filter.year);
    formData.append("semester", filter.semester);
    formData.append("subject_id", filter.subject_id);

    await axios.post(
      "http://localhost:5000/api/staff/upload-students",
      formData
    );

    alert("Student list uploaded successfully");
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Add Students</h2>

      <StaffFilter onSearch={handleSearch} />

      <div className="upload-box">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={e => setFile(e.target.files[0])}
        />

        <button onClick={uploadExcel}>
          Upload Student List
        </button>
      </div>
    </div>
  );
}
