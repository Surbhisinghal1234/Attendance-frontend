import React, { useState } from "react";

function StudentForm() {
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const faculties = ["Rohit Jain", "Somesh Sharma"]

  const handleSubmit = async (event) => {
    event.preventDefault();

    const studentData = { name, faculty };

    try {
      const response = await fetch("https://attendance-backend-mz8q.onrender.com/saveStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        console.log({ Message: "Student saved" });
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // function handleSelectTeacher(e) {
  //   // setFaculty(faculty);
  // }

  return (
    <div className="container">
      <h1>Student Information</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="faculty">Select Teachers:</label>
        <select
          id="faculty"
          // value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        >
          {faculties.map((teacher, index) => (
            <option key={index} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
        <button type="submit">Save Student</button>
      </form>
    </div>
  );
}

export default StudentForm;
