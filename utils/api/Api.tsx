import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://192.168.10.52:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance;