import React from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';

const CardsContainer = ({ videogames }) => {
  return (
    <div className={style.container}>
      {videogames && videogames.map((videogame) => (
        <Card key={videogame.id} videogame={videogame} />
      ))}
    </div>
  );
};

export default CardsContainer;



