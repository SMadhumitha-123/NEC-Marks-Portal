const express = require("express");
const db = require("../config/db");
const multer = require("multer");
const XLSX = require("xlsx");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add-students", (req, res) => {
  const { students, subject_id } = req.body;
  // students = [{student_id, student_name, dept_id, year, semester}]

  students.forEach(s => {
    db.query(
      "INSERT IGNORE INTO student VALUES (?,?,?,?,?)",
      [s.student_id, s.student_name, s.dept_id, s.year, s.semester]
    );

    db.query(
      "INSERT IGNORE INTO student_subject (student_id, subject_id) VALUES (?,?)",
      [s.student_id, subject_id]
    );
  });

  res.json({ msg: "Students added successfully" });
});

router.get("/students", (req, res) => {
  const { dept_id, year, semester, subject_id } = req.query;

  const sql = `
    SELECT s.student_id, s.student_name
    FROM student s
    JOIN student_subject ss ON s.student_id = ss.student_id
    WHERE s.dept_id = ?
      AND s.year = ?
      AND s.semester = ?
      AND ss.subject_id = ?
  `;

  db.query(
    sql,
    [dept_id, year, semester, subject_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

router.post("/marks", (req, res) => {
  const { marks } = req.body;
  // marks = [{student_id, subject_id, mark}]

  marks.forEach(m => {
    db.query(
      "REPLACE INTO marks (student_id, subject_id, mark) VALUES (?,?,?)",
      [m.student_id, m.subject_id, m.mark]
    );
  });

  res.json({ msg: "Marks saved" });
});

// GET subjects by department & semester
router.get("/subjects", (req, res) => {
  const { deptId, sem } = req.query;

  const sql = `
    SELECT subject_id, subject_name
    FROM subject
    WHERE dept_id = ? AND semester = ?
  `;

  db.query(sql, [deptId, sem], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});
router.post("/upload-students", upload.single("file"), (req, res) => {
  const { dept_id, year, semester, subject_id } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // Read Excel
  const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const students = XLSX.utils.sheet_to_json(sheet);

  students.forEach(s => {
    // Insert into student table
    db.query(
      `INSERT IGNORE INTO student 
       (student_id, student_name, dept_id, year, semester)
       VALUES (?,?,?,?,?)`,
      [s.student_id, s.student_name, dept_id, year, semester]
    );

    // Insert into student_subject table
    db.query(
      `INSERT IGNORE INTO student_subject 
       (student_id, subject_id)
       VALUES (?,?)`,
      [s.student_id, subject_id]
    );
  });

  res.json({ msg: "Student list uploaded successfully" });
});

module.exports = router;   // 🔴 THIS LINE IS MUST
