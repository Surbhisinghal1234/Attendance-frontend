import React, { useState } from "react";
import axios from "axios";

function Faculty() {
  const [name, setName] = useState("");
 
  async function handleSubmit(e) {
    e.preventDefault();
    const facultyData = { name };
    try {
      const response = await axios.post("https://attendance-backend-mz8q.onrender.com/saveFaculty", facultyData);
      if (response.status === 200) {
       
        console.log({Message:"Faculty Saved"});
        setName("");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <div className="wrapper">
      <h1>Add Faculty</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Save Faculty</button>
      </form>
     
    </div>
  );
}

export default Faculty;

