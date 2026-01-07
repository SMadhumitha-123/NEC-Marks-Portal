import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/adminForm.css";

export default function AddSubject() {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    subject_code: "",
    subject_name: "",
    semester: "",
    dept_id: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/departments")
      .then(res => {
        console.log("Departments:", res.data); // DEBUG
        setDepartments(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const submit = async () => {
    await axios.post("http://localhost:5000/api/admin/add-subject", form);
    alert("Subject added");
  };

  return (
    <div className="form-container">
      <h2>Add Subject</h2>

      <input
        placeholder="Subject Code"
        onChange={e => setForm({ ...form, subject_code: e.target.value })}
      />

      <input
        placeholder="Subject Name"
        onChange={e => setForm({ ...form, subject_name: e.target.value })}
      />

      <input
        placeholder="Semester"
        onChange={e => setForm({ ...form, semester: e.target.value })}
      />

      {/* IMPORTANT PART */}
      <select
        value={form.dept_id}
        onChange={e => setForm({ ...form, dept_id: e.target.value })}
      >
        <option value="">Select Department</option>

        {departments.map(dep => (
          <option key={dep.dept_id} value={dep.dept_id}>
            {dep.dept_name}
          </option>
        ))}
      </select>

      <button onClick={submit}>Add Subject</button>
    </div>
  );
}
