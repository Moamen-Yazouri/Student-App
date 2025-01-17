import React from "react";
import Student from "../components/student/student.comp";
import { IStudent } from "../types/student";
interface IProps {
    totalAbsent: number;
    params: URLSearchParams;
    isShown: boolean;
    filteredList: IStudent[];
    stdRef: React.RefObject<HTMLDivElement>;
    showStudents: () => void;
    hideStudents: () => void;
    scrollLast: () => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTotal: (change: number, id: number) => void;
    deleteStudent: (id: number) => void
    handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
    coursesFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
    filterAbsentsMin: (e: React.ChangeEvent<HTMLInputElement>) => void
    filterAbsentsMax: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const COURSES_LIIST = ["Angular", "React", "Vue", "Next", "HTML", "JS"]
const Main = (props: IProps) => {
    return (
        <>
            
            <button className= "show" onClick= {props.showStudents} >Show Students</button>
            <button className= "hide" onClick= {props.hideStudents} >Hide Students</button>
            <button className= "hide" onClick={props.scrollLast} >Scroll Students</button>
            <div className="filters">
                <div className="search">
                    <input 
                    type="text"
                    placeholder="Search by name" 
                    onChange={props.handleSearch} 
                    value={props.params.get('q') || ''
                    }/>
                </div>
                <div className="filter grad">
                <select value={props.params.get("graduated") || "All"} onChange={props.handleFilter}>
                    <option value="All">All</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Un-graduted">Un-graduated</option>
                </select>
                </div>
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
                <div className="filterAbsents">
                    <h3 className="absents">Absents:</h3>
                    <div className="selection">
                        <div className="min">
                            <label htmlFor="">From: <span>{Number(props.params.get('minAbs')) || 0}</span></label>
                            <input
                            value={Number(props.params.get('minAbs')) || 0}
                            type="range"
                            name="min"
                            id=""
                            min={0} 
                            max={5} 
                            step={1} 
                            onChange={props.filterAbsentsMin} 
                            />
                        </div>
                        <div className="max">
                        <label htmlFor="">To: <span>{Number(props.params.get('maxAbs')) || 0}</span></label>
                        <input 
                        value={Number(props.params.get('maxAbs')) || 0}
                        type="range" 
                        name="" 
                        id="max" 
                        min={0} 
                        max={15} 
                        step={1} 
                        onChange={props.filterAbsentsMax} 
                        />
                        </div>
                    </div>
                </div>
            </div>
            <h2>Total Absents : {props.totalAbsent}</h2>
            <div className="students-container">
                {
                    props.isShown && (
                        props.filteredList.map( (std, index, arr) => (
                        <Student
                            ref= {index == arr.length - 1 ? props.stdRef : null}
                            key={std.id} 
                            absents={std.absents}
                            name= {std.name}
                            age={std.age}
                            id={std.id}
                            graduated={std.graduated}
                            coursesList={std.coursesList} 
                            sentAbsent={props.handleTotal}
                            handleDelete={props.deleteStudent}
                        />
                        ))
                    )
                }
            </div>
        </>
    )
}

export default Main;