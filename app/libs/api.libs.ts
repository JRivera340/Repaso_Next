import axios from "axios";

const axiosInstance = axios.create({
    
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type":"application/json"
    }
});

/**Login guarda el token en localStorage  ← esto lo hace el store de Zustand
Interceptor lee el token de localStorage y lo agrega al header de cada request */
axiosInstance.interceptors.request.use(
    (config) => {
        if(globalThis.window !== undefined){
            const token = localStorage.getItem("authToken");
            if(token){
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error) =>{
        return Promise.reject(error);
    }
)
export default axiosInstance

//agregar un interceptor en un futuro...