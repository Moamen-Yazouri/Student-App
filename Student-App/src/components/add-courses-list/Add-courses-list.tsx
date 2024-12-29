import { useState } from "react";
import "./add-courses-list.css";
interface IProp {
    passList: (list: string[]) => void
    value: string[];
}
const AddCourses = (props: IProp) => {
    const [courses, setCourses] = useState<string[]>(props.value);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault()
        const newCourse: string = event.currentTarget["cName"].value;
        const newlist = [newCourse, ...courses];
        setCourses(newlist)
        
        props.passList(newlist);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="CourseName">Course Name: </label>
            <input placeholder="Enter Course Name" required type="text" name="cName" id="courseName"/>
            <div>
            <button className="add-course">Add Course</button>
            <ul>              
                {
                courses.map((course) => <li>{course}</li>)
                }
            </ul>
            </div>
        </form>
    )
}
export default AddCourses