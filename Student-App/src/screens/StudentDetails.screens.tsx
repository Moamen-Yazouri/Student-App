import Student  from '../components/student/student.comp'
import  { useEffect, useState } from 'react'
import useStudentManage from '../hooks/useStudentManage'
import { useNavigate, useParams } from 'react-router-dom'
import { IStudent } from '../types/student'
import retrieveData from '../utils/getFromLocalStorage'
const StudentDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const[currentStd, setCurrentStd] = useState<IStudent>()
    const manager = useStudentManage();
    const students: IStudent[] = retrieveData('students-list');
    useEffect(() => {
        if(students) {
            const std = students.find(item => item.id == Number(id)); 
            if(std) {
                setCurrentStd(std)
            }
            else {
                navigate('/404');
            }
        }
    }, [id]);

    return (
        <div className='std-details'>
            {           
                currentStd &&
                (
                    <Student 
                        absents={currentStd.absents}
                        name={currentStd.name}
                        age={currentStd.age}
                        graduated={currentStd.graduated}
                        coursesList={currentStd.coursesList}
                        sentAbsent={manager.handleAbsents}
                        handleDelete={manager.deleteStudent} 
                        id={Number(id)}            
                        />
                )
            }
        </div>
    )
}

export default StudentDetails;