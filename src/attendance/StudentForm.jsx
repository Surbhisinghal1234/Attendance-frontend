import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentForm({ studentSaved, updateData }) {
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [aadharCard, setAadharCard] = useState(""); 
  const [faculties, setFaculties] = useState([]);
  const [message, setMessage] = useState("");
  const backendUrl = import.meta.env.BACKEND_URL;
  const url_back = "http://localhost:3000"


  useEffect(() => {
    async function fetchFaculties() {
      try {
        const response = await axios.get(`${url_back}/getFaculty`);
        setFaculties(response.data);
      } catch (error) {
        console.log("Error fetching faculties:", error);
      }
    }
    fetchFaculties();
  }, [updateData]);  

  async function handleSubmit(e) {
    e.preventDefault();
    const studentData = { name, faculty, aadharCard }; 
    try {
      const response = await axios.post(`${url_back}/saveStudent`, studentData);
      if (response.status === 200) {
        console.log("Student Saved:", response.data);
        setName("");
        setFaculty("");
        setAadharCard("");
        setMessage("Student Saved Successfully");
         // update 
         studentSaved();
       
      } else {
        console.log("Failed to save student");
        setMessage("Failed to save student");
      }
    } catch (error) {
      console.log("Error saving student:", error);
      setMessage("Error saving student");
    }
  }

  return (
    <div className="wrapper max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Student</h1>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name:</label>
        <input 
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required  
          className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <div className="my-4">
          <label htmlFor="aadharCard">Aadhaar Card Number:</label>
          <input 
            type="text"
            id="aadharCard"
            value={aadharCard} 
            onChange={(e) => setAadharCard(e.target.value)}  
            required  
            className="mt-1 mb-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
          />
        </div>
        <label  className="block text-sm font-medium text-gray-700" htmlFor="faculty">Select faculty</label>
        <select
          id="faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          required 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
        >
          <option value="" disabled>Select faculty</option>
          {Array.isArray(faculties) && faculties.map((teacher) => (
            <option key={teacher._id} value={teacher.name}>{teacher.name}</option>
          ))}
          
        </select>
        <button className="bg-green-600 text-white mt-4  flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md" type="submit">Save Student</button>
      </form>
      { message && (
        <div className="mt-4 p-4 text-center text-green-500 font-bold text-xl rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}

export default StudentForm;

