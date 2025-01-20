import './filterCourses.css'
import React from 'react'
interface IProps {
    params: URLSearchParams,
    coursesFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const FilterCourses = (props: IProps) => {
    const COURSES_LIIST = ["Angular", "React", "Vue", "Next", "HTML", "JS"];
    return (
        <div className="filter courses">
            {
                COURSES_LIIST.map(c => (
                    <div key={c} className="course" >
                        <input type="checkbox"
                        id={c}
                        value={c}
                        onChange={props.coursesFilter}
                        checked={props.params.getAll('courses').includes(c) || false}
                        />
                        <label htmlFor="">{c}</label>
                    </div>
                ))
            }
        </div>
    )
}

export default FilterCourses;