import { useState } from 'react';
import { IStudent } from '../../types/student';
import CoursesList from '../courses-list/courses-list.comp';
import './student.css';

const Student = (props :Iprops) => {
    const [absent, setAbsent] = useState(0);
    const addAbsent = () => {
        setAbsent(absent + 1);
        props.sentAbsent(+1)
    }
    const removeAbsent = () => {
        if(absent > 0)
        setAbsent(absent - 1);
        props.sentAbsent(-1)
    }
    const resetAbsent = () => {
        if(absent > 0)
        setAbsent(0);
        props.sentAbsent(-absent)
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
            <p>{absent}</p>
            <CoursesList list= {props.coursesList}/>
        </div>
    )
} 

interface Iprops extends IStudent {
    sentAbsent: (change: number) => void;
};








export default Student;