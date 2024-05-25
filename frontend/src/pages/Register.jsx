import { useState } from "react"
import api from "../api"

const Register = () => {
    const [data, setData] = useState(null)

    api.get('/users/register/')
    .then(res=>setData(res.data))
    .catch(err => console.log(err))

    return (
        <div>
            <h1>Register</h1>
            {JSON.stringify(data)}
        </div>
    )
}

export default Register