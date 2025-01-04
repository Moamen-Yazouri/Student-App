import { useState } from "react";
import validateStudent from "../utils/validaition";
import { IStudent } from "../types/student";

const useForm = (passStudent: (std: IStudent) => void, INTIAL_STUDENT: IStudent) => {
    const [student, setStudent] = useState<IStudent>(INTIAL_STUDENT);
    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (filed: string, value: any)  => {
        setStudent({...student, [filed]: value})
    }
    const addCourses = (courses: string[]) => {
        setStudent({...student, coursesList: courses})
    }
    const handleSubmitting = () => {
        const newStudent = {...student, id: Date.now()}
        const errorsArray = validateStudent(newStudent);
        if(errorsArray.length == 0) {
            passStudent(newStudent);
            clearinputs();
            setErrors([]);
        }
        else {
            setErrors([]);
            setErrors(errorsArray);
        }
    }

    const clearinputs = () => {
        setStudent(INTIAL_STUDENT);
    }
    return {
        errors,
        student,
        handleChange,
        addCourses,
        handleSubmitting,
        clearinputs
    }
}
export default useForm;