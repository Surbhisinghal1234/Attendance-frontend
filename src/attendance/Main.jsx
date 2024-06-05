import React,{useState} from 'react'
import StudentForm from './StudentForm'
import Faculty from './Faculty'
import FacultyList from './FacultyList'
import '../index.css';
import "./attendance.css"



function Main() {
  return (
    <>
     <StudentForm/>
     <Faculty/>
     <FacultyList/>
    
    </>
  )
}

export default Main