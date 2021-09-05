import axios from 'axios';
const axiosInstance = axios.create({
    baseURL:'https://nameless-dusk-21194.herokuapp.com/'
});

axiosInstance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('token');
        config.headers = {
            'Authorization':`Bearer ${token}`
        }
        console.log(config);
        return config;
    },
    error => {
        console.log(error);
    }
)

export default axiosInstance;