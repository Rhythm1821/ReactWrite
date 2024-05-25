import { useState } from "react"
import api from "../api"

const Login = () => {
    const [data, setData] = useState(null)

    api.get('/users/login/')
    .then(res=>setData(res.data))
    .catch(err => console.log(err))

    return (
        <div>
            <h1>Login</h1>
            {JSON.stringify(data)}
        </div>
    )
}

export default Login