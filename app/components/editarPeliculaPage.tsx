'use client'

import { useEffect, useState } from "react"
import movieService from "../services/movie.service"
import { useSearchParams } from "next/navigation"
import {Movie} from "../interfaces/movie.interface"
//El import de useRouter estaba mal, es next/navigation no next/router
import { useRouter } from "next/navigation"

export default function EditarPeliculaPage(){

    //Se deben declarar las variables que vayamos a usar o funciones
    const SearchParams = useSearchParams()
    const id = SearchParams.get('id')

    const router = useRouter()

    const [movie, setMovie] = useState<Movie |null>(null)

    const [loading, setLoading] = useState<boolean>(false)
    
    const [error, setError] = useState<string>('')
    
    useEffect(() =>{

        if (id) {
            // trae la película por id al cargar la página
            movieService.getById(Number(id)).then(data =>setMovie(data))
        }
        // se ejecuta cuando cambia el id [id])
    }, [id])

    //Poner e: React.SubmitEvent para que pueda reaccionar al boton y redirigir a la pagina
    const handleSubmit = async(e: React.SubmitEvent) => {
        e.preventDefault();
        setError('')

        if (!id || !movie) {
            setError('Pelicula no existe')
            return
        } 
        setLoading(true)
            try {
                await movieService.update(Number(id), movie)
                //Redirigir
                router.push('/dashboard/peliculas')
            } catch (error) {
                setError('No se encontro la pelicula')
                
            } finally{
                setLoading(false)
            }
        
    }

    return(
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-white mb-4">Editar Pelicula</h1>
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label>Titulo</label>
                    <input value={movie?.title || ''} placeholder=" Titulo" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" onChange={(e) => setMovie({...movie!, title: e.target.value})}/>
                
                </div>
                 {/**para manejar inputs con string */}
                <div>
                    <label>Genero</label>
                   
                    <input value={movie?.genre || ''} placeholder=" Genero" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" onChange={(e) => setMovie({...movie!, genre: e.target.value})}/>
                
                </div>
                {/**para manejar inputs con numeros */}
                <div>
                    <label>Año </label>
                    
                    <input value={movie?.year || ''} placeholder=" Año" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" onChange={(e) => setMovie({...movie!, year: Number(e.target.value)})}/>
                
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 disabled:cursor-not-allowed font-semibold py-2 px-4 rounded text-sm" type="submit" disabled={loading}>
                    {loading ? 'Cargando...': 'Guardar'}
                </button>
                
            </form>
        </div>
    )
}