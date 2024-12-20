import "./courses-list.css"
interface Iprops {
    list: string[];
}

const CoursesList = (props: Iprops) => {
    return (
        <ul>
            {
                props.list.map( (prop, index) => (<li key={index + prop}>{prop}</li>) )
            }
        </ul>
    )
}
export default CoursesList;