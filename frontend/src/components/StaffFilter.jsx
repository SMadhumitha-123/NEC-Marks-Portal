import { useEffect, useState } from "react";
import axios from "axios";

export default function StaffFilter({ onSearch }) {
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [filter, setFilter] = useState({
    dept_id: "",
    year: "",
    semester: "",
    subject_id: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/departments")
      .then(res => setDepartments(res.data));
  }, []);

  const loadSubjects = (deptId, sem) => {
    // placeholder – backend API later
    axios
      .get("http://localhost:5000/api/staff/subjects", {
        params: { deptId, sem }
      })
      .then(res => setSubjects(res.data));
  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  const updated = { ...filter, [name]: value };
  setFilter(updated);

  // 🔴 Load subjects ONLY when dept + semester change
  if (
    (name === "dept_id" || name === "semester") &&
    updated.dept_id &&
    updated.semester
  ) {
    loadSubjects(updated.dept_id, updated.semester);
  }
};


  return (
    <div className="filter-box">
      <select name="dept_id" onChange={handleChange}>
        <option value="">Department</option>
        {departments.map(d => (
          <option key={d.dept_id} value={d.dept_id}>
            {d.dept_name}
          </option>
        ))}
      </select>

     <select name="year" onChange={handleChange}>
  <option value="">Academic Year</option>
  <option value="1">1st Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
  <option value="4">4th Year</option>
</select>


      <select name="semester" onChange={handleChange}>
        <option value="">Semester</option>
        <option value="1">Sem 1</option>
        <option value="2">Sem 2</option>
        <option value="3">Sem 3</option>
        <option value="4">Sem 4</option>
        <option value="5">Sem 5</option>
        <option value="6">Sem 6</option>
        <option value="7">Sem 7</option>
        <option value="8">Sem 8</option>
      </select>

      <select name="subject_id" onChange={handleChange}>
        <option value="">Subject</option>
        {subjects.map(s => (
          <option key={s.subject_id} value={s.subject_id}>
            {s.subject_name}
          </option>
        ))}
      </select>

      <button onClick={() => onSearch(filter)}>
        Search
      </button>
    </div>
  );
}
