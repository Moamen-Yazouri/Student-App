import { useEffect, useState } from 'react';
import { IStudent } from '../../types/student';
import CoursesList from '../courses-list/courses-list.comp';
import './student.css';
import { Trash } from '@phosphor-icons/react';

const Student = (props :Iprops) => {
    const [absent, setAbsent] = useState(props.abssents);
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
        props.sentAbsent(+1, props.id)
    }
    const removeAbsent = () => {
        if(absent > 0)
        setAbsent(absent - 1);
        props.sentAbsent(-1, props.id)
    }
    const resetAbsent = () => {
        if(absent > 0)
        setAbsent(0);
        props.sentAbsent(-absent, props.id)
    }
    return (
        <div className="student-wrapper">
            <h1>{props.name}</h1>
            <p>
                The age: {props.age}
                <br />
                ID: {props.id}
                <br/>
                isGraduated: {props.graduated ? "Yes" : "No"}
            </p>
            <button onClick= {addAbsent}>+</button>
            <button onClick= {removeAbsent}>-</button>
            <button onClick= {resetAbsent}>Reset</button>
            <p>Abbsents: <span style={absentColor}>{absent}</span></p>
            <Trash className='delete' size={32} weight="bold" color='red' onClick={() => props.handleDelete(props.id)}/>
            <CoursesList list= {props.coursesList}/>
        </div>
    )
} 

interface Iprops extends IStudent {
    sentAbsent: (change: number, id: number) => void;
    handleDelete: (id: number) => void;
};








export default Student;