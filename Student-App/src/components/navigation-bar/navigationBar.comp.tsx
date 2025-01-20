import './navigationBar.css';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Providers/AuthContext';

const NavigationBar = () => {
    const {user} = useContext(AuthContext);
    return (
        <nav>
            {
                !user &&
                <NavLink to = '/login' className={({isActive}) =>(isActive ? "active" : "")}>Login</NavLink>
            } 
            <NavLink to='/'  className={({isActive}) =>(isActive ? "active" : "")}>Home Page</NavLink>
            <NavLink to = '/form' className={({isActive}) =>(isActive ? "active" : "")}>Add Student</NavLink>
            <NavLink to = '/about' className={({isActive}) =>(isActive ? "active" : "")}>About Page</NavLink>
        </nav>
    )
}

export default NavigationBar;