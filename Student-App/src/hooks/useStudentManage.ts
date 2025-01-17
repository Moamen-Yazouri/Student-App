import { useContext, useEffect, useRef, useState } from "react";
import { IStudent } from "../types/student";
import useLocalStorage from "./useLocalStorage";
import { STUDENTS_DATA } from "../assets/STUDENTS_DATA";
import {useSearchParams} from "react-router-dom";
import useFilter from "./useFilter";
import { AuthContext } from "../context/AuthContext";

const useStudentManage = () => {
    const [students, setStudents] = useState<IStudent[]>(STUDENTS_DATA);
    const[date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [isShown, setShown] = useState<boolean>(true);
    const [minAbs, setMinAbs] = useState(0);
    const [maxAbs, setMaxAbs] = useState(6);
    const [totalAbsent, setTotalAbsent] = useState(0);
    const [params, setParams] = useSearchParams()
    const {storedData} = useLocalStorage(students, "students-list");
    const {filteredList} = useFilter(students, params)
    const stdRef = useRef<HTMLDivElement>(null);
    const timeref = useRef<number>();
    const {logout} = useContext(AuthContext);
    useEffect(() => {
        timeref.current = setInterval(() => {
        setDate(new Date().toLocaleTimeString());
    }, 1000);

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
        setStudents([std,...students]);
        setMessage("student added successfuly!");
        setTimeout(() => {
            setMessage('');
        }, 3000)
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query =  e.currentTarget.value;
        if(query.length > 0) { 
            params.set('q', query);
            setParams(params);
        }
        else {
            params.delete('q');
            setParams(params);
        }
    }
    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const filter = e.target.value;
        console.log(filter);
        
        if(filter !== "All" ) {
            params.set('graduated', filter);
            setParams(params);
        }
        else {
            params.delete('graduated');
            setParams(params);
        }
    }
    const coursesFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const checked = e.target.checked;
        if(checked) {
            params.append('courses', value);
        }
        else{
            params.delete('courses', value);
        }
        setParams(params);
    }
    const filterAbsentsMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const min = e.target.value;
        if(Number(min) == 0) {
            params.delete("minAbs");
        }
        else {
            setMinAbs(Number(min));
            params.set('minAbs', min);
        }
        setParams(params);
    }
    const filterAbsentsMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const max = e.currentTarget.value;
        if(Number(max) == 0) {
            params.delete("maxAbs");
        }
        else {
            setMaxAbs(Number(max));
            params.set('maxAbs', max);
        }
        setParams(params);
    }

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        logout();
    }
    return {
        totalAbsent,
        students,
        stdRef,
        date,
        isShown,
        filteredList,
        params,
        message,
        minAbs,
        maxAbs,
        stopTime,
        showStudents,
        hideStudents,
        deleteStudent,
        handleTotal,
        addNewStudent,
        scrollLast,
        handleSearch,
        handleFilter,
        coursesFilter,
        filterAbsentsMin,
        filterAbsentsMax,
        handleLogout,
    }
}
export default useStudentManage;