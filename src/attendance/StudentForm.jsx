import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentForm() {
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    async function fetchFaculties(){
      try {
        const response = await axios.get("https://attendance-backend-mz8q.onrender.com/getFaculty");
        setFaculties(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchFaculties();
  }, []);  

  async function handleSubmit (e) {
    e.preventDefault();
    const studentData = { name, faculty };
    try {
      const response = await axios.post("https://attendance-backend-mz8q.onrender.com/saveStudent", studentData);
      if (response.status === 200) {
        console.log({Message:"Student Saved"});
        setName("");
        
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="wrapper">
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="faculty">Select faculty</label>
        <select
          id="faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required
        >
          <option value="" disabled>Select faculty</option>
          {faculties.map((teacher) => (
            <option key={teacher._id} value={teacher.name}>{teacher.name}</option>
          ))}
        </select>
        <button type="submit">Save Student</button>
      </form>
    </div>
  );
}

export default StudentForm;
