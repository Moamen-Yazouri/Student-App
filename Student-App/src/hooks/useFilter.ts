import { useEffect, useState } from "react";
import { IStudent } from "../types/student";

const usefilter = (students: IStudent[],  params: URLSearchParams) => {
    const [filteredList, setFiltered] = useState<IStudent[]>(students)
    useEffect(() => {
        const query = params.get('q') || '';
        const grad = params.get('graduated');
        const courses = params.getAll('courses');
        const min = params.get('minAbs');
        const max = params.get('maxAbs');
        if(query) {
            setFiltered(students.filter(std => std.name.toLowerCase().includes(query.toLowerCase())));
        }
        else {
            setFiltered(students)
        }
        if(grad && grad !== "All") {
            const gradBoolean = grad === "Graduated"? true : false;
            setFiltered(old => old.filter(std => std.graduated === gradBoolean));
        }

        if(courses.length) {
            
            setFiltered(old => old.filter(std => courses.every(c => std.coursesList.includes(c))));
            
        }
        if(min) {
            if(max) {
                setFiltered(old => old.filter(std => (std.absents >= Number(min) && std.absents <= Number(max))));
            }
            else {
                setFiltered(old => old.filter(std => (std.absents >= Number(min))));
            }
        }
        if(max) {
            if(min) {
                setFiltered(old => old.filter(std => (std.absents >= Number(min) && std.absents <= Number(max))));
            }
            else {
                setFiltered(old => old.filter(std => (std.absents <= Number(max))));
            }
        }
    }, [students, params]);
    return {filteredList};
}
export default usefilter;