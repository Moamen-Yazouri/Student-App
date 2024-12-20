import { useState } from 'react';
import './App.css'
import Student from './components/student/student.comp'
import Form from './components/form/Form.comp'
import { IStudent } from './types/student'
const INTIAL_LIST : IStudent[] = [];
const studentsList: IStudent[] = [
  {
    name: "Moamen",
    age: 20,
    id: 120220426,
    coursesList: ["React", "Angular"],
    graduated: true
  },
  {
    name: "Khaled",
    age: 21,
    id: 120220427,
    coursesList: ["React", "Angular", "Vue"],
    graduated: false
  },
  {
    name: "Fawzy",
    age: 22,
    id: 120220428,
    coursesList: ["React", "Angular", "Next"],
    graduated: true
  },
  {
    name: "Ahmed",
    age: 23,
    id: 120220429,
    coursesList: ["React",  "JS"],
    graduated: true
  }
]; 

function App() {
  const [students, setStudents] = useState<IStudent[]>(INTIAL_LIST);
  const [totalAbsent, setTotalAbsent] = useState(0);

  const showStudents = () => {
    const students = [...studentsList];
    setStudents(students);
  }
  
  const hideStudents = () => {
    setStudents([]);
  }
  const handleTotal = (change: number) => {
    setTotalAbsent(totalAbsent + change)
  }
  return (
    <>
      <Form/>
      <button className= "show" onClick= {showStudents} >Show Students</button>
      <button className= "hide" onClick= {hideStudents} >Hide Students</button>
      <h2>Total Absents : {totalAbsent}</h2>
      {
        students.map( std => (
          <Student
            key={std.id} 
            name= {std.name}
            age={std.age}
            id={std.id}
            graduated={std.graduated}
            coursesList={std.coursesList} 
            sentAbsent={handleTotal}
          />
        ))
      }
    </>
  )
}

export default App
