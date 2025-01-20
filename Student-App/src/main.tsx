import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { createContext, useEffect, useState} from 'react'
import useLocalStorage from './hooks/useLocalStorage.ts'
interface ITheme {
    theme: string;
    setTheme: (t: string) => void
}
const themeContext = createContext<ITheme>({theme: 'light', setTheme: () => {}})
const Wrapper = () => {
    const [theme, setTheme] = useState<string>('light');
    const {storedData} = useLocalStorage(theme, "theme");
    useEffect(() => {
        setTheme(storedData);
    }, [storedData])
    return (
        <themeContext.Provider value={{theme: theme, setTheme: setTheme}}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </themeContext.Provider>
    )
}
createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <Wrapper/>
    </AuthProvider>
)

export {themeContext};
