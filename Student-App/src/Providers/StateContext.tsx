import { createContext, useEffect, useReducer } from "react";
import reducer, { Action, IState } from "../stateManager/reducer";
import useLocalStorage from "../hooks/useLocalStorage";
interface IProps {
    children: React.ReactNode;
}
interface IStateContext {
    state: IState,
    dispatch: React.Dispatch<Action>,
}
const INTIAL_STATE = {state: {students: [], totalAbs: 0}, dispatch: () => { }}
export const StateContext = createContext<IStateContext>(INTIAL_STATE);

const StateProvider = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, {students: [], totalAbs: 0});
    const {storedData} = useLocalStorage(state.students, 'students-list');
    
    useEffect(() => {
        dispatch({type: "ADD_LOCALSTORAGE", payload: storedData || []});
    }, [storedData]);
    
    return (
        <StateContext.Provider value={{state, dispatch}}>{props.children}</StateContext.Provider>
    )
}
export default StateProvider;

