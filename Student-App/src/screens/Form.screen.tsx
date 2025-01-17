import { IStudent } from '../types/student';
import Form from '../components/form/Form.comp';
interface IProps {
    onSubmit: (std: IStudent) => void
    message: string;
}
const AddStudent = (props: IProps) => {
    
    return (
        <>
            <Form passStudent={props.onSubmit}/>
            <h3>{props.message}</h3>
        </>
    )

}

export default AddStudent;