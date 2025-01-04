import './App.css'
import Student from './components/student/student.comp'
import Form from './components/form/Form.comp'
import useStudentManage from './hooks/useStudentManage';
import Time from './components/time/time';
function App() {

  const studentsManager = useStudentManage();

  return (
    <>
      <Time date={studentsManager.date} stopTime={studentsManager.stopTime}/>
      <Form passStudent={studentsManager.addNewStudent}/>
      <button className= "show" onClick= {studentsManager.showStudents} >Show Students</button>
      <button className= "hide" onClick= {studentsManager.hideStudents} >Hide Students</button>
      <button className= "hide" onClick={studentsManager.scrollLast} >Scroll Students</button>
      <h2>Total Absents : {studentsManager.totalAbsent}</h2>
      {
        studentsManager.students.map( (std, index, arr) => (
          <Student
            ref= {index == arr.length - 1 ? studentsManager.stdRef : null}
            key={std.id} 
            abssents={std.abssents}
            name= {std.name}
            age={std.age}
            id={std.id}
            graduated={std.graduated}
            coursesList={std.coursesList} 
            sentAbsent={studentsManager.handleTotal}
            handleDelete={studentsManager.deleteStudent}
          />
        ))
      }
    </>
  )
}

export default App;
