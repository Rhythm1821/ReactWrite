import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        const csrfTokenMatch = document.cookie.match(/csrftoken=(\w+)/)
        if (csrfTokenMatch) {
            const csrfToken = csrfTokenMatch[1]
            config.headers['X-CSRFToken'] = csrfToken
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api