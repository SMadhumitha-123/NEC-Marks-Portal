import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/staffDashboard.css";
import Swal from "sweetalert2";

export default function StaffDashboard() {
  const [form, setForm] = useState({
    dept: "",
    year: "",
    semester: "",
    course: ""
  });

  const handleChange = e => {
  const { name, value } = e.target;

  setForm(prev => ({
    ...prev,
    [name]: value,
    ...(name === "year" || name === "semester" ? { course: "" } : {})
  }));
};


  // IT Subjects organized by semester
  const subjects = {
    1: ["23SH11C - Heritage of Tamils", "23SH12C - Mathematical Foundation for Engineers","23SH13C - Introduction to Engineering","23SH14C - Technical English","23SH15C - Engineering Physics","23SH16C - Engineering Chemistry","23ME11C - Engineering Graphics","23CS11C - Problem Solving Techniques"],
    2: ["23SH21C - Tamils and Technology", "23GN05C - Professional Ethics and Human Values","23IT21C - Discrete Mathematics","23SH22C - Professional English","23IT22C - Semiconductor Physics and Digital Electronics", "23EE11C - Basic Electrical and Electronics Engineering","23IT23C - Object Oriented Programming Using C++"," 23GN02C - Innovation Through Design Thinking","23GN01C - Aptitude Essentials"],
    3: ["23IT31C - Software Engineering","23IT32C - Data Structures","23IT33C - Computer Organization and Architecture","23IT34C - Operating Systems","23IT38C - Probability and Statistics","23MC01C - Constitution of India","23IT35C - Computer Networks","23IT36C - Data Structures Laboratory","23IT37C - Linux System Laboratory","23GN03C - Intellectual Property Rights Study"],
    4: ["23SH02E - Linear Structures and Transformations (Elective)","23SH03E - Number Theory (Elective)","23SH04E - Numerical Analysis (Elective)","23IT41C - Java for Developers","23IT42C - Business Process Modeling","23IT43C - Signals and Systems","23MC02C - Environmental Science and Engineering","23IT44C - Design and Analysis of Algorithms","23IT45C - Database Management Systems","23IT46C - Java Programming Laboratory","23IT47C - System Modeling Projects","23GN04C - Aptitude Excellence"],
    5: ["23IT01E - Block chain Architecture and Design (PEC)","23IT12E - No SQL Databases (PEC)","23IT21C - Computer Vision and Image Processing (PEC)","23IT31E - Computer Graphics (PEC)","23IT41E - Generative AI (PEC)","23IT62E - Data Mining (PEC)","23IT59E - Digital Forensics (PEC)","23IT23E - AI Tools For Natural Language Processing (PEC)","23IT02E - Smart Contract and Dapp (PEC)","23IT56E - Cyber Security and Ethical Hacking (PEC)","23IT63E - Data Engineering (PEC)","23IT11E - Web Frameworks using Python (PEC)","23IT42E - AI for Industrial Application (PEC)","23CE16E - Climate Change Adaptation Mitigation and Management (OEC)","23EC47E - Fundamentals of Internet of Things (OEC)","23IT23E - UI/UX Design (OEC)","23GN06C - Project Management and Finance","23IT51C - Cryptography and Network Security","23IT52C - Artificial Intelligence","23IT53C - Modern Web Technologies","23IT54C - Simulation using Modern Tools"],
    6: ["23IT61C - Machine Learning","23IT62C - Cloud Computing","23IT63C - Big Data Analytics","23IT64C - Essentials of Mobile App Development","23IT65C - Product Development Practice","23IT66C- Machine Learning Laboratory","23IT67C - Cloud Computing Laboratory"],
    7: ["23IT71C - Internship","23IT72C - Mini Project"],
    8: ["23IT81C - Capstone Project/Industry Practice"]
  };

  // Map year to its 2 semesters
  const semestersByYear = {
    1: [1, 2],
    2: [3, 4],
    3: [5, 6],
    4: [7, 8]
  };

  const availableSemesters = form.year ? semestersByYear[form.year] : [];
  const availableCourses = form.semester ? subjects[form.semester] : [];

  const handleSubmit = () => {
    if (!form.dept || !form.year || !form.semester || !form.course) {
      Swal.fire("Warning", "Please fill all fields", "warning");
      return;
    }
    Swal.fire("Success", "Options submitted", "success");
    console.log(form);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-box">
          <h2>Choose the Options!!!</h2>

          <label>Department</label>
          <select name="dept" onChange={handleChange} value={form.dept}>
            <option value="">Select Department</option>
            <option value="IT">IT</option>
          </select>

          <label>Year</label>
          <select name="year" onChange={handleChange} value={form.year}>
            <option value="">Select Year</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
          </select>

          <label>Semester</label>
          <select name="semester" onChange={handleChange} value={form.semester}>
            <option value="">Select Semester</option>
            {availableSemesters.map(sem => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>

          <label>Course Name</label>
          <select name="course" onChange={handleChange} value={form.course}>
            <option value="">Select Course</option>
            {availableCourses.map((subj, index) => (
              <option key={index} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
