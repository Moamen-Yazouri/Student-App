import './App.css'
import Main from './screens/Main.screens';
import StudentDetails from './screens/StudentDetails.screens';
import About from './screens/About.screens';
import NotFound from './screens/NotFound.screens';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddStudent from './screens/Form.screen';
import useStudentManage from './hooks/useStudentManage';
function App() {
  const manager = useStudentManage();
  return (
    <>
    <h1>GSG React and Next JS Training</h1>
    <h2 className='main-heading'>Student App</h2>
        <nav>
          <Link to='/'>Home Page</Link>
          <Link to = '/form'>Add Student</Link>
          <Link to = '/about'>About Page</Link>
        </nav>
        <Routes>
          <Route 
            path="/" 
            element=
              {
                <Main
                  deleteStudent={manager.deleteStudent}
                  filteredList={manager.filteredList}
                  handleSearch={manager.handleSearch}
                  hideStudents={manager.hideStudents}
                  showStudents={manager.showStudents}
                  handleTotal={manager.handleTotal}
                  isShown={manager.isShown}
                  params={manager.params}
                  scrollLast={manager.scrollLast}
                  totalAbsent={manager.totalAbsent}
                  stdRef={manager.stdRef}
              />
            } 
          />
          <Route path="/form" element={<AddStudent onSubmit={manager.addNewStudent}/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/student/:id" element={<StudentDetails/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </>
  )
}

export default App;
