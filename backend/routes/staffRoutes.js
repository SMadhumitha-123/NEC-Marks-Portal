const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/students", (req, res) => {
  const { dept_id, semester } = req.body;

  const sql =
    "SELECT student_id, reg_no, name FROM student WHERE dept_id=? AND semester=?";

  db.query(sql, [dept_id, semester], (err, result) => {
    if (err) return res.status(500).json({ msg: "Error" });
    res.json(result);
  });
});

module.exports = router;
