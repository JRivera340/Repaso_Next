'use client'

import { useState } from "react"
import movieService from "../services/movie.service"
//El import de useRouter estaba mal, es next/navigation no next/router
import { useRouter } from "next/navigation"

export default function CrearPeliculaPage (){

    const [title, setTitle] = useState<string>('')
    const [genre, setGenre] = useState<string>('')
    const [year, setYear] = useState<number>(0)
    const [director, setDirector] = useState<string>('')
    const [rating, setRating] = useState<number>(0)
    const router = useRouter()

    const [error, setError] = useState<string>(''); 

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setError('')

        if (!title || !genre || !year || !director || !rating ) {
            setError('Campos vacios')
            return
        }
        setLoading(true)
        try {
            
            await movieService.create({title, genre, year, director, rating})
            router.push('/dashboard/peliculas')
        } catch (error) {
            setError('No se pudo crear la pelicula')
                
        }finally{
            setLoading(false)
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-white mb-4">Crear pelicula</h1>
                <p>Crea tu pelicula</p>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label>Titulo</label>
                    <input value={title} placeholder=" Titulo" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" onChange={(e) => setTitle(e.target.value)}/>
                
                </div>
                 {/**para manejar inputs con string */}
                <div>
                    <label>Genero</label>
                   
                    <input value={ genre} placeholder=" Genero" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" onChange={(e) => setGenre(e.target.value)}/>
                
                </div>
                {/**para manejar inputs con numeros */}
                <div>
                    <label>Director </label>
                    
                    <input value={ director} placeholder=" Director" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" onChange={(e) => setDirector(e.target.value)}/>
                
                </div>
                <div>
                    <label>Rating </label>
                    
                    <input value={ rating} placeholder=" Año" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" onChange={(e) => setRating((Number(e.target.value)))}/>
                
                </div>
                <div>
                    <label>Año </label>
                    
                    <input value={ year} placeholder=" Año" className="w-full bg-slate-200 text-slate-900 rounded px-3 py-2 text-sm mb-4" onChange={(e) => setYear(Number(e.target.value))}/>
                
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 disabled:cursor-not-allowed font-semibold py-2 px-4 rounded text-sm" type="submit" disabled={loading}>
                    {loading ? 'Cargando...': 'Guardar'}
                </button>
                </form>

                   
            </div>
        </div>
    )
}