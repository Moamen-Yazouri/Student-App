import { IStudent } from "../types/student";

interface IState {
    students: IStudent[];
    totalAbs: number;
}

type Action =   {type: 'ADD_LOCALSTORAGE', payload: IStudent[]} |
                {type: 'ADD_STUDENT', payload: IStudent} |
                {type: 'ADD_ABSENT', payload: {id: number, change: number}} |
                {type: 'DELETE_STUDENT', payload: number} |
                {type: 'SCROLL_TO_LAST', payload: HTMLDivElement | null};

const reducer = (state: IState, action: Action): IState => {

    switch(action.type) {
        case 'ADD_LOCALSTORAGE': {
            if(state.students.length == 0) {
                const storedList = action.payload || [];
                const totalAbs = storedList.reduce((cur, prev) => { return cur + prev.absents}, 0)
                return {...state, students: storedList, totalAbs: totalAbs};
            }
            return state;
        }

        case 'ADD_STUDENT': {
            const newStd = action.payload;
            return{...state, students: [newStd,...state.students]}
        }

        case 'ADD_ABSENT': {
            const id = action.payload.id;
            const change = action.payload.change;
            return {
                ...state,
                students: 
                state.students.map(
                    std => std.id === id ? {...std, absents: std.absents + change} : std
                )
                ,
                totalAbs: state.totalAbs + change
            }
        }

        case 'DELETE_STUDENT': {
            const id = action.payload;
            return {
                ...state, 
                students: state.students.filter(std => std.id !== id),
                totalAbs: state.students.reduce((curr, prev) => {return curr + prev.absents}, 0)
            }
        }

        case 'SCROLL_TO_LAST': {
            action.payload?.scrollIntoView();
            return state;
        }

        default: return state;
    }

}
export default reducer;
