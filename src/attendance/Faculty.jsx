import React, { useContext } from "react";
import { attendanceContext } from "./Main";
import { v4 as uuid } from "uuid";

function Faculty() {
  const { facultyList, setFacultyList } = useContext(attendanceContext);

  const handleInput = (index, value) => {
    const updatedFacultyList = [...facultyList];
    updatedFacultyList[index].name = value;
    setFacultyList(updatedFacultyList);
  };

  const handleAddFaculty = () => {
    const newFaculty = {
      id: uuid(),
      name: ""
    };
    setFacultyList([...facultyList, newFaculty]);
  };

  const handleSaveFaculty = () => {
    console.log("Saving faculty:", facultyList);
    fetch("http://localhost:3000/saveFaculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ facultyList })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data", data);
      })
      .catch(error => {
        console.error("Error", error);
      });
  };

  return (
    <div className="wrapper max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Faculty</h2>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4 ml-8">
          {facultyList.map((item, index) => (
            <div key={index} className="">
              <input
                className="border-gray-400 border-2 rounded px-3 py-1 w-[19rem]"
                type="text"
                placeholder="Add Faculty"
                value={item.name}
                onChange={e => handleInput(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleAddFaculty}
          className="bg-green-600 text-white mt-4  flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md"
        >
          Add Faculty
        </button>
      </div>

      <button
        onClick={handleSaveFaculty}
        className="bg-green-600 text-white mt-4  flex justify-center m-auto items-center py-2 px-4 text-sm font-medium rounded-md"
      >
        Save Faculty
      </button>
    </div>
  );
}

export default Faculty;

