import './App.css'
import Main from './screens/Main.screens';
import About from './screens/About.screens';
import NotFound from './screens/NotFound.screens';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <h1>GSG React and Next JS Training</h1>
      <>
        <nav>
          <Link to='/'>Home Page</Link>
          <Link to = '/about'>About Page</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App;
