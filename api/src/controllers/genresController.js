const axios = require("axios");
const { Genre } = require("../db");
require('dotenv').config();


const BASE_URL = 'https://api.rawg.io/api';

const getAllGenres = async () => {
  try {
    // Obtener los géneros de la base de datos
    const genresFromDB = await Genre.findAll();
    
    // Si existen géneros en la base de datos, devolverlos
    if (genresFromDB.length > 0) {
      return genresFromDB;
    }
    
    // Obtener los géneros de la API
    const url = `${BASE_URL}/genres?key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(url);
    const genresFromAPI = response.data.results;
    
    // Guardar los géneros en la base de datos
    const savedGenres = await Genre.bulkCreate(genresFromAPI);
    
    return savedGenres;
  } catch (error) {
    console.error('Error al obtener todos los géneros:', error);
    throw error;
  }
};

module.exports = {
  getAllGenres
};







