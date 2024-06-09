import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";

export default function About() {
    const { user, loading } = useContext(UserContext);
    
    return (
        <>
            <h1>About</h1>
            <h1>Hello {user?.username}</h1>
        </>
    )
}