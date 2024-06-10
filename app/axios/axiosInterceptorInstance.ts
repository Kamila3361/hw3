import axios from "axios";

const axiosInterceptorInstance = axios.create({
    baseURL: "https://dummyjson.com/",
});

axiosInterceptorInstance.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("token") as string);
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
      }
);

export default axiosInterceptorInstance;