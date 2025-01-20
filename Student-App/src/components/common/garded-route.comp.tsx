import "./garded-route.css";
import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthContext';
import { Link } from 'react-router-dom';
import Role from "../../types/role";
interface IProps {
    children: React.ReactNode;
    role: Role[];
}
const Garded = (props: IProps) => {
    const {user} = useContext(AuthContext);

    if(!user) {
        return (
            <>
                <h1 style={{marginTop:"100px"}}>You have to be logged  to see this screen!</h1>
                <Link to='/login' className='login-gard'>Login here</Link>
            </>
        )
    }

    else if(!props.role.includes(user.role)) {
        return (
            <h1 style={{marginTop:"100px"}}>You do not have sufficient premissions to see this screen!</h1>
        )
    }

    return(
        props.children
    )

}

export default Garded;