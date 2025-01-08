import Movie from "../Modules/Movie.js"


const getAllMovies = async (req, res) => {
  try {
    const { genre, language, sort, search } = req.query;

    let filter = {};
    if (genre) filter.genre = { $in: genre.split(',') }; // Filter by genres
    if (language) filter.language = language; // Filter by language
    if (search) filter.title = { $regex: search, $options: 'i' }; // Search by title

    let movies = Movie.find(filter);

    if (sort) {
      const sortOptions = sort.split(',').join(' ');
      movies = movies.sort(sortOptions); // Sort by fields like 'rating' or '-releaseDate'
    }

    const results = await movies;
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMoviesByGenre = async (req, res) => {
  try {
    const genreCount = await Movie.aggregate([
      { $unwind: '$genre' },
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.status(200).json(genreCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopRatedMovies = async (req, res) => {
  try {
    const topMovies = await Movie.find().sort({ rating: -1 }).limit(10);
    res.status(200).json(topMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesByGenre,
  getTopRatedMovies,
};
