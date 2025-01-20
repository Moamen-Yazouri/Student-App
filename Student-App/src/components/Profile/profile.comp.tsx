import './profile.css';
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const {user, logout} = useContext(AuthContext);
    const nav = useNavigate();

    const handleLogout = () => {
        logout();
        nav('/');
    }

    return (
        <div className="profile">
            <img src="imgs/avatar.jpg" alt="Avatar" />
            <span>{`Hi, ${user?.userName.toUpperCase()}`}</span>
            <span>{`${user?.role.toUpperCase()}`}</span>
            <Link to='' onClick={handleLogout}>Logout</Link>
        </div>
    )

}

export default Profile;