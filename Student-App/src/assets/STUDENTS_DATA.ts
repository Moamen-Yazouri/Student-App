import { IStudent } from "../types/student";

const STUDENTS_DATA: IStudent[] = [
    {
    name: "Moamen",
    age: 20,
    id: 120220426,
    coursesList: ["React", "Angular"],
    graduated: true,
    abssents: 0
    },
    {
    name: "Khaled",
    age: 21,
    id: 120220427,
    coursesList: ["React", "Angular", "Vue"],
    graduated: false,
    abssents: 0
    },
    {
    name: "Fawzy",
    age: 22,
    id: 120220428,
    coursesList: ["React", "Angular", "Next"],
    graduated: true,
    abssents: 0,
    },
    {
    name: "Ahmed",
    age: 23,
    id: 120220429,
    coursesList: ["React",  "JS"],
    graduated: true,
    abssents: 0,
    }
]; 
export {STUDENTS_DATA};