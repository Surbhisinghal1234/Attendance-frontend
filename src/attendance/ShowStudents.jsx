import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowStudents({ updateData }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [messageSaved, setMessageSaved] = useState("");
  const backendUrl = import.meta.env.BACKEND_URL;
  const url_back = "http://localhost:3000"



  async function fetchFaculties() {
    try {
      const response = await axios.get(`${url_back}/getFaculty`);
      if (response.status === 200) {
        setTeachers(response.data);
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("error");
    }
  }

  async function fetchStudents(faculty) {
    try {
      const response = await axios.get(`${url_back}/getStudent?faculty=${faculty}`);
      if (response.status === 200) {
        setStudents(response.data);
     
        const initialAttendance = {};
        response.data.forEach(student => {
          initialAttendance[student._id] = { name: student.name, status: "A" };
        });
        setAttendance(initialAttendance);
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("error");
    }
  }

  useEffect(() => {
    fetchFaculties();
  }, [updateData]);

  useEffect(() => {
    if (selectedFaculty) {
      fetchStudents(selectedFaculty);
    }
  }, [selectedFaculty]);

  function toggleAttendance(studentId) {
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [studentId]: {
        ...prevAttendance[studentId],
        status: prevAttendance[studentId].status === "A" ? "P" : "A"
      }
    }));
  }

  // post 
  async function submitAttendance() {
    try {
      const response = await axios.post(`${url_back}/saveAttendance`, {
        faculty: selectedFaculty,
        attendance: attendance
      });
      if (response.status === 200) {
        console.log("Attendance submitted successfully");
        console.log(response, "response");
        setMessageSaved("Attendance submitted successfully");
      } else {
        console.log("failed");
        setMessageSaved("Failed to submit attendance");
      }
    } catch (error) {
      console.error("error");
      setMessageSaved("Error submitting attendance");
    }
  }

  return (
    <>
      <div className="wrapper mx-auto bg-white rounded-lg max-w-lg p-6 my-[3rem]">
        <label className="block text-sm font-medium text-gray-700" htmlFor="faculty">
          Select faculty
        </label>
        <select
          id="faculty"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
        >
          <option value="" disabled>
            Select faculty
          </option>
          {Array.isArray(teachers) && teachers.map((teacher) => (
            <option key={teacher._id} value={teacher.name}>
              {teacher.name}
            </option>
          ))}
        </select>

        {students.length > 0 && (
          <div className="students-list">
            <ul>
              {students.map((student) => (
                <li key={student._id} className="border border-rounded flex justify-between items-center p-2">
                  {student.name}
                  <button
                    onClick={() => toggleAttendance(student._id)}
                    className="ml-4 px-3 py-1 border rounded-md bg-gray-200"
                  >
                    {attendance[student._id].status}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {students.length > 0 && (
          <button
            onClick={submitAttendance}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Submit Attendance
          </button>
        )}
        {messageSaved && (
          <div className="mt-4 text-center">
            <p className=" text-green-700 text-xl font-bold">{messageSaved}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowStudents;



