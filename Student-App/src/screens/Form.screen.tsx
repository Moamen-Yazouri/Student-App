import { IStudent } from '../types/student';
import Form from '../components/form/Form.comp';
interface IProps {
    onSubmit: (std: IStudent) => void
}
const AddStudent = (props: IProps) => {
    return (
        <Form passStudent={props.onSubmit}/>
    )
}

export default AddStudent;