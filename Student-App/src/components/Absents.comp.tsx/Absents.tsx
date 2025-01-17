import { useContext } from 'react';
import './Absents.css';
import { AuthContext } from '../../context/AuthContext';
interface IAbsents {
    removeAbsent: () => void;
    resetAbsent: () => void;
    addAbsent: () => void;
    absent: number;
    absentColor: Object
}

const Absents = (props: IAbsents) => {
    const {user} = useContext(AuthContext);
    return (
        <div className="absents">
            {
                user ? <>
                <button onClick= {props.addAbsent}>+</button>
                <button onClick= {props.removeAbsent}>-</button>
                <button onClick= {props.resetAbsent}>Reset</button> 
                </>
                : <div></div>
            }
            <p>Absents: <span style={props.absentColor}>{props.absent}</span></p>
        </div>
    )
}

export default Absents;