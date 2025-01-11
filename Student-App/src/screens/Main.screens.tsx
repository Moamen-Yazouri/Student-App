import Form from "../components/form/Form.comp";
import Student from "../components/student/student.comp";
import useStudentManage from "../hooks/useStudentManage";
import { IStudent } from "../types/student";
interface IProps {
    showStudents: () => void;
    hideStudents: () => void;
    scrollLast: () => void;
    totalAbsent: number;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    params: URLSearchParams;
    isShown: boolean;
    filteredList: IStudent[];
    stdRef: React.RefObject<HTMLDivElement>;
    handleTotal: (change: number, id: number) => void;
    deleteStudent: (id: number) => void
}
const Main = (props: IProps) => {
    return (
        <>
            
            <button className= "show" onClick= {props.showStudents} >Show Students</button>
            <button className= "hide" onClick= {props.hideStudents} >Hide Students</button>
            <button className= "hide" onClick={props.scrollLast} >Scroll Students</button>
            <h2>Total Absents : {props.totalAbsent}</h2>
            <div className="search">
                <label>Student Name: </label>
                <input 
                type="text"
                placeholder="Search by name" 
                onChange={props.handleSearch} 
                value={props.params.get('q') || ''
                }/>
            </div>
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