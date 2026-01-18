import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/adminForm.css";

export default function AddStaff() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dept_id: ""
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/departments")
      .then(res => setDepartments(res.data));
  }, []);

  const submit = async () => {
  await axios.post("http://localhost:5000/api/admin/add-staff", {
    ...form,
    dept_id: Number(form.dept_id)
  });

  alert("Staff added");

  setForm({
    name: "",
    email: "",
    password: "",
    dept_id: ""
  });
};

  return (
    <div className="form-container">
      <h2>Add Staff</h2>

    <input
  value={form.name}
  placeholder="Staff Name"
  onChange={e => setForm({ ...form, name: e.target.value })}
/>

<input
  value={form.email}
  placeholder="Email"
  onChange={e => setForm({ ...form, email: e.target.value })}
/>

<input
  type="password"
  value={form.password}
  placeholder="Password"
  onChange={e => setForm({ ...form, password: e.target.value })}
/>


      <select
        onChange={e => setForm({ ...form, dept_id: e.target.value })}
      >
        <option value="">Select Department</option>
        {departments.map(d => (
          <option key={d.dept_id} value={d.dept_id}>
            {d.dept_name}
          </option>
        ))}
      </select>

      <button onClick={submit}>Add</button>
    </div>
  );
}
