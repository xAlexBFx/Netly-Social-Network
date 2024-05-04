import axios from 'axios';

const instance = axios.create({
    baseURL:'http://10.0.0.116:8080',
    withCredentials: true
})

export default instance;