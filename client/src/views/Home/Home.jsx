import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, searchVideoGames, getGenres } from '../../redux/actions';

import CardsContainer from '../../components/CardsContainer/CardsContainer';

const Home = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('allGenres');
  const [selectedOrigin, setSelectedOrigin] = useState('allOrigins');
  const [filteredVideogames, setFilteredVideogames] = useState([]);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    const filterVideogames = () => {
      let filtered = allVideogames;

      if (selectedGenre !== 'allGenres') {
        filtered = filtered.filter((game) => game.genres.includes(selectedGenre));
      }

      if (selectedOrigin !== 'allOrigins') {
        filtered = filtered.filter((game) => game.origin === selectedOrigin);
      }

      setFilteredVideogames(filtered);
    };

    filterVideogames();
  }, [selectedGenre, selectedOrigin, allVideogames]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      dispatch(searchVideoGames(searchQuery));
    } else {
      dispatch(getVideogames());
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
  };

  const handleOriginChange = (event) => {
    const origin = event.target.value;
    setSelectedOrigin(origin);
  };

  return (
    <div>
      <div>
        <input type="text" value={searchQuery} onChange={handleInputChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <label htmlFor="genreSelect">Filter by Genre:</label>
        <select id="genreSelect" value={selectedGenre} onChange={handleGenreChange}>
          <option value="allGenres">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="originSelect">Filter by Origin:</label>
        <select id="originSelect" value={selectedOrigin} onChange={handleOriginChange}>
          <option value="allOrigins">All Origins</option>
          <option value="API">API</option>
          <option value="Database">Database</option>
        </select>
      </div>
      <CardsContainer videogames={filteredVideogames} />
    </div>
  );
};

export default Home;








