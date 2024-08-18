import CustomForm from "../components/CustomForm"
import { Navigate } from "react-router-dom"

const Register = () => {

    const token = localStorage.getItem('access_token')

    if (token) {
        alert('You are already logged in');
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <CustomForm
            method={'register'}
            route={'/users/register/'} />
            
        </div>
    )
}

export default Register