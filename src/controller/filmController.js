import { getFilms, inserFilm, searchFilm } from "#postgres"
import { filmValidator } from "#validator";

export const filmsController = {
    GET: async function(req, res){
        try{
            const films = await getFilms();
            const {filmId} = req.params;
            if(filmId){
                const film = await searchFilm(filmId);
                if(!film) return res.status(404).json({message: "Film is not found", statusCode: 404});
                return res.status(200).json(film);
            }
            return res.status(200).json(films);
        }catch(error){
            return res.status(error.status || 500).json({
                message: error.message,
                statusCode: error.status || 500 
            })
        }
    },
    POST: async function(req, res) {
        try{
            const newFilm = req.body;
            if(filmValidator.validate(newFilm).error instanceof Error){
                return res.status(400).json({message: booksValidator.validate(newFilm).error.message, statusCode: 400 });  
            }else{
                const response = await inserFilm(newFilm.film_name, newFilm.film_year, newFilm.film_ganre);
                if(response && response.hasOwnProperty("film_name")){
                    return res.status(201).json({message: "Film successfully created ! ", film: newFilm, statusCode: 201})
                }else{
                    return res.status(400).json({message: "Invalid film", statusCode: 400})
                }
            }
        }catch(error){
            return res.status(error.status || 500).json({
                message: error.message,
                statusCode: error.status || 500
            })
        }    
    }
}