const axios = require("axios");
const { Genre } = require("../db");
require('dotenv').config();


const BASE_URL = 'https://api.rawg.io/api';

const getAllGenres = async () => {
  try {
    
    const genresFromDB = await Genre.findAll();
    
   
    if (genresFromDB.length > 0) {
      return genresFromDB;
    }
    
  
    const url = `${BASE_URL}/genres?key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(url);
    const genresFromAPI = response.data.results;
    
   
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







