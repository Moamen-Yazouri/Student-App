import { forwardRef, useEffect, useState } from 'react';
import { IStudent } from '../../types/student';
import CoursesList from '../courses-list/courses-list.comp';
import './student.css';
import { Trash } from '@phosphor-icons/react';
import { Link } from 'react-router';
import Absents from '../Absents.comp.tsx/Absents';
interface IProps extends IStudent {
    handleDelete: (id: number) => void;
};

const Student = forwardRef<HTMLDivElement, IProps>((props, ref) => {

    
    return (
        <div ref={ref} className="student-wrapper">
            <h1><Link to ={`/student/${props.id}`} className='std-details'>{props.name}</Link></h1>
            <p>
                The age: {props.age}
                <br />
                ID: {props.id}
                <br/>
                isGraduated: <span className={`${props.graduated ? "yes" : "no"}  `}>{props.graduated ? "Yes" : "No"}</span>
            </p>

            <Absents id={props.id} initialAbs={props.absents}/> 
            

            <Trash className='delete' size={32} weight="bold" color='red' onClick={() => props.handleDelete(props.id)}/>
            <CoursesList list= {props.coursesList}/>
        </div>
        )}
    )









export default Student;