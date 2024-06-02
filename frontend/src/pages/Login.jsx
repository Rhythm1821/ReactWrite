import { Navigate } from "react-router-dom"
import CustomForm from "../components/CustomForm"
import { Container } from "@mui/material";

const Login = () => {
    const token = localStorage.getItem('access_token')

    if (token) {
        console.log('You are already logged in');
        return <Navigate to={'/'} />
    }
    
    return (
            
            <CustomForm
            route={'/users/login/'}
            method={'login'} />
    )
}

export default Login