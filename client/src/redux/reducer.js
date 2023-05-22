import { GET_VIDEOGAMES, GET_VIDEOGAME_DETAILS, CREATE_VIDEOGAME, SEARCH_VIDEOGAMES_ERROR, SEARCH_VIDEOGAMES_SUCCESS, GET_GENRES_SUCCESS, GET_GENRES_ERROR } from "../redux/actions";

const initialState = {
  videogames: [],
  videogameDetails: null,
  genres: [], // Agrega un nuevo estado para almacenar los géneros
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return { ...state, videogames: action.payload };
    case GET_VIDEOGAME_DETAILS:
      return { ...state, videogameDetails: action.payload };
    case CREATE_VIDEOGAME:
      return {
        ...state,
        videogames: [...state.videogames, action.payload],
      };
    case SEARCH_VIDEOGAMES_SUCCESS:
      return {
        ...state,
        videogames: action.payload,
      };
    case SEARCH_VIDEOGAMES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_GENRES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;



    