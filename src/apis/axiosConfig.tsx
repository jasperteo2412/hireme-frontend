import axios, { InternalAxiosRequestConfig } from "axios"
import { useEffect } from "react"

export function axiosInterceptors() {

    useEffect(() => {
        axios.interceptors.request.use(
            (config: any) => {
                if(!config.headers){
                    config.headers = {};
                }
                const TOKEN = sessionStorage.getItem("TOKEN");
                const TOKEN_TYPE = sessionStorage.getItem("TOKEN-TYPE");
                config.headers['Authorization'] = TOKEN_TYPE+" "+TOKEN;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )
    }, []);
}