import { useState } from 'react';
import './App.css'
import Main from './screens/Main/Main.screens';
import About from './screens/About/About.screens';
function App() {
  const [screen, setSecreen] = useState('Main');
  return (
    <>
      <nav>
        <button onClick={() => setSecreen('Main')}>Home</button>
        <button onClick={() => setSecreen('About')}>About</button>
      </nav>
      {
        screen === "Main" ?
          <Main/>
        : 
        screen === 'About' ?
          <About/>
          : 
          <>
            <h2>Cannot Found The Page 404</h2>
            <p>
              We Cannot Find This Page.
            </p>
          </>
      }
    </>
  )
}

export default App;
