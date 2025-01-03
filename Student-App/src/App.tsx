import './App.css'
import Student from './components/student/student.comp'
import Form from './components/form/Form.comp'
import useStudentManage from './hooks/useStudentManage';
function App() {

  const {
    showStudents,
    hideStudents,
    deleteStudent,
    handleTotal,
    addNewStudent,
    totalAbsent,
    students
  } = useStudentManage();

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

export default App;
