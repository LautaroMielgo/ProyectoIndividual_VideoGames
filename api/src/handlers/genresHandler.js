const { getAllGenres } = require("../controllers/genresController");

const getGenresHandler = async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  getGenresHandler
};




