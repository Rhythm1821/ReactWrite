import { useNavigate } from 'react-router-dom'
import '../styles/Form.css'
import { useState } from 'react'
import api from '../api'

const CustomForm = ({route, method}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const name = method === 'login' ? "Login" : "Register"

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post(route, 
                method==='login' ? {username, password} : {username, email, password})
            if (method==='login'){
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            alert(error)
            console.log(error);
        }
    }

    return (
        <form action="" className="form-container" onSubmit={handleSubmit}>
            <h1>{name}</h1>

            
                <input className="form-input" type="text" onChange={(e)=>setUsername(e.target.value)}
                name="username" id="username" placeholder='username' />

            {   method === 'register' &&
            <input className="form-input" type="email" onChange={(e)=>setEmail(e.target.value)}
            name="email" id="email" placeholder='email' />
            }

            <input className="form-input" type="password" onChange={(e)=>setPassword(e.target.value)}
            name="password" id="password" placeholder='password' />

            <button className='form-button' type="submit">Submit</button>
            {method==='login' ? (
                <p>Don't have an account? <a href="/register">Register</a></p>)
                : (<p>Already have an account? <a href="/login">Login</a></p>) }

        </form>
    )
}

export default CustomForm

// Rhythm422@