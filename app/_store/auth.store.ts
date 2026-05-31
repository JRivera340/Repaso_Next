import { create } from "zustand";

interface AuthStore {
    token: string | null
    user: {
        name: string
        email: string
    } | null
    isAuthenticated: boolean
    login: (user: {name: string; email: string}, token: string) =>void
    logout: () =>void
}


export const useAuthStore = create<AuthStore>()((set) =>({
    user:null,
    token: null,
    isAuthenticated: false,

    login: (user, token) => {
        
        localStorage.setItem("authToken", token);
        set({user, token, isAuthenticated: true});
    },
    logout: () => {
        // limpia el token de localStorage
        localStorage.removeItem("authToken")
        // limpia el estado global
        set({ user: null, token: null, isAuthenticated: false })
    }
}));