import { useState } from "react";
import axios from "axios";
import StaffFilter from "../components/StaffFilter";
import "../styles/staffPages.css";

export default function StaffEnterMarks() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState(null);
const [submitted, setSubmitted] = useState(false);

const [showExaminerBox, setShowExaminerBox] = useState(false);
const [internalExaminer, setInternalExaminer] = useState("");
const [externalExaminer, setExternalExaminer] = useState("");
const [summary, setSummary] = useState(null);
   const downloadPdf = () => {
  const url = `http://localhost:5000/api/staff/marks-pdf?subject_id=${filter.subject_id}`;
  const link = document.createElement("a");
  link.href = url;
  link.download = "Marks_Report.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const finalSubmit = async () => {
  if (!internalExaminer || !externalExaminer) {
    alert("Please enter both examiner names");
    return;
  }

  const payload = {
    subject_id: filter.subject_id,
    internal_examiner: internalExaminer,
    external_examiner: externalExaminer,
    marks: students.map(s => ({
      student_id: s.student_id,
      mark: s.mark === "" ? null : s.mark
    }))
  };

  await axios.post("http://localhost:5000/api/staff/marks", payload);

  // ✅ IMPORTANT STATE UPDATES
  setShowExaminerBox(false);
  setSubmitted(true);

  alert("Marks submitted successfully");
};


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
  let present = 0;
  let absent = 0;

  students.forEach(s => {
    if (s.mark === "" || s.mark === null) absent++;
    else present++;
  });

  const payload = {
    subject_id: filter.subject_id,
    examiner_type: examiner,
    marks: students.map(s => ({
      student_id: s.student_id,
      mark: s.mark === "" ? null : s.mark
    }))
  };

  await axios.post("http://localhost:5000/api/staff/marks", payload);

  setSummary({
    total: students.length,
    present,
    absent
  });

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
<div className="action-buttons">

      {students.length > 0 && (
        <button onClick={() => setShowExaminerBox(true)}  className="btn-primary">
  Submit Marks
</button>

      )}
     </div>
     {showExaminerBox && (
  <div className="examiner-box">
    <h3>Examiner Details</h3>

    <div className="examiner-row">
      <input
        type="text"
        placeholder="Internal Examiner Name"
        value={internalExaminer}
        onChange={e => setInternalExaminer(e.target.value)}
      />

      <input
        type="text"
        placeholder="External Examiner Name"
        value={externalExaminer}
        onChange={e => setExternalExaminer(e.target.value)}
      />

      <button
        className="btn-confirm"
        onClick={finalSubmit}
        disabled={!internalExaminer || !externalExaminer}
      >
        Confirm & Save
      </button>
    </div>
  </div>
)}

<div className="action-buttons">
{submitted && (
  <div className="download-box">
    <button className="btn-secondary" onClick={downloadPdf}>
      Download PDF
    </button>
  </div>
)}


</div>

    </div>
  );
}
