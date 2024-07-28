import { ReactNode, createContext, useState } from "react";
import { darkTheme, lightTheme } from "./theme";

export const ThemeContext = createContext({ theme: lightTheme, toggleTheme: () => { } });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme((prev) => prev === lightTheme ? darkTheme : lightTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}