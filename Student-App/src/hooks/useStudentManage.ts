import { useEffect, useState } from "react";
import { IStudent } from "../types/student";
import useLocalStorage from "./useLocalStorage";
import { STUDENTS_DATA } from "../assets/STUDENTS_DATA";

const useStudentManage = () => {
    const [students, setStudents] = useState<IStudent[]>(STUDENTS_DATA);
    const [totalAbsent, setTotalAbsent] = useState(0);
    const {storedData} = useLocalStorage(students, "students-list");

    useEffect(() => {
        const stdList: IStudent[] = storedData || [];
        const totalAbssents: number = stdList.reduce((prev, curr) => curr.abssents + prev , 0);
        setTotalAbsent(totalAbssents);
        setStudents(storedData || STUDENTS_DATA);
    }, [storedData]);

    const showStudents = () => {
        setStudents(JSON.parse(localStorage.getItem("students-list") || JSON.stringify(STUDENTS_DATA)));
    }

    const hideStudents = () => {
        setStudents([]);
    }

    const deleteStudent = (id: number) => {
        const newList = students.filter(std => std.id !== id);
        setStudents(newList);
    }

    const handleTotal = (change: number, id: number) => {
        setStudents(students.map(std => std.id == id ? {...std, abssents: (std.abssents + change)} : std)) 
        setTotalAbsent(totalAbsent + change)
    }

    const addNewStudent =  (std: IStudent) => {
        setStudents([std,...students])
    }
    return {
        showStudents,
        hideStudents,
        deleteStudent,
        handleTotal,
        addNewStudent,
        totalAbsent,
        students
    }
}
export default useStudentManage;