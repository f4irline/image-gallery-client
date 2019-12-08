import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
    baseURL: 'https://picsum.photos/v2/list',
    headers: {
        'Content-Type': 'application/json'
    }
});