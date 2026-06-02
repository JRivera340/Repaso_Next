'use client'

import { useState } from "react";
//se debe importar el useAuthStore que creamo
import { useAuthStore } from "../_store/auth.store";
//se debe importar el navigation para el flujo de rutas 
import {useRouter} from "next/navigation";
import authService from "../services/auth.service";


export default function Login(){

    //el metodo set es creado por react opor default, no lo defino yo.
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const route = useRouter();

    const {login} = useAuthStore();
    
    const [error, setError] = useState<string>(''); 

    const [loading, setLoading] = useState<boolean>(false)


    /**
     *  email, password    → guardar lo que escribe el usuario
        error              → mostrar mensaje si algo falla
        loading            → saber si está esperando respuesta del backend
        router             → para navegar a /dashboard después del login
        login              → función de Zustand para guardar el token y usuario
     */
    const handleSubmit = async (e: React.SubmitEvent ) => {

        e.preventDefault();
        setError('')
        
        //Se valida en el front que los espacios no esten vacios
        if (!email || !password) {
            setError('Email y password obligatorias');
            return
        }

        setLoading(true);

        try {
            const response = await authService.login({email, password});
            login(response.user, response.token)
            route.push('/dashboard')
            
        } catch (error){

            setError('Credenciales incorrectas');
            
        } finally{
            setLoading(false)
        }
    }
    /**¿Quiero que ocupe espacio?     → w-, h-, min-h-
     ¿Quiero fondo?                 → bg-
     ¿Quiero color de texto?        → text-
     ¿Quiero espacio interno?       → p- (padding)
     ¿Quiero espacio externo?       → m- (margin)
     ¿Quiero organizar los hijos?   → flex + items- + justify-
     ¿Quiero bordes redondeados?    → rounded-
     ¿Quiero tamaño de texto?       → text-sm, text-lg, text-2xl
     ¿Quiero negrita?               → font-bold, font-semibold */
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            {/** min-h-screen  → altura mínima = toda la pantalla
                flex          → activa flexbox para organizar hijos
                items-center  → centra verticalmente
                justify-center→ centra horizontalmente
                bg-gray-900   → fondo gris oscuro*/}
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
                {/**bg-gray-800   → fondo gris un poco más claro que el exterior
                    p-8           → padding (espacio interno) de 32px en todos los lados
                    rounded-lg    → bordes redondeados
                    w-full        → ancho 100% de su contenedor
                    max-w-md      → pero máximo 448px — no se estira demasiado */}
                <h1 className="text-2xl font-bold text-white mb-4">DashPeliculas</h1>
                <p>Dashboard de peliculas</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input placeholder="email@mail.com" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input placeholder="********" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 disabled:cursor-not-allowed font-semibold py-2 px-4 rounded text-sm" type="submit" disabled={loading}>
                        {loading ? 'Cargando...': 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    )
}