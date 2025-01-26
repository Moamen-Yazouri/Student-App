import { createContext, useLayoutEffect, useState} from "react";
import IUserData from "../types/user";
import useLocalStorage from "../hooks/useLocalStorage";

interface IAuthContext {
    login: (data: IUserData) => void
    logout: () => void;
    user: IUserData | null;
}

interface IProps {
    children: React.ReactNode;
}
const INIT_USER = JSON.parse(localStorage.getItem("user-data") || "[]");
const AuthContext = createContext<IAuthContext>({user: INIT_USER, login: () => {}, logout: () => {}})

const AuthProvider = (props: IProps) => {
    const [user, setUser] = useState<IUserData | null>(INIT_USER);
    const {storedData} = useLocalStorage(user, "user-data");
    
    useLayoutEffect(() => {
        if(storedData) 
            setUser(storedData);
    }, [storedData])
    const login = (data: IUserData) => {
        setUser(data);
    }
    const logout = () => {
        setUser(null)
    }
    const value = {user, login, logout};
    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
export {AuthContext, AuthProvider};