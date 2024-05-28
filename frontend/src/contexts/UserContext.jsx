import { createContext, useEffect, useState } from "react"
import api from "../api"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/users/profile')
                setUser(response.data)
            } catch (error) {
                console.log("Failed to fetch user", error);
            } finally {
                setLoading(false)
            }
        };
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{user, loading}}>
            {children}
        </UserContext.Provider>
    )
}