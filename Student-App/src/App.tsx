import { useState } from 'react';
import './App.css'
import Main from './screens/Main/Main.screens';
import About from './screens/About/About.screens';
function App() {
  const screen = window.location.pathname;
  return (
    <>
      <nav>
        <a href='/'>Home</a>
        <a href = '/about'>About</a>
      </nav>
      {
        screen === "/" ?
          <Main/>
        : 
        screen === '/about' ?
          <About/>
          
          :<>
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
