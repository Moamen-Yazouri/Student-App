import { IStudent } from '../types/student';
import Form from '../components/form/Form.comp';
import { StateContext } from '../Providers/StateContext';
import { useContext, useState } from 'react';

const AddStudent = () => {
    const [message, setMessage] = useState('');
    const {dispatch} = useContext(StateContext);
    const addStudent = (newStudent: IStudent) => {
        dispatch({type: 'ADD_STUDENT', payload: newStudent});
        setMessage("student added successfuly!");
        setTimeout(() => {
            setMessage('');
        }, 3000)
    }
    return (
        <>
            <Form passStudent={addStudent}/>
            <h3>{message}</h3>
        </>
    )

}

export default AddStudent;