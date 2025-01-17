import { forwardRef, useEffect, useState } from 'react';
import { IStudent } from '../../types/student';
import CoursesList from '../courses-list/courses-list.comp';
import './student.css';
import { Trash } from '@phosphor-icons/react';
import { Link } from 'react-router';
import Absents from '../Absents.comp.tsx/Absents';
interface IProps extends IStudent {
    sentAbsent: (absent:{change: number, id: number}) => void;
    handleDelete: (id: number) => void;
};

const Student = forwardRef<HTMLDivElement, IProps>((props, ref) => {
    const [absent, setAbsent] = useState(props.absents);
    
    

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
        props.sentAbsent({change:+1, id: props.id})
    }

    const removeAbsent = () => {
        if(absent > 0)
        setAbsent(absent - 1);
        props.sentAbsent({change:-1, id:props.id})
    }

    const resetAbsent = () => {
        if(absent > 0)
        setAbsent(0);
        props.sentAbsent({change: -absent, id: props.id})
    }

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

            <Absents 
            absent={absent} 
            absentColor={absentColor} 
            addAbsent={addAbsent} 
            removeAbsent={removeAbsent} 
            resetAbsent={resetAbsent}
            />

            <Trash className='delete' size={32} weight="bold" color='red' onClick={() => props.handleDelete(props.id)}/>
            <CoursesList list= {props.coursesList}/>
        </div>
        )}
    )









export default Student;