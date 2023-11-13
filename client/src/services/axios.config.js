import axios from 'axios'

const AxiosApi = axios.create({
    baseURL: 'http://localhost:5000/',
})

AxiosApi.interceptors.request.use(
    (config) => {
        const token  = localStorage.getItem('token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    })

AxiosApi.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            if(error.response.data.message === 'Expired JWT Token' || error.response.data.message === 'Invalid JWT Token') {
                localStorage.removeItem('token')
                // window.dispatchEvent(new Event('storage'))
                window.location.href = '/login'
                return
            }
        }
        return Promise.reject(error)
    }
)

export default AxiosApi