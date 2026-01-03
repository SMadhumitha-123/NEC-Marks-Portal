const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ====== MySQL Connection ======
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nandhu@2005",
  database: "portal"
});

db.connect((err)=>{
  if(err) throw err;
  console.log("MySQL connected ✅");
});

// ====== Register API ======
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password, department, role } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const query = "INSERT INTO users (username, password, department, role) VALUES (?, ?, ?, ?)";
    db.query(query, [username, hashedPassword, department, role], (err, result) => {
      if(err){
        if(err.code === "ER_DUP_ENTRY") return res.status(400).json({msg:"Username already exists"});
        return res.status(500).json({msg: err});
      }
      res.json({msg:"User Registered Successfully"});
    });

  } catch(err){
    res.status(500).json({msg: err.message});
  }
});

// ====== Login API ======
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username=?";
  db.query(query, [username], async (err, results) => {
    if(err) return res.status(500).json({msg: err});
    if(results.length === 0) return res.status(400).json({msg:"User not found"});

    const user = results[0];

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(401).json({msg:"Invalid credentials"});

    // Create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", { expiresIn: "2h" });

    res.json({
      token,
      role: user.role,
      username: user.username,
      department: user.department
    });
  });
});

// ====== Start Server ======
app.listen(5000, ()=>console.log("Server running on http://localhost:5000"));
