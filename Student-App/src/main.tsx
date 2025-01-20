import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Providers/AuthContext.tsx'
import { createContext, useEffect, useState} from 'react'
import useLocalStorage from './hooks/useLocalStorage.ts'
import StateProvider from './Providers/StateContext.tsx'
interface ITheme {
    theme: string;
    setTheme: (t: string) => void
}
const themeContext = createContext<ITheme>({theme: 'light', setTheme: () => {}})
const Wrapper = () => {
    const [theme, setTheme] = useState<string>('light');
    const { storedData: storedTheme} = useLocalStorage(theme, "theme");

    useEffect(() => {
        setTheme(storedTheme);
    }, [storedTheme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    }, [theme]);
    return (
        <themeContext.Provider value={{theme: theme, setTheme: setTheme}}>
            <BrowserRouter>
                <StateProvider>
                    <App />
                </StateProvider>
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
