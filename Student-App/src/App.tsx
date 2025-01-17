import './App.css'
import Main from './screens/Main.screens';
import StudentDetails from './screens/StudentDetails.screens';
import About from './screens/About.screens';
import NotFound from './screens/NotFound.screens';
import {NavLink, Route, Routes} from 'react-router-dom';
import AddStudent from './screens/Form.screen';
import useStudentManage from './hooks/useStudentManage';
import { AuthContext} from './context/AuthContext';
import Login from './components/login/Login.comp';
import { useContext, useEffect} from 'react';
import Profile from './components/Profile/profile.comp';
import {themeContext} from './main';
import useLocalStorage from './hooks/useLocalStorage';
function App() {
  const manager = useStudentManage();
  const {user, login} = useContext(AuthContext);
  const {theme, setTheme} = useContext(themeContext); 
  const {storedData} = useLocalStorage(user, 'user-info');

  useEffect (() => {
    if(storedData) {
      login(storedData)
    }
  }, [storedData])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <>
      <div className="toggle">
        <span>Light Mode</span>
        <div className={`toggle-mode ${theme}`} onClick={() => {setTheme(theme === "light" ? 'dark' : 'light')}}></div>
        <span>Dark Mode</span>
      </div>
      <div className="prof-head">
        <h1>GSG React and Next JS Training</h1>
        {
          user?.userName &&
          <Profile/>
        } 
      </div>
      <h2 className='main-heading'>Student App</h2>
          <nav>
            {
              !user &&
              <NavLink to = '/login' className={({isActive}) =>(isActive ? "active" : "")}>Login</NavLink>
            } 
            <NavLink to='/'  className={({isActive}) =>(isActive ? "active" : "")}>Home Page</NavLink>
            <NavLink to = '/form' className={({isActive}) =>(isActive ? "active" : "")}>Add Student</NavLink>
            <NavLink to = '/about' className={({isActive}) =>(isActive ? "active" : "")}>About Page</NavLink>
            
          </nav>
          <Routes>
            <Route path='/login' element={<Login/>}/>
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
                    handleTotal={manager.handleAbsents}
                    isShown={manager.isShown}
                    params={manager.params}
                    scrollLast={manager.scrollLast}
                    totalAbsent={manager.state.totalAbs}
                    stdRef={manager.stdRef}
                    handleFilter={manager.handleFilter}
                    coursesFilter={manager.coursesFilter}
                    filterAbsentsMax={manager.filterAbsentsMax}
                    filterAbsentsMin={manager.filterAbsentsMin}
                />
              } 
            />
            <Route path="/form" element={<AddStudent onSubmit={manager.addNewStudent} message={manager.message}/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/student/:id" element={<StudentDetails/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </>
  )
}

export default App;
