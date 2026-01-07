import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/adminForm.css";

export default function AddStudent() {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    reg_no: "",
    name: "",
    semester: "",
    dept_id: ""
  });

  // Load departments
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/departments")
      .then(res => setDepartments(res.data));
  }, []);

  const submit = async () => {
    await axios.post("http://localhost:5000/api/admin/add-student", form);
    alert("Student added");
    setForm({ reg_no: "", name: "", semester: "", dept_id: "" });
  };

  return (
    <div className="form-container">
      <h2>Add Student</h2>

      <input
        placeholder="Register Number"
        value={form.reg_no}
        onChange={e => setForm({ ...form, reg_no: e.target.value })}
      />

      <input
        placeholder="Student Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Semester"
        value={form.semester}
        onChange={e => setForm({ ...form, semester: e.target.value })}
      />

      <select
        value={form.dept_id}
        onChange={e => setForm({ ...form, dept_id: e.target.value })}
      >
        <option value="">Select Department</option>
        {departments.map(d => (
          <option key={d.dept_id} value={d.dept_id}>
            {d.dept_name}
          </option>
        ))}
      </select>

      <button onClick={submit}>Add Student</button>
    </div>
  );
}
