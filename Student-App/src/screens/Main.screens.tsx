import Form from "../components/form/Form.comp";
import Student from "../components/student/student.comp";
import Time from "../components/time/time";
import useStudentManage from "../hooks/useStudentManage";

const Main = () => {
    const studentsManager = useStudentManage();

    return (
        <>
            <Time date={studentsManager.date} stopTime={studentsManager.stopTime}/>
            <Form passStudent={studentsManager.addNewStudent}/>
            <button className= "show" onClick= {studentsManager.showStudents} >Show Students</button>
            <button className= "hide" onClick= {studentsManager.hideStudents} >Hide Students</button>
            <button className= "hide" onClick={studentsManager.scrollLast} >Scroll Students</button>
            <h2>Total Absents : {studentsManager.totalAbsent}</h2>
            <div className="search">
                <input 
                type="text"
                placeholder="Search by name" 
                onChange={studentsManager.handleSearch} 
                value={studentsManager.params.get('q') || ''
                }/>
            </div>
            {
                studentsManager.isShown && (
                    studentsManager.filteredList.map( (std, index, arr) => (
                    <Student
                        ref= {index == arr.length - 1 ? studentsManager.stdRef : null}
                        key={std.id} 
                        absents={std.absents}
                        name= {std.name}
                        age={std.age}
                        id={std.id}
                        graduated={std.graduated}
                        coursesList={std.coursesList} 
                        sentAbsent={studentsManager.handleTotal}
                        handleDelete={studentsManager.deleteStudent}
                    />
                    ))
                )
            }
        </>
    )
}

export default Main;