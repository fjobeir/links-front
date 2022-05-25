import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [token, setToken] = useState(window.localStorage.getItem('token'))
    const [loggedIn, setLoggedIn] = useState(!!token)
    return <AppContext.Provider value={{
        loggedIn,
        setLoggedIn,
        token,
        setToken
    }}>
    {children}
    </AppContext.Provider>
}