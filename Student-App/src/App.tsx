import './App.css'
import Main from './screens/Main.screens';
import StudentDetails from './screens/StudentDetails.screens';
import About from './screens/About.screens';
import NotFound from './screens/NotFound.screens';
import AddStudent from './screens/AddStudent.screen';
import Login from './components/login/Login.comp';
import Profile from './components/Profile/profile.comp';
import {Route, Routes} from 'react-router-dom';
import { AuthContext} from './Providers/AuthContext';
import { useContext} from 'react';
import Garded from './components/common/garded-route.comp';
import Role from './types/role';
import ThemeToggle from './components/theme-toggle/ThemeToggle.comp';
import NavigationBar from './components/navigation-bar/navigationBar.comp';
function App() {
  const {user} = useContext(AuthContext);
  return (
    <>
        <ThemeToggle/>

        <div className="prof-head">
          <h1>GSG React and Next JS Training</h1>
          {
            user?.userName &&
            <Profile/>
          } 
        </div>

        <h2 className='main-heading'>Student App</h2>
        <NavigationBar/>

        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route 
            path="/" 
            element=
              {
                <Main/>
              } 
          />
          <Route path="/form" element={<Garded role={[Role.Admin]}><AddStudent/></Garded>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/student/:id" element={<Garded role={[Role.Admin]}><StudentDetails/></Garded>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </>
  )
}

export default App;
