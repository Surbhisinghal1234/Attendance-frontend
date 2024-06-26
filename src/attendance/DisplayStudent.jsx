import React, { useState, useEffect } from "react";
import axios from "axios";

function DisplayStudent() {
  const [faculty, setFaculty] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState({});
  const [messageSaved,setMessageSaved] = useState("")

  useEffect(() => {
    fetchFaculties();
  }, []);

  async function fetchFaculties() {
    try {
      const response = await axios.get("http://localhost:3000/getFaculty");
      if (response.status === 200) {
        console.log(response.data, "response.data");
        setFaculties(response.data);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  async function fetchStudents(faculty) {
    try {
      const response = await axios.get(
        `http://localhost:3000/getStudent?faculty=${faculty}`
      );
      if (response.status === 200) {
        console.log("Students fetched successfully", response.data);

        setStudents(response.data);
        // console.log(response.data.students, "students");

        const initialAttendance = {};
        response.data.map(std => {
          std.students.map(student => {
            initialAttendance[student.id] = { name: student.name, status: "A" };
          });
        });

        setAttendance(initialAttendance);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }


  async function handleDeleteStudent(id){
    try{
        const res = await axios.delete(`http://localhost:3000/deleteStudent/${id}` )

        if(res.data === "Student deleted"){
            console.log("student delete ")
            setMessage("Student Deleted Sucessfully")
            fetchFaculties();
        }
        else {
            console.log("failed", res.data)
        }
    }
    catch (error){
        console.log("error", error)
    }
  }

  return (
    <div className="wrapper max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Display Students</h1>
      <div className="mt-4">
       
        <select
          id="faculty"
          value={faculty}
          onChange={(e) => {
            setFaculty(e.target.value);
            fetchStudents(e.target.value);
          }}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
        >
          <option value="" disabled>
            Select faculty
          </option>
        
          {faculties.map((faculty, index) => {
            return faculty.facultyList.map((list, ind) => {
              return (
                <option key={ind} value={list.name}>
                  {list.name}
                </option>
              );
            });
          })}
        </select>
      </div>
    
      <div className="mt-6">
       
        {students.map((student) => {
          return student.students.map((item, ind) => {
            return <li key={item.id} className="text-gray-800 border-2 border-gray-200 px-2 py-1 rounded-sm">{item.name}
            
            <button
                    onClick={() => handleDeleteStudent(item.id)}
                    className="ml-4 px-3 py-1 border rounded-md bg-red-500 text-white"
                  >
                   Delete
                  </button>
            </li>;
          });
        })}
      </div>
    
      {message && (
        <div className="mt-4 p-4 text-center text-green-500 font-bold text-xl rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}

export default DisplayStudent;
