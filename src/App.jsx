// import React from 'react'
// import axios from axios
// import ShowStudents from './ShowStudents';


// function App() {
//     const [faculties, setFaculties] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [selectedFaculty, setSelectedFaculty] = useState('');
  
//     useEffect(() => {
//       // Fetch faculties when the component mounts
//       const fetchFaculties = async () => {
//         try {
//           const response = await axios.get('http://localhost:3000/getFaculties');
//           setFaculties(response.data);
//         } catch (error) {
//           console.error('Error fetching faculties:', error);
//         }
//       };
//       fetchFaculties();
//     }, []);
  
//     const handleFacultyChange = (event) => {
//       setSelectedFaculty(event.target.value);
//     };
  
//     const fetchStudents = async () => {
//       if (!selectedFaculty) {
//         alert('Please select a faculty');
//         return;
//       }
  
//       try {
//         const response = await axios.get(`http://localhost:3000/getStudent/${selectedFaculty}`);
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//         setStudents([]);
//       }
//     };

//   return (
//     <div>
//       <h1>Select Faculty to View Students</h1>
//       <div>
//         <label htmlFor="facultySelect">Select Faculty</label>
//         <select id="facultySelect" value={selectedFaculty} onChange={handleFacultyChange}>
//           <option value="">--Select Faculty--</option>
//           {faculties.map(faculty => (
//             <option key={faculty._id} value={faculty._id}>
//               {faculty.name}
//             </option>
//           ))}
//         </select>
//         <button onClick={fetchStudents}>Get Students</button>
//       </div>
//       <div id="studentList">
//         {students.length > 0 ? (
//           <ul>
//             {students.map(student => (
//               <li key={student._id}>{student.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No students found for this faculty.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default App;