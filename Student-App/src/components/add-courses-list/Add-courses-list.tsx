import { useEffect, useRef, useState } from "react";
import "./add-courses-list.css";
import { Trash } from "@phosphor-icons/react";
interface IProp {
    passList: (list: string[]) => void
    value: string[];
}
const AddCourses = (props: IProp) => {
    const [courses, setCourses] = useState<string[]>(props.value);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        setCourses(props.value);    
    }, [props.value])
    const deleteCourse = (ind: number) => {
        const updatedCourses = courses.filter((_, index) => index !== ind);
        setCourses(updatedCourses);
        props.passList(updatedCourses); 
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault()
        const newCourse: string = event.currentTarget["cName"].value;
        const newlist = [newCourse, ...courses];
        setCourses(newlist);
        props.passList(newlist);
        if(inputRef.current) {
            inputRef.current.value = "";
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="CourseName">Course Name: </label>
            <input
            ref={inputRef}
            placeholder="Enter Course Name"
            required 
            type="text"
            name="cName"
            id="courseName"
            />
            <div>
            <button className="add-course">Add Course</button>
            <ul>              
                {
                    courses.map((course, index) => (
                            <li className="form-list" key={index}>
                                {course} <Trash className='delete-course' size={20} weight="bold" color='red' onClick={() => deleteCourse(index)}/>
                            </li>
                    ))
                }
            </ul>
            </div>
        </form>
    )
}
export default AddCourses