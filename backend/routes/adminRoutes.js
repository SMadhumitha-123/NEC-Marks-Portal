const express = require("express");
const db = require("../config/db");

const router = express.Router();


router.get("/departments", (req, res) => {
  db.query("SELECT dept_id, dept_name FROM department", (err, result) => {
    if (err) return res.status(500).json({ msg: "Error" });
    res.json(result);
  });
});

// Add Subject
router.post("/add-subject", (req, res) => {
  const { subject_code, subject_name, semester, dept_id } = req.body;

  const sql =
    "INSERT INTO subject (subject_code, subject_name, semester, dept_id) VALUES (?,?,?,?)";

  db.query(sql, [subject_code, subject_name, semester, dept_id], (err) => {
    if (err) return res.status(500).json({ msg: "Error" });
    res.json({ msg: "Subject added successfully" });
  });
});

// Add Student
router.post("/add-student", (req, res) => {
  const { reg_no, name, semester, dept_id } = req.body;

  const sql =
    "INSERT INTO student (reg_no, name, semester, dept_id) VALUES (?,?,?,?)";

  db.query(sql, [reg_no, name, semester, dept_id], (err) => {
    if (err) return res.status(500).json({ msg: "Error" });
    res.json({ msg: "Student added successfully" });
  });
});


/* Add Staff */
router.post("/add-staff", (req, res) => {
  const { name, email, password, dept_id } = req.body;

  db.query(
    "INSERT INTO users (name, email, password, dept_id, role) VALUES (?,?,?,?,?)",
    [name, email, password, dept_id, "STAFF"],
    (err) => {
      if (err) return res.status(500).json({ msg: "Error" });
      res.json({ msg: "Staff added" });
    }
  );
});
router.get("/departments", (req, res) => {
  db.query("SELECT dept_id, dept_name FROM department", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "DB Error" });
    }
    res.json(result);
  });
});

module.exports = router;
