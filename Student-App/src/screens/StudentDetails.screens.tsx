import Student  from '../components/student/student.comp'
import  { useContext, useEffect, useState } from 'react'
import useStudentManage from '../hooks/useStudentManage'
import { useNavigate, useParams } from 'react-router-dom'
import { IStudent } from '../types/student'
import retrieveData from '../utils/getFromLocalStorage'
import { StateContext } from '../Providers/StateContext'
const StudentDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const[currentStd, setCurrentStd] = useState<IStudent>();
    const {state, dispatch} = useContext(StateContext);

    useEffect(() => {
            const std = state.students.find(item => item.id == Number(id)); 
            if(std) {
                setCurrentStd(std)
            }
            else {
                navigate('/404');
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
                        handleDelete={() => dispatch({type: 'DELETE_STUDENT', payload: currentStd.id})} 
                        id={Number(id)}            
                        />
                )
            }
        </div>
    )
}

export default StudentDetails;