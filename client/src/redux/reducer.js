import { GET_VIDEOGAMES, GET_VIDEOGAME_DETAILS, CREATE_VIDEOGAME, SEARCH_VIDEOGAMES_ERROR, SEARCH_VIDEOGAMES_SUCCESS, GET_GENRES_SUCCESS, GET_GENRES_ERROR,SORT_VIDEOGAMES,SET_CURRENT_PAGE } from "../redux/actions";

const initialState = {
  videogames: [],
  videogameDetails: null,
  genres: [], 
  filteredVideogames: [],
  error: null,
  currentPage: 1, 
  gamesPerPage: 15,
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
      case SORT_VIDEOGAMES:
        let sortedVideogames = [...state.videogames];
        if (action.payload === "name_asc") {
          sortedVideogames.sort((a, b) => a.name.localeCompare(b.name));
        } else if (action.payload === "name_desc") {
          sortedVideogames.sort((a, b) => b.name.localeCompare(a.name));
        } else if (action.payload === "rating_asc") {
          sortedVideogames.sort((a, b) => a.rating - b.rating);
        } else if (action.payload === "rating_desc") {
          sortedVideogames.sort((a, b) => b.rating - a.rating);
        }
        return {
          ...state,
          videogames: sortedVideogames,
        };
        case SET_CURRENT_PAGE:
         return {
    ...state,
    currentPage: action.payload,
  };
    default:
      return state;
  }
};

export default reducer;



    