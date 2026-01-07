const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ msg: "Error" });

    if (result.length === 0)
      return res.status(401).json({ msg: "Invalid user" });

    const user = result[0];

    if (user.password !== password)
      return res.status(401).json({ msg: "Wrong password" });

    res.json({
      success: true,
      role: user.role,
      userId: user.user_id,
      name: user.name
    });
  });
});

module.exports = router;
