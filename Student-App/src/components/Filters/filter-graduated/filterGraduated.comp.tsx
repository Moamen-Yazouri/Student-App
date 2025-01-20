import './filterGraduated.css'
import React from 'react'
interface IProps {
    params: URLSearchParams,
    handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const FilterGraduate = (props: IProps) => {
    return (
        <div className="filter">
        <select value={props.params.get("graduated") || "All"} onChange={props.handleFilter}>
            <option value="All">All</option>
            <option value="Graduated">Graduated</option>
            <option value="Un-graduted">Un-graduated</option>
        </select>
    </div>
    )
}

export default FilterGraduate;