import { useEffect, useState } from 'react';
import './App.css'
import Student from './components/student/student.comp'
import Form from './components/form/Form.comp'
import { IStudent } from './types/student'
const INTIAL_LIST: IStudent[] = [
  {
    name: "Moamen",
    age: 20,
    id: 120220426,
    coursesList: ["React", "Angular"],
    graduated: true,
    abssents: 0
  },
  {
    name: "Khaled",
    age: 21,
    id: 120220427,
    coursesList: ["React", "Angular", "Vue"],
    graduated: false,
    abssents: 0
  },
  {
    name: "Fawzy",
    age: 22,
    id: 120220428,
    coursesList: ["React", "Angular", "Next"],
    graduated: true,
    abssents: 0,
  },
  {
    name: "Ahmed",
    age: 23,
    id: 120220429,
    coursesList: ["React",  "JS"],
    graduated: true,
    abssents: 0,
  }
]; 

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const storeChangedData = (newData: IStudent[]) => {
    localStorage.setItem("students-list", JSON.stringify(newData));
  }
  useEffect(() => {
    const list: IStudent[] = JSON.parse(localStorage.getItem("students-list") || JSON.stringify(INTIAL_LIST));
    setStudents(list);
    const totalAbssents: number = list.reduce((prev, curr) => curr.abssents + prev , 0);
    setTotalAbsent(totalAbssents);
  }, [])

  useEffect(() => {
    if(students.length > 0) {
      storeChangedData(students)
    }
  }, [students])

  const showStudents = () => {
    setStudents(JSON.parse(localStorage.getItem("students-list") || JSON.stringify(INTIAL_LIST)));
  }
  const hideStudents = () => {
    setStudents([]);
  }
  const deleteStudent = (id: number) => {
    const newList = students.filter(std => std.id !== id);
    setStudents(newList);
  }

  const handleTotal = (change: number, id: number) => {
    const newList: IStudent[] = students.map(std => std.id == id ? {...std, abssents: (std.abssents + change)} : std);
    setStudents(newList) 
    setTotalAbsent(totalAbsent + change)
  }

  const addNewStudent = (std: IStudent) => {
    setStudents([std,...students])
  }
  return (
    <>
      <Form passStudent={addNewStudent}/>
      <button className= "show" onClick= {showStudents} >Show Students</button>
      <button className= "hide" onClick= {hideStudents} >Hide Students</button>
      <h2>Total Absents : {totalAbsent}</h2>
      {
        students.map( std => (
          <Student
            key={std.id} 
            abssents={std.abssents}
            name= {std.name}
            age={std.age}
            id={std.id}
            graduated={std.graduated}
            coursesList={std.coursesList} 
            sentAbsent={handleTotal}
            handleDelete={deleteStudent}
          />
        ))
      }
    </>
  )
}

export default App
