import { createContext, useEffect, useState} from "react";
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
const AuthContext = createContext<IAuthContext>({user: null, login: () => {}, logout: () => {}})

const AuthProvider = (props: IProps) => {
    const [user, setUser] = useState<IUserData | null>(null);
    const {storedData} = useLocalStorage(user, "user-data");
    useEffect(() => {
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