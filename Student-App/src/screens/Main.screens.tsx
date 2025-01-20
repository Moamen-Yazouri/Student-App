import { useContext } from "react";
import Student from "../components/student/student.comp";
import useStudentManage from "../hooks/useStudentManage";
import { StateContext } from "../Providers/StateContext";
import FilterSearch from "../components/Filters/filter-search/filterSearch.comp";
import FilterGraduate from "../components/Filters/filter-graduated/filterGraduated.comp";
import FilterCourses from "../components/Filters/filter-courses/filterCourses.comp";
import FilterAbsents from "../components/Filters/filter-absents/filterAbsents.comp";
const Main = () => {
    const manager = useStudentManage();
    const {state} = useContext(StateContext);
    return (
        <>
            
            <button className= "show" onClick= {manager.showStudents} >Show Students</button>
            <button className= "hide" onClick= {manager.hideStudents} >Hide Students</button>
            <button className= "hide" onClick={manager.scrollLast} >Scroll Students</button>
            <div className="filters">
                <FilterSearch handleSearch={manager.handleSearch} params={manager.params}/>
                <FilterGraduate handleFilter={manager.handleFilter} params={manager.params}/>
                <FilterCourses coursesFilter={manager.coursesFilter} params={manager.params}/>
                <FilterAbsents 
                    filterAbsentsMax={manager.filterAbsentsMax} 
                    filterAbsentsMin={manager.filterAbsentsMin} 
                    params={manager.params}
                />
            </div>
            <h2>Total Absents : {state.totalAbs}</h2>
            <div className="students-container">
                {
                    manager.isShown && (
                        manager.filteredList.map( (std, index, arr) => (
                        <Student
                            ref= {index == arr.length - 1 ? manager.stdRef : null}
                            key={std.id} 
                            absents={std.absents}
                            name= {std.name}
                            age={std.age}
                            id={std.id}
                            graduated={std.graduated}
                            coursesList={std.coursesList} 
                            handleDelete={manager.deleteStudent}
                        />
                        ))
                    )
                }
            </div>
        </>
    )
}

export default Main;