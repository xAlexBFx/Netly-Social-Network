import axios from 'axios';

const instance = axios.create({
    baseURL:'http://10.29.214.7:8080',
    withCredentials: true,
})

export default instance;