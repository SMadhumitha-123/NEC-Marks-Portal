import { useState } from "react";
import axios from "axios";
import StaffFilter from "../components/StaffFilter";
import "../styles/staffPages.css";

export default function StaffEnterMarks() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState(null);

  // 🔴 Called when Search button is clicked
  const handleSearch = async (f) => {
    setFilter(f);

    const res = await axios.get(
      "http://localhost:5000/api/staff/students",
      { params: f }
    );

    // add mark field for input
    const data = res.data.map(s => ({
      ...s,
      mark: ""
    }));

    setStudents(data);
  };

  const handleMarkChange = (index, value) => {
    const updated = [...students];
    updated[index].mark = value;
    setStudents(updated);
  };

  const submitMarks = async () => {
    const payload = {
      marks: students.map(s => ({
        student_id: s.student_id,
        subject_id: filter.subject_id,
        mark: s.mark
      }))
    };

    await axios.post(
      "http://localhost:5000/api/staff/marks",
      payload
    );

    alert("Marks submitted successfully");
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Enter Marks</h2>

      <StaffFilter onSearch={handleSearch} />

      {students.length > 0 && (
        <table className="marks-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.student_id}>
                <td>{s.student_id}</td>
                <td>{s.student_name}</td>
                <td>
                  <input
                    type="number"
                    value={s.mark}
                    onChange={e =>
                      handleMarkChange(i, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {students.length > 0 && (
        <button onClick={submitMarks}>
          Submit Marks
        </button>
      )}
    </div>
  );
}
