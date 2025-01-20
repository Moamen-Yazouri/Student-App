import { useContext, useEffect, useState } from 'react';
import './Absents.css';
import { AuthContext } from '../../Providers/AuthContext';
import { StateContext } from '../../Providers/StateContext';
interface IAbsents {
    id: number;
    initialAbs: number;
}

const Absents = (props: IAbsents) => {
    const {user} = useContext(AuthContext);
    const [absent, setAbsent] = useState(props.initialAbs);
    const {dispatch} = useContext(StateContext);
    

    const [absentColor, setAbsentColor] = useState<Object>({});
    useEffect(() => {
        if(absent >= 5 && absent < 10) {
            setAbsentColor({color: "#EB5B00"});
        }
        else if(absent >= 10) {
            setAbsentColor({color: "#FF0000"});
        }
        else {
            setAbsentColor({});
        }
    }, [absent])

    const addAbsent = () => {
        setAbsent(absent + 1);
        dispatch({type: 'ADD_ABSENT', payload: {change:+1, id: props.id}});
    }

    const removeAbsent = () => {
        if(absent > 0)
        setAbsent(absent - 1);
        dispatch({type: 'ADD_ABSENT', payload: {change:-1, id: props.id}});
    }

    const resetAbsent = () => {
        if(absent > 0)
        setAbsent(0);
        dispatch({type: 'ADD_ABSENT', payload: {change: -absent, id: props.id}});
    }
    return (
        <div className="absents">
            {
                user ? <>
                <button onClick= {addAbsent}>+</button>
                <button onClick= {removeAbsent}>-</button>
                <button onClick= {resetAbsent}>Reset</button> 
                </>
                : <div></div>
            }
            <p>Absents: <span style={absentColor}>{absent}</span></p>
        </div>
    )
}

export default Absents;