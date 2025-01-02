import { useState } from "react";
import "./Form.css";
import { IStudent } from "../../types/student";
import AddCourses from '../add-courses-list/Add-courses-list.tsx';
import useForm from "../../hooks/useForm.ts";
interface IProps {
    passStudent: (student: IStudent) => void
}
const Form = (props: IProps) =>{
    const INTIAL_STUDENT = {name: "", age: 0, graduated: false, id: 0, coursesList: [], abssents: 0};
    const [isOpen, setOpen] = useState<boolean>(false);
    const {
        handleChange,
        addCourses,
        handleSubmitting,
        clearinputs,
        errors,
        student
    } = useForm({passStudent: props.passStudent}, INTIAL_STUDENT);
    return (
    
        <div className={`container ${isOpen ? 'open' : 'close'}`}>
            <div className="form">
            <button className={"form-btn"} onClick={() => setOpen(!isOpen)}>
                {isOpen ? <span> &and; Close</span> : <span>&or; Open </span>}
                Add Form
            </button>
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
            <AddCourses value={student.coursesList} passList={addCourses}/>
            {
                Boolean(errors.length) && (
                <div className="errors">
                    <h4>You have The Following Errors</h4>
                    {
                        errors.map (error => <p key={error}>{error}</p>)
                    }
                </div>
                )
            }    
            <button onClick={handleSubmitting}>Add Student</button>
            <button onClick={clearinputs}>Reset</button>
            </div>
        </div>
        
    )
}
export default Form;