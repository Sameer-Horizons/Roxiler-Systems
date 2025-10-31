import axios from "axios";
import { createContext, use, useState } from "react";

export const AppContext = createContext();
export const AppContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const value = {
        backendurl,
        isLoggedin, setIsLoggedin,
        userData, setUserData
    }

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/user/data')

        } catch (error) {

        }
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};