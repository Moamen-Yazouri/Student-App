import './time.css'
interface IProps {
    date: string;
    stopTime: () => void;
}   
const Time = (props: IProps) => {
    return (
    <div className='time-wrapper'>
        <h1>{props.date}</h1>
        <button  className="stop" onClick={props.stopTime}>stop</button>
    </div>
    )
}

export default Time;