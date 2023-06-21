const {Videogame, Genre} = require("../db")
const axios = require("axios")
require('dotenv').config();
const { Op } = require('sequelize');


const BASE_URL = 'https://api.rawg.io/api';



const createGame = async (name, description, platforms, image, releaseDate, rating, genres) => {
  try {
    const createdGame = await Videogame.create({ name, description, platforms, image, releaseDate, rating });
    
    
    if (genres && genres.length > 0) {
      const genresToAssign = await Genre.findAll({
        where: {
          name: genres
        }
      });
      await createdGame.setGenres(genresToAssign);
    }
    
    return createdGame;
  } catch (error) {
    console.error('Error al crear el juego:', error);
    throw error;
  }
};



const getGameById = async (id, source) => {
  try {
    if (source === 'api') {
      const url = `${BASE_URL}/games/${id}?key=${process.env.REACT_APP_API_KEY}`;
      const response = await axios.get(url);
      const game = response.data;
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map(platform => platform.platform.name),
        genres: game.genres.map(genre => genre.name)
      };
    } else if (source === 'bdd') {
      const game = await Videogame.findByPk(id, {
        attributes: ['id', 'image', 'releaseDate','rating'],
        include: Genre,

                          
      }); 
      
      if (!game) {
        throw new Error('Juego no encontrado en la base de datos');
      }
      
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        released: game.releaseDate,
        rating: game.rating,
        platforms: game.platforms,
        genres: game.genres.map(genre => genre.name)
      };
    } else {
      throw new Error('Origen de datos no válido');
    }
  } catch (error) {
    console.error('Error al obtener el juego por ID:', error);
    throw error;
  }
};

const searchGameByName = async (name) => {
  try {
    const url = `${BASE_URL}/games?key=${process.env.REACT_APP_API_KEY}&search=${name}`;
    const response = await axios.get(url);
    const apiResults = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms.map(platform => platform.platform.name),
      genres: game.genres.map(genre => genre.name)
    }));

    
    const databaseGames = await Videogame.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      include: [
        {
          model: Image,
          attributes: ['url'],
        },
        {
          model: Platform,
        },
        {
          model: Genre,
        },
      ],
    });
    

    const results = [...apiResults, ...databaseGames];
    return results;
  } catch (error) {
    console.error('Error al buscar el juego por nombre:', error);
    throw error;
  }
};

const getAllGames = async () => {
  try {
    const url = `${BASE_URL}/games?key=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(url);
    const apiResults = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms.map(platform => platform.platform.name),
      genres: game.genres.map(genre => genre.name)
    }));


    const databaseGames = await Videogame.findAll({
      include: Genre
    });
    const databaseResults = databaseGames.map(game => ({
      id: game.id,
      name: game.name,
      image: game.image,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms,
      genres: game.genres.map(genre => genre.name) 
    }));

    const results = [...apiResults, ...databaseResults];
    return results;
  } catch (error) {
    console.error('Error al obtener todos los juegos:', error);
    throw error;
  }
};











module.exports = { createGame, getGameById,searchGameByName,getAllGames }