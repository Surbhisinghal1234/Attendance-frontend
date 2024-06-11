import React,{useState,createContext} from 'react'
import StudentForm from './StudentForm'
import Faculty from './Faculty'
import FacultyList from './FacultyList'
import ShowStudents from './ShowStudents';
import "../index.css"
import "./attendance.css"
export const attendanceContext = createContext()
import { v4 as uuid } from 'uuid';


function Main() {
// faculty save
const [facultyList, setFacultyList] = useState([{ id: uuid(), name: ""}]);

  const [students,setStudents] = useState([{ id: "", name: "", aadharCard: "" }])

  const [faculty,setFaculty] = useState([""])


  return (
    <>
<attendanceContext.Provider value={{facultyList, setFacultyList,
students,setStudents, faculty,setFaculty
}}>
<StudentForm/>
<Faculty/>
 <FacultyList/>
<ShowStudents />
</attendanceContext.Provider>

    </>
  )
}

export default Main