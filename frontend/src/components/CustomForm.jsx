import { useNavigate } from 'react-router-dom'
import '../styles/Form.css'
import api from '../api'
import { useForm } from "react-hook-form";

const CustomForm = ({ route, method }) => {
    const navigate = useNavigate()

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset } = useForm()

    const onSubmit = async (data) => {

        try {
            const response = await api.post(route,
                method === 'login' ? { username: data.username, password: data.password } : { username: data.username, email: data.email, password: data.password })
            if (method === 'login') {
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
            setError("autherror", { message: error.response.data.detail || "Something went wrong" })
        } finally {
            setTimeout(() => {
                reset()
            }, 4000)
        }
    }

    return (
        <>

            <div className="md:flex">
                {/* left */}
                <div className="hidden sm:hidden md:flex h-screen w-full bg-indigo-600 items-center justify-center">
                    <h1 className="text-5xl text-white font-bold text-center px-10">
                        Manifest your thoughts and share them with the world. 😊
                    </h1>                    
                </div>


                {/* right */}
                <div className='form w-full'>

                    {/* Loading */}
                    {isSubmitting && (
                        <div className="absolute flex items-center justify-center inset-0 bg-opacity-50">
                            <div
                                className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 items-center justify-center min-h-screen'>
                        <h1 className='text-3xl text-gray-400'>Authentication</h1>

                        {/* Username */}
                        <input
                            className='border border-gray-400 rounded-md w-1/2 p-3 my-2'
                            type="text" placeholder="Username"
                            {...register("username",
                                {
                                    required: { value: true, message: "username is required" },
                                    minLength: { value: 3, message: "min length is 3" },
                                    maxLength: { value: 10, message: "max length is 10" }
                                })} />
                        {errors.username && <div className='text-red-500'>{errors.username.message}</div>}


                        {/* Email */}
                        {method === 'register' &&
                            <input
                                className='border border-gray-400 rounded-md w-1/2 p-3 my-2'
                                type="text" placeholder="Email"
                                {...register("email",
                                    {
                                        required: { value: true, message: "email is required" },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })} />
                        }
                        {errors?.email && <div className='text-red-500'>{errors.email.message}</div>}
                        
                        {/* Password */}
                        <input
                            className='border border-gray-400 rounded-md w-1/2 p-3 my-2'
                            type="text" placeholder="Password"
                            {...register("password",
                                {
                                    required: { value: true, message: "password is required" },
                                    minLength: { value: 3, message: "min length is 6" }
                                })} />
                        {errors.password && <div className='text-red-500'>{errors.password.message}</div>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`border border-gray-400 bg-blue-800 rounded-md w-1/2 py-3 mt-2 text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                        {method === 'login' ? (
                            <p>Don't have an account? <a className='mt-2 text-blue-500 underline cursor-pointer' href="/register">Register</a></p>)
                            : (<p>Already have an account? <a className='mt-2 text-blue-500 underline cursor-pointer' href="/login">Login</a></p>)}
                        {errors.autherror && <div className='text-red-500 mt-2'>{errors.autherror.message}</div>}

                    </form>
                </div>
            </div>
        </>
    )
}
export default CustomForm
