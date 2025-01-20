import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { IStudent } from "../types/student";
import useLocalStorage from "./useLocalStorage";
import {useSearchParams} from "react-router-dom";
import useFilter from "./useFilter";
import { AuthContext } from "../Providers/AuthContext";
import reducer from "../stateManager/reducer";
import { StateContext } from "../Providers/StateContext";

const useStudentManage = () => {
    const {state, dispatch} = useContext(StateContext);
    const [isShown, setShown] = useState<boolean>(true);
    const [minAbs, setMinAbs] = useState(0);
    const [maxAbs, setMaxAbs] = useState(6);
    const [params, setParams] = useSearchParams()
    const {filteredList} = useFilter(state.students, params)
    const stdRef = useRef<HTMLDivElement>(null);
    const timeref = useRef<number>();
    const {logout} = useContext(AuthContext);

    const stopTime = () => {
        clearInterval(timeref.current);
    }

    const scrollLast = () => {
        dispatch({type: 'SCROLL_TO_LAST', payload: stdRef.current})
    }


    const showStudents = () => {
        setShown(true)
    }

    const hideStudents = () => {
        setShown(false);
    }

    const deleteStudent = (id: number) => {
        dispatch({type: 'DELETE_STUDENT', payload: id})
    }

    const handleAbsents = (abs: {change: number, id: number}) => {
        dispatch({type: 'ADD_ABSENT', payload: {change: abs.change, id: abs.id}})
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
        stdRef,
        isShown,
        filteredList,
        params,
        minAbs,
        maxAbs,
        stopTime,
        showStudents,
        hideStudents,
        deleteStudent,
        handleAbsents,
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