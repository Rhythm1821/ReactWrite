import { createContext, useEffect, useState } from "react";
import api from "../api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const response = await api.get(`/users/myprofile/`);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user", error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};
