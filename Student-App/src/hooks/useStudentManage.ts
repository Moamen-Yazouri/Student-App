import { useEffect, useRef, useState } from "react";
import { IStudent } from "../types/student";
import useLocalStorage from "./useLocalStorage";
import { STUDENTS_DATA } from "../assets/STUDENTS_DATA";
import {useSearchParams } from "react-router-dom";

const useStudentManage = () => {
    const [students, setStudents] = useState<IStudent[]>(STUDENTS_DATA);
    const [filteredList, setFiltered] = useState<IStudent[]>(students)
    const [totalAbsent, setTotalAbsent] = useState(0);
    const [params, setParams] = useSearchParams()
    const {storedData} = useLocalStorage(students, "students-list");
    const stdRef = useRef<HTMLDivElement>(null);
    const [isShown, setShown] = useState<boolean>(true);
    const[date, setDate] = useState('');
    const timeref = useRef<number>();

    useEffect(() => {
        const query = params.get('q') || '';
        setFiltered(students.filter(std => std.name.includes(query)));
    }, [params, students])

    useEffect(() => {
        timeref.current = setInterval(() => {
        setDate(new Date().toLocaleTimeString());
    }, 1000)

    }, [])

    const stopTime = () => {
        clearInterval(timeref.current);
    }

    const scrollLast = () => {
        stdRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    useEffect(() => {
        const stdList: IStudent[] = storedData;
        if(storedData) {
            const totalAbssents: number = stdList.reduce((prev, curr) => curr.absents + prev , 0);
            setTotalAbsent(totalAbssents);
            setStudents(storedData);
        }
    }, [storedData]);

    const showStudents = () => {
        setShown(true)
    }

    const hideStudents = () => {
        setShown(false);
    }

    const deleteStudent = (id: number) => {
        const newList = students.filter(std => std.id !== id);
        const totalAbsents: number = newList.reduce((prev, curr) => curr.absents + prev , 0);
        setTotalAbsent(totalAbsents)
        setStudents(newList);
    }

    const handleTotal = (change: number, id: number) => {
        setStudents(students.map(std => std.id == id ? {...std, absents: (std.absents + change)} : std)) 
        setTotalAbsent(totalAbsent + change)
    }

    const addNewStudent =  (std: IStudent) => {
        setStudents([std,...students])
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        params.set('q', e.currentTarget.value);
        setParams(params);
    }
    return {
        totalAbsent,
        students,
        stdRef,
        date,
        isShown,
        filteredList,
        params,
        stopTime,
        showStudents,
        hideStudents,
        deleteStudent,
        handleTotal,
        addNewStudent,
        scrollLast,
        handleSearch,
    }
}
export default useStudentManage;