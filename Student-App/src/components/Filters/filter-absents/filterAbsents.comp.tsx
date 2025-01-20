import './filterAbsents.css'
import React from 'react'
interface IProps {
    params: URLSearchParams,
    filterAbsentsMax: (e: React.ChangeEvent<HTMLInputElement>) => void,
    filterAbsentsMin: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const FilterAbsents = (props: IProps) => {
    return (
        <div className="filterAbsents">
            <h3 className="absents">Absents:</h3>
            <div className="selection">
                <div className="min">
                    <label htmlFor="min">From: <span>{Number(props.params.get('minAbs')) || 0}</span></label>
                    <input
                    value={Number(props.params.get('minAbs')) || 0}
                    type="range"
                    name="min"
                    id=""
                    min={0} 
                    max={5} 
                    step={1} 
                    onChange={props.filterAbsentsMin} 
                    />
                </div>
                <div className="max">
                <label htmlFor="max">To: <span>{Number(props.params.get('maxAbs')) || 0}</span></label>
                <input 
                value={Number(props.params.get('maxAbs')) || 0}
                type="range" 
                name="" 
                id="max" 
                min={0} 
                max={15} 
                step={1} 
                onChange={props.filterAbsentsMax} 
                />
                </div>
            </div>
        </div>
    )
}

export default FilterAbsents