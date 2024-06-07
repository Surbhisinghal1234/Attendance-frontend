import React,{useState} from 'react'
import StudentForm from './StudentForm'
import Faculty from './Faculty'
import FacultyList from './FacultyList'
import ShowStudents from './ShowStudents';
import "../index.css"
import "./attendance.css"


function Main() {

    const [updateData, setUpdateData] = useState(false);

    const handleUpdate = () => {
      setUpdateData(!updateData);
    };
  return (
    <>
    
      <StudentForm studentSaved={handleUpdate} updateData={updateData} />
      <Faculty facultySaved={handleUpdate} />

      <FacultyList updateData={updateData} facultyUpdated={handleUpdate} />
      <ShowStudents updateData={updateData}/>
    </>
  )
}

export default Main