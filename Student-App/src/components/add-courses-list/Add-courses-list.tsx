import { useState } from "react";
import "./add-courses-list.css";
interface IProp {
    passList: (list: string[]) => void
}
const AddCourses = (props: IProp) => {
    const [courses, setCourses] = useState<string[]>([]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault()
        const newCourse: string = event.currentTarget["courseName"].value;
        const newList = [...courses, newCourse]
        setCourses(newList)
        props.passList(newList);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="CourseName">Course Name: </label>
            <input placeholder="Enter Course Name" type="text" name="cName" id="courseName"/>
            <div>
            <input type="submit" value="Add Course"/>
            <ul>              
                {
                courses.map((course, index) => <li key={course + index}>{course}</li>)
                }
            </ul>
            </div>
        </form>
    )
}
export default AddCourses