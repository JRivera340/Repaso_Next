
import { Movie } from "../interfaces/movie.interface";
import axiosInstance from "../libs/api.libs";


const movieService = {

     getAll: async() => {
        const movies = await axiosInstance.get<Movie[]>('/movies');
        return movies.data;
    },

    getById: async(id:number) => {
        const movie = await axiosInstance.get<Movie>(`/movies/${id}`);
        return movie.data;
    },

    /**Partial<Movie> significa que no todos los campos de Movie son obligatorios. Sin Partial tendrías que enviar todos los campos al hacer PATCH: */
    update: async(id:number, data: Partial<Movie>)=>{
        const movie = await axiosInstance.patch<Movie>(`/movies/${id}`, data);
        return movie.data;
    },
    
    create: async (data: { title: string; genre: string; year: number; director: string; rating: number }) => {
    const movie = await axiosInstance.post<Movie>('/movies', data)
    return movie.data
    }
}


export default movieService