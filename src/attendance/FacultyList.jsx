import React, { useState, useEffect } from "react";
import axios from "axios";

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [selectedFacultyIds, setSelectedFacultyIds] = useState([]);
  const [message, setMessage] = useState("");
  const backendUrl = "http://localhost:3000";

  async function fetchFaculties() {
    try {
      const response = await axios.get(`${backendUrl}/getFaculty`);
      if (response.status === 200) {
        console.log(response.data);
        setFaculties(response.data);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    fetchFaculties();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`${backendUrl}/deleteFaculty/${id}`);
      if (response.data === "Faculty Deleted") {
        console.log("Faculty deleted");
        setMessage("Faculty deleted successfully");
        fetchFaculties();
      } else {
        console.log("failed", response.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  }

  async function handleDeleteMany() {
    try {
      const response = await axios.delete("http://localhost:3000/deleteFacultyMany", {
        data: { ids: selectedFacultyIds },
      });
      if (response.data === "Faculty Deleted") {
        console.log("Faculty deleted");
        setMessage("Faculty deleted successfully!");
        setSelectedFacultyIds([]);
        fetchFaculties();
      } else {
        console.log("Failed to delete faculty:", response.data);
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  }

  function handleCheckboxChange(id) {
    if (selectedFacultyIds.includes(id)) {
      setSelectedFacultyIds(selectedFacultyIds.filter((item) => item !== id));
    } else {
      setSelectedFacultyIds([...selectedFacultyIds, id]);
    }
  }

  return (
    <div className="wrapper max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Fetch Faculty List
      </h1>

      <ul className="flex flex-col gap-[2rem]">
        {faculties.map((faculty, index) => {
          return faculty.facultyList.map((list, ind) => {
            return (
              <li className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center">
                  <span>{list.name}</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={selectedFacultyIds.includes(list.id)}
                    onChange={() => handleCheckboxChange(list.id)}
                    className="mr-2"
                  />
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="bg-red-500 text-white rounded-md px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          });
        })}
      </ul>
      {selectedFacultyIds.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleDeleteMany}
            className="bg-red-500 text-white rounded-md px-4 py-2 mt-4"
          >
            Multiple Delete
          </button>
        </div>
      )}
      {message && (
        <div className="mb-4 p-4 text-center text-green-500 font-bold text-xl rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}

export default FacultyList;
