const express = require("express");
const db = require("../config/db");
const multer = require("multer");
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");
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
router.post("/marks", (req, res) => {
  const {
    subject_id,
    internal_examiner,
    external_examiner,
    marks
  } = req.body;

  console.log("Received examiner:", internal_examiner, external_examiner); // 🔴 ADD THIS

  marks.forEach(m => {
    db.query(
      `REPLACE INTO marks 
       (student_id, subject_id, mark, internal_examiner, external_examiner)
       VALUES (?,?,?,?,?)`,
      [
        m.student_id,
        subject_id,
        m.mark,
        internal_examiner,
        external_examiner
      ]
    );
  });

  res.json({ msg: "Marks saved successfully" });
});
router.get("/marks-pdf", (req, res) => {
  const { subject_id } = req.query;

  // 1️⃣ Students + marks
  const studentsSql = `
    SELECT 
      s.student_id,
      s.student_name,
      m.mark
    FROM marks m
    JOIN student s ON s.student_id = m.student_id
    WHERE m.subject_id = ?
  `;

  // 2️⃣ Subject + examiner info (NO GROUP BY)
  const infoSql = `
    SELECT 
      sub.subject_code,
      sub.subject_name,
      sub.semester,
      m.internal_examiner,
      m.external_examiner
    FROM marks m
    JOIN subject sub ON sub.subject_id = m.subject_id
    WHERE m.subject_id = ?
    LIMIT 1
  `;

  db.query(studentsSql, [subject_id], (err, students) => {
    if (err) {
      console.error("Students SQL error:", err);
      return res.status(500).json({ error: "DB error" });
    }

    if (students.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    db.query(infoSql, [subject_id], (err2, info) => {
      if (err2) {
        console.error("Info SQL error:", err2);
        return res.status(500).json({ error: "DB error" });
      }

      const meta = info[0];

      let total = students.length;
      let present = 0;
      let absent = 0;

      students.forEach(s => {
        if (s.mark === null) absent++;
        else present++;
      });

      const PDFDocument = require("pdfkit");
      const doc = new PDFDocument({ margin: 40 });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Marks_Report.pdf"
      );

      doc.pipe(res);

      // HEADER
      doc.fontSize(18).text("NATIONAL ENGINEERING COLLEGE", { align: "center" });
      doc.moveDown(0.5);
      doc.fontSize(14).text("Students Marks Report", { align: "center" });
      doc.moveDown();

      // SUBJECT INFO
      doc.fontSize(11);
      doc.text(`Course Code : ${meta.subject_code}`);
      doc.text(`Course Name : ${meta.subject_name}`);
      doc.text(`Semester : ${meta.semester}`);
      doc.moveDown();

      // TABLE HEADER
      doc.font("Helvetica-Bold");
      doc.text("Student ID", 50);
      doc.text("Student Name", 150);
      doc.text("Mark", 420);
      doc.moveDown(0.5);
      doc.font("Helvetica");

      // TABLE DATA
      students.forEach(s => {
        doc.text(s.student_id, 50);
        doc.text(s.student_name, 150);
        doc.text(s.mark === null ? "AB" : s.mark.toString(), 420);
        doc.moveDown(0.5);
      });

      doc.moveDown();

      // SUMMARY
      doc.font("Helvetica-Bold");
      doc.text(`Total Students Registered : ${total}`);
      doc.text(`Present : ${present}`);
      doc.text(`Absent : ${absent}`);
      doc.moveDown();

      // EXAMINERS
      doc.font("Helvetica");
      doc.text(`Internal Examiner : ${meta.internal_examiner}`);
      doc.text(`External Examiner : ${meta.external_examiner}`);
      doc.moveDown(2);

      doc.text(`Date : ${new Date().toLocaleDateString()}`);
      doc.moveDown(2);

      doc.text("Internal Examiner Signature", 50);
      doc.text("External Examiner Signature", 350);

      doc.end();
    });
  });
});


module.exports = router;   // 🔴 THIS LINE IS MUST
