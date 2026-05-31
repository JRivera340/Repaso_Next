
//Nombre de la interfaz siempre en mayuscula
export interface LoginRequest{
    email: string
    password: string
}

export interface LoginResponse{
    token: string
    user: {
        name: string
        email: string
    }
}