import { useState } from "react";
import "./Form.css";
import { IStudent } from "../../types/student";
const Form = () =>{
    const [student, setStudent] = useState<IStudent>({name: "", age: 0, graduated: false, id: 0, coursesList: []})
    const handleChange = (filed: string, value: any)  => {
        setStudent({...student, [filed]: value})
    }
    return (
        <div className="container">
            <div>
                <label htmlFor="name">Student Name: </label>
                <input type="text"
                id="name"
                placeholder="Enter The name"
                onChange={e => handleChange("name", e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="age">Student age: </label>
                <input 
                type="number"
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
                id="graduated"
                onChange={e => handleChange("graduated", e.target.checked)}
                />
            </div>
        </div>
    )
}
export default Form;