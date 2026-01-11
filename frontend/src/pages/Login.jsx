import { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import bg from "../assets/college.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      if (res.data.role === "ADMIN") window.location.href = "/admin";
      else window.location.href = "/staff";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    
    <div
      className="login-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="login-card">
        <h2>Welcome to</h2>
        <h1>National Engineering College</h1>
        <p>Students Marks Portal</p>

        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
