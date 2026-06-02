import { Suspense } from 'react'
import CrearPeliculaPage from "@/app/components/crearPeliculaPage"

export default function EditarPelicula() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CrearPeliculaPage />
    </Suspense>
  )
}