import { Movie } from "../interfaces/movie.interface";
import axiosInstance from "../libs/api.libs";


const movieService = {

     getall: async() => {
        const movies = await axiosInstance.get<Movie[]>('/movies');
        return movies.data;
    },

    getById: async(id:number) => {
        const movie = await axiosInstance.get<Movie>(`/movies/${id}`);
        return movie.data;
    },

    update: async(id:number, data: Partial<Movie>)=>{
        const movie = await axiosInstance.patch<Movie>(`/movies/${id}`, data);
        return movie.data;
    }
}

export default movieService