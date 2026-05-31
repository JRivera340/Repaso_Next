//por ejemplo la url para este es: http://localhost:3001/dashboard/peliculas y carga este jsx
import PeliculasPage from "@/app/components/peliculasPage"

export default function Peliculas(){

    return(
        <div>
            <p>Peliculas</p>
            <PeliculasPage></PeliculasPage>
        </div>
    )
}