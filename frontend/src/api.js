import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

// api.interceptors.request.use(
//     (config) => {
//         console.log(config);
//     }
// )

export default api