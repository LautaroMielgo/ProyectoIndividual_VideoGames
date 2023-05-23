import axios from "axios"
import dotenv from 'dotenv';


dotenv.config();
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_DETAILS ="GET_VIDEOGAME_DETAILS"
export const CREATE_VIDEOGAME= "CREATE_VIDEOGAME"
export const SEARCH_VIDEOGAMES_SUCCESS= "SEARCH_VIDEOGAMES_SUCCESS"
export const SEARCH_VIDEOGAMES_ERROR= "SEARCH_VIDEOGAMES_ERROR"
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const GET_GENRES_SUCCESS = "GET_GENRES_SUCCESS";
export const GET_GENRES_ERROR = "GET_GENRES_ERROR";
export const SORT_VIDEOGAMES = "SORT_VIDEOGAMES";
export const SET_CURRENT_PAGE= "SET_CURRENT_PAGE"

export const getVideogames = () => {
  return async function (dispatch, getState) {  // Agrega el argumento getState
    try {
      const { currentPage, gamesPerPage } = getState();
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=fb87907741bc4827b6de9ef781e8a8b4&page=${currentPage}&page_size=${gamesPerPage}`
      );
      const apiResults = Array.isArray(response.data.results)
        ? response.data.results.map((game) => ({
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map((platform) => platform.platform.name),
            genres: game.genres.map((genre) => genre.name),
            origin: "API",
          }))
        : [];

      dispatch({
        type: SEARCH_VIDEOGAMES_SUCCESS,
        payload: apiResults,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_VIDEOGAMES_ERROR,
        payload: error.message,
      });
    }
  };
};




export const getVideogameDetails = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=fb87907741bc4827b6de9ef781e8a8b4`
      );
      const apiVideogame = response.data;
      
      dispatch({ type: GET_VIDEOGAME_DETAILS, payload: apiVideogame });
    } catch (error) {
      console.error("Error fetching videogame details:", error);
    }
  };
};


export const createVideogame = (formData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/videogames", formData);

      const createdVideogame = response.data;

      dispatch({ type: CREATE_VIDEOGAME, payload: createdVideogame });
    } catch (error) {
      console.error("Error creating videogame:", error);
    }
  };
};

export const searchVideoGames = (game) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?search=${game}&key=fb87907741bc4827b6de9ef781e8a8b4`
      );
      const apiResults = Array.isArray(response.data.results)
        ? response.data.results.map((game) => ({
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map((platform) => platform.platform.name),
            genres: game.genres.map((genre) => genre.name),
            origin: "API",
          }))
        : [];

      dispatch({
        type: SEARCH_VIDEOGAMES_SUCCESS,
        payload: apiResults,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_VIDEOGAMES_ERROR,
        payload: error.message,
      });
    }
  };
};

export const filterByGenre = (genre) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?genres=${genre}&key=fb87907741bc4827b6de9ef781e8a8b4`
      );
      const apiResults = Array.isArray(response.data.results)
        ? response.data.results.map((game) => ({
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map((platform) => platform.platform.name),
            genres: game.genres.map((genre) => genre.name),
            origin: "API",
          }))
        : [];

      dispatch({
        type: SEARCH_VIDEOGAMES_SUCCESS,
        payload: apiResults,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_VIDEOGAMES_ERROR,
        payload: error.message,
      });
    }
  };
};

export const filterByOrigin = (origin) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?origin=${origin}&key=fb87907741bc4827b6de9ef781e8a8b4`
      );
      const apiResults = Array.isArray(response.data.results)
        ? response.data.results.map((game) => ({
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map((platform) => platform.platform.name),
            genres: game.genres.map((genre) => genre.name),
            origin: "API",
          }))
        : [];

      dispatch({
        type: SEARCH_VIDEOGAMES_SUCCESS,
        payload: apiResults,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_VIDEOGAMES_ERROR,
        payload: error.message,
      });
    }
  };
};
export const getGenres = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        "https://api.rawg.io/api/genres?key=fb87907741bc4827b6de9ef781e8a8b4"
      );
      const apiGenres = Array.isArray(response.data.results)
        ? response.data.results.map((genre) => genre.name)
        : [];

      dispatch({
        type: GET_GENRES_SUCCESS,
        payload: apiGenres,
      });
    } catch (error) {
      dispatch({
        type: GET_GENRES_ERROR,
        payload: error.message,
      });
    }
  };
};


export const sortVideogames = (sortBy) => {
  return {
    type: SORT_VIDEOGAMES,
    payload: sortBy,
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};


