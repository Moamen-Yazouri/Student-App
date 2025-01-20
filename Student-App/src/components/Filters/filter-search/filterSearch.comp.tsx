import './filterSearch.css';
import React from 'react';
interface IFilter {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    params: URLSearchParams;
}
const FilterSearch = (props: IFilter) => {
    return (
        <div className="search">
        <input 
        type="text"
        placeholder="Search by name" 
        onChange={props.handleSearch} 
        value={props.params.get('q') || ''}
        />
    </div>
    )
}

export default FilterSearch;