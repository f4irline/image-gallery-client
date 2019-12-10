import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
    baseURL: 'https://obscure-earth-81941.herokuapp.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});