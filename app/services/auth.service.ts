import { LoginRequest, LoginResponse } from "../interfaces/auth.interface";
import axiosInstance from "../libs/api.libs";


const authService = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
        //response.data es el JSON que devuelve el backend
        return response.data;
    }
}
export default authService;