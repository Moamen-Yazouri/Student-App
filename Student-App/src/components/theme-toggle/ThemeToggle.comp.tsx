import "./ThemeToggle.css"
import { useContext } from 'react'
import { themeContext } from '../../main';

const ThemeToggle = () => {
    const {theme, setTheme} = useContext(themeContext); 
    return (
        <div className="toggle">
            <span>Light Mode</span>
            <div className={`toggle-mode ${theme}`} onClick={() => {setTheme(theme === "light" ? 'dark' : 'light')}}></div>
            <span>Dark Mode</span>
        </div>
    )
}

export default ThemeToggle