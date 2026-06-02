'use client'

import Link from 'next/link'
import { useEffect } from "react"
import { useState } from "react"
//se pone app al inicio porque es en el root
import { Movie } from '@/app/interfaces/movie.interface'
import movieService from "../services/movie.service"
export default function PeliculasPage(){

    // bien — array de Movie vacío al inicio
    const [movies, setMovies] = useState<Movie[]>([])

    // 2. efectos y lógica
    useEffect(() => {
        movieService.getAll().then(data => setMovies(data))
        // ← [] = ejecutar solo al montar, nunca más
        // ← Si pusiera una variable adentro: se ejecuta cada vez que cambia el id
    }, [])


    return(
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-4'>Peliculas en una tabla</h1>
            <table className='w-full border-collapse'>
                <thead className='bg-gray-800 text-white'>
                    {/**Filas <tr>*/}
                    {/**Columnas <th> */}
                    <tr className='border-b border-gray-200'> 
                        <th className='p-3 text-left'>Titulo</th>
                        <th className='p-3 text-left'>Genero</th>
                        <th className='p-3 text-left'>Año</th>
                        <th className='p-3 text-left'>Acciones</th>
                    </tr>     
                </thead>
                <tbody>
                    {/**revisar siempre el json para saber como se comportan los datos a la hora de traerlos */}
                        
                    {movies.map((movie => (
                        
                    <tr className='border-b border-gray-200' key={movie.id}>
                        <td className='p-3'>{movie.title}</td>
                        <td className='p-3'>{movie.genre}</td>
                        <td className='p-3'>{movie.year}</td>
                        <td className='p-3'>
                            <Link className='text-blue-500 hover:text-blue-700' href={`/dashboard/editar-pelicula?id=${movie.id}`}>Editar</Link>
                        </td>

                    </tr>    
                    )))}
                </tbody>
            </table>

        </div>
    )
}