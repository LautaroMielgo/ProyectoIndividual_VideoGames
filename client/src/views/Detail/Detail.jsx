import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogameDetails } from "../../redux/actions";
import style from "./Detail.module.css";

const Detail = ({ id }) => {
  const videogameDetails = useSelector((state) => state.videogameDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogameDetails(id));
  }, [dispatch, id]);

  const { name, background_image, platforms, description, released, rating, genres } = videogameDetails || {};


  return (
    <div className={style.Detail}>
      <div className={style.imgdetail}>
        <h1>{name}</h1>
        <img src={background_image} alt={name} />
      </div>

      <div className={style.divdetail}>
      <p>
    Plataformas:{" "}
      {platforms &&
      (videogameDetails.origin === "DATABASE"
      ? platforms.join(", ")
      : platforms.map((platform) => platform.platform.name).join(", "))}
      </p>
        <h3>Descripcion</h3>
        <p>{description}</p>
        <p>Fecha de lanzamiento: {released}</p>
        <h3>Rating</h3>
        <p>{rating}</p>
        <h3>Géneros</h3>
        <p>{genres && genres.map((genre) => genre.name).join(", ")}</p>
      </div>
    </div>
  );
};

export default Detail;











