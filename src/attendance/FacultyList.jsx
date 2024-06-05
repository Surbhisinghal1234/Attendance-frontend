
import React, { useState, useEffect } from "react";
import axios from "axios";

function FacultyList() {
  const [faculties, setFaculties] = useState([]);

   async function fetchFaculties() {
      try {
        const response = await axios.get("https://attendance-backend-mz8q.onrender.com/getFaculty");
        console.log(response); 
        if (response.status === 200) {
          setFaculties(response.data);
        } else {
          console.log("failed"); 
        }
      } catch (error) {
        console.error("error"); 
      }
    };
    useEffect(()=>{
        fetchFaculties()
    },[])
   

  async function handleDelete(id){
    try {
      const response = await axios.delete(`https://attendance-backend-mz8q.onrender.com/deleteFaculty/${id}`);
    //   console.log(response); 
      if (response.data === "Faculty Deleted") {
        console.log({Message:"Faculty deleted"});
        
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <div className="wrapper">
      <h1> Fetch Faculty List</h1>
      <ul>
        {faculties.map((faculty) => (
          <li key={faculty._id}>
            {faculty.name} 
            <button onClick={() => handleDelete(faculty._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyList;
