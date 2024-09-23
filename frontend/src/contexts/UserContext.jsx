import { createContext, useEffect, useState } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    const fetchUser = async () => {
        if (isAuthenticated) {
            const response = await api.get(`/users/myprofile/`);
            setUser(response.data);
        } else {
            setUser(null);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};
