import express from'express';
import { getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie, } from '../Controllers/MovieController.js';
const router = express.Router();

router.get('/', getAllMovies);          
router.get('/:id', getMovieById);       
router.post('/', createMovie);         
router.put('/:id', updateMovie);        
router.delete('/:id', deleteMovie); 
module.exports = router;
