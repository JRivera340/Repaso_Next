'use client'

import { useAuthStore } from "../_store/auth.store"
import {useRouter} from "next/navigation"
import Link from "next/link"

export default function Sidebar(){

    // extraemos user y logout del store global de Zustand
    // user → para mostrar el nombre del usuario logueado
    // logout → para cerrar sesión al hacer clic en el botón
    const {user, logout} = useAuthStore()
    const route = useRouter()

    const handleLogout = () => {

        logout() // ← limpia Zustand y localStorage
        route.push('/login')

    }

    return(
        <div className="bg-gray-900 h-screen w-64 text-white p-6 flex flex-col">
            <div>

                <h1 className="text-2xl font-bold mb-1 ">Dash Peliculas</h1>
                <p>Subtitulo</p>

            </div>

            <div>
                <p>welcome</p>
                <p>Usuario: {user?.name}</p>

            </div>

            <div>

                <Link href={'/dashboard'} className="block py-2 hover:text-blue-400">Inico</Link>
                <Link href={'/dashboard/peliculas'} className="block py-2 hover:text-blue-400">peliculas</Link>
                <Link href={'/dashboard/counter'} className="block py-2 hover:text-blue-400">Contador</Link>
                <Link href={'/dashboard/crear-pelicula'} className="block py-2 hover:text-blue-400">Crear Pelicula</Link>
                
            </div>

            <button onClick={handleLogout} className="mt-auto bg-red-500 py-2 px-4 rounded w-full">Cerrar Sesion</button>
        </div>
    )
}