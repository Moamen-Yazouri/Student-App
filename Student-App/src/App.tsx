import { useEffect, useState } from 'react';
import './App.css'
import Student from './components/student/student.comp'
import Form from './components/form/Form.comp'
import { IStudent } from './types/student'
import { STUDENTS_DATA } from './assets/STUDENTS_DATA';
function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const storeChangedData = (newData: IStudent[]) => {
    localStorage.setItem("students-list", JSON.stringify(newData));
  }
  useEffect(() => {
    const list: IStudent[] = JSON.parse(localStorage.getItem("students-list") || JSON.stringify(STUDENTS_DATA));
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
    setStudents(JSON.parse(localStorage.getItem("students-list") || JSON.stringify(STUDENTS_DATA)));
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
