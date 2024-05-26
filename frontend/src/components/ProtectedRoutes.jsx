import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from "../api";
const ProtectedRoutes = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth()
    },[])

    const refresh_token = async () => {
        const refresh_token = localStorage.getItem('refresh_token')
        try {
            const response = await api.post('/users/token/refresh/', {refresh: refresh_token})
            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.access)
                setIsAuthorized(true)
            } else setIsAuthorized(false)
        } catch (error) {
            alert(error)
            console.log(error);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem('access_token')
        if (!token){
            setIsAuthorized(true)
            return
        }
        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refresh_token()
        } else setIsAuthorized(true)
    }

    if (isAuthorized===null) return <div>Loading...</div>

    return isAuthorized ? children : <Navigate to={'/login'} />
}

export default ProtectedRoutes