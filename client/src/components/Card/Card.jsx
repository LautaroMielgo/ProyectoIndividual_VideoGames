import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = ({ videogame }) => {
  return (
    <Link to={`/detail/${videogame.id}`} className={style.card}>
      <h3>{videogame.name}</h3>
      <img src={videogame.background_image} alt="videojuego" />
      {videogame.genres && <p>Géneros: {videogame.genres.join(', ')}</p>}
      <p>rating: {videogame.rating}</p>
    </Link>
  );
};

export default Card;





