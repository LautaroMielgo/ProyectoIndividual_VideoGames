import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVideogame, getGenres } from '../../redux/actions';
import style from "./Form.module.css"

const Form = () => {
  const dispatch = useDispatch();
  const availableGenres = useSelector((state) => state.genres);

  const initialFormData = {
    name: '',
    description: '',
    platforms: [],
    genres: [],
    image: '',
    releaseDate: '',
    rating: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [availablePlatforms, setAvailablePlatforms] = useState([]);

  useEffect(() => {
    fetchPlatforms();
    dispatch(getGenres());
  }, [dispatch]);

  const fetchPlatforms = async () => {
    try {
      const response = await fetch('https://api.rawg.io/api/platforms?key=fb87907741bc4827b6de9ef781e8a8b4');
      const data = await response.json();
      setAvailablePlatforms(data.results);
    } catch (error) {
      console.log('Error al obtener las plataformas:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handlePlatformChange = (event) => {
    const selectedPlatforms = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, platforms: selectedPlatforms });
  };

  const handleGenreChange = (event) => {
    const selectedGenres = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, genres: selectedGenres });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      validationErrors.description = 'La descripción es requerida';
    }

    if (formData.platforms.length === 0) {
      validationErrors.platforms = 'Debes seleccionar al menos una plataforma';
    }

    if (!formData.image.trim()) {
      validationErrors.image = 'La URL de la imagen es requerida';
    } else if (!isValidUrl(formData.image.trim())) {
      validationErrors.image = 'La URL de la imagen no es válida';
    }

    if (!formData.releaseDate.trim()) {
      validationErrors.releaseDate = 'La fecha de lanzamiento es requerida';
    }

    if (!formData.rating.trim()) {
      validationErrors.rating = 'La clasificación es requerida';
    } else if (!isValidRating(formData.rating.trim())) {
      validationErrors.rating = 'La clasificación no es válida';
    }

    if (formData.genres.length === 0) {
      validationErrors.genres = 'Debes seleccionar al menos un género';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newGame = {
        name: formData.name,
        description: formData.description,
        platforms: formData.platforms,
        genres: formData.genres,
        image: formData.image,
        releaseDate: formData.releaseDate,
        rating: formData.rating
      };

      dispatch(createVideogame(newGame));

      setFormData(initialFormData);
    }
  };

  const isValidUrl = (url) => {
    
    return url.startsWith('http://') || url.startsWith('https://');
  };

  const isValidRating = (rating) => {
    
    const parsedRating = parseFloat(rating);
    return !isNaN(parsedRating) && parsedRating >= 1 && parsedRating <= 10;
  };

  return (
    <div className={style.formulario}>
      <h1>Crear Videojuego</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span>{errors.name}</span>}<br /><br />

        <label htmlFor="description">Descripción:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        {errors.description && <span>{errors.description}</span>}<br /><br />

        <label htmlFor="platforms">Plataformas:</label>
        <select id="platforms" name="platforms" multiple value={formData.platforms} onChange={handlePlatformChange}>
          {availablePlatforms.map((platform) => (
            <option key={platform.id} value={platform.slug}>{platform.name}</option>
          ))}
        </select>
        {errors.platforms && <span>{errors.platforms}</span>}<br /><br />

        <label htmlFor="genres">Géneros:</label>
        <select id="genres" name="genres" multiple value={formData.genres} onChange={handleGenreChange}>
        {availableGenres && availableGenres.map((genre) => (
  <option key={genre} value={genre}>{genre}</option>
))}

        </select>
        {errors.genres && <span>{errors.genres}</span>}<br /><br />

        <label htmlFor="image">URL de la imagen:</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
        {errors.image && <span>{errors.image}</span>}<br /><br />

        <label htmlFor="releaseDate">Fecha de lanzamiento:</label>
        <input type="date" id="releaseDate" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
        {errors.releaseDate && <span>{errors.releaseDate}</span>}<br /><br />

        <label htmlFor="rating">Clasificación:</label>
        <input type="text" id="rating" name="rating" value={formData.rating} onChange={handleChange} />
        {errors.rating && <span>{errors.rating}</span>}<br /><br />

        <input type="submit" value="Crear Videojuego" />
      </form>
    </div>
  );
};

export default Form;



