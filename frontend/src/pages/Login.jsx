import { Navigate } from "react-router-dom"
import CustomForm from "../components/CustomForm"
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem('access_token')

    if (isAuthenticated) {
        return <Navigate to={'/'} />
    }
    
    return (
            
            <CustomForm
            route={'/users/login/'}
            method={'login'} />
    )
}

export default Login