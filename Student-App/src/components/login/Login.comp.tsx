import './Login.css'
import { useContext } from "react"
import { AuthContext, AuthProvider } from "../../Providers/AuthContext"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const {login, user} = useContext(AuthContext);
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userName = e.currentTarget['userName'].value;
        const role = (e.currentTarget['role'] as any).value;
        if(userName.length > 3) {
            login({userName, role});
            navigate('/');
            console.log(user);
        }
    }
    return (
        <form className ={"login"} onSubmit={handleLogin}>
            <div className="username">
                <label htmlFor="username">UserName: </label>
                <input type="text" placeholder='Username' id="userName" />
            </div>
            <div className="role">
                <label htmlFor="role">Role: </label>
                <select name="role" id="role">
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                    <option value="gest">Gest</option>
                </select>
            </div>
            <input type="submit"  value={'Login'}/>
        </form>
    )
}

export default Login