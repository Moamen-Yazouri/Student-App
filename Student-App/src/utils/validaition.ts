import { IStudent } from "../types/student";

const validateStudent = (std: IStudent) : string[] => {
    const errors: string[] = [];
    if(std.age > 40 || std.age < 18) {
        errors.push("The age is not Valied");
    }
    if(std.name.length < 3) {
        errors.push("The name must be longer");
    }
    if(std.coursesList.length === 0) {
        errors.push("You must enter courses");
    }
    return errors;
}
export default validateStudent;