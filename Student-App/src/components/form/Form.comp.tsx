import { useState } from "react";
import "./Form.css";
import { IStudent } from "../../types/student";
import AddCourses from '../add-courses-list/Add-courses-list.tsx';
interface IProps {
    passStudent: (student: IStudent) => void
}
const Form = (props: IProps) =>{
    const INTIAL_STUDENT = {name: "", age: 0, graduated: false, id: 0, coursesList: []};
    const [student, setStudent] = useState<IStudent>(INTIAL_STUDENT);

    const handleChange = (filed: string, value: any)  => {
        setStudent({...student, [filed]: value})
    }
    const addCourses = (courses: string[]) => {
        setStudent({...student, coursesList: courses})
    }
    const handleSubmitting = () => {
        const newStudent = {...student, id: Date.now()}
        props.passStudent(newStudent);
        clearinputs();
    } 
    const clearinputs = () => {
        setStudent(INTIAL_STUDENT);
    }
    return (
        <div className="container">
            <div>
                <label htmlFor="name">Student Name: </label>
                <input
                type="text"
                value={student.name}
                id="name"
                placeholder="Enter The name"
                onChange={e => handleChange("name", e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="age">Student age: </label>
                <input 
                type="number"
                value={student.age}
                id="age"
                min={18} 
                max={40}
                onChange={e => handleChange("age", Number(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="graduated">Is Graduated: </label>
                <input
                type="checkbox"
                checked={student.graduated}
                id="graduated"
                onChange={e => handleChange("graduated", e.target.checked)}
                />
            </div>
            <AddCourses passList={addCourses}/>
            <button onClick={handleSubmitting}>Add Student</button>
            <button onClick={clearinputs}>Reset</button>
        </div>
    )
}
export default Form;