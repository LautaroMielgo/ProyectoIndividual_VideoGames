import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createVideogame } from '../../redux/actions';
import style from "./Form.module.css"

const Form = () => {
  const dispatch = useDispatch();

  const initialFormData = {
    name: '',
    description: '',
    platforms: '',
    image: '',
    releaseDate: '',
    rating: ''
  };
   
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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

    if (!formData.platforms.trim()) {
      validationErrors.platforms = 'Las plataformas son requeridas';
    }

    if (!formData.image.trim()) {
      validationErrors.image = 'La URL de la imagen es requerida';
    }

    if (!formData.releaseDate.trim()) {
      validationErrors.releaseDate = 'La fecha de lanzamiento es requerida';
    }

    if (!formData.rating.trim()) {
      validationErrors.rating = 'La clasificación es requerida';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Aquí puedes realizar la llamada al backend para crear el nuevo videojuego
      const newGame = {
        name: formData.name,
        description: formData.description,
        platforms: formData.platforms.split(','),
        image: formData.image,
        releaseDate: formData.releaseDate,
        rating: formData.rating
      };

      dispatch(createVideogame(newGame));

      // Restablecer los campos del formulario
      setFormData(initialFormData);
    }
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
        <input type="text" id="platforms" name="platforms" value={formData.platforms} onChange={handleChange} />
        {errors.platforms && <span>{errors.platforms}</span>}<br /><br />

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


